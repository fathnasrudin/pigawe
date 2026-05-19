import { prisma } from "@/lib/prisma";
import { ITaskInput } from "./task.type";
import { getSessionServer } from "../auth/auth.service";
import { UpdateTaskInputSchema } from "./task.schema";

export const getTasks = async () => {
  const session = await getSessionServer();
  const userId = session.user.id;

  return prisma.task.findMany({ where: { userId } });
};
export const createTask = async (taskData: ITaskInput) => {
  const session = await getSessionServer();
  const userId = session.user.id;
  await prisma.task.create({
    data: { status: "todo", title: taskData.title, userId },
  });
};

export const deleteTask = async (taskId: string) => {
  const session = await getSessionServer();
  const userId = session.user.id;

  await prisma.task.delete({ where: { id: taskId, userId } });
};

export const toggleTaskStatus = async (taskId: string) => {
  const session = await getSessionServer();
  const userId = session.user.id;

  const task = await prisma.task.findUniqueOrThrow({
    where: { id: taskId, userId },
  });

  const updatedStatus = task.status === "todo" ? "done" : "todo";
  await prisma.task.update({
    where: { id: taskId },
    data: { status: updatedStatus },
  });
};

export const updateTask = async (
  taskId: string,
  data: UpdateTaskInputSchema,
) => {
  const session = await getSessionServer();
  const userId = session.user.id;

  await prisma.task.update({
    where: { id: taskId, userId },
    data,
  });
};
