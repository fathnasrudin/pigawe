import { getTasks } from "@/features/task/task.service";

export async function GET() {
  const tasks = await getTasks();
  return Response.json(tasks);
}
