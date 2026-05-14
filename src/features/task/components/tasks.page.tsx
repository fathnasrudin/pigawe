import { AddTaskForm } from "./add-task-form";
import { TaskList } from "./task-list";

type ITask = {
  id: string;
  title: string;
  status: "done" | "todo";
};

const generateId = () => crypto.randomUUID();

const tasksData: ITask[] = [
  {
    id: generateId(),
    title: "Makan siang",
    status: "todo",
  },
  {
    id: generateId(),
    title: "Makan malam",
    status: "todo",
  },
];

export function TasksPage() {
  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-6">
      {/* Add Task Form */}
      <AddTaskForm />

      {/* task list */}
      <TaskList tasks={tasksData} />
    </div>
  );
}
