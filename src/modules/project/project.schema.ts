import z from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
});
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
