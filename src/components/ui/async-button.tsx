"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = React.ComponentProps<typeof Button> & {
  isLoading: boolean;
  loadingText?: string;
};

export function AsyncButton({
  children,
  isLoading,
  loadingText = "Loading...",
  disabled,
  ...props
}: Props) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

      {isLoading ? loadingText : children}
    </Button>
  );
}
