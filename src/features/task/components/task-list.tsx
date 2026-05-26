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
import { CheckSquare2Icon, FrownIcon } from "lucide-react";
import { useFetchTasks } from "./task.hook";

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

export function TaskListWithFetch({
  fetchData,
}: {
  fetchData: ReturnType<typeof useFetchTasks>;
}) {
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
        <TaskList tasks={fetchData.data} />
      )}
    </>
  );
}
