"use client";

import { AddTaskFormClient } from "@/features/task/components/add-task-form.client";
import { useFetchDefaultProject } from "@/modules/project/project.hook";

export default function TasksPage() {
  const fetchProject = useFetchDefaultProject();

  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">
          Inbox - {!fetchProject.data ? "loading" : fetchProject.data.id}
        </h1>

        {/* Add Task Form */}
        <AddTaskFormClient />

        {/* task list */}
        {/* <TaskList tasks={tasks} /> */}
      </div>
    </div>
  );
}
