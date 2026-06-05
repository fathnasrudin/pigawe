import {
  createTaskInputSchema,
  taskSearchParamsSchema,
} from "@/modules/task/task.schema";
import { createTask, getTasks } from "@/modules/task/task.service";
import { badApiResponse, goodApiResponse } from "@/lib/next-api-response";
import { NextRequest } from "next/server";
import { Task, updateTaskInputSchema } from "@/modules/task/task.schema";
import { deleteTask, updateTask } from "@/modules/task/task.service";

export async function getTasksController(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const data = Object.fromEntries(searchParams.entries());
    const { data: queryObject } = taskSearchParamsSchema.safeParse(data);
    const tasks = await getTasks({ searchParams: queryObject });

    return goodApiResponse(tasks);
  } catch (error) {
    return badApiResponse(error);
  }
}

export async function createTaskController(request: Request) {
  const body = await request.json();

  try {
    const data = createTaskInputSchema.parse(body);

    await createTask(data);

    return goodApiResponse({}, { status: 201 });
  } catch (error) {
    return badApiResponse(error);
  }
}

export async function deleteTaskByIdController(
  _req: Request,
  { params }: { params: Promise<{ id: Task["id"] }> },
) {
  try {
    const id = (await params).id;
    await deleteTask(id);
    return goodApiResponse({});
  } catch (error) {
    return badApiResponse(error);
  }
}

export async function updateTaskByIdController(
  request: Request,
  { params }: { params: Promise<{ id: Task["id"] }> },
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const data = updateTaskInputSchema.parse(body);

    await updateTask(id, data);
    return goodApiResponse({});
  } catch (error) {
    return badApiResponse(error);
  }
}
