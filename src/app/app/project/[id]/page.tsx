"use client";

import { TaskForm } from "@/features/task/components/task-form";
import { TaskList } from "@/features/task/components/task-list";
import { useFetchTasks } from "@/features/task/components/task.hook";
import { useFetchProjectById } from "@/modules/project/project.hook";
import { use } from "react";

export default function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = use(params);
  const { isLoading, data: project } = useFetchProjectById(projectId);
  const fetchTasks = useFetchTasks({ searchParams: { projectId } });

  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">
          {isLoading ? "loading..." : project?.title}
        </h1>

        {/* Add Task Form */}
        <TaskForm initialValues={{ title: "", projectId }} />

        {/* task list */}
        {isLoading ? (
          "loading"
        ) : !fetchTasks.data ? (
          <p>task empty</p>
        ) : (
          <TaskList tasks={fetchTasks.data} />
        )}
      </div>
    </div>
  );
}
