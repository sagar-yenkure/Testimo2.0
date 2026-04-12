import { Skeleton } from "@/components/ui/skeleton";
import { Zap, MessageSquareText, Video, TrendingUp } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="space-y-8 px-6 md:space-y-10 py-6 overflow-hidden h-full w-full">
            {/* ── Page Header Skeleton ── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="text-[11px] font-black tracking-[0.2em] uppercase mb-1 text-blue-600 dark:text-[#6C85FF]">
                        WORKSPACE OVERVIEW
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Your Spaces
                    </h1>
                </div>
            </div>

            {/* ── Stats Bar Skeleton ── */}
            <div className="border-b border-slate-200 dark:border-white/5 pb-8 mb-4 mt-2">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 sm:gap-10 md:gap-14 lg:gap-20 w-full">
                    {[
                        { label: "Active Spaces", icon: Zap, color: "text-blue-500 dark:text-blue-400" },
                        { label: "Text Received", icon: MessageSquareText, color: "text-emerald-500 dark:text-emerald-400" },
                        { label: "Video Received", icon: Video, color: "text-indigo-500 dark:text-indigo-400" },
                        { label: "Submissions", icon: TrendingUp, color: "text-purple-500 dark:text-purple-400" }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center lg:items-start">
                            <div className="flex items-center gap-2 mb-2">
                                <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] text-center lg:text-left">{stat.label}</div>
                            </div>
                            <Skeleton className="h-[32px] w-16 rounded-lg mt-1" /> {/* The Dynamic Value */}
                        </div>
                    ))}

                    <div className="hidden xl:block w-px h-12 bg-transparent ml-auto"></div>
                    <div className="w-full xl:w-auto mt-4 xl:mt-0">
                        <Skeleton className="h-12 w-full sm:w-[180px] rounded-xl" /> {/* Create Space Button */}
                    </div>
                </div>
            </div>

            {/* ── Main Content Grid Skeleton ── */}
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 pt-4">
                {/* Space Cards Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white leading-none">Active Spaces</h2>
                        <Skeleton className="h-8 w-24 rounded-xl lg:hidden" /> {/* Mobile Activity Button */}
                    </div>

                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white dark:bg-[#131316] border border-slate-200 dark:border-[#1F1F24] rounded-2xl p-5 md:p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 md:gap-8 shadow-sm dark:shadow-none">
                                <div className="flex gap-5 flex-1 min-w-0">
                                    <Skeleton className="w-14 h-14 md:w-16 md:h-16 rounded-2xl shrink-0" /> {/* Avatar */}
                                    <div className="flex flex-col flex-1 min-w-0 justify-center space-y-2">
                                        <Skeleton className="h-5 w-40 rounded-lg" /> {/* Title */}
                                        <Skeleton className="h-4 w-full max-w-[320px] rounded-full" /> {/* Description */}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between xl:justify-end gap-8 md:gap-12 shrink-0 border-t border-slate-100 dark:border-transparent xl:border-0 pt-4 xl:pt-0">
                                    <div className="flex items-center gap-6 md:gap-10">
                                        <div className="flex flex-col items-start xl:items-center space-y-2">
                                            <div className="text-[9px] font-bold tracking-widest uppercase text-slate-400 dark:text-[#6A6A75]">Videos</div>
                                            <Skeleton className="h-5 w-8 rounded-md" />
                                        </div>
                                        <div className="flex flex-col items-start xl:items-center space-y-2">
                                            <div className="text-[9px] font-bold tracking-widest uppercase text-slate-400 dark:text-[#6A6A75]">Texts</div>
                                            <Skeleton className="h-5 w-8 rounded-md" />
                                        </div>
                                        <div className="flex -space-x-2">
                                            <Skeleton className="w-[30px] h-[30px] rounded-full border-2 border-white dark:border-[#131316]" />
                                            <Skeleton className="w-[30px] h-[30px] rounded-full border-2 border-white dark:border-[#131316]" />
                                            <Skeleton className="w-[30px] h-[30px] rounded-full border-2 border-white dark:border-[#131316]" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 w-24 rounded-xl" /> {/* Manage Button */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Pagination Skeleton ── */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-white/5">
                        <Skeleton className="h-4 w-40 rounded-full" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-14 rounded-lg" /> {/* Prev */}
                            <div className="flex items-center gap-1">
                                <Skeleton className="w-8 h-8 rounded-lg" />
                                <Skeleton className="w-8 h-8 rounded-lg" />
                                <Skeleton className="w-8 h-8 rounded-lg" />
                            </div>
                            <Skeleton className="h-8 w-14 rounded-lg" /> {/* Next */}
                        </div>
                    </div>
                </div>

                {/* Sidebar Activity Skeleton */}
                <div className="hidden lg:block space-y-8">
                    <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
                    <div className="space-y-8 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-white/5"></div>

                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-5 relative group">
                                <Skeleton className="w-10 h-10 rounded-full shrink-0 z-10" /> {/* Activity Icon */}
                                <div className="space-y-2 flex-1 pt-1">
                                    <Skeleton className="h-4 w-32 rounded-lg" />
                                    <Skeleton className="h-3 w-full rounded-full" />
                                    <Skeleton className="h-2 w-16 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
