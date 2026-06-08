"use client";

import { TaskForm } from "@/modules/task/components/task-form";
import { TaskListWithFetch } from "@/modules/task/components/task-list";
import { useFetchTasks } from "@/modules/task/components/task.hook";
import { useFetchProjectById } from "@/modules/project/project.hook";
import { use } from "react";
import { ClientFetchError } from "@/lib/error/client-error";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FrownIcon } from "lucide-react";

function ProjectNotFound() {
  return (
    <Empty className="text-muted-foreground">
      <EmptyHeader>
        <EmptyMedia>
          <FrownIcon />
        </EmptyMedia>
        <EmptyTitle>Project Not Found</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

export default function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = use(params);
  const { isLoading, data: project, error } = useFetchProjectById(projectId);
  const fetchTasks = useFetchTasks({ searchParams: { projectId } });

  if (error) {
    if (error instanceof ClientFetchError && error.code === "NOT_FOUND") {
      return <ProjectNotFound />;
    }
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">
          {isLoading ? "loading..." : project?.title}
        </h1>

        {/* Add Task Form */}
        <TaskForm initialValues={{ title: "", projectId }} />

        {/* task list */}
        <TaskListWithFetch fetchData={fetchTasks} />
      </div>
    </div>
  );
}
