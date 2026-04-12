"use client";

import { LucideIcon, Plus } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    description: string;
    icon: LucideIcon;
    actionLabel?: string;
    onAction?: () => void;
    illustration?: ReactNode;
    className?: string;
}

export const EmptyState = ({
    title,
    description,
    icon: Icon,
    actionLabel,
    onAction,
    illustration,
    className = ""
}: EmptyStateProps) => {
    return (
        <div className={`flex flex-col items-center justify-center py-16 px-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/10 transition-all duration-300 group/empty ${className}`}>
            <div className="relative mb-6">
                {/* Ambient glow behind icon */}
                <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/10 blur-2xl rounded-full scale-150 opacity-0 group-hover/empty:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative w-16 h-16 bg-white dark:bg-[#1A1A20] rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-white/5 group-hover/empty:scale-110 transition-transform duration-500 ease-out z-10">
                    {illustration || <Icon className="w-8 h-8 text-blue-600 dark:text-[#6C85FF] animate-in zoom-in slide-in-from-bottom-2 duration-700" />}
                </div>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight group-hover/empty:translate-y-[-2px] transition-transform duration-300">
                {title}
            </h3>
            
            <p className="text-slate-500 dark:text-[#82828C] text-[13px] text-center max-w-[280px] mb-8 leading-relaxed font-medium">
                {description}
            </p>

            {actionLabel && (
                <button 
                    onClick={onAction}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 dark:bg-[#6C85FF] text-white font-bold text-[14px] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95 transition-all duration-300 group/btn"
                >
                    <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
