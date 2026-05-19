import * as z from "zod";

export const createTaskInputSchema = z.object({
  title: z.string().min(1),
});

export type createTaskInputSchema = z.infer<typeof createTaskInputSchema>;
