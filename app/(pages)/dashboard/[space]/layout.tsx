import React from "react";
import LayoutShell from "@/components/dashboard/LayoutShell";
import ClientViewSwitcher from "@/components/dashboard/ClientViewSwitcher";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ space: string }> }): Promise<Metadata> {
  const { space } = await params;
  const name = space.replace(/-/g, ' ');
  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} | Dashboard`,
    description: `Manage and analyze testimonials for ${name}. View inbox, wall of love, and more.`,
  };
}

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
