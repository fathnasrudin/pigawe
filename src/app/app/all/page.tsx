"use client";

import { TaskForm } from "@/features/task/components/task-form";
import { TaskList } from "@/features/task/components/task-list";
import { TaskListSkeleton } from "@/features/task/components/task-list.client";
import { useFetchTasks } from "@/features/task/components/task.hook";

export default function TasksPage() {
  const { data: tasks, isLoading, error } = useFetchTasks({});

  if (!tasks) return <p>Task not found</p>;
  if (isLoading) return <TaskListSkeleton />;
  if (error) return <p>Error</p>;

  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Overdue</h1>

        {/* Add Task Form */}
        <TaskForm />

        {/* task list */}
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
