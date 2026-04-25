"use client";

import React from "react";
import { Sparkles, Calendar, ArrowRight, Zap, Target, Layout } from "lucide-react";
import { motion } from "framer-motion";

const UPDATES = [
  {
    date: "April 24, 2026",
    tag: "New Feature",
    title: "Wall of Love 2.0 is here!",
    description: "A completely redesigned widget builder with glassmorphism, masonry layouts, and instant brand color matching.",
    icon: <Sparkles className="text-blue-500" />
  },
  {
    date: "April 18, 2026",
    tag: "Improvement",
    title: "Fast API Integrations",
    description: "Importing testimonials from X (Twitter) and LinkedIn is now 5x faster with our new background sync engine.",
    icon: <Zap className="text-amber-500" />
  },
  {
    date: "April 10, 2026",
    tag: "Beta",
    title: "Video Insights (Beta)",
    description: "Get detailed analytics on how many people are watching your video testimonials and where they drop off.",
    icon: <Target className="text-rose-500" />
  }
];

export function WhatsNewView() {
  return (
    <div className="flex flex-col h-full bg-transparent no-scrollbar">
      {/* Search & Filter - Dashboard Style */}
      <div className="px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="text-[10px] font-black text-blue-600 dark:text-[#5F7FFF] tracking-[0.2em] uppercase mb-1">JOURNAL</div>
           <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">What's New</h2>
           <p className="text-[13px] text-slate-500 dark:text-[#82828C] mt-1 font-medium">Platform updates and performance improvements.</p>
        </div>
      </div>

      <div className="px-6 pb-24 max-w-3xl">
        <div className="space-y-12">
          {UPDATES.map((update, idx) => (
            <div 
              key={idx}
              className="relative pl-10 border-l-[3px] border-slate-100 dark:border-white/5 pb-2 last:pb-0"
            >
              {/* Timeline Connector Dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-[#09090C] border-[3.5px] border-blue-600 dark:border-[#5F7FFF] shadow-[0_0_15px_rgba(37,99,235,0.4)] z-10" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                 <div className="text-[11px] font-black text-slate-400 dark:text-[#555] uppercase tracking-[0.15em] shrink-0">
                    {update.date}
                 </div>
                 <div className="hidden md:block w-3 h-[1px] bg-slate-200 dark:bg-white/10" />
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-[#8CB4FC] text-[10px] font-black uppercase tracking-wider border border-blue-100/50 dark:border-white/5">
                    {update.tag}
                 </div>
              </div>

              <div className="bg-white dark:bg-[#121216] border border-slate-200/60 dark:border-white/5 p-7 rounded-[28px] shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-white/10 transition-all duration-500 group relative overflow-hidden">
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2.5 leading-tight">{update.title}</h3>
                    <p className="text-[14px] text-slate-500 dark:text-[#A0A0AB] leading-relaxed font-medium mb-6">
                      {update.description}
                    </p>
                    <button className="flex items-center gap-2 text-[12px] font-extrabold text-blue-600 dark:text-[#8CB4FC] group/btn">
                      Explore this update 
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </button>
                  </div>
                  
                  {/* Icon Block */}
                   <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-100 dark:border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <div className="w-6 h-6">{update.icon}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
