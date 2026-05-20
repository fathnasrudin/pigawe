import { prisma } from "@/lib/prisma";
import { getSessionServer } from "../auth/auth.service";
import { createTaskInputSchema, UpdateTaskInputSchema } from "./task.schema";

export const getTasks = async () => {
  const session = await getSessionServer();
  const userId = session.user.id;

  return prisma.task.findMany({ where: { userId } });
};

export const createTask = async (taskData: createTaskInputSchema) => {
  const session = await getSessionServer();
  const userId = session.user.id;

  const createdTask = await prisma.task.create({
    data: {
      ...taskData,
      status: "todo",
      userId,
    },
  });
  console.log({ serviceTaskData: taskData, createdTask });
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
