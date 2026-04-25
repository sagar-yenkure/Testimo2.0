"use client";

import { useState } from "react";
import { Layers, ChevronDown, Plus, Monitor, LayoutGrid, Sparkles, HelpCircle, Star, LogOut, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SIDEBAR_SPACES } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

interface DetailSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const DetailSidebar = ({ isOpen, onClose }: DetailSidebarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeSpace, setActiveSpace] = useState(SIDEBAR_SPACES[0]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <aside className={`
                fixed lg:relative inset-y-0 left-0 w-[300px] lg:w-[250px] bg-white dark:bg-[#09090C] border-r border-slate-200 dark:border-[#1F1F24] flex flex-col h-full shrink-0 z-[70] lg:z-20 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="relative px-6 pt-3 pb-2">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between w-full p-2 rounded-xl bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative z-20 group"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 shrink-0 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-[#2A2A33] dark:to-[#1A1A22] rounded-lg flex items-center justify-center shadow-inner border border-black/5 dark:border-white/5">
                                <span className="text-[11px] font-black text-slate-700 dark:text-white uppercase tracking-wider">
                                    {activeSpace.label.substring(0, 2)}
                                </span>
                            </div>
                            <div className="text-left min-w-0 flex flex-col justify-center">
                                <div className="text-slate-900 dark:text-white font-bold text-[14px] truncate">{activeSpace.label}</div>
                            </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 dark:text-[#666] transition-transform duration-300 group-hover:text-slate-900 dark:group-hover:text-white ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-30 opacity-0 pointer-events-auto"
                                    onClick={() => setIsDropdownOpen(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    style={{ originY: 0 }}
                                    className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] z-40 overflow-hidden flex flex-col"
                                >
                                    <div className="p-2 flex flex-col gap-1 max-h-[200px] overflow-y-auto no-scrollbar">
                                        {SIDEBAR_SPACES.map(space => (
                                            <button
                                                key={space.value}
                                                onClick={() => { setActiveSpace(space); setIsDropdownOpen(false); }}
                                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[13px] font-semibold transition-colors ${activeSpace.value === space.value
                                                    ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white'
                                                    : 'text-slate-600 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${activeSpace.value === space.value ? 'bg-blue-600 dark:bg-[#6C85FF]' : 'bg-slate-100 dark:bg-white/5'}`}>
                                                    <Layers className={`w-3 h-3 ${activeSpace.value === space.value ? 'text-white' : 'text-slate-400 dark:text-[#82828C]'}`} />
                                                </div>
                                                <span className="truncate">{space.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="p-2 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent">
                                        <MagneticButton intensity={0.15}>
                                            <button
                                                onClick={() => router.push("/dashboard/create")}
                                                className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-left text-[13px] font-semibold text-blue-600 dark:text-[#8CB4FC] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                            >
                                                <Plus className="w-4 h-4" /> Create new space
                                            </button>
                                        </MagneticButton>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="px-4 mt-6 flex flex-col gap-1 flex-1 relative z-10 w-full">
                    <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-[#666] px-3 mb-2">Management</div>
                    <button 
                        onClick={() => router.push(`/dashboard/${activeSpace.value}?view=inbox`)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all w-full text-left group ${(!searchParams.get("view") || searchParams.get("view") === "inbox") ? 'bg-blue-50/80 dark:bg-blue-500/10 text-blue-600 dark:text-[#6C85FF]' : 'text-slate-600 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                    >
                        <Monitor className={`w-[20px] h-[20px] shrink-0 ${(!searchParams.get("view") || searchParams.get("view") === "inbox") ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-400 dark:text-[#666] group-hover:text-slate-900 dark:group-hover:text-white'}`} />
                        <span className="text-[13px] font-semibold">Inbox</span>
                    </button>
                    <button 
                        onClick={() => router.push(`/dashboard/${activeSpace.value}?view=wall-of-love`)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all w-full text-left group ${searchParams.get("view") === "wall-of-love" ? 'bg-blue-50/80 dark:bg-blue-500/10 text-blue-600 dark:text-[#6C85FF]' : 'text-slate-600 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                    >
                        <LayoutGrid className={`w-[20px] h-[20px] shrink-0 ${searchParams.get("view") === "wall-of-love" ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-400 dark:text-[#666] group-hover:text-slate-900 dark:group-hover:text-white'}`} />
                        <span className="text-[13px] font-medium group-hover:font-semibold transition-all">Wall of Love</span>
                    </button>
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                        <Sparkles className="w-[20px] h-[20px] shrink-0 text-slate-400 dark:text-[#666] group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                        <span className="text-[13px] font-medium group-hover:font-semibold transition-all">Integrations</span>
                    </button>

                    <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-[#666] px-3 mb-2 mt-6">Support</div>
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                        <HelpCircle className="w-[20px] h-[20px] shrink-0 text-slate-400 dark:text-[#666] group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                        <span className="text-[13px] font-medium group-hover:font-semibold transition-all">Help Center</span>
                    </button>
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                        <Star className="w-[20px] h-[20px] shrink-0 text-slate-400 dark:text-[#666] group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                        <span className="text-[13px] font-medium group-hover:font-semibold transition-all">What's New</span>
                    </button>
                </div>

                <div className="p-4 mt-auto relative z-10">
                    <button className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all w-full text-left group">
                        <LogOut className="w-[20px] h-[20px] shrink-0 text-slate-400 dark:text-[#666] group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                        <span className="text-[13px] font-medium group-hover:font-semibold transition-all">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
