"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

interface ClientViewSwitcherProps {
  slots: {
    inbox: React.ReactNode;
    wallOfLove: React.ReactNode;
    integrations: React.ReactNode;
    help: React.ReactNode;
    whatsNew: React.ReactNode;
  };
}

export default function ClientViewSwitcher({ slots }: ClientViewSwitcherProps) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "inbox";

  const viewMap: Record<string, React.ReactNode> = {
    inbox: slots.inbox,
    "wall-of-love": slots.wallOfLove,
    integrations: slots.integrations,
    help: slots.help,
    "whats-new": slots.whatsNew,
  };

  return (
    <div className="h-full w-full">
      {viewMap[view] || slots.inbox}
    </div>
  );
}
