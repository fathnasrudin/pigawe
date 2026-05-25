import z from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
});
export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3).max(100),
  isDefault: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Project = z.infer<typeof projectSchema>;

export const getProjectsSchema = z.array(projectSchema);
