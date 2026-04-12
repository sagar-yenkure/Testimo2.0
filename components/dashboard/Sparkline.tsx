"use client";

interface SparklineProps {
    points: string;
    color: string;
    fill: string;
    className?: string;
}

export const Sparkline = ({ points, color, fill, className }: SparklineProps) => (
    <div className={`w-[60px] h-[24px] ml-4 opacity-80 hidden sm:block mt-1 ${className}`}>
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={fill} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={fill} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`0,30 ${points} 100,30`} fill={`url(#grad-${color.replace('#', '')})`} />
            <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);
