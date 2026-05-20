"use client";

import { Button } from "@/components/ui/button";
import { useDeleteTask, useToggleTask } from "./task.hook";
import { Task } from "../task.schema";
import { format } from "date-fns";

function getDisplayDate(date: Date) {
  let formatStr = "d MMM yyyy";

  const isCurrentYear =
    new Date(date).getFullYear() === new Date().getFullYear();
  if (isCurrentYear) formatStr = "d MMM";

  return format(date, formatStr);
}

function getIsOverdue(date: Date) {
  return new Date(date) <= new Date();
}

export function DueDate({ date }: { date: Date }) {
  return (
    <div
      className={`${getIsOverdue(date) ? "text-red-600" : "text-gray-600"} text-xs flex gap-2 w-fit`}
    >
      <time>{getDisplayDate(date)}</time>
    </div>
  );
}

export function TaskItem({ task }: { task: Task }) {
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

      <div className="flex-1 flex flex-col gap-1">
        <div
          className={`
                
                ${task.status === "done" && "line-through"}
              `}
        >
          {task.title}
        </div>
        {task.dueDate && <DueDate date={task.dueDate} />}
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
