"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskItem } from "./task-item";
import { useFetchTasks } from "./task.hook";
import { getIsOverdue } from "@/lib/date";

export function TaskListSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full rounded-sm"></Skeleton>
      ))}
    </div>
  );
}

export function TaskListClient() {
  const { data: tasks, isLoading, error } = useFetchTasks();

  const separatedTasks = {
    overdue: tasks?.filter((t) => t.dueDate && getIsOverdue(t.dueDate)) || [],
    noDeadline: tasks?.filter((t) => !t.dueDate) || [],
    notOverdue:
      tasks?.filter((t) => t.dueDate && !getIsOverdue(t.dueDate)) || [],
  };

  const sortedTasks = [
    ...separatedTasks.overdue,
    ...separatedTasks.noDeadline,
    ...separatedTasks.notOverdue,
  ];

  if (isLoading) return <TaskListSkeleton />;
  if (error) return <p>{error.message}</p>;
  if (!tasks) return <p>Data Not Found</p>;
  return (
    <div className="flex flex-col gap-1">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
