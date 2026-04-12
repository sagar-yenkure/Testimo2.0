"use client";

import { useState } from "react";
import { Layers, ChevronDown, Plus, Monitor, LayoutGrid, Sparkles, HelpCircle, Star, LogOut } from "lucide-react";
import { SIDEBAR_SPACES } from "@/constants";

interface DetailSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const DetailSidebar = ({ isOpen, onClose }: DetailSidebarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeSpace, setActiveSpace] = useState(SIDEBAR_SPACES[0]);

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <aside className={`
                fixed lg:relative inset-y-0 left-0 w-[300px] lg:w-[280px] bg-white dark:bg-[#09090C] border-r border-slate-200 dark:border-[#1F1F24] flex flex-col h-full shrink-0 z-[70] lg:z-20 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
            <div className="relative px-6 pt-3 pb-2">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full p-2.5 -ml-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative z-20"
                >
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 shrink-0 bg-blue-600 dark:bg-[#6C85FF] rounded-xl flex items-center justify-center text-white shadow-sm dark:shadow-[0_0_15px_rgba(108,133,255,0.3)]">
                            <Layers className="w-6 h-6 fill-current" />
                        </div>
                        <div className="text-left min-w-0 flex flex-col justify-center">
                            <div className="text-slate-900 dark:text-white font-black text-[15px] tracking-tight truncate pr-2">{activeSpace.label}</div>
                            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-[#666] font-black mt-1">Admin Console</div>
                        </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 dark:text-[#666] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-30 opacity-0 pointer-events-auto"
                            onClick={() => setIsDropdownOpen(false)}
                        />
                        <div className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] z-40 overflow-hidden flex flex-col transition-all duration-300">
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
                                <button className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-left text-[13px] font-semibold text-blue-600 dark:text-[#8CB4FC] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                                    <Plus className="w-4 h-4" /> Create new space
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="px-4 mt-6 flex flex-col gap-1 flex-1 relative z-10 w-full">
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#555] px-3 mb-3">Management</div>
                <button className="flex items-center gap-3.5 px-3 py-3 rounded-xl bg-blue-50/80 dark:bg-[#141721] border border-blue-100/50 dark:border-[#1F2436] text-blue-600 dark:text-[#8CB4FC] shadow-sm transition-all w-full text-left">
                    <Monitor className="w-[20px] h-[20px] shrink-0 fill-blue-600/10 dark:fill-[#8CB4FC]/10 animate-pulse" />
                    <span className="text-[14px] font-bold">Inbox</span>
                </button>
                <button className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                    <LayoutGrid className="w-[20px] h-[20px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[14px] font-bold">Embed Widgets</span>
                </button>
                <button className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                    <Sparkles className="w-[20px] h-[20px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[14px] font-bold">Integrations</span>
                </button>
 
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#555] px-3 mb-3 mt-8">Support</div>
                <button className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                    <HelpCircle className="w-[20px] h-[20px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[14px] font-bold">Help Center</span>
                </button>
                <button className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                    <Star className="w-[20px] h-[20px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[14px] font-bold">What's New</span>
                </button>
            </div>

            <div className="p-5 mt-auto relative z-10">
                <button className="flex items-center gap-3.5 px-3 py-3 text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all w-full text-left group">
                    <LogOut className="w-[20px] h-[20px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[14px] font-bold">Logout</span>
                </button>
            </div>
        </aside>
        </>
    );
};
