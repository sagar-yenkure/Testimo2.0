import React from "react";
import { HelpCenterView } from "@/components/dashboard/HelpCenterView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | Support & FAQ",
  description: "Find answers to your questions and learn how to master social proof.",
};

export default async function HelpPage() {
  // SSR Fetch for helpful articles or FAQ data would go here

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#09090C] pt-6 overflow-y-auto no-scrollbar">
      <HelpCenterView />
    </div>
  );
}
