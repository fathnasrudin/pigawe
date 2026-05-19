"use client";
import { TaskItem } from "./task-item";
import { useFetchTasks } from "./task.hook";

export function TaskListClient() {
  const { data: tasks, isLoading, error } = useFetchTasks();

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!tasks) return <p>Data Not Found</p>;
  return (
    <div className="flex flex-col gap-1">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
