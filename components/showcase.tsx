import { Star } from "lucide-react";

export function Showcase() {
  const reviews = [
    { name: 'Sarah Jenkins', role: 'Product Manager', img: '43', text: 'Testimo has completely transformed how we collect feedback. The UI is stunning and our customers love it.', grad: 'from-blue-400 to-purple-400' },
    { name: 'Mark Davis', role: 'Freelance Developer', img: '33', text: 'Setting up my first collection form took less than 2 minutes. The embed code works perfectly on Webflow.', grad: 'from-green-400 to-emerald-600', offset: true },
    { name: 'Elena Rodriguez', role: 'Marketing Director', img: '44', text: 'The video testimonial feature is a game changer. Seeing real faces builds so much more trust.', grad: 'from-orange-400 to-red-500' }
  ];

  return (
    <section className="py-16 md:py-20 relative z-10 w-full px-4 transition-colors bg-white dark:bg-[#050505]" id="showcase">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-[24px] md:rounded-[32px] p-6 md:p-16 relative overflow-hidden transition-colors bg-[#f8faff] dark:bg-[#121626]">
          <div className="relative z-10 text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors text-gray-900 dark:text-white">Ready to showcase your love?</h2>
            <p className="text-sm max-w-lg mx-auto leading-relaxed transition-colors text-gray-500 dark:text-[#9EADC8] px-4">
              This is exactly how your "Wall of Love" will look on your website. Clean, responsive, and trustworthy.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className={`rounded-2xl p-6 text-left border transition-colors ${review.offset ? 'md:translate-y-6' : ''} bg-[#F8FAFF] border-gray-200/50 dark:bg-[#1C233A] dark:border-white/5`}>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 transition-colors text-gray-700 dark:text-white/90">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t transition-colors border-gray-200 dark:border-white/10">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm overflow-hidden ${review.grad}`}>
                    <img src={`https://i.pravatar.cc/150?img=${review.img}`} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold transition-colors text-gray-900 dark:text-white truncate">{review.name}</div>
                    <div className="text-xs transition-colors text-gray-500 dark:text-white/50 truncate">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
