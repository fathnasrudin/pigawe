"use client";

import { AsyncButton } from "@/components/ui/async-button";
import { ROUTES } from "@/constants/routes";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <AsyncButton
      isLoading={isLoading}
      variant={"secondary"}
      onClick={async () => {
        try {
          setIsLoading(true);
          await authClient.signOut();
          router.push(ROUTES.auth.signin.path);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          router.refresh();
        }
      }}
    >
      Logout
    </AsyncButton>
  );
}
