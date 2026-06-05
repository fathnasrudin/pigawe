"use client";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { createTaskAction } from "../task.action";
import { ActionResponse } from "@/lib/server-action";

const initialTaskDraft = { title: "" };
const initialState: ActionResponse = { ok: false, message: "" };

export function AddTaskForm() {
  const [taskDraft, setTaskDraft] = useState(() => initialTaskDraft);
  const [state, formAction, pending] = useActionState(
    createTaskAction,
    initialState,
  );

  return (
    <div>
      <form
        action={formAction}
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
        <Button
          size={"sm"}
          variant={"default"}
          type="submit"
          disabled={pending}
        >
          Create
        </Button>
      </form>
      {!state.ok && <p className="text-sm text-red-600">{state.message}</p>}
    </div>
  );
}
