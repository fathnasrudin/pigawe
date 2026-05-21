import { getIsOverdue } from "@/lib/date";
import { Task } from "../task.schema";
import { TaskItem } from "./task-item";

export function TaskList({ tasks }: { tasks: Task[] }) {
  const separatedTasks = {
    done: tasks?.filter((t) => t.status === "done") || [],
    overdue:
      tasks?.filter(
        (t) => t.status !== "done" && t.dueDate && getIsOverdue(t.dueDate),
      ) || [],
    noDeadline: tasks?.filter((t) => t.status !== "done" && !t.dueDate) || [],
    notOverdue:
      tasks?.filter(
        (t) => t.status !== "done" && t.dueDate && !getIsOverdue(t.dueDate),
      ) || [],
  };

  const sortedTasks = [
    ...separatedTasks.overdue,
    ...separatedTasks.noDeadline,
    ...separatedTasks.notOverdue,
  ];

  return (
    <div className="space-y-1 w-full">
      <div className="flex flex-col gap-1">
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      {/* done */}
      <div className="flex flex-col gap-1">
        {separatedTasks.done.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
