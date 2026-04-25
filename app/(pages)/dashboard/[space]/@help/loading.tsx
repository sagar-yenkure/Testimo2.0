import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HelpLoading() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="text-center mb-16 space-y-6">
        <Skeleton className="h-10 w-80 rounded-2xl mx-auto" />
        <Skeleton className="h-14 max-w-xl rounded-2xl mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#121216] p-8 space-y-4">
             <Skeleton className="w-12 h-12 rounded-2xl" />
             <Skeleton className="h-6 w-32" />
             <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
