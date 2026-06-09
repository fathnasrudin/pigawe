import {
  createTaskInputSchema,
  taskSearchParamsSchema,
} from "@/modules/task/task.schema";
import { createTask, getTasks } from "@/modules/task/task.service";
import { goodApiResponse, routeWrapper } from "@/lib/next-api-response";
import { NextRequest } from "next/server";
import { Task, updateTaskInputSchema } from "@/modules/task/task.schema";
import { deleteTask, updateTask } from "@/modules/task/task.service";

export const getTasksController = routeWrapper(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const data = Object.fromEntries(searchParams.entries());
  const { data: queryObject } = taskSearchParamsSchema.safeParse(data);
  const tasks = await getTasks({ searchParams: queryObject });

  return goodApiResponse(tasks);
});

export const createTaskController = routeWrapper(async (request: Request) => {
  const body = await request.json();

  const data = createTaskInputSchema.parse(body);

  await createTask(data);

  return goodApiResponse({}, { status: 201 });
});

export const deleteTaskByIdController = routeWrapper(
  async (
    _req: Request,
    { params }: { params: Promise<{ id: Task["id"] }> },
  ) => {
    const id = (await params).id;
    await deleteTask(id);
    return goodApiResponse({});
  },
);

export const updateTaskByIdController = routeWrapper(
  async (
    request: Request,
    { params }: { params: Promise<{ id: Task["id"] }> },
  ) => {
    const id = (await params).id;
    const body = await request.json();
    const data = updateTaskInputSchema.parse(body);

    await updateTask(id, data);
    return goodApiResponse({});
  },
);
