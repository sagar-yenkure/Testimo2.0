"use client";

import React from "react";
import { 
  Search, BookOpen, MessageCircle, Bug, 
  Lightbulb, ArrowRight, LifeBuoy
} from "lucide-react";

export function HelpCenterView() {
  const categories = [
    { title: "Getting Started", icon: <BookOpen size={20} className="text-blue-500" />, articles: "WIP" },
    { title: "Widgets & Embeds", icon: <Zap size={20} className="text-amber-500" />, articles: "WIP" },
    { title: "Integrations", icon: <ShieldCheck size={20} className="text-emerald-500" />, articles: "WIP" },
    { title: "Video Setup", icon: <div className="text-rose-500 text-lg">▶️</div>, articles: "WIP" },
  ];

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Dashboard Style Header */}
      <div className="px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Help Center</h2>
          <p className="text-[13px] text-slate-500 dark:text-[#82828C] mt-1 font-medium">Guides and resources to help you succeed.</p>
        </div>
      </div>

      <div className="px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white dark:bg-[#121216] p-6 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all cursor-pointer shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-4">
                {cat.icon}
              </div>
              <h3 className="text-[14px] font-extrabold text-slate-900 dark:text-white mb-1">{cat.title}</h3>
              <div className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded text-[8px] font-black uppercase tracking-widest text-slate-400 inline-block">
                {cat.articles}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 dark:bg-[#1A1A22] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5">
          <div>
            <h2 className="text-lg font-bold mb-1">Need direct help?</h2>
            <p className="text-slate-400 text-[13px] font-medium">Our team is working on the live support system.</p>
          </div>
          <button className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-[13px] hover:bg-slate-100 transition-all active:scale-95 shadow-lg">
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
}

import { Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
