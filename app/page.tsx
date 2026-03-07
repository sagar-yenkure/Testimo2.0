"use client";

import Link from "next/link";
import {
  ArrowRight, Play, Box, LockIcon, Video, PenTool, Bot, Filter, Globe, PieChart,
  Share2, Code2, Settings2, Star, Check, X, Plus
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className={`min-h-screen overflow-hidden relative font-sans transition-colors duration-300 ${isDark ? 'bg-[#050505] text-white' : 'bg-[#f8faff] text-gray-900'}`}>



      {/* Navbar Fixed & Transparent */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${scrolled ? "py-3" : "py-5"}`}>
        <div className="flex items-center justify-between px-8 mx-auto max-w-7xl pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="bg-[#3B6FF1] p-1.5 rounded-md flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Testimo</span>
          </div>

          <div className={`hidden md:flex items-center gap-1 text-[14px] font-medium px-2 py-1.5 rounded-full shadow-sm backdrop-blur-md border transition-colors ${isDark ? 'bg-white/10 border-white/10 text-gray-300' : 'bg-white/60 border-gray-200/50 text-gray-600'
            }`}>
            {['Features', 'How it works', 'Resources', 'Pricing'].map(item => (
              <Link key={item} href="#" className={`px-4 py-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-gray-100/80 hover:text-gray-900'
                }`}>{item}</Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="#" className={`text-[14px] font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Sign in</Link>
            <Link href="#" className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#121626] text-white hover:bg-black'
              }`}>
              Try for free
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-44">
        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center px-4 pb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-5 max-w-4xl transition-colors ${isDark ? 'text-white' : 'text-[#111827]'}`}
          >
            Collect stunning testimonials that <span className="text-[#625AF8]">grow your SaaS faster.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-[16px] max-w-xl mb-8 leading-relaxed transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Testimo helps SaaS teams build smarter onboarding, qualification,
            and testimonial collection forms — with AI-powered logic and real-time analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4 mb-16"
          >
            <Link href="#" className="group flex items-center gap-2 bg-[#2D6CFF] hover:bg-[#2057d5] text-white px-7 py-3.5 rounded-full font-medium transition-all shadow-lg shadow-blue-500/20 text-[15px]">
              Build your first form
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#" className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-colors shadow-sm text-[15px] border ${isDark ? 'bg-[#1A1A1A] hover:bg-[#222] text-white border-white/10' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
              }`}>
              <Play className={`w-4 h-4 transition-colors ${isDark ? 'text-[#2D6CFF] fill-[#2D6CFF]' : 'text-blue-600 fill-blue-600'}`} />
              Watch a demo
            </Link>
          </motion.div>

          {/* Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={`w-full max-w-6xl mx-auto rounded-[24px] shadow-2xl overflow-hidden border mb-20 relative z-20 transition-all duration-300 ${isDark ? 'bg-[#111] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]'
              }`}
          >
            <div className={`w-full h-10 flex items-center px-4 gap-2 border-b transition-colors ${isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-[#f1f4f9] border-gray-200'
              }`}>
              <div className="flex gap-2 w-20">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className={`text-[11px] font-medium px-6 py-1.5 rounded-md flex items-center gap-2 transition-colors ${isDark ? 'bg-[#2A2A2A] text-gray-400' : 'bg-[#E5E7EB] text-gray-500'
                  }`}>
                  <LockIcon className="w-3 h-3" />
                  testimo.io/builder
                </div>
              </div>
              <div className="w-20" />
            </div>
            <div className={`relative w-full aspect-[16/10] ${isDark ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
              <iframe src="/builder" className="w-full h-full border-none bg-transparent block" title="Form Builder Preview" />
            </div>
          </motion.div>
        </section>

        {/* Trusted By Section */}
        <section className={`py-24 border-t relative z-10 w-full backdrop-blur-sm transition-colors ${isDark ? 'border-white/5 bg-black/40' : 'border-gray-100 bg-white/50'
          }`}>
          <div className="max-w-4xl mx-auto text-center px-4">
            <h3 className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-6 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Trusted by 2,000+ SaaS Companies
            </h3>
            <div className={`flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center gap-2 text-xl font-bold"><span className="stripe-font">stripe</span></div>
              <div className="flex items-center gap-2 text-xl font-bold"><Box className="w-6 h-6" /> Slack</div>
              <div className="flex items-center gap-2 text-xl font-bold"><Play className="w-6 h-6" /> Spotify</div>
              <div className="flex items-center gap-2 text-xl font-bold"><span className="text-2xl font-black">aws</span></div>
              <div className="flex items-center gap-2 text-xl font-bold"><Box className="w-6 h-6" /> Dropbox</div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className={`py-24 relative z-10 w-full transition-colors ${isDark ? 'bg-[#050505]' : 'bg-white'}`} id="how-it-works">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-3 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Three steps to collect testimonials</h2>
              <p className={`text-sm transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Our process is designed to be frictionless for both you and your customers.</p>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 mt-16">
              <div className={`hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] -z-10 transition-colors ${isDark ? 'bg-white/10' : 'bg-blue-100'}`} />

              {[
                { icon: Settings2, color: 'blue', title: '1. Create Space', text: 'Create a dedicated form (Space) for your product. Customize questions and branding in seconds.' },
                { icon: Share2, color: 'purple', title: '2. Share Link', text: 'Send your unique link to customers via email, social media, or embed it directly on your site.' },
                { icon: Code2, color: 'pink', title: '3. Embed Wall', text: 'Copy a simple line of code to display your collected testimonials in a beautiful "Wall of Love".' }
              ].map((step, idx) => {
                const colors = isDark
                  ? { bg: 'bg-[#111]', border: 'border border-white/10', shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.5)]', iconBg: `bg-white/5`, iconText: 'text-white' }
                  : { bg: 'bg-white', border: 'border border-transparent', shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.06)]', iconBg: `bg-gray-50`, iconText: 'text-gray-600' };

                return (
                  <div key={idx} className="flex flex-col items-center text-center flex-1">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 transition-all ${colors.bg} ${colors.border} ${colors.shadow}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${colors.iconBg}`}>
                        {/* Note: I am forcing standard text colors for simpler light/dark dynamic swapping to avoid tailwind dynamic generation issues */}
                        <step.icon className={`w-6 h-6 ${colors.iconText}`} />
                      </div>
                    </div>
                    <h3 className={`text-lg font-bold mb-3 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                    <p className={`text-sm leading-relaxed max-w-[260px] transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`py-24 relative z-10 w-full border-y transition-colors ${isDark ? 'bg-[#0A0A0A] border-white/5' : 'bg-[#FAFAFA] border-gray-100'}`} id="features">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className={`text-[10px] font-bold tracking-wider uppercase mb-2 transition-colors ${isDark ? 'text-[#2D6CFF]' : 'text-blue-600'}`}>POWERFUL FEATURES</div>
                <h2 className={`text-3xl font-bold max-w-sm leading-tight transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Everything you need to showcase social proof</h2>
              </div>
              <Link href="#" className={`text-sm font-medium flex items-center gap-1 transition-colors ${isDark ? 'text-[#2D6CFF] hover:text-blue-400' : 'text-blue-600 hover:text-blue-700'
                }`}>
                View all features <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Video, title: 'Video Testimonials', text: 'Collect authentic video shoutouts from your happy customers directly through the browser.' },
                { icon: PenTool, title: 'Custom Branding', text: 'Make the testimonial forms match your brand identity with custom colors, logos, and fonts.' },
                { icon: Bot, title: 'AI Summaries', text: 'Automatically generate short, punchy quotes from long text testimonials using our AI engine.' },
                { icon: Filter, title: 'Spam Filtering', text: 'Keep your inbox clean with built-in spam protection and manual approval processes.' },
                { icon: Globe, title: 'Multi-Language', text: 'Collect testimonials in over 20+ languages to support your global user base.' },
                { icon: PieChart, title: 'Analytics Dashboard', text: 'Track drop-off rates, video completion stats, and overall sentiment of customer feedback.' }
              ].map((feat, idx) => {
                const styles = isDark
                  ? { card: 'bg-[#111] border-white/10 hover:border-white/20', iconBg: 'bg-white/5 border border-white/10', iconText: 'text-white' }
                  : { card: 'bg-white border-gray-100 hover:shadow-md border', iconBg: 'bg-gray-50 border border-gray-100', iconText: 'text-gray-600' };

                return (
                  <div key={idx} className={`p-6 rounded-[16px] transition-all shadow-sm ${styles.card}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 ${styles.iconBg}`}>
                      <feat.icon className={`w-5 h-5 ${styles.iconText}`} />
                    </div>
                    <h3 className={`text-lg font-bold mb-3 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{feat.title}</h3>
                    <p className={`text-sm leading-relaxed transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{feat.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className={`py-24 relative z-10 w-full transition-colors ${isDark ? 'bg-[#050505]' : 'bg-[#FAFAFA]'}`} id="pricing">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className={`text-3xl font-bold mb-3 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Simple, transparent pricing</h2>
            <p className={`text-sm mb-8 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Start for free, upgrade when you need more power. No credit card required.</p>

            <div className="flex justify-center mb-16">
              <div className={`p-1.5 rounded-full inline-flex items-center gap-1 transition-colors ${isDark ? 'bg-[#111] border border-white/10' : 'bg-[#EDF2F7]'}`}>
                <button className={`text-sm font-medium px-6 py-2 rounded-full shadow-sm transition-colors ${isDark ? 'bg-[#222] text-white border border-white/5' : 'bg-white text-gray-900'
                  }`}>Monthly</button>
                <button className={`text-sm font-medium px-6 py-2 rounded-full transition-colors flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}>
                  Yearly <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider transition-colors ${isDark ? 'text-[#2D6CFF] bg-[#2D6CFF]/10' : 'text-blue-600 bg-blue-100'
                    }`}>-20%</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              {[
                { name: 'Starter', price: '0', target: 'Perfect for hobby projects and personal portfolios.', features: ['1 Space', 'Up to 10 testimonials', 'Standard text forms'], disabled: ['Video testimonials'] },
                { name: 'Pro', price: '29', pop: true, target: 'For growing businesses and agencies.', features: ['10 Spaces', 'Unlimited testimonials', 'Video testimonials', 'Remove branding'] },
                { name: 'Business', price: '79', target: 'Advanced features for large teams.', features: ['Unlimited Spaces', 'Team members', 'API Access', 'Priority Support'] }
              ].map((tier, idx) => (
                <div key={idx} className={`rounded-[20px] p-8 shadow-sm flex flex-col relative w-full transition-colors ${tier.pop
                  ? `border-2 border-[#2D6CFF] transform md:-translate-y-4 ${isDark ? 'bg-[#111] shadow-[0_20px_50px_-12px_rgba(45,108,255,0.25)]' : 'bg-white shadow-[0_20px_50px_-12px_rgba(45,108,255,0.15)]'}`
                  : `border ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-100'}`
                  }`}>
                  {tier.pop && <div className="absolute top-0 right-0 bg-[#2D6CFF] text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-[18px] tracking-widest uppercase">POPULAR</div>}

                  <h3 className={`text-lg font-bold mb-2 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-4xl font-extrabold transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>${tier.price}</span>
                    <span className={`text-sm font-bold transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/month</span>
                  </div>
                  <p className={`text-sm mb-10 min-h-[40px] transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tier.target}</p>

                  <div className="space-y-4 mb-10 flex-1">
                    {tier.features.map(f => (
                      <div key={f} className={`flex items-center gap-3 text-sm transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Check className={`w-4 h-4 ${tier.pop ? 'text-[#2D6CFF]' : 'text-green-500'}`} /> {f}
                      </div>
                    ))}
                    {tier.disabled?.map(f => (
                      <div key={f} className={`flex items-center gap-3 text-sm transition-colors ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        <X className={`w-4 h-4 transition-colors ${isDark ? 'text-gray-600' : 'text-gray-300'}`} /> {f}
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition-colors ${tier.pop
                    ? 'bg-[#2D6CFF] hover:bg-[#2057d5] text-white shadow-lg shadow-blue-500/20'
                    : (isDark ? 'border border-white/20 text-white hover:bg-white/5' : 'border border-gray-200 text-gray-900 hover:bg-gray-50')
                    }`}>
                    {tier.pop ? 'Start Free Trial' : (tier.name === 'Business' ? 'Contact Sales' : 'Get Started')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`py-24 relative z-10 w-full border-y transition-colors ${isDark ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-transparent'}`} id="faq">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className={`text-3xl font-bold mb-10 text-center transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>

            <div className="space-y-4">
              {[
                "How do I embed the testimonials?",
                "Can I moderate the testimonials before they show up?",
                "Do users need to login to submit a testimonial?"
              ].map((q, i) => (
                <div key={i} className={`rounded-2xl p-6 flex justify-between items-center cursor-pointer transition-colors shadow-sm border ${isDark ? 'bg-[#111] border-white/10 hover:border-white/20' : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}>
                  <span className={`font-medium text-[15px] transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{q}</span>
                  <Plus className={`w-5 h-5 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase / Wall of Love Section */}
        <section className={`py-24 relative z-10 w-full px-4 transition-colors ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-[32px] p-10 md:p-16 relative overflow-hidden transition-colors ${isDark ? 'bg-white' : 'bg-[#0b1021]'
              }`}>



              <div className="relative z-10 text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors ${isDark ? 'text-gray-900' : 'text-white'}`}>Ready to showcase your love?</h2>
                <p className={`text-sm max-w-lg mx-auto leading-relaxed transition-colors ${isDark ? 'text-gray-500' : 'text-[#9EADC8]'}`}>
                  This is exactly how your "Wall of Love" will look on your website. Clean, responsive, and trustworthy.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Sarah Jenkins', role: 'Product Manager', img: '43', text: 'Testimo has completely transformed how we collect feedback. The UI is stunning and our customers love it.', grad: 'from-blue-400 to-purple-400' },
                  { name: 'Mark Davis', role: 'Freelance Developer', img: '33', text: 'Setting up my first collection form took less than 2 minutes. The embed code works perfectly on Webflow.', grad: 'from-green-400 to-emerald-600', offset: true },
                  { name: 'Elena Rodriguez', role: 'Marketing Director', img: '44', text: 'The video testimonial feature is a game changer. Seeing real faces builds so much more trust.', grad: 'from-orange-400 to-red-500' }
                ].map((review, idx) => (
                  <div key={idx} className={`rounded-2xl p-6 text-left border transition-colors ${review.offset ? 'md:translate-y-6' : ''} ${isDark ? 'bg-[#F8FAFF] border-gray-200/50' : 'bg-[#1C233A] border-white/5'
                    }`}>
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className={`text-sm leading-relaxed mb-6 transition-colors ${isDark ? 'text-gray-700' : 'text-white/90'}`}>
                      "{review.text}"
                    </p>
                    <div className={`flex items-center gap-3 mt-auto pt-4 border-t transition-colors ${isDark ? 'border-gray-200' : 'border-white/10'}`}>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm overflow-hidden ${review.grad}`}>
                        <img src={`https://i.pravatar.cc/150?img=${review.img}`} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold transition-colors ${isDark ? 'text-gray-900' : 'text-white'}`}>{review.name}</div>
                        <div className={`text-xs transition-colors ${isDark ? 'text-gray-500' : 'text-white/50'}`}>{review.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 border-t transition-colors ${isDark ? 'border-white/5 text-gray-400 bg-black/40' : 'border-gray-100 text-gray-500 bg-white/50'}`}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="bg-[#3B6FF1] p-1 rounded-md flex items-center justify-center">
                  <Box className="w-4 h-4 text-white" />
                </div>
                <span className={`text-lg font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Testimo</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-sm">
                <Link href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Product</Link>
                <Link href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Features</Link>
                <Link href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Pricing</Link>
                <Link href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Contact</Link>
                <Link href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Terms</Link>
              </div>

              <div className="text-xs">
                © {new Date().getFullYear()} Testimo Inc. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
