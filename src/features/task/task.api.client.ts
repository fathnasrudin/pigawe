import { createTaskInputSchema } from "./task.schema";
import { ITask } from "./task.type";

export async function fetchTasks() {
  const BASE = "http://localhost:3000";
  const path = "/api/tasks";
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const badData = await res.json();
    console.log({ badData });
    throw new Error("Bad Response");
  }
  const data: ITask[] = await res.json();
  return data;
}

export async function createTaskClient(taskData: createTaskInputSchema) {
  const BASE = "http://localhost:3000";
  const path = "/api/tasks";
  const res = await fetch(`${BASE}${path}`, {
    body: JSON.stringify(taskData),
    method: "post",
  });

  if (!res.ok) {
    const badData = await res.json();
    console.log({ badData });
    throw new Error("Bad Response");
  }

  const data: ITask[] = await res.json();
  return data;
}
