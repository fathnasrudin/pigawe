import {
  createTaskInputSchema,
  Task,
  TaskSearchParamsSchema,
  UpdateTaskInputSchema,
} from "./task.schema";

function buildTaskQueryParams(searchParams?: TaskSearchParamsSchema) {
  let query = "";
  if (!searchParams) return query;

  if (searchParams.dueDate) query += `dueDate=${searchParams.dueDate}`;
  return query;
}

export async function fetchTasks(options?: {
  searchParams?: TaskSearchParamsSchema;
}) {
  const query = buildTaskQueryParams(options?.searchParams);
  const path = `/api/tasks${query ? `?${query}` : ""}`;
  const res = await fetch(`${path}`);

  if (!res.ok) {
    const badData = await res.json();
    console.log({ badData });
    throw new Error("Bad Response");
  }
  const data: Task[] = await res.json();
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

  const data: Task[] = await res.json();
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

export async function updateTaskClient({
  taskId,
  data,
}: {
  taskId: Task["id"];
  data: UpdateTaskInputSchema;
}) {
  const path = `/api/tasks/${taskId}`;

  const res = await fetch(`${path}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const badData = await res.json();
    console.log({ badData });
    throw new Error("Bad Response");
  }
  return res.json();
}
