import * as z from "zod";

export const taskSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: z.enum(["todo", "done"]),
  title: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createTaskInputSchema = z.object({
  title: z.string().min(1),
});

export const updateTaskInputSchema = taskSchema
  .pick({
    title: true,
    status: true,
  })
  .partial();

export type createTaskInputSchema = z.infer<typeof createTaskInputSchema>;
export type UpdateTaskInputSchema = z.infer<typeof updateTaskInputSchema>;
export type Task = z.infer<typeof taskSchema>;
