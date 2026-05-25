"use client";

import { TaskFormClient } from "@/features/task/components/task-form.client";
import { TaskList } from "@/features/task/components/task-list";
import { useFetchTasks } from "@/features/task/components/task.hook";
import { useFetchDefaultProject } from "@/modules/project/project.hook";

export default function TasksPage() {
  const fetchProject = useFetchDefaultProject();
  // get default project
  const fetchInbox = useFetchDefaultProject();
  const fetchTasks = useFetchTasks({
    searchParams: { projectId: fetchInbox.data?.id },
  });

  if (!fetchInbox.data) return <p>loading...</p>;

  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Inbox</h1>

        {/* Add Task Form */}
        <TaskFormClient
          initialValues={{ title: "", projectId: fetchInbox.data.id }}
        />

        {/* task list */}
        {fetchTasks.isLoading ? (
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
