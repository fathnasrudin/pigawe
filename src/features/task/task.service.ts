import { prisma } from "@/lib/prisma";
import { ITaskInput } from "./task.type";

export const getTasks = async () => prisma.task.findMany();

export const createTask = async (taskData: ITaskInput) => {
  await prisma.task.create({ data: { status: "todo", title: taskData.title } });
};

export const deleteTask = async (taskId: string) => {
  await prisma.task.delete({ where: { id: taskId } });
};

export const toggleTaskStatus = async (taskId: string) => {
  const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });
  const updatedStatus = task.status === "todo" ? "done" : "todo";
  await prisma.task.update({
    where: { id: taskId },
    data: { status: updatedStatus },
  });
};
