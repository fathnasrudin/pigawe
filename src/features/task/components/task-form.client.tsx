"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCreateTask } from "./task.hook";
import { DatePickerTime } from "@/components/date-picker-time";
import { createTaskInputSchema } from "../task.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchProjects } from "@/modules/project/project.hook";

const initialTaskDraft: createTaskInputSchema = { title: "", projectId: "" };

export function TaskFormClient({
  initialValues = initialTaskDraft,
}: {
  initialValues: createTaskInputSchema;
}) {
  const [taskDraft, setTaskDraft] = useState(() => initialValues);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const createTask = useCreateTask();
  const fetchProjects = useFetchProjects();

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

          {/* Select Project */}
          <Select
            name="projectId"
            onValueChange={(value) =>
              setTaskDraft({ ...taskDraft, projectId: value })
            }
            value={taskDraft.projectId}
          >
            <SelectTrigger className="w-80">
              <SelectValue placeholder="select project" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Projects</SelectLabel>
                {fetchProjects.data?.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          size={"sm"}
          variant={"default"}
          type="submit"
          disabled={createTask.isPending || !taskDraft.title}
        >
          {initialValues.title ? "Edit" : "Create"}
        </Button>
      </form>
      {/* {!state.ok && <p className="text-sm text-red-600">{state.message}</p>} */}
    </div>
  );
}
