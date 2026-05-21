import { AddTaskFormClient } from "./add-task-form.client";
import { TaskListClient } from "./task-list.client";

export async function TasksPage() {
  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
        {/* Add Task Form */}
        <AddTaskFormClient />

        {/* task list */}
        <TaskListClient />
      </div>
    </div>
  );
}
