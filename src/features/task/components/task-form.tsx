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

export function TaskForm({
  initialValues = initialTaskDraft,
}: {
  initialValues?: createTaskInputSchema;
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
    <form
      className="flex-1 p-2 border rounded-sm flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();

        createTask.mutate(taskDraft);

        // reset states
        setTaskDraft(initialValues);
        setDate(undefined);
      }}
    >
      <div className="flex-1">
        {/* Task Title Input */}
        <input
          name="title"
          className="font-bold w-full"
          type="text"
          placeholder="your task"
          value={taskDraft.title}
          onChange={(e) => {
            setTaskDraft({ ...taskDraft, title: e.target.value });
          }}
        />

        <DatePickerTime date={date} setDate={setDate} />
      </div>

      {/* footer */}
      <div className="flex gap-4">
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

        <Button
          className="ml-auto"
          size={"sm"}
          variant={"default"}
          type="submit"
          disabled={createTask.isPending || !taskDraft.title}
        >
          {initialValues.title ? "Edit" : "Create"}
        </Button>
      </div>
    </form>
  );
}
