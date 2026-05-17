import { ROUTES } from "@/constants/routes";
import { SignupForm } from "@/features/auth/components/signup-form";
import { redirect } from "next/navigation";
import { getSessionOrNull } from "../auth.service";

export async function SignUpPage() {
  const session = await getSessionOrNull();
  if (session) redirect(ROUTES.home.path);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
