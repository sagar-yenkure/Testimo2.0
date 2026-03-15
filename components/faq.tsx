"use client";

import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I embed the testimonials?",
      a: "Simply copy the one-line script tag from your dashboard and paste it anywhere in your website's HTML. It works with React, Vue, Webflow, Shopify, and more."
    },
    {
      q: "Can I moderate the testimonials before they show up?",
      a: "Yes! By default, all testimonials are set to 'Pending'. You can review, edit, and approve them manually before they appear on your Wall of Love."
    },
    {
      q: "Do users need to login to submit a testimonial?",
      a: "No. We've designed the submission process to be as frictionless as possible. Users can submit text or video testimonials without creating an account."
    },
    {
      q: "Is there a limit to how many testimonials I can collect?",
      a: "Our free plan allows up to 10 testimonials. The Pro and Business plans offer unlimited collection to help you scale your social proof."
    }
  ];

  return (
    <section className="py-16 md:py-24 relative z-10 w-full transition-colors duration-300 bg-background" id="faq">
      <div className=" px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 transition-colors text-blue-600 dark:text-[#2D6CFF]">HELP CENTER</div>
            <h2 className="text-3xl md:text-4xl font-extrabold max-w-xl leading-tight transition-colors text-gray-900 dark:text-white tracking-tight">
              Commonly Asked <span className="text-blue-600 dark:text-[#2D6CFF]">Questions</span>
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-[24px] overflow-hidden border transition-all duration-300 ${openIndex === i
                  ? "bg-gray-50 border-blue-200 dark:bg-white/5 dark:border-blue-500/30"
                  : "bg-card-bg border-gray-100 hover:border-gray-200 dark:border-white/5 dark:hover:border-white/10"
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex justify-between items-center text-left transition-colors"
              >
                <span className={`font-bold text-[16px] md:text-[18px] transition-colors ${openIndex === i ? "text-blue-600 dark:text-[#2D6CFF]" : "text-gray-900 dark:text-white"
                  }`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}>
                  <ChevronDown className={`w-5 h-5 transition-colors ${openIndex === i ? "text-blue-600 dark:text-[#2D6CFF]" : "text-gray-400 dark:text-gray-500"
                    }`} />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8">
                      <div className="h-[1px] w-full bg-gray-200 dark:bg-white/5 mb-6" />
                      <p className="text-[15px] md:text-[16px] leading-relaxed text-gray-600 dark:text-gray-400">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
