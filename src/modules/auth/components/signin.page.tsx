import { SignInForm } from "@/modules/auth/components/signin-form";
import { getSessionOrNull } from "../auth.service";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export async function SignInPage() {
  const session = await getSessionOrNull();
  if (session) redirect(ROUTES.home.path);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
