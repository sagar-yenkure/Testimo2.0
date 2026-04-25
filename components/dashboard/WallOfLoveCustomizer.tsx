"use client";

import React, { useState } from "react";
import {
  LayoutGrid, Columns, Palette,
  Moon, Sun, Box, Code2, Check, ExternalLink, RefreshCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WallOfLove } from "@/components/wall-of-love";
import { Testimonial } from "@/types";
import { toast } from "sonner";

interface WallOfLoveCustomizerProps {
  spaceId: string;
  initialTestimonials: Testimonial[];
}

export function WallOfLoveCustomizer({ spaceId, initialTestimonials }: WallOfLoveCustomizerProps) {
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry");
  const [theme, setTheme] = useState<"light" | "dark" | "glass">("dark");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [isCopied, setIsCopied] = useState(false);

  const embedCode = `<script src="https://testimo.io/widget.js" data-id="${spaceId}" data-layout="${layout}" data-theme="${theme}" data-color="${primaryColor}"></script><div id="testimo-wall"></div>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setIsCopied(true);
    toast.success("Code copied!", { description: "Paste this in your website's <head> or <body>." });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#09090C] transition-all duration-500">
      {/* Top Customization Bar */}
      <div className="sticky top-0 z-30 px-6 py-3 bg-white/70 dark:bg-[#0D0D12]/70 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/5">
            <button onClick={() => setLayout("masonry")} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${layout === "masonry" ? "bg-white dark:bg-white text-black shadow-md border border-slate-200" : "text-slate-400 font-medium"}`}>
              <Columns size={14} /> Masonry
            </button>
            <button onClick={() => setLayout("grid")} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${layout === "grid" ? "bg-white dark:bg-white text-black shadow-md border border-slate-200" : "text-slate-400 font-medium"}`}>
              <LayoutGrid size={14} /> Grid
            </button>
          </div>

          <div className="flex gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/5">
            {[
              { id: "dark", icon: <Moon size={14} /> },
              { id: "light", icon: <Sun size={14} /> },
              { id: "glass", icon: <Box size={14} /> }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === t.id ? "bg-white dark:bg-[#2D6CFF] text-blue-600 dark:text-white shadow-sm border border-slate-200 dark:border-blue-500" : "text-slate-400"}`}
              >
                {t.icon}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-1.5">
              {["#3B82F6", "#6366F1", "#8B5CF6", "#10B981"].map((c) => (
                <button
                  key={c}
                  onClick={() => setPrimaryColor(c)}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${primaryColor === c ? "border-white dark:border-slate-400 scale-110 shadow-md" : "border-transparent opacity-50 hover:opacity-100"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="w-[1px] h-4 bg-slate-300 dark:bg-white/10 mx-1" />
            <div className="relative">
              <input 
                type="color" 
                value={primaryColor} 
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <button className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-blue-500`}>
                <Palette size={14} style={{ color: primaryColor }} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            {isCopied ? <Check size={14} /> : <Code2 size={14} />}
            {isCopied ? "Copied!" : "Embed Code"}
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-slate-100 dark:bg-[#121216]">
        <div className="max-w-[1400px] mx-auto">

          <div className={`p-8 md:p-14 transition-all duration-700 shadow-2xl overflow-hidden min-h-[600px] border relative ${theme === "dark" ? "bg-[#09090C] border-white/5" :
            theme === "light" ? "bg-white border-slate-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]" :
              "bg-white/10 backdrop-blur-3xl border-white/20 shadow-none"
            }`}>
            {/* Glows */}
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full animate-in fade-in duration-700 slide-in-from-bottom-4">
              <WallOfLove
                testimonials={initialTestimonials}
                layout={layout}
                theme={theme}
                primaryColor={primaryColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
