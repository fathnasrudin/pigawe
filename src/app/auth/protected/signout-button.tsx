"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignoutButton() {
  return (
    <Button
      variant={"secondary"}
      onClick={async () => {
        await authClient.signOut();
      }}
    >
      Logout
    </Button>
  );
}
