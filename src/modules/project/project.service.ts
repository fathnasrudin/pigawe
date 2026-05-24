import { requireUser } from "@/features/auth/auth.service";
import { CreateProjectInput } from "./project.schema";

export function createProjectDomain({
  data,
  userId,
}: {
  data: CreateProjectInput;
  userId: string;
}) {
  // if user is in basic plan and user project is GTE 5. Throw error limit reached

  return {
    // id: rightnow, id created in prisma or db
    id: crypto.randomUUID(),
    ...data,
    userId,
  };
}

export async function createProjectService({
  data,
}: {
  data: CreateProjectInput;
}) {
  const user = await requireUser();
  // call business validation
  const newProject = createProjectDomain({ data, userId: user.id });

  // save to db

  //   return to user
  return newProject;
}
