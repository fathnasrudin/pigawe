"use server";

import { refresh } from "next/cache";
import { createTask, deleteTask, toggleTaskStatus } from "./task.service";

export const createTaskAction = async (formData: FormData) => {
  const title = formData.get("title") as string;

  await createTask({ title });

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
