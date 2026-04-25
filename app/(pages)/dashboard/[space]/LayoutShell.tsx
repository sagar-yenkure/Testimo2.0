"use client";

import React, { useState } from "react";
import { DetailSidebar } from "@/components/dashboard/DetailSidebar";
import BreadcrumbNav from "@/components/breadrcrumb";
import { Menu, Link as LinkIcon, Check } from "lucide-react";
import { toast } from "sonner";

interface LayoutShellProps {
  children: React.ReactNode;
  spaceName: string;
}

export default function LayoutShell({ children, spaceName }: LayoutShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    toast.success("Link Copied!", { description: "The public link has been safely copied to your clipboard." });
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#09090C]">
      <DetailSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto relative h-full min-w-0 no-scrollbar">
        <div className="sticky top-0 z-50 px-6 pt-4 pb-2 bg-slate-50/70 dark:bg-[#09090C]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5">
          <div className="pt-2">
            <BreadcrumbNav items={[{ label: spaceName }]} />
          </div>

          <div className="flex items-center justify-between py-4 lg:py-2 border-y lg:border-none border-slate-200 dark:border-[#1F1F24] mt-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-100 dark:border-white/5"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1" />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold border h-11 text-[13px] ${
                isCopied
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-[#65E3AD] border-emerald-200 dark:border-emerald-500/20"
                  : "bg-slate-100 dark:bg-[#1A1A20] border-slate-200 dark:border-[#2A2A35] text-slate-800 dark:text-white"
              }`}
            >
              {isCopied ? <Check size={14} /> : <LinkIcon size={14} />}
              {isCopied ? "Copied!" : "Copy Public Link"}
            </button>
          </div>
        </div>

        <div className="h-full">
            {children}
        </div>
      </main>
    </div>
  );
}
