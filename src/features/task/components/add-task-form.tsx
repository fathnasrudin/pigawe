"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createTaskAction } from "../task.action";

const initialTaskDraft = { title: "" };

export function AddTaskForm() {
  const [taskDraft, setTaskDraft] = useState(() => initialTaskDraft);

  return (
    <form
      action={createTaskAction}
      className="p-4 border rounded-sm flex gap-4"
      onSubmit={() => setTaskDraft(initialTaskDraft)}
    >
      <input
        name="title"
        className="flex-1 border-b-2"
        type="text"
        placeholder="your task"
        value={taskDraft.title}
        onChange={(e) => {
          setTaskDraft({ ...taskDraft, title: e.target.value });
        }}
      />
      <Button size={"sm"} variant={"default"} type="submit">
        Create
      </Button>
    </form>
  );
}
