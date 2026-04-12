"use client";

import { Play, CheckCircle2 } from "lucide-react";
import { Stars } from "./Stars";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
    data: Testimonial;
}

export const TestimonialCard = ({ data }: TestimonialCardProps) => {
    return (
        <div className="bg-white dark:bg-[#141417] border border-slate-200 dark:border-[#1F1F24] shadow-sm dark:shadow-none rounded-2xl p-5 w-full flex flex-col group transition-all duration-300 hover:border-slate-300 dark:hover:border-[#333]">
            {data.isVideo && (
                <div className="w-full aspect-[16/10] bg-slate-900 dark:bg-[#1F1F24] rounded-xl mb-4 relative overflow-hidden flex items-center justify-center shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 dark:from-[#2a2a30] dark:to-[#111114]"></div>
                    <div className="relative w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition shadow-xl">
                        <Play className="w-6 h-6 text-white fill-white ml-1 opacity-90" />
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                        <span className="bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider">VIDEO</span>
                        <span className="bg-purple-600/90 dark:bg-[#8A63D2]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider">0:45</span>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center w-full min-w-0">
                    {!data.isVideo && (
                        data.avatar ? (
                            <img src={data.avatar} alt={data.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        ) : (
                            <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold text-white shadow-inner ${data.bg || 'bg-blue-900'}`}>
                                {data.initials}
                            </div>
                        )
                    )}

                    <div className={`${data.isVideo ? 'w-full min-w-0' : 'min-w-0'}`}>
                        <div className={`flex items-center ${data.isVideo ? 'justify-between' : ''}`}>
                            <div className="text-[14.5px] font-semibold text-slate-900 dark:text-white leading-none truncate">{data.name}</div>
                            {data.ratingPos === "right" && <Stars count={data.rating} />}
                        </div>

                        {!data.isVideo && data.title && (
                            <div className="text-[11px] text-slate-500 dark:text-[#82828C] mt-1 truncate">{data.title}</div>
                        )}
                        {data.ratingPos === "name" && (
                            <div className="mt-1.5"><Stars count={data.rating} /></div>
                        )}
                    </div>
                </div>

                {data.badge && (
                    <div className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded tracking-wider shrink-0 ml-3 ${data.badge.css}`}>
                        {data.badge.label}
                    </div>
                )}
            </div>

            <p className={`text-[13px] text-slate-600 dark:text-[#A0A0AB] leading-relaxed ${data.isVideo ? 'italic' : ''}`}>
                {data.content}
            </p>

            {data.ratingPos === "bottom" && (
                <div className="mt-5"><Stars count={data.rating} /></div>
            )}

            {data.teamReply && (
                <div className="mt-5 w-full">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-[#6C85FF] mb-2 px-1">Team Reply</div>
                    <div className="bg-slate-50 dark:bg-[#1C1C21]/60 border border-slate-100 dark:border-[#2B2B33] rounded-xl p-3.5 text-[12px] text-slate-600 dark:text-[#82828C] italic">
                        {data.teamReply}
                    </div>
                </div>
            )}

            {(data.date || data.action || data.actionIcon) && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-[#1F1F24]/50">
                    <div className="text-[11px] text-slate-400 dark:text-[#6A6A75] font-medium">{data.date}</div>
                    {data.action && (
                        <button className="text-[10px] font-bold text-blue-600 dark:text-[#6C85FF] tracking-widest hover:text-blue-700 dark:hover:text-white transition-colors uppercase">
                            {data.action}
                        </button>
                    )}
                    {data.actionIcon && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#65E3AD] fill-emerald-500/20 dark:fill-[#65E3AD]/20" />
                    )}
                </div>
            )}
        </div>
    );
};
