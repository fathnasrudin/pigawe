import { getSessionOrNull } from "@/modules/auth/auth.service";
import { SignoutButton } from "./signout-button";

export default async function ProtectedPage() {
  const session = await getSessionOrNull();
  if (!session) return <p>Not Logged In</p>;

  return (
    <div>
      <p>user: {session.user.email}</p>
      <p>protected page</p>
      <SignoutButton />
    </div>
  );
}
