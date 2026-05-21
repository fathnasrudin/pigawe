import {
  createTaskInputSchema,
  taskSearchParamsSchema,
} from "@/features/task/task.schema";
import { createTask, getTasks } from "@/features/task/task.service";
import { badApiResponse, goodApiResponse } from "@/lib/next-api-response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const data = createTaskInputSchema.parse(body);

    await createTask(data);

    return goodApiResponse({}, { status: 201 });
  } catch (error) {
    return badApiResponse(error);
  }
}
