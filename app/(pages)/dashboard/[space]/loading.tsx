import { Skeleton } from "@/components/ui/skeleton";

export default function SpaceDetailLoading() {
    return (
        <div className="flex h-screen font-sans overflow-hidden transition-colors duration-300 relative">
            {/* ── Sidebar Placeholder (Matches DetailSidebar width) ── */}
            <div className="hidden lg:flex w-[280px] xl:w-[320px] bg-white dark:bg-[#09090C] border-r border-slate-200 dark:border-[#1F1F24] flex-col overflow-hidden shrink-0 h-full">
                <div className="p-8 space-y-8">
                    <Skeleton className="h-10 w-40 rounded-xl" /> {/* Logo */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <Skeleton key={i} className="h-12 w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>

            <main className="flex-1 flex flex-col relative h-full min-w-0 transition-colors duration-300">
                <div className="px-6 shrink-0 py-2 z-20">
                    {/* Mobile Navigation Header */}
                    <div className="lg:hidden flex items-center justify-between py-4 border-y border-slate-200 dark:border-[#1F1F24] bg-transparent shrink-0 mb-6 mt-4">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <Skeleton className="h-11 w-44 rounded-xl" />
                    </div>

                    {/* ── Detail Stats Bar Skeleton ── */}
                    <div className="w-full relative mb-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 pt-4">
                        <div className="flex items-center justify-between lg:justify-start gap-4 sm:gap-10 md:gap-12 w-full xl:w-auto">
                            {[
                                { label: "Total Reviews", width: "w-24" },
                                { label: "Avg Rating", width: "w-16" },
                                { label: "Video Responses", width: "w-32" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start shrink-0">
                                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] mb-1.5">
                                        {stat.label}
                                    </div>
                                    <Skeleton className={`h-[36px] ${stat.width} rounded-lg`} />
                                </div>
                            ))}
                        </div>
                        <div className="hidden lg:flex shrink-0">
                            <Skeleton className="h-11 w-52 rounded-xl" /> {/* Copy Link Button */}
                        </div>
                    </div>

                    {/* ── Tabs Skeleton ── */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                            {[
                                { label: "All", width: "w-14" },
                                { label: "Video", width: "w-16" },
                                { label: "Text", width: "w-14" },
                                { label: "Liked", width: "w-16" },
                                { label: "Archived", width: "w-20" }
                            ].map((tab, i) => (
                                <div key={i} className="px-4 py-1.5 rounded-full border border-slate-200 dark:border-[#1F1F24] bg-slate-50 dark:bg-[#131316] text-[12px] font-bold text-slate-500 dark:text-[#82828C] whitespace-nowrap">
                                    {tab.label}
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:flex gap-1 p-1 bg-slate-50 dark:bg-[#131316] rounded-xl border border-slate-200 dark:border-[#1F1F24]">
                             <Skeleton className="w-8 h-8 rounded-lg" />
                             <Skeleton className="w-8 h-8 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* ── Testimonials Grid Skeleton ── */}
                <div className="flex-1 overflow-y-auto px-6 pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[0, 1, 2].map((colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-3">
                                {[1, 2].map((i) => (
                                    <div key={i} className="bg-white dark:bg-[#131316] border border-slate-200 dark:border-[#1F1F24] rounded-2xl p-5 md:p-6 space-y-4 shadow-sm dark:shadow-none">
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                                            <div className="space-y-2 flex-1">
                                                <Skeleton className="h-4 w-32 rounded-lg" />
                                                <Skeleton className="h-3 w-20 rounded-lg" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <Skeleton className="h-3 w-full rounded-full" />
                                            <Skeleton className="h-3 w-5/6 rounded-full" />
                                            <Skeleton className="h-3 w-4/6 rounded-full" />
                                        </div>
                                        <div className="pt-4 flex items-center justify-between border-t border-slate-50 dark:border-white/5 mt-4">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(s => <Skeleton key={s} className="w-3 h-3 rounded-full" />)}
                                            </div>
                                            <Skeleton className="h-5 w-14 rounded-lg" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Plus Button Placeholder */}
                <Skeleton className="fixed bottom-10 right-10 w-[60px] h-[60px] rounded-full shadow-lg" />
            </main>
        </div>
    );
}
