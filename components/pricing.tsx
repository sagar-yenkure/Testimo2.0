"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    { name: 'Starter', price: '0', target: 'Perfect for hobby projects and personal portfolios.', features: ['1 Space', 'Up to 10 testimonials', 'Standard text forms'], disabled: ['Video testimonials'] },
    { name: 'Pro', price: '29', pop: true, target: 'For growing businesses and agencies.', features: ['10 Spaces', 'Unlimited testimonials', 'Video testimonials', 'Remove branding'] },
    { name: 'Business', price: '79', target: 'Advanced features for large teams.', features: ['Unlimited Spaces', 'Team members', 'API Access', 'Priority Support'] }
  ];

  return (
    <section className="py-24 md:py-32 relative z-10 w-full transition-colors duration-300 bg-background" id="pricing">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 transition-colors text-blue-600 dark:text-[#2D6CFF]">PRICING PLANS</div>
            <h2 className="text-3xl md:text-4xl font-extrabold max-w-xl leading-tight transition-colors text-gray-900 dark:text-white tracking-tight">Simple, transparent pricing</h2>
          </div>
        </div>

        <div className="flex justify-center mb-10 md:mb-16">
          <div className="p-1.5 rounded-full inline-flex items-center gap-1 transition-colors bg-[#EDF2F7] dark:bg-[#111] dark:border dark:border-white/10">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`text-sm font-medium px-6 py-2 rounded-full transition-colors ${billingCycle === 'monthly' ? "bg-white text-gray-900 dark:bg-[#222] dark:text-white dark:border dark:border-white/5 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`text-sm font-medium px-6 py-2 rounded-full transition-colors flex items-center gap-2 ${billingCycle === 'yearly' ? "bg-white text-gray-900 dark:bg-[#222] dark:text-white dark:border dark:border-white/5 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
            >
              Yearly <span className="text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider transition-colors text-blue-600 bg-blue-100 dark:text-[#2D6CFF] dark:bg-[#2D6CFF]/10">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`rounded-[20px] p-8 shadow-sm flex flex-col relative w-full transition-all duration-300 ${tier.pop
              ? `border-2 border-[#2D6CFF] md:transform md:-translate-y-4 bg-card-bg shadow-[0_20px_50px_-12px_rgba(45,108,255,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(45,108,255,0.25)]`
              : `border bg-card-bg border-gray-100 dark:border-white/10`
            }`}>
              {tier.pop && <div className="absolute top-0 right-0 bg-[#2D6CFF] text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-[18px] tracking-widest uppercase">POPULAR</div>}
              <h3 className="text-lg font-bold mb-2 transition-colors text-gray-900 dark:text-white">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold transition-colors text-gray-900 dark:text-white">
                  ${billingCycle === 'yearly' ? Math.floor(parseInt(tier.price) * 0.8) : tier.price}
                </span>
                <span className="text-sm font-bold transition-colors text-gray-400 dark:text-gray-500">/month</span>
              </div>
              <p className="text-sm mb-10 min-h-[40px] transition-colors text-gray-500 dark:text-gray-400">{tier.target}</p>
              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm transition-colors text-gray-600 dark:text-gray-300">
                    <Check className={`w-4 h-4 ${tier.pop ? 'text-[#2D6CFF]' : 'text-green-500'}`} /> {f}
                  </div>
                ))}
                {tier.disabled?.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm transition-colors text-gray-400 dark:text-gray-600">
                    <X className="w-4 h-4 transition-colors text-gray-300 dark:text-gray-600" /> {f}
                  </div>
                ))}
              </div>
              <button className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition-colors ${tier.pop
                ? 'bg-[#2D6CFF] hover:bg-[#2057d5] text-white shadow-lg shadow-blue-500/20'
                : 'border border-gray-200 text-gray-900 hover:bg-gray-50 dark:border-white/20 dark:text-white dark:hover:bg-white/5'
              }`}>
                {tier.pop ? 'Start Free Trial' : (tier.name === 'Business' ? 'Contact Sales' : 'Get Started')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
