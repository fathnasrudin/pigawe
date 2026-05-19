"use client";

import { Button } from "@/components/ui/button";
import { ITask } from "../task.type";
import { useDeleteTask, useToggleTask } from "./task.hook";
import { Task } from "../task.schema";

export function TaskItem({ task }: { task: ITask }) {
  const deleteTask = useDeleteTask();
  const toggleTask = useToggleTask();

  async function handleToggleTaskStatus(
    taskId: string,
    currentStatus: Task["status"],
  ) {
    toggleTask.mutate({ taskId, data: { status: currentStatus } });
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
        onChange={() => handleToggleTaskStatus(task.id, task.status)}
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
