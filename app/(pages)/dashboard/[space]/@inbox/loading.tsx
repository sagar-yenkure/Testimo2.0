import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function InboxLoading() {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#09090C]">
        {/* Stats Bar Skeleton */}
        <div className="sticky top-0 z-40 px-6 pt-4 pb-2 bg-slate-50/70 dark:bg-[#09090C]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5">
            <div className="flex gap-4 mb-6">
                {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-24 flex-1 rounded-2xl" />
                ))}
            </div>
            
            {/* Tabs Skeleton */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-8 w-20 rounded-full" />
                    ))}
                </div>
                <Skeleton className="h-8 w-16 rounded-xl" />
            </div>
        </div>

        {/* Card Grid Skeleton */}
        <div className="flex-1 px-6 pt-6">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="break-inside-avoid rounded-[22px] bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/5 p-6 h-48 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-2 w-16" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-4/5" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
