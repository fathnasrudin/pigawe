import { createProjectSchema } from "@/modules/project/project.schema";
import {
  createProjectService,
  getDefaultProjectService,
  getProjectByIdService,
  getProjectsService,
} from "@/modules/project/project.service";

export async function createProjectRoute(req: Request) {
  try {
    const body = await req.json();
    console.log({ body });

    //validate body
    const dataProject = createProjectSchema.parse(body);

    // create project
    const result = await createProjectService({ data: dataProject });

    console.log({ routeResult: result });
    // return the created project
    return Response.json({ success: true, data: result });
  } catch (error) {
    // serahin ke error handler
    return Response.json({
      success: false,
      message: "Something wen wrong",
    });
  }
}

export async function getProjectsRoute() {
  const projects = await getProjectsService();

  return Response.json({
    success: true,
    data: projects,
  });
}

export async function getProjectByIdRoute(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const id = (await params).id;
    const project = await getProjectByIdService(id);

    return Response.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function getDefaultProjectRoute() {
  const project = await getDefaultProjectService();

  return Response.json({
    success: true,
    data: project,
  });
}
