"use client";

import { Zap, MessageSquareText, Video, TrendingUp, TrendingDown, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkline } from "./Sparkline";

export const DashboardStatsBar = () => {
    return (
        <div className="relative group/bar border-b border-slate-200 dark:border-white/5 pb-8 mb-4 mt-2">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 sm:gap-10 md:gap-14 lg:gap-20 relative z-10 w-full">

                <div className="relative group/stat cursor-default flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover/stat:-translate-y-0.5">
                        <Zap className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover/stat:text-slate-900 dark:group-hover/stat:text-white transition-colors">Active Spaces</div>
                    </div>
                    <div className="relative overflow-hidden h-[36px] mt-1">
                        <div className="flex items-end h-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/stat:-translate-y-full">
                            <div className="text-[32px] font-extrabold text-slate-800 dark:text-white leading-none tracking-tight">12</div>
                            <Sparkline points="0,25 20,20 40,30 60,15 80,5 100,0" color="#3B82F6" fill="#60A5FA" />
                        </div>
                        <div className="absolute top-full left-0 w-full h-full flex items-center justify-center lg:justify-start pt-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/stat:-translate-y-full">
                            <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-[12px] font-black tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                                <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> +14%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-[#2A2A35] to-transparent"></div>

                <div className="relative group/stat cursor-default flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover/stat:-translate-y-0.5">
                        <MessageSquareText className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover/stat:text-slate-900 dark:group-hover/stat:text-white transition-colors">Text Received</div>
                    </div>
                    <div className="relative overflow-hidden h-[36px] mt-1">
                        <div className="flex items-end h-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/stat:-translate-y-full">
                            <div className="text-[32px] font-extrabold text-slate-800 dark:text-white leading-none tracking-tight">842</div>
                            <Sparkline points="0,30 20,25 40,28 60,15 80,20 100,5" color="#10B981" fill="#34D399" />
                        </div>
                        <div className="absolute top-full left-0 w-full h-full flex items-center justify-center lg:justify-start pt-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/stat:-translate-y-full">
                            <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-[12px] font-black tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                                <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> +32%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-[#2A2A35] to-transparent"></div>

                <div className="relative group/stat cursor-default flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover/stat:-translate-y-0.5">
                        <Video className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover/stat:text-slate-900 dark:group-hover/stat:text-white transition-colors">Video Received</div>
                    </div>
                    <div className="relative overflow-hidden h-[36px] mt-1">
                        <div className="flex items-end h-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/stat:-translate-y-full">
                            <div className="text-[32px] font-extrabold text-slate-800 dark:text-white leading-none tracking-tight">442</div>
                            <Sparkline points="0,20 20,30 40,25 60,10 80,15 100,0" color="#6366F1" fill="#818CF8" />
                        </div>
                        <div className="absolute top-full left-0 w-full h-full flex items-center justify-center lg:justify-start pt-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/stat:-translate-y-full">
                            <div className="flex items-center gap-1.5 text-rose-500 dark:text-rose-400 text-[12px] font-black tracking-widest bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
                                <TrendingDown className="w-3.5 h-3.5" strokeWidth={3} /> -4%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-[#2A2A35] to-transparent"></div>

                <div className="relative group/stat cursor-default flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover/stat:-translate-y-0.5">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover/stat:text-slate-900 dark:group-hover/stat:text-white transition-colors">Submissions</div>
                    </div>
                    <div className="relative overflow-hidden h-[36px] mt-1">
                        <div className="flex items-end h-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/stat:-translate-y-full">
                            <div className="text-[32px] font-extrabold text-slate-800 dark:text-white leading-none tracking-tight">1.2k</div>
                            <Sparkline points="0,30 20,25 40,15 60,20 80,5 100,0" color="#A855F7" fill="#C084FC" />
                        </div>
                        <div className="absolute top-full left-0 w-full h-full flex items-center justify-center lg:justify-start pt-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/stat:-translate-y-full">
                            <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-[12px] font-black tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                                <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> +24%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden xl:block w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-[#2A2A35] to-transparent"></div>

                <div className="w-full xl:flex-1 flex justify-center xl:justify-end mt-4 xl:mt-0">
                    <Link href="/dashboard/create" className="w-full sm:w-auto">
                        <button className="relative overflow-hidden group/btn bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#2A2A35] dark:to-[#1C1C22] hover:from-white hover:to-slate-100 dark:hover:from-[#353545] dark:hover:to-[#252530] text-slate-900 dark:text-white border border-slate-300 dark:border-[#3F3F4E] rounded-xl px-10 py-3 text-[14px] font-extrabold transition-all shadow-sm dark:shadow-[0_4px_15px_rgba(0,0,0,0.2)] w-full sm:w-auto h-12 active:scale-95 cursor-pointer flex items-center justify-center">
                            <Plus className="w-4 h-4 mr-2 relative z-10 transition-colors group-hover/btn:text-blue-600 dark:group-hover/btn:text-white" />
                            <span className="relative z-10 group-hover/btn:text-blue-600 dark:group-hover/btn:text-white transition-colors">Create space</span>
                            <div className="absolute inset-0 bg-white/40 dark:bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
