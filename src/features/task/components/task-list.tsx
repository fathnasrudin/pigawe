import { ITask } from "../task.type";
import { TaskItem } from "./task-item";

export function TaskList({ tasks }: { tasks: ITask[] }) {
  return (
    <div className="flex flex-col gap-1">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
