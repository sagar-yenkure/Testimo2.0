"use client";

import { Video, MessageSquareText, Crown } from "lucide-react";
import { ActivityItem } from "@/types";
import { EmptyState } from "./EmptyState";

interface ActivityTrayProps {
    activities: ActivityItem[];
}

export const ActivityTray = ({ activities }: ActivityTrayProps) => {
    return (
        <div className="bg-white dark:bg-[#09090C] border-slate-200 dark:border-[#1F1F24] p-0 overflow-hidden shadow-2xl rounded-2xl w-full">
            <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                <span className="text-[10px] font-bold text-blue-600 dark:text-[#6C85FF] bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">New Updates</span>
            </div>
            <div className={`p-6 transition-colors duration-300 ${activities.length === 0 ? 'py-12' : ''}`}>
                {activities.length > 0 ? (
                    <div className="flex flex-col gap-8 relative">
                        {/* Timeline vertical line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-[#1A1A1E]"></div>

                        {activities.map((activity, index) => (
                            <div key={index} className="flex gap-6 group">
                                <div className="shrink-0 relative z-10">
                                    {activity.type === 'video' && (
                                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#131A2D] flex items-center justify-center text-blue-600 dark:text-[#6C85FF] border border-blue-100/50 dark:border-blue-500/10 shadow-sm dark:shadow-none ring-4 ring-white dark:ring-[#09090C]">
                                            <Video className="w-4 h-4 ml-0.5" />
                                        </div>
                                    )}
                                    {activity.type === 'text' && (
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-[#13221C] flex items-center justify-center text-emerald-600 dark:text-[#65E3AD] border border-emerald-100/50 dark:border-emerald-500/10 shadow-sm dark:shadow-none ring-4 ring-white dark:ring-[#09090C]">
                                            <MessageSquareText className="w-4 h-4" />
                                        </div>
                                    )}
                                    {activity.type === 'member' && (
                                        <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-[#1F142D] flex items-center justify-center text-purple-600 dark:text-[#B193FF] border border-purple-100/50 dark:border-purple-500/10 shadow-sm dark:shadow-none ring-4 ring-white dark:ring-[#09090C]">
                                            <Crown className="w-4 h-4 mb-0.5" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col min-w-0 pt-0.5">
                                    <h4 className="text-[14px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">{activity.title}</h4>
                                    <p className="text-[13px] text-slate-500 dark:text-[#82828C] leading-[1.6] mt-1.5 mb-2.5 pr-4 max-w-[260px]">
                                        {activity.desc}
                                    </p>
                                    <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-slate-400 dark:text-[#52525B]">
                                        {activity.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        icon={Video}
                        title="Activities will appear here"
                        description="Once your first testimonial arrives, we'll notify you right here."
                        className="py-10 border-0 bg-transparent dark:bg-transparent"
                    />
                )}
            </div>
            <div className="p-3 bg-slate-50/50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5 text-center">
                <button className="text-[11px] font-bold text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-[#6C85FF] transition-colors cursor-pointer">
                    Clear all activity
                </button>
            </div>
        </div>
    );
};
