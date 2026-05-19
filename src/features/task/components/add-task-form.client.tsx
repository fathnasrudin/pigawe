"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateTask } from "./task.hook";

const initialTaskDraft = { title: "" };

export function AddTaskFormClient() {
  const [taskDraft, setTaskDraft] = useState(() => initialTaskDraft);
  const createTask = useCreateTask();

  return (
    <div>
      <form
        className="p-4 border rounded-sm flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          createTask.mutate(taskDraft);
          setTaskDraft(initialTaskDraft);
        }}
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
        <Button
          size={"sm"}
          variant={"default"}
          type="submit"
          disabled={createTask.isPending}
        >
          Create
        </Button>
      </form>
      {/* {!state.ok && <p className="text-sm text-red-600">{state.message}</p>} */}
    </div>
  );
}
