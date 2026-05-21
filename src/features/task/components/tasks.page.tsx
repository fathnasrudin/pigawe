import { requireUser } from "@/features/auth/auth.service";
import { AddTaskFormClient } from "./add-task-form.client";
import { SignoutButton } from "@/app/auth/protected/signout-button";
import { TaskListClient } from "./task-list.client";

export async function TasksPage() {
  const user = await requireUser();

  // const tasks = await getTasks();
  return (
    <div className="w-full mx-auto p-4 flex flex-col gap-6">
      {/* Profile */}
      <div className="flex gap-4 items-center">
        <div className="h-8 w-8 rounded-full bg-yellow-200 flex items-center justify-center">
          {user.name[0]}
        </div>
        <p className="mr-auto">{user.name}</p>
        <SignoutButton />
      </div>

      {/* Add Task Form */}
      <AddTaskFormClient />

      {/* task list */}
      <TaskListClient />
    </div>
  );
}
