"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Heart, Plus, LayoutGrid, AlignJustify, Menu, Layers, Link as LinkIcon, Check, MessageSquareText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Extracted Components
import { DetailSidebar } from "@/components/dashboard/DetailSidebar";
import { TestimonialCard } from "@/components/dashboard/TestimonialCard";
import { DetailStatsBar } from "@/components/dashboard/DetailStatsBar";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SPACE_DETAIL_TABS } from "@/constants";
import { Testimonial, ViewMode } from "@/types";
import { EmptyState } from "./EmptyState";
import BreadcrumbNav from "@/components/breadrcrumb";

interface SpaceDetailClientProps {
    initialCards: Testimonial[];
}

export default function SpaceDetailClient({ initialCards }: SpaceDetailClientProps) {
    const { space } = useParams();
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get("status");
        if (status) {
            const matched = SPACE_DETAIL_TABS.find(t => t.toLowerCase() === status.toLowerCase());
            if (matched) setActiveTab(matched);
        }
    }, []);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set("status", tab.toLowerCase());
        window.history.replaceState(null, '', `?${params.toString()}`);
    };
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        // navigator.clipboard.writeText('...'); // actual copy logic would go here
        setTimeout(() => setIsCopied(false), 3000);
    };

    const spaceName = typeof space === 'string' ? space.replace(/-/g, ' ') : 'Space';

    return (
        <div className="flex font-sans overflow-hidden transition-colors duration-300 relative">
            <DetailSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto relative h-full min-w-0 transition-colors duration-300 no-scrollbar">
                <div className="sticky top-0 z-40 px-6 shrink-0 pt-4 pb-2 bg-slate-50/70 dark:bg-[#09090C]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-sm dark:shadow-none">
                    <div className="pt-2">
                        <BreadcrumbNav items={[{ label: spaceName }]} />
                    </div>

                    {/* Mobile Top Bar (Placed after stats) */}
                    <div className="lg:hidden flex items-center justify-between py-4 border-y border-slate-200 dark:border-[#1F1F24] bg-transparent shrink-0 mb-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-[#82828C] border border-slate-100 dark:border-white/5 transition-all active:scale-95 cursor-pointer"
                        >
                            <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
                        </button>

                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer text-[13px] font-bold shadow-sm border h-11 ${isCopied
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-[#65E3AD] border-emerald-200 dark:border-emerald-500/20'
                                : 'bg-slate-100 dark:bg-[#1A1A20] border-slate-200 dark:border-[#2A2A35] text-slate-800 dark:text-white hover:border-slate-300 dark:hover:border-[#3A3A45] hover:bg-white dark:hover:bg-[#202028]'
                                }`}
                            title="Copy Public Link"
                        >
                            {isCopied ? (
                                <Check className="w-3.5 h-3.5 animate-in zoom-in duration-300" />
                            ) : (
                                <LinkIcon className="w-3.5 h-3.5" />
                            )}
                            {isCopied ? 'Copied to Clipboard!' : 'Copy Public Link'}
                        </button>
                    </div>

                    <DetailStatsBar />

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                            {SPACE_DETAIL_TABS.map((tab) => {
                                const isActive = activeTab === tab;
                                if (tab === "Liked") {
                                    return (
                                        <button
                                            key={tab}
                                            onClick={() => handleTabClick(tab)}
                                            className={`relative px-5 py-2 rounded-full text-[12px] font-semibold transition-colors flex items-center gap-1.5 ${isActive
                                                ? 'text-white'
                                                : 'bg-white/50 dark:bg-[#18181D]/50 hover:bg-slate-100 dark:hover:bg-[#202025] text-slate-600 dark:text-[#82828C] border border-slate-200 dark:border-[#222228]'
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTabPill"
                                                    className="absolute inset-0 bg-blue-600 dark:bg-[#6C85FF] rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)] dark:shadow-[0_2px_10px_rgba(108,133,255,0.3)] z-0"
                                                    transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
                                                />
                                            )}
                                            <span className="relative z-10 flex items-center gap-1.5">
                                                <Heart className={`w-3.5 h-3.5 ${isActive ? 'fill-white text-white' : 'text-slate-400 dark:text-[#82828C]'}`} /> 
                                                Liked
                                            </span>
                                        </button>
                                    )
                                }
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => handleTabClick(tab)}
                                        className={`relative px-5 py-2 rounded-full text-[12px] font-semibold transition-colors ${isActive
                                            ? 'text-white'
                                            : 'bg-white/50 dark:bg-[#18181D]/50 hover:bg-slate-100 dark:hover:bg-[#202025] text-slate-600 dark:text-[#82828C] border border-slate-200 dark:border-[#222228]'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabPill"
                                                className="absolute inset-0 bg-blue-600 dark:bg-[#6C85FF] rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)] dark:shadow-[0_2px_10px_rgba(108,133,255,0.3)] z-0"
                                                transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab}</span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="hidden md:flex bg-white/50 dark:bg-[#131316]/80 rounded-xl p-1 mb-1 border border-slate-200 dark:border-[#1F1F24] shrink-0 ml-4 shadow-sm dark:shadow-none">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`rounded-lg p-1.5 transition-all ${viewMode === "grid" ? "bg-slate-100 dark:bg-[#222228] text-blue-600 dark:text-white shadow-sm" : "text-slate-400 dark:text-[#6A6A75] hover:text-slate-900 dark:hover:text-white"}`}
                            >
                                <LayoutGrid className="w-[18px] h-[18px]" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`rounded-lg p-1.5 transition-all ${viewMode === "list" ? "bg-slate-100 dark:bg-[#222228] text-blue-600 dark:text-white shadow-sm" : "text-slate-400 dark:text-[#6A6A75] hover:text-slate-900 dark:hover:text-white"}`}
                            >
                                <AlignJustify className="w-[18px] h-[18px]" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-32 pt-6">
                    {initialCards.length > 0 ? (
                        <motion.div 
                            layout
                            className={
                                viewMode === "grid" 
                                    ? "columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4" 
                                    : "flex flex-col gap-5 max-w-3xl mx-auto w-full"
                            }
                        >
                            <AnimatePresence mode="popLayout">
                                {initialCards.map(card => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ 
                                            layout: { type: "spring", bounce: 0, duration: 0.4 },
                                            opacity: { duration: 0.2 }
                                        }}
                                        key={card.id} 
                                        className={viewMode === "grid" ? "break-inside-avoid" : ""}
                                    >
                                        <TestimonialCard data={card} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <EmptyState
                            icon={MessageSquareText}
                            title="No testimonials yet"
                            description="This space is ready for feedback! Share your public link to start collecting heartfelt reviews from your customers."
                            actionLabel="Copy Public Link"
                            onAction={handleCopy}
                            className="max-w-3xl mx-auto border-0 bg-transparent dark:bg-transparent"
                        />
                    )}
                </div>

                <MagneticButton className="fixed bottom-10 right-10 z-50">
                    <button className="w-[60px] h-[60px] rounded-full bg-slate-900 dark:bg-black hover:bg-black dark:hover:bg-slate-900 flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_15px_40px_rgba(37,99,235,0.2)] border border-white/10 transition-colors active:scale-95 group">
                        <Plus className="w-7 h-7 text-blue-600 dark:text-[#6C85FF] transition-transform group-hover:rotate-90 duration-300" />
                    </button>
                </MagneticButton>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
}
