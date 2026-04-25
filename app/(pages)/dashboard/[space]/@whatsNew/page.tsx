import React from "react";
import { WhatsNewView } from "@/components/dashboard/WhatsNewView";
import { Metadata } from "next";
import { Sparkles, Calendar, ArrowRight, Zap, Target, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "What's New | Product Updates",
  description: "Stay up to date with the latest features and changes in TestimonialPro.",
};

// SSR Fetch for changelog/release notes
async function getChangelog() {
  return {
    updates: [
      {
        date: "April 24, 2026",
        tag: "New Feature",
        title: "Wall of Love 2.0 is here!",
        description: "A completely redesigned widget builder with glassmorphism, masonry layouts, and instant brand color matching.",
        icon: <Sparkles className="text-blue-500" />
      },
      {
        date: "April 18, 2026",
        tag: "Improvement",
        title: "Fast API Integrations",
        description: "Importing testimonials from X (Twitter) and LinkedIn is now 5x faster with our new background sync engine.",
        icon: <Zap className="text-amber-500" />
      },
      {
        date: "April 10, 2026",
        tag: "Beta",
        title: "Video Insights (Beta)",
        description: "Get detailed analytics on how many people are watching your video testimonials and where they drop off.",
        icon: <Target className="text-rose-500" />
      }
    ]
  };
}

export default async function WhatsNewPage() {
  const { updates } = await getChangelog();

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#09090C] pt-6 overflow-y-auto no-scrollbar">
      <WhatsNewView updates={updates} />
    </div>
  );
}
