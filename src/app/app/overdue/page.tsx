"use client";

import { TaskForm } from "@/modules/task/components/task-form";
import { TaskListWithFetch } from "@/modules/task/components/task-list";
import { useFetchTasks } from "@/modules/task/components/task.hook";

export default function TasksPage() {
  const fetchData = useFetchTasks({ searchParams: { dueDate: "overdue" } });

  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Overdue</h1>

        {/* Add Task Form */}
        <TaskForm />

        {/* task list */}
        <TaskListWithFetch fetchData={fetchData} />
      </div>
    </div>
  );
}
