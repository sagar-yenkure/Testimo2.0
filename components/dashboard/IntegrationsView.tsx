"use client";

import React from "react";
import { 
  ArrowRight, Check, Search, Filter, ShieldCheck, Zap
} from "lucide-react";
import { motion } from "framer-motion";

const INTEGRATIONS = [
  {
    id: "twitter",
    name: "X / Twitter",
    description: "Import testimonials directly from tweets and threads.",
    icon: <div className="w-full h-full bg-[#1DA1F2] rounded-xl flex items-center justify-center text-white font-bold text-lg">X</div>,
    status: "connected",
    count: 12
  },
  {
    id: "google",
    name: "Google Reviews",
    description: "Sync your GMB reviews to your wall automatically.",
    icon: <div className="w-full h-full bg-[#4285F4] rounded-xl flex items-center justify-center text-white font-bold text-lg">G</div>,
    status: "available",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Convert recommendations into social proof.",
    icon: <div className="w-full h-full bg-[#0077B5] rounded-xl flex items-center justify-center text-white font-bold text-lg">L</div>,
    status: "available",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Show off stars and positive issue comments.",
    icon: <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg">G</div>,
    status: "connected",
    count: 45
  },
  {
    id: "slack",
    name: "Slack",
    description: "Collect kudos directly from your team channels.",
    icon: <div className="w-full h-full bg-[#4A154B] rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>,
    status: "available",
  },
  {
    id: "producthunt",
    name: "Product Hunt",
    description: "Import reviews and upvotes from your launches.",
    icon: <div className="w-full h-full bg-[#DA552F] rounded-xl flex items-center justify-center text-white font-bold text-lg">P</div>,
    status: "available",
  }
];

export function IntegrationsView() {
  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Search & Filter - Dashboard Style */}
      <div className="px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Integrations</h2>
          <p className="text-[13px] text-slate-500 dark:text-[#82828C] mt-1 font-medium">Connect your favorite tools to import social proof.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[13px] focus:outline-none transition-all w-[200px]"
              />
           </div>
        </div>
      </div>

      <div className="px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INTEGRATIONS.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-11 h-11 rounded-1.5xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center shadow-inner">
                   <div className="w-8 h-8">{app.icon}</div>
                </div>
                
                {app.status === "connected" ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-[#65E3AD] rounded-lg text-[9px] font-black uppercase tracking-wider border border-emerald-100 dark:border-emerald-500/20">
                    <Check size={10} strokeWidth={4} /> Active
                  </div>
                ) : (
                  <div className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-[#555] rounded-lg text-[9px] font-black uppercase tracking-wider border border-slate-200 dark:border-white/5">
                    WIP
                  </div>
                )}
              </div>

              <h3 className="text-[15px] font-extrabold text-slate-900 dark:text-white mb-1.5">{app.name}</h3>
              <p className="text-[12.5px] text-slate-500 dark:text-[#82828C] leading-relaxed mb-6 font-medium">
                {app.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-white/5">
                <div className="text-[10px] font-bold text-slate-400 dark:text-[#555] uppercase tracking-widest">
                  {app.status === "connected" ? `${app.count} Imports` : "Coming Soon"}
                </div>

                <button className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[11px] font-bold transition-all active:scale-95 ${
                  app.status === "connected" 
                    ? "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-[#82828C] hover:bg-slate-200" 
                    : "bg-slate-50 dark:bg-white/5 text-slate-400 cursor-not-allowed opacity-50"
                }`}>
                  {app.status === "connected" ? "Manage" : "Notify Me"}
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
