"use client";

import { Star } from "lucide-react";

interface StarsProps {
    count?: number;
    className?: string;
    color?: string;
}

export const Stars = ({ count, className, color }: StarsProps) => {
    if (!count) return null;
    return (
        <div className={`flex gap-[3px] ${className}`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < count
                        ? "" 
                        : "fill-slate-200 text-slate-200 dark:fill-[#2B2B33] dark:text-[#2B2B33]"
                        }`}
                    style={i < count ? { fill: color || '#10B981', color: color || '#10B981' } : {}}
                />
            ))}
        </div>
    );
};
