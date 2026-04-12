"use client";

import { useState } from "react";
import {
    Heart, Plus, LayoutGrid, AlignJustify, Menu, Layers, Link as LinkIcon, Check, MessageSquareText
} from "lucide-react";

// Extracted Components
import { DetailSidebar } from "@/components/dashboard/DetailSidebar";
import { TestimonialCard } from "@/components/dashboard/TestimonialCard";
import { DetailStatsBar } from "@/components/dashboard/DetailStatsBar";
import { SPACE_DETAIL_TABS } from "@/constants";
import { Testimonial, ViewMode } from "@/types";
import { EmptyState } from "./EmptyState";

interface SpaceDetailClientProps {
    initialCards: Testimonial[];
}

export default function SpaceDetailClient({ initialCards }: SpaceDetailClientProps) {
    const [activeTab, setActiveTab] = useState("All");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        // navigator.clipboard.writeText('...'); // actual copy logic would go here
        setTimeout(() => setIsCopied(false), 3000);
    };

    return (
        <div className="flex h-screen font-sans overflow-hidden transition-colors duration-300 relative">
            <DetailSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 flex flex-col relative h-full min-w-0 transition-colors duration-300">
                <div className="px-6 shrink-0 py-2 z-20">
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
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-5 py-2 rounded-full text-[12px] font-semibold transition-all flex items-center gap-1.5 ${isActive
                                                ? 'bg-blue-600 dark:bg-[#6C85FF] text-white shadow-[0_2px_10px_rgba(37,99,235,0.3)] dark:shadow-[0_2px_10px_rgba(108,133,255,0.3)]'
                                                : 'bg-white dark:bg-[#18181D] hover:bg-slate-100 dark:hover:bg-[#202025] text-slate-600 dark:text-[#82828C] border border-slate-200 dark:border-[#222228]'
                                                }`}
                                        >
                                            <Heart className={`w-3.5 h-3.5 ${isActive ? 'fill-white' : 'text-slate-400 dark:text-[#82828C]'}`} /> Liked
                                        </button>
                                    )
                                }
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-5 py-2 rounded-full text-[12px] font-semibold transition-all ${isActive
                                            ? 'bg-blue-600 dark:bg-[#6C85FF] text-white shadow-[0_2px_10px_rgba(37,99,235,0.3)] dark:shadow-[0_2px_10px_rgba(108,133,255,0.3)]'
                                            : 'bg-white dark:bg-[#18181D] hover:bg-slate-100 dark:hover:bg-[#202025] text-slate-600 dark:text-[#82828C] border border-slate-200 dark:border-[#222228]'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="hidden md:flex bg-white dark:bg-[#131316] rounded-xl p-1 mb-1 border border-slate-200 dark:border-[#1F1F24] shrink-0 ml-4 shadow-sm dark:shadow-none">
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

                <div className="flex-1 overflow-y-auto px-6 pb-32">
                    {initialCards.length > 0 ? (
                        viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {[0, 1, 2].map((colIndex) => (
                                    <div key={colIndex} className="flex flex-col gap-3">
                                        {initialCards
                                            .filter((_, index) => index % 3 === colIndex)
                                            .map((card) => (
                                                <TestimonialCard key={card.id} data={card} />
                                            ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5 max-w-3xl mx-auto w-full transition-all duration-300">
                                {initialCards.map(card => (
                                    <TestimonialCard key={card.id} data={card} />
                                ))}
                            </div>
                        )
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

                <button className="fixed bottom-10 right-10 w-[60px] h-[60px] rounded-full bg-slate-900 dark:bg-black hover:bg-black dark:hover:bg-slate-900 flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_15px_40px_rgba(37,99,235,0.2)] border border-white/10 transition-all hover:scale-110 active:scale-95 z-50 group">
                    <Plus className="w-7 h-7 text-blue-600 dark:text-[#6C85FF] transition-transform group-hover:rotate-90 duration-300" />
                </button>
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
