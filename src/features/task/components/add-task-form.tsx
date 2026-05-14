"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialTaskDraft = { title: "" };

export function AddTaskForm() {
  const [taskDraft, setTaskDraft] = useState(() => initialTaskDraft);

  function handleAddTask({ title }: { title: string }) {
    console.log(`click submit. title ${title}`);

    setTaskDraft(initialTaskDraft);
  }

  return (
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
        Create
      </Button>
    </div>
  );
}
