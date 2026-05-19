import { Task, updateTaskInputSchema } from "@/features/task/task.schema";
import { deleteTask, updateTask } from "@/features/task/task.service";
import { badApiResponse, goodApiResponse } from "@/lib/next-api-response";

export async function DELETE(
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

export async function PUT(
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
