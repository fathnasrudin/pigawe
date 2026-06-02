import { getIsOverdue } from "@/lib/date";
import { Task } from "../task.schema";
import { TaskItem } from "./task-item";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CheckSquare2Icon, ChevronDownIcon, FrownIcon } from "lucide-react";
import { useFetchTasks } from "./task.hook";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function TaskListSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full rounded-sm"></Skeleton>
      ))}
    </div>
  );
}

export function TaskListEmpty() {
  return (
    <Empty className="h-full bg-red-200">
      <EmptyHeader className="text-muted-foreground">
        <EmptyMedia>
          <CheckSquare2Icon />
        </EmptyMedia>
        <EmptyTitle>No tasks</EmptyTitle>
        <EmptyDescription>Enjoy your day :)</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function TaskListError() {
  return (
    <Empty className="text-muted-foreground">
      <EmptyHeader>
        <EmptyMedia>
          <FrownIcon />
        </EmptyMedia>
        <EmptyDescription>Failed to fetch your tasks</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const separatedTasks = {
    done: tasks?.filter((t) => t.status === "done") || [],
    overdue:
      tasks?.filter(
        (t) => t.status !== "done" && t.dueDate && getIsOverdue(t.dueDate),
      ) || [],
    noDeadline: tasks?.filter((t) => t.status !== "done" && !t.dueDate) || [],
    notOverdue:
      tasks?.filter(
        (t) => t.status !== "done" && t.dueDate && !getIsOverdue(t.dueDate),
      ) || [],
  };

  const sortedTasks = [
    ...separatedTasks.overdue,
    ...separatedTasks.noDeadline,
    ...separatedTasks.notOverdue,
  ];

  return (
    <div className="space-y-1 w-full">
      <div className="flex flex-col gap-1">
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      {/* done */}
      <div className="flex flex-col gap-1">
        {separatedTasks.done.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export function TaskListWithSection({
  sections,
}: {
  sections: {
    id: string;
    title: string;
    tasks: Task[];
    isCollapsible: boolean;
  }[];
}) {
  return (
    <div className="space-y-8 w-full">
      {sections.map((s) => (
        <section key={s.id}>
          <Collapsible
            defaultOpen
            disabled={!s.isCollapsible}
            className="space-y-2"
          >
            <CollapsibleTrigger asChild>
              {s.title && (
                <h2 className="flex flex-1 w-full items-center gap-4 group">
                  {s.title}
                  {s.isCollapsible && (
                    <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                  )}
                </h2>
              )}
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="flex flex-col gap-1">
                {s.tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>
      ))}
    </div>
  );
}

export function TaskListWithFetch({
  fetchData,
}: {
  fetchData: ReturnType<typeof useFetchTasks>;
}) {
  const separatedTasks = {
    done: fetchData.data?.filter((t) => t.status === "done") || [],
    overdue:
      fetchData.data?.filter(
        (t) => t.status !== "done" && t.dueDate && getIsOverdue(t.dueDate),
      ) || [],
    noDeadline:
      fetchData.data?.filter((t) => t.status !== "done" && !t.dueDate) || [],
    notOverdue:
      fetchData.data?.filter(
        (t) => t.status !== "done" && t.dueDate && !getIsOverdue(t.dueDate),
      ) || [],
  };

  const sortedTasks = [
    ...separatedTasks.overdue,
    ...separatedTasks.noDeadline,
    ...separatedTasks.notOverdue,
  ];

  return (
    <>
      {/* task list */}
      {fetchData.isLoading ? (
        <TaskListSkeleton />
      ) : fetchData.isError ? (
        <TaskListError />
      ) : !fetchData.data || !fetchData.data.length ? (
        <TaskListEmpty />
      ) : (
        <TaskListWithSection
          sections={[
            {
              id: crypto.randomUUID(),
              title: "Todo",
              tasks: sortedTasks,
              isCollapsible: false,
            },
            {
              id: crypto.randomUUID(),
              title: "Done",
              tasks: separatedTasks.done,
              isCollapsible: true,
            },
          ]}
        />
      )}
    </>
  );
}
