"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCreateTask } from "./task.hook";
import { DatePickerTime } from "@/components/date-picker-time";
import { createTaskInputSchema } from "../task.schema";

const initialTaskDraft: createTaskInputSchema = { title: "" };

export function AddTaskFormClient() {
  const [taskDraft, setTaskDraft] = useState(() => initialTaskDraft);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const createTask = useCreateTask();

  useEffect(() => {
    if (!date) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTaskDraft({ ...taskDraft, dueDate: date });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <div className="flex-1">
      <form
        className="p-4 border rounded-sm flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          createTask.mutate(taskDraft);

          // reset states
          setTaskDraft(initialTaskDraft);
          setDate(undefined);
        }}
      >
        <div className="flex-1 space-y-8">
          <input
            name="title"
            className="border-b-2"
            type="text"
            placeholder="your task"
            value={taskDraft.title}
            onChange={(e) => {
              setTaskDraft({ ...taskDraft, title: e.target.value });
            }}
          />

          <DatePickerTime date={date} setDate={setDate} />
        </div>

        <Button
          size={"sm"}
          variant={"default"}
          type="submit"
          disabled={createTask.isPending || !taskDraft.title}
        >
          Create
        </Button>
      </form>
      {/* {!state.ok && <p className="text-sm text-red-600">{state.message}</p>} */}
    </div>
  );
}
