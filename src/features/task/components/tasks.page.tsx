import { getTasks } from "../task.service";
import { AddTaskForm } from "./add-task-form";
import { TaskList } from "./task-list";

export async function TasksPage() {
  const tasks = await getTasks();
  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-6">
      {/* Add Task Form */}
      <AddTaskForm />

      {/* task list */}
      <TaskList tasks={tasks} />
    </div>
  );
}
