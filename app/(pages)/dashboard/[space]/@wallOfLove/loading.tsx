import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WallOfLoveLoading() {
  return (
    <div className="flex h-full">
      {/* Side Customizer Skeleton */}
      <div className="w-[340px] border-r border-slate-200 dark:border-white/5 p-6 flex flex-col gap-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
             <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-8 w-full rounded-lg" />
             </div>
          ))}
        </div>
      </div>

      {/* Main Preview Skeleton */}
      <div className="flex-1 bg-slate-50/50 dark:bg-black/20 p-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64 rounded-xl mx-auto mb-12" />
          <div className="columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="break-inside-avoid w-full rounded-2xl h-40" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
