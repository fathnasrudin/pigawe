import { createProjectSchema } from "@/modules/project/project.schema";
import { createProjectService } from "@/modules/project/project.service";

export async function POST(req: Request) {
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
