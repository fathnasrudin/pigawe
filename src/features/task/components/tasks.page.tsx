import { requireUser } from "@/features/auth/auth.service";
import { AddTaskForm } from "./add-task-form";
import { SignoutButton } from "@/app/auth/protected/signout-button";
import { TaskListClient } from "./task-list.client";

export async function TasksPage() {
  const user = await requireUser();

  // const tasks = await getTasks();
  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-6">
      {/* Profile */}
      <div className="flex gap-4 items-center">
        <div className="h-8 w-8 rounded-full bg-yellow-200 flex items-center justify-center">
          {user.name[0]}
        </div>
        <p className="mr-auto">{user.name}</p>
        <SignoutButton />
      </div>

      {/* Add Task Form */}
      <AddTaskForm />

      {/* task list */}
      <TaskListClient />
    </div>
  );
}
