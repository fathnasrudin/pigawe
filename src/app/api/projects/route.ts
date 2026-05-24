export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });

  //validate body

  // create project

  // return the created project
  return Response.json({ success: true });
}
