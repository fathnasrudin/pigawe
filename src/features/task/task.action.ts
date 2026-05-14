"use server";

import { refresh } from "next/cache";
import { createTask } from "./task.service";

export const createTaskAction = async (formData: FormData) => {
  const title = formData.get("title") as string;

  await createTask({ title });

  refresh();
};
