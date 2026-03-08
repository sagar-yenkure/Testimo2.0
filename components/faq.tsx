import { Plus } from "lucide-react";

export function FAQ() {
  const faqs = [
    "How do I embed the testimonials?",
    "Can I moderate the testimonials before they show up?",
    "Do users need to login to submit a testimonial?"
  ];

  return (
    <section className="py-16 md:py-20 relative z-10 w-full border-y transition-colors bg-white border-transparent dark:bg-[#0A0A0A] dark:border-white/5" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 md:mb-10 text-center transition-colors text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((q, i) => (
            <div key={i} className="rounded-2xl p-6 flex justify-between items-center cursor-pointer transition-colors shadow-sm border bg-white border-gray-100 hover:border-gray-200 dark:bg-[#111] dark:border-white/10 dark:hover:border-white/20">
              <span className="font-medium text-[15px] transition-colors text-gray-900 dark:text-white">{q}</span>
              <Plus className="w-5 h-5 transition-colors text-gray-400 dark:text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
