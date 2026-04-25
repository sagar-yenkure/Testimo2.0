"use client";

import React from "react";
import { Play, CheckCircle2, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Testimonial } from "@/types";
import { Stars } from "@/components/dashboard/Stars";

interface WallOfLoveProps {
  testimonials: Testimonial[];
  layout?: "masonry" | "grid" | "carousel";
  theme?: "light" | "dark" | "glass";
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  primaryColor?: string;
}

export function WallOfLove({
  testimonials,
  layout = "masonry",
  theme = "dark",
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  primaryColor = "#3B82F6",
}: WallOfLoveProps) {

  const getContainerClasses = () => {
    if (layout === "masonry") {
      return "columns-1 md:columns-2 lg:columns-3 gap-3 space-y-2";
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3";
  };

  return (
    <div className={getContainerClasses()}>
      {testimonials.map((testimonial, idx) => (
        <div key={testimonial.id} className={layout === "masonry" ? "break-inside-avoid" : ""}>
          <TestimonialWidgetCard
            testimonial={testimonial}
            theme={theme}
            primaryColor={primaryColor}
            index={idx}
          />
        </div>
      ))}
    </div>
  );
}

function TestimonialWidgetCard({
  testimonial,
  theme,
  primaryColor,
  index
}: {
  testimonial: Testimonial;
  theme: "light" | "dark" | "glass";
  primaryColor: string;
  index: number;
}) {
  const isDark = theme === "dark" || theme === "glass";

  const cardStyles = {
    dark: "bg-[#141417] border-[#1F1F24] text-white shadow-none",
    light: "bg-white border-slate-100 text-slate-900 shadow-sm",
    glass: "bg-white/10 backdrop-blur-3xl border-white/20 text-white shadow-2xl"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -5, borderColor: primaryColor + "50", transition: { duration: 0.2 } }}
      className={`relative w-full flex flex-col p-5 rounded-2xl border transition-all duration-300 group overflow-hidden ${cardStyles[theme]}`}
    >
      {/* Video Indicator / Thumbnail (Dashboard Inspiration) */}
      {testimonial.isVideo && (
        <div className={`w-full aspect-[16/10] rounded-xl mb-4 relative overflow-hidden flex items-center justify-center shadow-inner ${isDark ? 'bg-[#1F1F24]' : 'bg-slate-50'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60"></div>
          <div className="relative w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition shadow-xl border border-white/10">
            <Play className="w-5 h-5 text-white fill-white ml-1 opacity-90" />
          </div>
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            <span className="bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider">VIDEO</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center w-full min-w-0">
          {!testimonial.isVideo && (
            testimonial.avatar ? (
              <img src={testimonial.avatar} alt={testimonial.name} className={`w-10 h-10 rounded-full object-cover shrink-0 border ${isDark ? 'border-white/5' : 'border-black/5'}`} />
            ) : (
              <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold text-white shadow-inner ${testimonial.bg || 'bg-blue-600'}`}>
                {testimonial.initials}
              </div>
            )
          )}

          <div className={`${testimonial.isVideo ? 'w-full min-w-0' : 'min-w-0'}`}>
            <div className={`flex items-center ${testimonial.isVideo ? 'justify-between' : 'gap-2'}`}>
              <div className={`text-[14.5px] font-bold leading-none truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{testimonial.name}</div>
              {testimonial.ratingPos === "right" && <Stars count={testimonial.rating} color={primaryColor} />}
            </div>

            {!testimonial.isVideo && testimonial.title && (
              <div className={`text-[11px] mt-1.5 truncate font-medium ${isDark ? 'text-[#82828C]' : 'text-slate-500'}`}>{testimonial.title}</div>
            )}

            {testimonial.ratingPos === "name" && (
              <div className="mt-1.5"><Stars count={testimonial.rating} color={primaryColor} /></div>
            )}
          </div>
        </div>
      </div>

      <p className={`text-[13px] leading-relaxed mb-4 ${testimonial.isVideo ? 'italic' : ''} ${isDark ? 'text-[#A0A0AB]' : 'text-slate-600'}`}>
        "{testimonial.content}"
      </p>

      {testimonial.ratingPos === "bottom" && (
        <div className="mt-auto pt-2"><Stars count={testimonial.rating} color={primaryColor} /></div>
      )}

      {/* Date and Authenticity Check (Dashboard Style) */}
      <div className={`flex justify-between items-center mt-4 pt-4 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
        <div className={`text-[10px] font-bold tracking-wider uppercase ${isDark ? 'text-[#555]' : 'text-slate-400'}`}>
          {testimonial.date}
        </div>

      </div>

      {/* Decorative Brand Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 40px ${primaryColor}` }}
      />
    </motion.div>
  );
}
