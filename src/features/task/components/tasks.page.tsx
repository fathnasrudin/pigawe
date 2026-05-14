"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

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

const initialTaskDraft = { title: "" };

export function TasksPage() {
  const [tasks, setTasks] = useState(() => tasksData);
  const [taskDraft, setTaskDraft] = useState(() => initialTaskDraft);

  function handleToggleTaskStatus(taskId: string) {
    const newTasks = tasks.map((t) => {
      if (t.id === taskId) {
        t.status = t.status === "todo" ? "done" : "todo";
      }
      return t;
    });
    setTasks(newTasks);
  }

  function handleAddTask({ title }: { title: string }) {
    const newTask: ITask = {
      id: generateId(),
      title,
      status: "todo",
    };
    setTasks([newTask, ...tasks]);
    setTaskDraft(initialTaskDraft);
  }

  function handleDeleteTask(taskId: string) {
    const newTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(newTasks);
  }

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-6">
      {/* Add Task Form */}
      <div className="p-4 border rounded-sm flex gap-4">
        <input
          className="flex-1 border-b-2"
          type="text"
          placeholder="your task"
          value={taskDraft.title}
          onChange={(e) => {
            setTaskDraft({ ...taskDraft, title: e.target.value });
          }}
        />
        <Button
          size={"sm"}
          variant={"default"}
          onClick={(e) => {
            e.preventDefault();
            handleAddTask(taskDraft);
          }}
        >
          A Button
        </Button>
      </div>

      {/* task list */}
      <div className="flex flex-col gap-1">
        {tasks.map((task) => (
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
        ))}
      </div>
    </div>
  );
}
