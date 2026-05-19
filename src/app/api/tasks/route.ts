import { createTaskInputSchema } from "@/features/task/task.schema";
import { createTask, getTasks } from "@/features/task/task.service";
import { badApiResponse, goodApiResponse } from "@/lib/next-api-response";

export async function GET() {
  try {
    const tasks = await getTasks();
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
