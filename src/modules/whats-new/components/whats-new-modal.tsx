"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  version: string;
  title: string;
  changes: string[];
};

export function WhatsNewModal({
  open,
  onOpenChange,
  version,
  title,
  changes,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>✨ What&apos;s New in v{version}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="font-medium">{title}</p>

          <ul className="list-disc pl-5 space-y-2">
            {changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
