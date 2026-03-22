"use client";

import {
  Video,
  PenTool,
  Bot,
  Filter,
  Globe,
  PieChart,
  type LucideIcon,
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MouseEvent } from "react";

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Video,
    title: "Video Testimonials",
    text: "Collect authentic video shoutouts from your happy customers directly through the browser.",
  },
  {
    icon: PenTool,
    title: "Custom Branding",
    text: "Make the testimonial forms match your brand identity with custom colors, logos, and fonts.",
  },
  {
    icon: Bot,
    title: "AI Summaries",
    text: "Automatically generate short, punchy quotes from long text testimonials using our AI engine.",
  },
  {
    icon: Filter,
    title: "Spam Filtering",
    text: "Keep your inbox clean with built-in spam protection and manual approval processes.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    text: "Collect testimonials in over 20+ languages to support your global user base.",
  },
  {
    icon: PieChart,
    title: "Analytics Dashboard",
    text: "Track drop-off rates, video completion stats, and overall sentiment of customer feedback.",
  },
];

function bentoCellClass(index: number) {
  return cn(
    index === 0 && "lg:col-span-3 lg:row-span-2 lg:min-h-[min(320px,40vh)]",
    index === 1 && "lg:col-span-3",
    index === 2 && "lg:col-span-3",
    (index === 3 || index === 4 || index === 5) && "lg:col-span-2"
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const Icon = feature.icon;
  const isHero = index === 0;

  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mx.set(((clientX - left) / width) * 100);
    my.set(((clientY - top) / height) * 100);
  }

  function handleMouseLeave() {
    mx.set(50);
    my.set(50);
  }

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(45, 108, 255, 0.22), transparent 50%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6 md:p-7",
        "border border-gray-200/90 bg-card-bg/95 backdrop-blur-md",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.55)_inset] dark:shadow-none",
        "transition-[box-shadow,border-color] duration-300 ease-out",
        "hover:border-[#2D6CFF]/35 hover:shadow-xl hover:shadow-[#2D6CFF]/10",
        "dark:border-white/10 dark:bg-white/4 dark:backdrop-blur-xl",
        "dark:hover:border-[#2D6CFF]/40 dark:hover:shadow-[#2D6CFF]/20",
        "lg:justify-between",
        isHero && "lg:gap-6",
        bentoCellClass(index)
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-[#2D6CFF]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      >
        <div className="absolute -inset-px rounded-2xl bg-linear-to-r from-transparent via-white/25 to-transparent opacity-40 blur-sm dark:via-white/10" />
      </div>

      <div
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center rounded-xl border border-[#2D6CFF]/20 bg-[#2D6CFF]/10 text-[#2D6CFF] transition-all duration-300 group-hover:scale-105 group-hover:border-[#2D6CFF]/40 group-hover:bg-[#2D6CFF]/18 dark:border-[#2D6CFF]/30 dark:bg-[#2D6CFF]/15",
          isHero ? "h-14 w-14 lg:h-16 lg:w-16" : "h-12 w-12"
        )}
      >
        <Icon
          className={cn(isHero ? "h-7 w-7 lg:h-8 lg:w-8" : "h-6 w-6")}
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex flex-col gap-2 text-left">
        <h3
          className={cn(
            "font-bold leading-tight tracking-tight text-gray-900 dark:text-white",
            isHero ? "text-xl md:text-2xl" : "text-lg"
          )}
        >
          {feature.title}
        </h3>
        <p
          className={cn(
            "leading-relaxed text-gray-500 dark:text-zinc-400",
            isHero ? "text-sm md:text-base" : "text-sm"
          )}
        >
          {feature.text}
        </p>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section
      className="relative z-10 w-full border-y border-gray-100 bg-background py-16 transition-colors duration-300 dark:border-white/5 md:py-24"
      id="features"
    >
      <div className="px-6">
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 transition-colors dark:text-[#2D6CFF]">
              POWERFUL FEATURES
            </div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 transition-colors dark:text-white md:text-4xl">
              Everything you need to showcase social proof
            </h2>
          </div>
        </div>

        <div className="relative rounded-[28px] border border-gray-200/70 p-4 shadow-sm dark:border-white/[0.07] dark:shadow-none md:p-5">
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
            aria-hidden
          >
            <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
            <div
              className="absolute inset-0 opacity-90 dark:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse 85% 60% at 50% -10%, rgba(45, 108, 255, 0.11), transparent 55%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.55] dark:opacity-[0.35]"
              style={{
                backgroundImage: [
                  "linear-gradient(to right, rgba(148, 163, 184, 0.09) 1px, transparent 1px)",
                  "linear-gradient(to bottom, rgba(148, 163, 184, 0.09) 1px, transparent 1px)",
                ].join(","),
                backgroundSize: "28px 28px",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
              style={{
                backgroundImage: [
                  "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
                ].join(","),
                backgroundSize: "7px 7px",
              }}
            />
            <div
              className="absolute inset-0 mix-blend-overlay opacity-[0.45] dark:opacity-[0.28] dark:mix-blend-soft-light"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
                backgroundSize: "256px 256px",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/40 dark:to-background/60" />
          </div>

          <div
            className={cn(
              "relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5",
              "lg:grid-cols-6 lg:grid-rows-[auto_auto_auto] lg:grid-flow-dense lg:gap-4"
            )}
          >
            {features.map((feat, idx) => (
              <FeatureCard key={feat.title} feature={feat} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
