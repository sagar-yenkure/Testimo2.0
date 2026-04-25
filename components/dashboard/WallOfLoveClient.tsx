"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, LayoutGrid, Columns, Palette, 
  Moon, Sun, Box, Code2, Check, ExternalLink, Play
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WallOfLove } from "@/components/wall-of-love";
import { Testimonial } from "@/types";
import { toast } from "sonner";
import BreadcrumbNav from "@/components/breadrcrumb";

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sagar Y",
    avatar: "https://i.pravatar.cc/150?u=sagar",
    ratingPos: "name",
    rating: 5,
    badge: { label: "LIKED", css: "text-amber-600 dark:text-[#F3B664] bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 shadow-sm" },
    content: "TestimonialPro has completely changed how we collect social proof. The workflow is seamless, and the widgets look amazing on our landing page. Highly recommended for any SaaS founder.",
    date: "Sep 28, 2023",
  },
  {
    id: "2",
    name: "John Doe",
    title: "Product Designer",
    initials: "JD",
    bg: "bg-indigo-900",
    ratingPos: "bottom",
    rating: 5,
    badge: { label: "TEXT", css: "text-slate-600 dark:text-[#82828C] bg-slate-100 dark:bg-[#1C1C21] border border-slate-200 dark:border-[#2B2B33]" },
    content: "Love the 'Obsidian Logic' aesthetic. It fits perfectly with our dark mode product. The API integration was a breeze. We're now displaying real reviews in our app dashboard thanks to you guys.",
    date: "Sep 28, 2023",
  },
  {
    id: "3",
    name: "Elena K.",
    title: "E-commerce Owner",
    initials: "EK",
    bg: "bg-purple-900",
    ratingPos: "none",
    badge: { label: "TEXT", css: "text-slate-600 dark:text-[#82828C] bg-slate-100 dark:bg-[#1C1C21] border border-slate-200 dark:border-[#2B2B33]" },
    content: "We saw a 15% increase in conversion rates after adding the 'Wall of Love' to our checkout page. The social proof is undeniable.",
    date: "Sep 15, 2023",
  },
  {
    id: "4",
    isVideo: true,
    name: "Amanda Chen",
    ratingPos: "right",
    rating: 5,
    content: "\"The video quality is crystal clear and the recording experience was so easy for my clients.\""
  },
  {
    id: "5",
    name: "Marcus R",
    avatar: "https://i.pravatar.cc/150?img=11",
    ratingPos: "name",
    rating: 5,
    badge: { label: "LIKED", css: "text-amber-600 dark:text-[#F3B664] bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 shadow-sm" },
    content: "The best tool for gathering video testimonials. Simple, effective, and beautiful.",
  },
  {
    id: "6",
    name: "Tim Howard",
    avatar: "https://i.pravatar.cc/150?img=12",
    ratingPos: "name",
    rating: 5,
    content: "Fantastic support team. They helped me set up my custom domain in minutes. The obsidian theme is just the icing on the cake. Five stars all around.",
  }
];

export default function WallOfLoveClient() {
  const { space } = useParams();
  const router = useRouter();
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry");
  const [theme, setTheme] = useState<"light" | "dark" | "glass">("dark");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [isCopied, setIsCopied] = useState(false);

  const spaceName = typeof space === 'string' ? space.replace(/-/g, ' ') : 'Space';

  const embedCode = `<script src="https://testimo.io/widget.js" data-id="${space}" data-layout="${layout}" data-theme="${theme}" data-color="${primaryColor}"></script><div id="testimo-wall"></div>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setIsCopied(true);
    toast.success("Code copied!", { description: "Paste this in your website's <head> or <body>." });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#09090C] transition-colors duration-300">
      {/* Header / Top Control Bar */}
      <header className="px-6 py-4 bg-white dark:bg-[#0D0D12] border-b border-slate-200 dark:border-white/5 flex flex-col gap-4 z-40 lg:flex-row lg:items-center lg:justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="hidden sm:block">
            <BreadcrumbNav items={[{ label: spaceName, href: `/dashboard/${space}` }, { label: "Wall of Love" }]} />
            <h1 className="text-lg font-bold">Widget Customizer</h1>
          </div>
        </div>

        {/* Customization Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
            {/* Layout Toggle */}
            <div className="flex p-0.5 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                <button onClick={() => setLayout("masonry")} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${layout === "masonry" ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-md" : "text-slate-400"}`}>
                    <Columns size={14} /> Masonry
                </button>
                <button onClick={() => setLayout("grid")} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${layout === "grid" ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-md" : "text-slate-400"}`}>
                    <LayoutGrid size={14} /> Grid
                </button>
            </div>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1 shrink-0" />

            {/* Theme Select */}
            <div className="flex gap-1">
                {[
                    { id: "dark", icon: <Moon size={14} />, label: "Dark" },
                    { id: "light", icon: <Sun size={14} />, label: "Light" },
                    { id: "glass", icon: <Box size={14} />, label: "Glass" }
                ].map((t) => (
                    <button 
                        key={t.id}
                        onClick={() => setTheme(t.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 border ${theme === t.id ? "bg-blue-600 dark:bg-[#2D6CFF] text-white border-blue-500 shadow-lg shadow-blue-500/20" : "bg-transparent text-slate-400 border-transparent hover:bg-slate-200 dark:hover:bg-white/5"}`}
                    >
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1 shrink-0" />

            {/* Color Picker */}
            <div className="flex items-center gap-1 px-2">
                {["#3B82F6", "#6366F1", "#8B5CF6", "#10B981"].map((c) => (
                    <button 
                        key={c}
                        onClick={() => setPrimaryColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${primaryColor === c ? "border-white dark:border-slate-400 scale-110 shadow-md" : "border-transparent opacity-50 hover:opacity-100"}`}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={copyCode}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[13px] font-bold bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition-all shadow-xl active:scale-95"
          >
            {isCopied ? <Check size={16} /> : <Code2 size={16} />}
            {isCopied ? "Copied!" : "Embed Code"}
          </button>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-100 dark:bg-[#121216]">
        <div className="max-w-[1400px] mx-auto p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
                 <div className="text-[11px] font-black tracking-[0.2em] uppercase mb-3 text-blue-600 dark:text-[#2D6CFF]">LIVE PREVIEW</div>
                 <h2 className="text-3xl font-extrabold tracking-tight">Your Wall of Love</h2>
            </div>
            <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 dark:text-[#6A6A75] bg-white dark:bg-white/5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Updating in real-time
            </div>
          </div>

          <div className={`w-full rounded-[40px] p-8 md:p-12 transition-all duration-500 shadow-2xl overflow-hidden min-h-[700px] border relative ${
            theme === "dark" ? "bg-[#09090C] border-white/5" : 
            theme === "light" ? "bg-white border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]" : 
            "bg-white/10 backdrop-blur-3xl border-white/20"
          }`}>
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

             <div className="relative z-10 w-full">
                <WallOfLove 
                  testimonials={MOCK_TESTIMONIALS} 
                  layout={layout} 
                  theme={theme} 
                  primaryColor={primaryColor}
                />
             </div>
          </div>

          <div className="mt-16 text-center pb-20">
             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
                <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-[#666] uppercase">Powered by Testimo 2.0</span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Professional Edition</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
