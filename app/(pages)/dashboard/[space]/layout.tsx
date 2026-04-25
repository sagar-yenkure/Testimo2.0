import React from "react";

import ClientViewSwitcher from "./ClientViewSwitcher";
import LayoutShell from "./LayoutShell";

export default async function SpaceDetailLayout({
  inbox,
  wallOfLove,
  integrations,
  help,
  whatsNew,
  params,
}: {
  children: React.ReactNode;
  inbox: React.ReactNode;
  wallOfLove: React.ReactNode;
  integrations: React.ReactNode;
  help: React.ReactNode;
  whatsNew: React.ReactNode;
  params: Promise<{ space: string }>;
}) {
  const { space } = await params;
  const spaceName = space.replace(/-/g, ' ');

  return (
    <LayoutShell spaceName={spaceName}>
      <ClientViewSwitcher
        slots={{
          inbox,
          wallOfLove,
          integrations,
          help,
          whatsNew
        }}
      />
    </LayoutShell>
  );
}
