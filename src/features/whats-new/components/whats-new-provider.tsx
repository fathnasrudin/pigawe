"use client";

import { useEffect, useState } from "react";

import { APP_VERSION } from "@/lib/version";
import { CHANGELOG } from "@/lib/changelog";

import { WhatsNewModal } from "./whats-new-modal";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const STORAGE_KEY = "seen-version";

export function WhatsNewProvider() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPath = pathname.startsWith(ROUTES.auth.path);

  useEffect(() => {
    const seenVersion = localStorage.getItem(STORAGE_KEY);

    if (seenVersion !== APP_VERSION && !isAuthPath) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);

      localStorage.setItem(STORAGE_KEY, APP_VERSION);
    }
  }, [isAuthPath]);

  const latest = CHANGELOG[0];

  return (
    <WhatsNewModal
      open={open}
      onOpenChange={setOpen}
      version={latest.version}
      title={latest.title}
      changes={latest.changes}
    />
  );
}
