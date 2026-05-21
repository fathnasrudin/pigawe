import { Task } from "../task.schema";
import { TaskItem } from "./task-item";

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="flex flex-col gap-1">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
