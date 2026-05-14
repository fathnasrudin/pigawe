"use client";

import { Button } from "@/components/ui/button";
import { ITask } from "../task.type";
import { deleteTaskAction } from "../task.action";

export function TaskItem({ task }: { task: ITask }) {
  function handleToggleTaskStatus(taskId: string) {
    // const newTasks = tasks.map((t) => {
    //   if (t.id === taskId) {
    //     t.status = t.status === "todo" ? "done" : "todo";
    //   }
    //   return t;
    // });
    // setTasks(newTasks);
    console.log({ taskId });
  }

  async function handleDeleteTask(taskId: string) {
    await deleteTaskAction(taskId);
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
      <Button size={"icon"} onClick={() => handleDeleteTask(task.id)}>
        Del
      </Button>
    </div>
  );
}
