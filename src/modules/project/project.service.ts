import { getSessionServer } from "@/modules/auth/auth.service";
import { CreateProjectInput } from "./project.schema";
import { prisma } from "@/lib/prisma";

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
    ...data,
    userId,
  };
}

export async function createProjectService({
  data,
}: {
  data: CreateProjectInput;
}) {
  const { user } = await getSessionServer();
  // call business validation
  const newProject = createProjectDomain({ data, userId: user.id });

  // save to db
  const createdProject = await prisma.project.create({ data: newProject });

  //   return to user
  return createdProject;
}

async function initiateDefaultProjectMigration() {
  const { user } = await getSessionServer();
  // create default project
  console.log("creating default project...");
  const inbox = await createDefaultProject();
  console.log("default project created");

  // add initial tasks (for demo)

  // find user tasks that projectId is null
  console.log("Update all user tasks to have projectId");
  await prisma.task.updateMany({
    data: { projectId: inbox.id },
    where: {
      userId: user.id,
      projectId: null,
    },
  });

  return inbox;
}

async function createDefaultProject() {
  const { user } = await getSessionServer();

  // create default project
  const newDefaultProject = await prisma.project.create({
    data: {
      title: "Inbox",
      isDefault: true,
      userId: user.id,
    },
  });

  // add initial tasks if needed

  // add other tasks that not have project to default project

  return newDefaultProject;
}

export async function getDefaultProjectService() {
  const { user } = await getSessionServer();

  const existDefaultProject = await prisma.project.findFirst({
    where: { userId: user.id, isDefault: true },
  });

  if (existDefaultProject) return existDefaultProject;

  // if default project not found, create default project
  return initiateDefaultProjectMigration();
}

export async function getProjectsService() {
  const { user } = await getSessionServer();

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
  });

  return projects;
}

export async function getProjectByIdService(projectId: string) {
  const { user } = await getSessionServer();
  return prisma.project.findUnique({
    where: { id: projectId, userId: user.id },
  });
}
