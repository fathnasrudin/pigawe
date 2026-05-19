"use client";

import { Button } from "@/components/ui/button";
import { ITask } from "../task.type";
import { toggleTaskStatusAction } from "../task.action";
import { useDeleteTask } from "./task.hook";

export function TaskItem({ task }: { task: ITask }) {
  const deleteTask = useDeleteTask();

  async function handleToggleTaskStatus(taskId: string) {
    await toggleTaskStatusAction(taskId);
  }

  async function handleDeleteTask(taskId: string) {
    deleteTask.mutate(taskId);
  }

  return (
    <div
      key={task.id}
      className="border rounded-sm p-1 flex items-center gap-2"
    >
      <input
        type="checkbox"
        checked={task.status === "done"}
        onChange={() => handleToggleTaskStatus(task.id)}
      />

      <div
        className={`
                flex-1
                ${task.status === "done" && "line-through"}
              `}
      >
        {task.title}
      </div>
      <Button
        size={"icon"}
        onClick={async () => await handleDeleteTask(task.id)}
      >
        Del
      </Button>
    </div>
  );
}
