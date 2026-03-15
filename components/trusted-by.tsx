import { Box, Play } from "lucide-react";

export function TrustedBy() {
  return (
    <section className="py-12 md:py-16 border-t relative z-10 w-full backdrop-blur-sm transition-colors duration-300 border-gray-100 bg-background/50 dark:border-white/5">
      <div className="text-center px-4">
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 transition-colors text-gray-600 dark:text-gray-500">
          Trusted by 100+ SaaS Companies
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 opacity-60 transition-colors text-gray-900 dark:text-white">
          <div className="flex items-center gap-2 text-lg md:text-xl font-bold"><span className="stripe-font">stripe</span></div>
          <div className="flex items-center gap-2 text-lg md:text-xl font-bold"><Box className="w-5 h-5 md:w-6 md:h-6" /> Slack</div>
          <div className="flex items-center gap-2 text-lg md:text-xl font-bold"><Play className="w-5 h-5 md:w-6 md:h-6" /> Spotify</div>
          <div className="flex items-center gap-2 text-lg md:text-xl font-bold"><span className="text-xl md:text-2xl font-black">aws</span></div>
          <div className="flex items-center gap-2 text-lg md:text-xl font-bold"><Box className="w-5 h-5 md:w-6 md:h-6" /> Dropbox</div>
        </div>
      </div>
    </section>
  );
}
