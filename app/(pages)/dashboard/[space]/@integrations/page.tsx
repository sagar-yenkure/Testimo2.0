import React from "react";
import { IntegrationsView } from "@/components/dashboard/IntegrationsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations | Connect Your Tools",
  description: "Connect Twitter, Google, LinkedIn, and more to automate your social proof.",
};

// Simulated SSR Fetch for connected integrations
async function getIntegrationsData(space: string) {
  return [
    {
      id: "twitter",
      name: "X / Twitter",
      description: "Import testimonials directly from tweets and threads.",
      icon: <div className="w-full h-full bg-[#1DA1F2] rounded-xl flex items-center justify-center text-white font-bold text-lg">X</div>,
      status: "connected",
      count: 12
    },
    {
      id: "google",
      name: "Google Reviews",
      description: "Sync your GMB reviews to your wall automatically.",
      icon: <div className="w-full h-full bg-[#4285F4] rounded-xl flex items-center justify-center text-white font-bold text-lg">G</div>,
      status: "available",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Convert recommendations into social proof.",
      icon: <div className="w-full h-full bg-[#0077B5] rounded-xl flex items-center justify-center text-white font-bold text-lg">L</div>,
      status: "available",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Show off stars and positive issue comments.",
      icon: <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg">G</div>,
      status: "connected",
      count: 45
    },
    {
      id: "slack",
      name: "Slack",
      description: "Collect kudos directly from your team channels.",
      icon: <div className="w-full h-full bg-[#4A154B] rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>,
      status: "available",
    },
    {
      id: "producthunt",
      name: "Product Hunt",
      description: "Import reviews and upvotes from your launches.",
      icon: <div className="w-full h-full bg-[#DA552F] rounded-xl flex items-center justify-center text-white font-bold text-lg">P</div>,
      status: "available",
    }
  ]
}

export default async function IntegrationsPage({ params }: { params: Promise<{ space: string }> }) {
  const { space } = await params;
  const connected = await getIntegrationsData(space);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#09090C] pt-6">
      <IntegrationsView initialConnected={connected} />
    </div>
  );
}
