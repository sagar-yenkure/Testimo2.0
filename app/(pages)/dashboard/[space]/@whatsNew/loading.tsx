import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WhatsNewLoading() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-16">
        <Skeleton className="h-4 w-20 rounded-full mb-4" />
        <Skeleton className="h-10 w-48 rounded-xl mb-2" />
        <Skeleton className="h-4 w-64 rounded-lg" />
      </div>

      <div className="relative pl-12 border-l-2 border-slate-200 dark:border-white/5 space-y-20">
        {[1, 2].map(i => (
          <div key={i} className="relative">
             <Skeleton className="absolute -left-[53px] top-0 w-10 h-10 rounded-full border-4 border-slate-50 dark:border-[#09090C]" />
            <div className="rounded-[32px] border border-slate-200 dark:border-white/5 bg-white dark:bg-[#121216] p-10 h-64 space-y-6">
                <Skeleton className="h-8 w-64 rounded-xl" />
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
