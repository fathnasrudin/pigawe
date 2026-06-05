"use server";

import { refresh } from "next/cache";
import { createTask, deleteTask, toggleTaskStatus } from "./task.service";
import { createTaskInputSchema } from "./task.schema";
import { ActionResponse } from "@/lib/server-action";

export const createTaskAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> => {
  const body = Object.fromEntries(formData.entries());
  const { success, data, error } = createTaskInputSchema.safeParse(body);

  if (!success) {
    // should handle this kind error later
    console.log(error);
    const errors = error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Validation error",
      type: "validation",
      errors,
    };
  } else {
    await createTask(data);
    refresh();
    return { ok: true };
  }
};

export const deleteTaskAction = async (
  taskId: string,
): Promise<ActionResponse> => {
  try {
    await deleteTask(taskId);
    refresh();
    return { ok: true };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Something went wrong in the server";
    }
    return { ok: false, message };
  }
};

export const toggleTaskStatusAction = async (taskId: string) => {
  try {
    await toggleTaskStatus(taskId);
    refresh();
    return { ok: true };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Something went wrong in the server";
    }
    return { ok: false, message };
  }
};
