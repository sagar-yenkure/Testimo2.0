"use client";

import { Star } from "lucide-react";

interface StarsProps {
    count?: number;
    className?: string;
}

export const Stars = ({ count, className }: StarsProps) => {
    if (!count) return null;
    return (
        <div className={`flex gap-[3px] ${className}`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 ${i < count
                        ? "fill-emerald-500 text-emerald-500 dark:fill-[#65E3AD] dark:text-[#65E3AD]"
                        : "fill-slate-200 text-slate-200 dark:fill-[#2B2B33] dark:text-[#2B2B33]"
                        }`}
                />
            ))}
        </div>
    );
};
