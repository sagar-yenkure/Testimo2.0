import { Share2, Code2, Settings2 } from "lucide-react";

export function Steps() {
  const steps = [
    { icon: Settings2, title: '1. Create Space', text: 'Create a dedicated form (Space) for your product. Customize questions and branding in seconds.' },
    { icon: Share2, title: '2. Share Link', text: 'Send your unique link to customers via email, social media, or embed it directly on your site.' },
    { icon: Code2, title: '3. Embed Wall', text: 'Copy a simple line of code to display your collected testimonials in a beautiful "Wall of Love".' }
  ];

  return (
    <section className="py-16 md:py-20 relative z-10 w-full transition-colors bg-white dark:bg-[#050505]" id="how-it-works">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold mb-3 transition-colors text-gray-900 dark:text-white">Three steps to collect testimonials</h2>
          <p className="text-sm transition-colors text-gray-500 dark:text-gray-400 max-w-md mx-auto">Our process is designed to be frictionless for both you and your customers.</p>
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 mt-8 md:mt-16">
          <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] -z-10 transition-colors bg-blue-100 dark:bg-white/10" />
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center flex-1 w-full">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mb-6 transition-all bg-white border border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:bg-[#111] dark:border-white/10 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors bg-gray-50 dark:bg-white/5">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 md:mb-3 transition-colors text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed max-w-[260px] transition-colors text-gray-500 dark:text-gray-400">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
