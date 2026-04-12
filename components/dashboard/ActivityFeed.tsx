"use client";

import { Video, MessageSquareText, Crown } from "lucide-react";
import { ActivityItem } from "@/types";
import { EmptyState } from "./EmptyState";

interface ActivityFeedProps {
    activities: ActivityItem[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
    return (
        <div className="hidden lg:block space-y-3">
            <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white mb-6">Recent Activity</h2>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                {activities && activities.length > 0 ? (
                    <div className="flex flex-col gap-8 relative">
                        {/* Timeline Connector */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-[#1A1A1E]"></div>

                        {activities.map((item, idx) => (
                            <div key={idx} className="flex gap-5 relative group cursor-default">
                                <div className="shrink-0 relative z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border-4 border-white dark:border-[#09090C] ${item.type === 'video' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-[#6C85FF]' :
                                        item.type === 'text' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-[#65E3AD]' :
                                            'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-[#B193FF]'
                                        }`}>
                                        {item.type === 'video' ? <Video className="w-4 h-4 ml-0.5" /> :
                                            item.type === 'text' ? <MessageSquareText className="w-4 h-4" /> :
                                                <Crown className="w-4 h-4" />
                                        }
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 pt-0.5">
                                    <div className="text-[14px] font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#6C85FF] transition-colors leading-tight">
                                        {item.title}
                                    </div>
                                    <div className="text-[13px] text-slate-500 dark:text-[#82828C] leading-snug mt-1.5 line-clamp-2">
                                        {item.desc}
                                    </div>
                                    <div className="text-[9px] text-slate-400 dark:text-[#666] font-bold mt-2 uppercase tracking-widest">
                                        {item.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        icon={Video}
                        title="No activity yet"
                        description="Once you receive testimonials, they'll appear in this feed."
                        className="h-full"
                    />
                )}
            </div>
        </div>
    );
};
