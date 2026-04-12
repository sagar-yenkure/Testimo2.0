"use client";

import Link from "next/link";
import { Space } from "@/types";

interface SpaceCardProps {
    space: Space;
}

export const SpaceCard = ({ space }: SpaceCardProps) => {
    return (
        <div className="bg-white dark:bg-[#131316] border border-slate-200 dark:border-[#1F1F24] rounded-2xl p-5 md:p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 md:gap-8 transition-all hover:border-slate-300 dark:hover:border-[#2A2A35] group shadow-sm dark:shadow-none">
            <div className="flex gap-5 flex-1 min-w-0">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl shrink-0 border border-slate-200 dark:border-[#2A2A35] overflow-hidden bg-slate-100 dark:bg-[#1A1A20] shadow-inner">
                    <img src={space.avatar} alt={space.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1 min-w-0 justify-center">
                    <h3 className="text-[17px] font-bold text-slate-900 dark:text-white truncate">{space.name}</h3>
                    <p className="text-[13px] text-slate-500 dark:text-[#82828C] leading-snug mt-1 xl:max-w-sm pr-4">
                        {space.description}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between xl:justify-end gap-8 md:gap-12 shrink-0 border-t border-slate-100 dark:border-transparent xl:border-0 pt-4 xl:pt-0">
                <div className="flex items-center gap-6 md:gap-10">
                    <div className="flex flex-col items-start xl:items-center">
                        <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400 dark:text-[#6A6A75] mb-1.5">Videos</span>
                        <span className="text-[18px] font-extrabold text-slate-900 dark:text-white leading-none">{space.videoCount}</span>
                    </div>
                    <div className="flex flex-col items-start xl:items-center">
                        <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400 dark:text-[#6A6A75] mb-1.5">Texts</span>
                        <span className="text-[18px] font-extrabold text-slate-900 dark:text-white leading-none">{space.textCount}</span>
                    </div>

                    {/* Avatar stack replacing Members count */}
                    <div className="flex flex-col items-start xl:items-center justify-end h-full">
                        <div className="flex -space-x-2 mt-1">
                            <img src="https://i.pravatar.cc/100?img=1" className="w-[30px] h-[30px] rounded-full border-[2px] border-white dark:border-[#131316]" />
                            <img src="https://i.pravatar.cc/100?img=2" className="w-[30px] h-[30px] rounded-full border-[2px] border-white dark:border-[#131316]" />
                            <div className="w-[30px] h-[30px] rounded-full border-[2px] border-white dark:border-[#131316] bg-slate-100 dark:bg-[#2A2A35] flex items-center justify-center text-[10px] font-extrabold text-slate-600 dark:text-white z-10 relative">
                                +9
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                    <Link href={`/dashboard/${space.slug}`}>
                        <button className="relative overflow-hidden group/btn bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#2A2A35] dark:to-[#1C1C22] hover:from-white hover:to-slate-100 dark:hover:from-[#353545] dark:hover:to-[#252530] text-slate-900 dark:text-white border border-slate-300 dark:border-[#3F3F4E] rounded-xl px-6 py-2.5 text-[12px] font-extrabold transition-all shadow-sm dark:shadow-[0_4px_15px_rgba(0,0,0,0.2)] md:min-w-[100px] active:scale-95 cursor-pointer">
                            <span className="relative z-10 group-hover/btn:text-blue-600 dark:group-hover/btn:text-white transition-colors">Manage</span>
                            <div className="absolute inset-0 bg-white/40 dark:bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
