"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";

export const DetailStatsBar = () => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        // navigator.clipboard.writeText('...');
        setTimeout(() => setIsCopied(false), 3000);
    };

    return (
        <div className="w-full relative mb-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 transition-colors duration-300 group/bar">
            {/* Subtle ambient glows floating in the background */}
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-[#6C85FF]/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none transition-opacity duration-500 group-hover/bar:opacity-100 opacity-50"></div>

            <div className="flex items-center justify-between lg:justify-start gap-4 sm:gap-10 md:gap-12 relative z-10 w-full xl:w-auto overflow-x-auto no-scrollbar pb-2 xl:pb-0">
                <div className="relative group cursor-default shrink-0">
                    <div className="flex items-center gap-2 mb-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover:text-slate-900 dark:group-hover:text-white transition-colors whitespace-nowrap">Total Reviews</div>
                    </div>
                    <div className="text-[28px] sm:text-[36px] font-black text-slate-800 dark:text-white leading-none tracking-tighter">128</div>
                </div>

                <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-[#2A2A35] to-transparent"></div>

                <div className="relative group cursor-default shrink-0">
                    <div className="flex items-center gap-2 mb-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover:text-slate-900 dark:group-hover:text-white transition-colors whitespace-nowrap">Avg Rating</div>
                    </div>
                    <div className="text-[28px] sm:text-[36px] font-black text-slate-800 dark:text-white leading-none tracking-tighter">4.9</div>
                </div>

                <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-[#2A2A35] to-transparent"></div>

                <div className="relative group cursor-default shrink-0">
                    <div className="flex items-center gap-2 mb-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover:text-slate-900 dark:group-hover:text-white transition-colors whitespace-nowrap">Video Responses</div>
                    </div>
                    <div className="text-[28px] sm:text-[36px] font-black text-slate-800 dark:text-white leading-none tracking-tighter">32</div>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-center lg:justify-start relative z-10 shrink-0 w-full xl:w-auto mt-2 xl:mt-0">
                <button 
                    onClick={handleCopy}
                    className={`relative overflow-hidden group/btn flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl border text-[13px] font-extrabold transition-all duration-300 active:scale-95 w-full sm:w-auto h-11 cursor-pointer shadow-sm dark:shadow-[0_4px_15px_rgba(0,0,0,0.2)] ${isCopied
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-[#65E3AD] border-emerald-200 dark:border-emerald-500/20'
                        : 'bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#2A2A35] dark:to-[#1C1C22] hover:from-white hover:to-slate-100 dark:hover:from-[#353545] dark:hover:to-[#252530] text-slate-900 dark:text-white border-slate-300 dark:border-[#3F3F4E]'
                    }`}
                >
                    <div className={`flex items-center gap-2 relative z-10 transition-colors ${!isCopied && 'group-hover/btn:text-blue-600 dark:group-hover/btn:text-white'}`}>
                        {isCopied ? (
                            <Check className="w-4 h-4 animate-in zoom-in duration-300" />
                        ) : (
                            <LinkIcon className="w-4 h-4 transition-transform group-hover/btn:-rotate-12" />
                        )}
                        {isCopied ? 'Copied to Clipboard!' : 'Copy Public Link'}
                    </div>
                    {!isCopied && <div className="absolute inset-0 bg-white/40 dark:bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>}
                </button>
            </div>
        </div>
    );
};
