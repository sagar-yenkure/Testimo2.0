"use client";

import { Star, Heart } from "lucide-react";

import { motion } from "framer-motion";


export function Showcase() {
  const reviews = [
    { name: 'Sarah Jenkins', role: 'Product Manager', img: '43', text: 'Testimo has completely transformed how we collect feedback. The UI is stunning and our customers love it.', grad: 'from-blue-400 to-purple-400' },
    { name: 'Mark Davis', role: 'Freelance Developer', img: '33', text: 'Setting up my first collection form took less than 2 minutes. The embed code works perfectly on Webflow.', grad: 'from-green-400 to-emerald-600', offset: true },
    { name: 'Elena Rodriguez', role: 'Marketing Director', img: '44', text: 'The video testimonial feature is a game changer. Seeing real faces builds so much more trust.', grad: 'from-orange-400 to-red-500' }
  ];

  return (
    <section className="py-16 md:py-24 relative z-10 w-full transition-colors duration-300 bg-background" id="showcase">
      <div className="px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 transition-colors text-blue-600 dark:text-[#2D6CFF]"
            >
              WALL OF LOVE
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold max-w-xl leading-tight transition-colors text-gray-900 dark:text-white tracking-tight"
            >
              Ready to showcase <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">your love?</span>
            </motion.h2>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (idx + 1) }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-[32px] p-8 md:p-10 text-left border transition-all duration-500 ${review.offset ? 'md:translate-y-12' : ''} bg-card-bg border-gray-100 hover:border-blue-400/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] dark:border-white/5 dark:hover:border-blue-500/30 dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden`}
            >
              {/* Background Glow */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-500" />

              <div className="relative z-10 flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-sm" />)}
              </div>

              <p className="relative z-10 text-[16px] md:text-[17px] leading-relaxed mb-10 transition-colors text-gray-600 dark:text-gray-300 font-medium">
                "{review.text}"
              </p>

              <div className="relative z-10 flex items-center gap-4 mt-auto">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br p-[2.5px] shadow-lg transition-transform group-hover:scale-105 duration-500 ${review.grad}`}>
                  <div className="w-full h-full rounded-full border-2 border-white dark:border-[#0A0A0A] overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/150?img=${review.img}`} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[16px] font-extrabold transition-colors text-gray-900 dark:text-white leading-tight">{review.name}</div>
                  <div className="text-xs font-semibold tracking-wide transition-colors text-gray-400 dark:text-gray-500 mt-1.5 uppercase">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
