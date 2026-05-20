"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCreateTask } from "./task.hook";
import { DatePickerTime } from "@/components/date-picker-time";

const initialTaskDraft = { title: "" };

export function AddTaskFormClient() {
  const [taskDraft, setTaskDraft] = useState(() => initialTaskDraft);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const createTask = useCreateTask();

  useEffect(() => {
    console.log({ date });
  }, [date]);

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
        <div className="flex-1">
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
          disabled={createTask.isPending}
        >
          Create
        </Button>
      </form>
      {/* {!state.ok && <p className="text-sm text-red-600">{state.message}</p>} */}
    </div>
  );
}
