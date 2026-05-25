"use client";

import { AddTaskFormClient } from "@/features/task/components/add-task-form.client";
import { useFetchProjectById } from "@/modules/project/project.hook";
import { use } from "react";

export default function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = use(params);
  const { isLoading, data: project, isError } = useFetchProjectById(projectId);

  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">
          {isLoading ? "loading..." : project?.title}
        </h1>

        {/* Add Task Form */}
        <AddTaskFormClient />

        {/* task list */}
      </div>
    </div>
  );
}
