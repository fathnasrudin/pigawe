"use server";

import { refresh } from "next/cache";
import { createTask, deleteTask, toggleTaskStatus } from "./task.service";
import { createTaskInputSchema } from "./task.schema";

export const createTaskAction = async (formData: FormData) => {
  const body = Object.fromEntries(formData.entries());
  const { success, data, error } = createTaskInputSchema.safeParse(body);

  if (!success) {
    // should handle this kind error later
    console.log(error);
  } else {
    await createTask(data);
  }

  refresh();
};

export const deleteTaskAction = async (taskId: string) => {
  await deleteTask(taskId);

  refresh();
};

export const toggleTaskStatusAction = async (taskId: string) => {
  await toggleTaskStatus(taskId);

  refresh();
};
