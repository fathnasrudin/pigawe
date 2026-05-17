"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignoutButton() {
  const router = useRouter();
  return (
    <Button
      variant={"secondary"}
      onClick={async () => {
        await authClient.signOut();
        router.refresh();
      }}
    >
      Logout
    </Button>
  );
}
