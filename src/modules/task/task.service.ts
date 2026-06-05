import { prisma } from "@/lib/prisma";
import { getSessionServer } from "../../features/auth/auth.service";
import {
  createTaskInputSchema,
  TaskSearchParamsSchema,
  UpdateTaskInputSchema,
} from "./task.schema";
import { transformTaskSearchParamsToDB } from "./task.utils";

export const getTasks = async (options?: {
  searchParams?: TaskSearchParamsSchema;
}) => {
  const session = await getSessionServer();
  const userId = session.user.id;

  const findTasksOptions = transformTaskSearchParamsToDB(options?.searchParams);

  return prisma.task.findMany({
    ...findTasksOptions,
    where: { ...findTasksOptions.where, userId },
    orderBy: { dueDate: "asc" },
  });
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
