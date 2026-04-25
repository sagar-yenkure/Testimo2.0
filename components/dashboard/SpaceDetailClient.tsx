"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Heart, Plus, LayoutGrid, AlignJustify, Menu, Layers, Link as LinkIcon, Check, MessageSquareText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Extracted Components
import { DetailSidebar } from "@/components/dashboard/DetailSidebar";
import { toast } from "sonner";
import { SPACE_DETAIL_TABS } from "@/constants";
import { Testimonial, ViewMode } from "@/types";
import BreadcrumbNav from "@/components/breadrcrumb";
import { useSearchParams } from "next/navigation";

interface SpaceDetailClientProps {
    initialCards?: Testimonial[];
    initialView?: string;
    spaceProp?: string;
    children?: React.ReactNode;
    slots?: {
        inbox: React.ReactNode;
        wallOfLove: React.ReactNode;
        integrations: React.ReactNode;
        help: React.ReactNode;
        whatsNew: React.ReactNode;
    };
}

export default function SpaceDetailClient({
    spaceProp,
    slots,
    children
}: SpaceDetailClientProps) {
    const params = useParams();
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "inbox";
    const space = spaceProp || params.space;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        toast.success("Link Copied!", { description: "The public link has been safely copied to your clipboard." });
        setTimeout(() => setIsCopied(false), 3000);
    };

    const spaceName = typeof space === 'string' ? space.replace(/-/g, ' ') : 'Space';

    return (
        <div className="flex font-sans h-screen w-screen overflow-hidden transition-colors duration-300 relative bg-slate-50 dark:bg-[#09090C]">
            <DetailSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto relative h-full min-w-0 transition-colors duration-300 no-scrollbar">
                <div className="sticky top-0 z-40 px-6 shrink-0 pt-4 pb-2 bg-slate-50/70 dark:bg-[#09090C]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5">
                    <div className="pt-2">
                        <BreadcrumbNav items={[{ label: spaceName }]} />
                    </div>

                    {/* Mobile Top Bar */}
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
                        >
                            {isCopied ? <Check size={14} /> : <LinkIcon size={14} />}
                            {isCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    {currentView === "inbox" ? slots?.inbox :
                        currentView === "wall-of-love" ? slots?.wallOfLove :
                            currentView === "integrations" ? slots?.integrations :
                                currentView === "help" ? slots?.help :
                                    currentView === "whats-new" ? slots?.whatsNew :
                                        slots?.inbox}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
}
