"use client";

import Link from "next/link";
import { ArrowRight, Play, LockIcon, Star, CheckCircle2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 md:pt-36 pb-16 md:pb-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 max-w-5xl text-[#111827] dark:text-white transition-colors leading-[1.05]"
      >
        Collect stunning testimonials that{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          grow your SaaS faster.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[15px] md:text-[16px] max-w-xl mb-10 leading-relaxed text-gray-500 dark:text-gray-400 transition-colors"
      >
        Testimo helps SaaS teams build smarter onboarding, qualification, and
        testimonial collection forms — with AI-powered logic and real-time analytics.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 w-full"
      >
        <Link
          href="#"
          className="w-[90%] sm:w-auto group flex items-center justify-center gap-2 bg-[#2D6CFF] hover:bg-[#2057d5] text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-500/20 text-[14px] md:text-[15px]"
        >
          Build your first form
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="#"
          className="w-[90%] sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 dark:bg-[#1A1A1A] dark:hover:bg-[#222] dark:text-white dark:border-white/10 transition-colors shadow-sm text-[14px] md:text-[15px]"
        >
          <Play className="w-4 h-4 transition-colors text-blue-600 fill-blue-600 dark:text-[#2D6CFF] dark:fill-[#2D6CFF]" />
          Watch a demo
        </Link>
      </motion.div>

      {/* Mobile-only chips */}
      <div className="md:hidden flex flex-wrap justify-center gap-3 mb-12">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-xs font-medium">Free forever plan</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium">4.9/5 Rating</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
          <MessageSquare className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-medium">Setup in 2 mins</span>
        </div>
      </div>

      {/* Browser Mockup — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="hidden md:block w-full rounded-[24px] overflow-hidden border mb-20 relative z-20
          bg-white border-gray-200
          shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]
          dark:bg-[#111] dark:border-white/10
          dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]
          transition-all duration-300"
      >
        {/* iframe — fills remaining space, no aspect ratio wrapper */}
        <div className="w-full" style={{ height: "690px" }}>
          <iframe
            src="/testimo-hero-video.html"
            className="w-full h-full border-none block"
            title="Testimo Product Preview"
            scrolling="no"
          />
        </div>
      </motion.div>
    </section>
  );
}