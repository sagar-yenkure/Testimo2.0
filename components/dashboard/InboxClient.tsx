"use client";

import React, { useState } from "react";
import { LayoutGrid, AlignJustify, MessageSquareText, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DetailStatsBar } from "@/components/dashboard/DetailStatsBar";
import { TestimonialCard } from "@/components/dashboard/TestimonialCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { toast } from "sonner";
import { SPACE_DETAIL_TABS } from "@/constants";
import { Testimonial, ViewMode } from "@/types";

interface InboxClientProps {
  initialTestimonials: Testimonial[];
}

export default function InboxClient({ initialTestimonials }: InboxClientProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const handleCopy = () => {
    toast.success("Link Copied!", { description: "The public link has been safely copied to your clipboard." });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#09090C]">
        <div className="sticky top-0 z-40 px-6 pt-4 pb-2 bg-slate-50/70 dark:bg-[#09090C]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5">
            <DetailStatsBar />
            
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    {SPACE_DETAIL_TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-5 py-2 rounded-full text-[12px] font-semibold transition-colors ${isActive ? 'text-white' : 'text-slate-600 dark:text-[#82828C] border border-slate-200 dark:border-[#222228]'}`}
                            >
                                {isActive && (
                                    <motion.div layoutId="activeTabPill" className="absolute inset-0 bg-blue-600 dark:bg-[#6C85FF] rounded-full z-0" />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="hidden md:flex bg-white/50 dark:bg-[#131316]/80 rounded-xl p-1 border border-slate-200 dark:border-[#1F1F24] shrink-0 ml-4">
                    <button onClick={() => setViewMode("grid")} className={`rounded-lg p-1.5 ${viewMode === "grid" ? "bg-slate-100 dark:bg-[#222228] text-blue-600 dark:text-white" : "text-slate-400"}`}>
                        <LayoutGrid size={18} />
                    </button>
                    <button onClick={() => setViewMode("list")} className={`rounded-lg p-1.5 ${viewMode === "list" ? "bg-slate-100 dark:bg-[#222228] text-blue-600 dark:text-white" : "text-slate-400"}`}>
                        <AlignJustify size={18} />
                    </button>
                </div>
            </div>
        </div>

        <div className="flex-1 px-6 pb-32 pt-6">
            {initialTestimonials.length > 0 ? (
                <motion.div layout className={viewMode === "grid" ? "columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4" : "flex flex-col gap-5 max-w-3xl mx-auto w-full"}>
                    <AnimatePresence mode="popLayout">
                        {initialTestimonials.map(card => (
                            <motion.div layout key={card.id} className={viewMode === "grid" ? "break-inside-avoid" : ""}>
                                <TestimonialCard data={card} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <EmptyState icon={MessageSquareText} title="No testimonials yet" description="Share your public link to start collecting reviews." onAction={handleCopy} />
            )}
        </div>

        <MagneticButton className="fixed bottom-10 right-10 z-50">
            <button className="w-[60px] h-[60px] rounded-full bg-slate-900 flex items-center justify-center shadow-2xl border border-white/10 text-white">
                <Plus size={28} />
            </button>
        </MagneticButton>
    </div>
  );
}
