import Link from "next/link";
import { ArrowRight, Video, PenTool, Bot, Filter, Globe, PieChart } from "lucide-react";

export function Features() {
  const features = [
    { icon: Video, title: 'Video Testimonials', text: 'Collect authentic video shoutouts from your happy customers directly through the browser.' },
    { icon: PenTool, title: 'Custom Branding', text: 'Make the testimonial forms match your brand identity with custom colors, logos, and fonts.' },
    { icon: Bot, title: 'AI Summaries', text: 'Automatically generate short, punchy quotes from long text testimonials using our AI engine.' },
    { icon: Filter, title: 'Spam Filtering', text: 'Keep your inbox clean with built-in spam protection and manual approval processes.' },
    { icon: Globe, title: 'Multi-Language', text: 'Collect testimonials in over 20+ languages to support your global user base.' },
    { icon: PieChart, title: 'Analytics Dashboard', text: 'Track drop-off rates, video completion stats, and overall sentiment of customer feedback.' }
  ];

  return (
    <section className="py-16 md:py-20 relative z-10 w-full border-y transition-colors bg-[#FAFAFA] border-gray-100 dark:bg-[#0A0A0A] dark:border-white/5" id="features">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div>
            <div className="text-[10px] font-bold tracking-wider uppercase mb-2 transition-colors text-blue-600 dark:text-[#2D6CFF]">POWERFUL FEATURES</div>
            <h2 className="text-3xl font-bold max-w-sm leading-tight transition-colors text-gray-900 dark:text-white">Everything you need to showcase social proof</h2>
          </div>
          <Link href="#" className="text-sm font-medium flex items-center gap-1 transition-colors text-blue-600 hover:text-blue-700 dark:text-[#2D6CFF] dark:hover:text-blue-400">
            View all features <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="p-6 rounded-[16px] transition-all shadow-sm bg-white border border-gray-100 hover:shadow-md dark:bg-[#111] dark:border-white/10 dark:hover:border-white/20">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/10">
                <feat.icon className="w-5 h-5 text-gray-600 dark:text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 transition-colors text-gray-900 dark:text-white">{feat.title}</h3>
              <p className="text-sm leading-relaxed transition-colors text-gray-500 dark:text-gray-400">{feat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
