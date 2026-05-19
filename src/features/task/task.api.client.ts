import { createTaskInputSchema, Task } from "./task.schema";
import { ITask } from "./task.type";

export async function fetchTasks() {
  const path = "/api/tasks";
  const res = await fetch(`${path}`);
  if (!res.ok) {
    const badData = await res.json();
    console.log({ badData });
    throw new Error("Bad Response");
  }
  const data: ITask[] = await res.json();
  return data;
}

export async function createTaskClient(taskData: createTaskInputSchema) {
  const path = "/api/tasks";
  const res = await fetch(`${path}`, {
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

export async function deleteTaskClient(taskId: Task["id"]) {
  const path = `/api/tasks/${taskId}`;
  const res = await fetch(`${path}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const badData = await res.json();
    console.log({ badData });
    throw new Error("Bad Response");
  }

  return res.json();
}
