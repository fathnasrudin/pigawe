import { getSessionServer } from "@/features/auth/auth.service";

export default async function ProtectedPage() {
  const session = await getSessionServer();
  if (!session) return <p>Not Logged In</p>;

  return (
    <div>
      <p>user: {session.user.email}</p>
      <p>protected page</p>
    </div>
  );
}
