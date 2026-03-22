"use client";

import { Fragment } from "react";
import { Share2, Code2, Settings2, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Settings2,
    title: "1. Create Space",
    text: "Create a dedicated form (Space) for your product. Customize questions and branding in seconds.",
  },
  {
    icon: Share2,
    title: "2. Share Link",
    text: "Send your unique link to customers via email, social media, or embed it directly on your site.",
  },
  {
    icon: Code2,
    title: "3. Embed Wall",
    text: 'Copy a simple line of code to display your collected testimonials in a beautiful "Wall of Love".',
  },
];

function StepIcon({
  icon: Icon,
  index,
}: {
  icon: LucideIcon;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={cn(
        "relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-[#2D6CFF]/25",
        "bg-[#2D6CFF]/10 text-[#2D6CFF] shadow-sm",
        "dark:border-[#2D6CFF]/35 dark:bg-[#2D6CFF]/15 dark:shadow-[0_8px_30px_-8px_rgba(45,108,255,0.35)]"
      )}
    >
      <Icon className="size-6" aria-hidden />
    </motion.div>
  );
}

export function Steps() {
  return (
    <section
      className="relative z-10 w-full bg-background py-16 transition-colors duration-300 md:py-24"
      id="how-it-works"
    >
      <div className="px-6">
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 transition-colors dark:text-[#2D6CFF]">
              HOW IT WORKS
            </div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 transition-colors dark:text-white md:text-4xl">
              Three steps to collect testimonials.
            </h2>
          </div>
        </div>

        <div className="relative rounded-[28px] border border-gray-200/70 p-6 shadow-sm dark:border-white/10 dark:shadow-none md:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
            aria-hidden
          >
            <div className="absolute inset-0 bg-background/85 dark:bg-background/90" />
            <div
              className="absolute inset-0 opacity-70 dark:opacity-50"
              style={{
                backgroundImage: [
                  "linear-gradient(to right, rgba(148, 163, 184, 0.07) 1px, transparent 1px)",
                  "linear-gradient(to bottom, rgba(148, 163, 184, 0.07) 1px, transparent 1px)",
                ].join(","),
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="absolute inset-0 opacity-90 dark:opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(45, 108, 255, 0.09), transparent 60%)",
              }}
            />
          </div>

          <div className="relative z-10">
            {/* 21st.dev horizontal Steps pattern: [icon][flex line][icon][flex line][icon] */}
            <div className="mb-10 hidden w-full items-center md:flex">
              {steps.map((step, i) => (
                <Fragment key={`icon-${step.title}`}>
                  <div className="flex shrink-0 justify-center">
                    <StepIcon icon={step.icon} index={i} />
                  </div>
                  {i < steps.length - 1 ? (
                    <div
                      className="mx-4 h-0.5 min-h-px min-w-6 flex-1 rounded-full bg-linear-to-r from-[#2D6CFF]/45 via-[#2D6CFF]/25 to-[#2D6CFF]/45 dark:from-[#2D6CFF]/55 dark:via-[#2D6CFF]/30 dark:to-[#2D6CFF]/55"
                      aria-hidden
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>

            {/* Copy aligned under each column (md+) */}
            <div className="hidden gap-6 md:grid md:grid-cols-3">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  className="text-center"
                >
                  <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mobile: vertical stack with connector (21st vertical pattern) */}
            <div className="flex flex-col gap-0 md:hidden">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <StepIcon icon={step.icon} index={i} />
                    {i < steps.length - 1 ? (
                      <div
                        className="mt-2 mb-2 w-0.5 flex-1 min-h-10 rounded-full bg-linear-to-b from-[#2D6CFF]/45 via-[#2D6CFF]/25 to-[#2D6CFF]/45 dark:from-[#2D6CFF]/55 dark:to-[#2D6CFF]/55"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1 pb-10 last:pb-0">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
