import { CustomRouteContext, routeWrapper } from "@/lib/next-api-response";
import { createProjectSchema } from "@/modules/project/project.schema";
import {
  createProjectService,
  getDefaultProjectService,
  getProjectByIdService,
  getProjectsService,
} from "@/modules/project/project.service";

export const createProjectRoute = routeWrapper(async (req: Request) => {
  const body = await req.json();

  //validate body
  const dataProject = createProjectSchema.parse(body);

  // create project
  const result = await createProjectService({ data: dataProject });

  // return the created project
  return Response.json({ success: true, data: result });
});

export const getProjectsRoute = routeWrapper(async () => {
  const projects = await getProjectsService();

  return Response.json({
    success: true,
    data: projects,
  });
});

type ProjectParams = { id: string };

export const getProjectByIdRoute = routeWrapper<ProjectParams>(
  async (_req: Request, { params }: CustomRouteContext<ProjectParams>) => {
    const id = (await params).id;
    const project = await getProjectByIdService(id);

    return Response.json({
      success: true,
      data: project,
    });
  },
);

export const getDefaultProjectRoute = routeWrapper(async () => {
  const project = await getDefaultProjectService();

  return Response.json({
    success: true,
    data: project,
  });
});
