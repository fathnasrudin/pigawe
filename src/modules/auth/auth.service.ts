import { ROUTES } from "@/constants/routes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSessionServer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("User session not found");
  return session;
}

export async function getSessionOrNull() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function requireUserInPage() {
  try {
    const session = await getSessionServer();
    return session.user;
  } catch (_error) {
    // console.error(error);
    redirect(ROUTES.auth.signin.path);
  }
}
