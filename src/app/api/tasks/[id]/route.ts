import { Task } from "@/features/task/task.schema";
import { deleteTask } from "@/features/task/task.service";
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
