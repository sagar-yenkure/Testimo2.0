import { auth } from '@clerk/nextjs/server'
import {
    BarChart3,
    MessageSquareText,
    Video,
    TrendingUp,
    Plus,
    Crown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import SpaceCard from '@/components/SpaceCard'

const DashboardPage = async () => {
    const { userId } = await auth();

    // Mock data based on landing page context
    const stats = [
        { label: 'TOTAL COLLECTIONS', value: '1', icon: BarChart3, iconColor: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-[#2D6CFF]/10' },
        { label: 'TEXT TESTIMONIALS', value: '1', icon: MessageSquareText, iconColor: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-500/10' },
        { label: 'VIDEO TESTIMONIALS', value: '0', icon: Video, iconColor: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-[#2D6CFF]/10' },
        { label: 'SUBMISSIONS', value: '1', icon: TrendingUp, iconColor: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-500/10' },
    ]

    const spaces = [
        {
            name: "Gojo Satoru - The Strongest Sorcerer",
            textCount: 1,
            videoCount: 0,
            link: "testimo.io/gojo",
            updated: "3/7/2026"
        }
    ]

    return (
        <div className="space-y-5 md:space-y-7 pb-16">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 text-blue-600 dark:text-[#2D6CFF]">DASHBOARD</div>
                    <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Your Spaces
                    </h1>
                </div>
                <Button className="bg-[#2D6CFF] hover:bg-[#2057d5] text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm h-11 shrink-0">
                    <Plus className="w-5 h-5 mr-2" />
                    Create a new space
                </Button>
            </div>

            {/* Stats Section - Component with Global Card BG */}
            <div className="stats-container bg-card-bg border border-blue-200/50 dark:border-blue-900/30 rounded-[28px] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-blue-200/30 dark:divide-blue-900/20 transition-colors duration-300">
                {stats.map((stat, index) => (
                    <div key={index} className="p-5 flex flex-col justify-between relative group hover:bg-white/40 dark:hover:bg-white/[0.02] transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="space-y-0.5">
                                <div className="text-[10px] font-bold tracking-widest text-[#2D6CFF] dark:text-blue-400 uppercase opacity-70">{stat.label}</div>
                                <div className={`text-2xl font-black tracking-tight text-gray-900 dark:text-white`}>
                                    {stat.value}
                                </div>
                            </div>
                            <div className={`bg-white dark:bg-[#0A0A0A] p-2.5 rounded-2xl border border-blue-100/50 dark:border-white/5 shadow-sm transition-transform group-hover:scale-110`}>
                                <stat.icon className={`w-5.5 h-5.5 ${stat.iconColor} dark:text-white`} />
                            </div>
                        </div>
                        <div className="mt-2 text-[10px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5 leading-none">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span>Live tracking active</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Subscription Banner - Component with Global Card BG */}
            <div className="rounded-[24px] border border-blue-200/50 dark:border-blue-900/30 bg-card-bg p-5 md:p-6 shadow-sm relative overflow-hidden group transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-white dark:bg-[#111] p-2.5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 shrink-0">
                            <Crown className="w-5.5 h-5.5 text-[#2D6CFF]" />
                        </div>
                        <div>
                            <h2 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                                Starter Plan Active
                                <span className="text-[8px] bg-blue-100 dark:bg-[#2D6CFF]/20 text-blue-600 dark:text-[#2D6CFF] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Free</span>
                            </h2>
                            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
                                Unlock video testimonials, 10 spaces, and remove our branding.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 w-full lg:w-auto">
                        <div className="flex-1 lg:min-w-[180px]">
                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 leading-none">
                                <span>Used 1 of 1 Space</span>
                                <span className="text-blue-600 dark:text-[#2D6CFF]">100% full</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-blue-600 dark:bg-[#2D6CFF] w-full rounded-full shadow-[0_0_10px_rgba(45,108,255,0.5)]" />
                            </div>
                        </div>
                        <Button className="shrink-0 bg-[#121626] dark:bg-white text-white dark:text-black font-bold px-6 py-2.5 rounded-full hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-black/10 dark:shadow-white/5 h-10 text-xs">
                            Upgrade to Pro
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Spaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map((space, idx) => (
                    <SpaceCard key={idx} space={space} />
                ))}

                {/* Add Space Placeholder */}
                <button className="rounded-[28px] border-2 border-dashed border-blue-200/50 dark:border-blue-900/30 bg-card-bg flex flex-col items-center justify-center p-6 gap-4 hover:bg-white/40 dark:hover:bg-white/[0.05] hover:border-[#2D6CFF]/30 transition-colors duration-300 group h-full min-h-[300px] shadow-sm hover:shadow-md">
                    <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:bg-[#2D6CFF] group-hover:border-[#2D6CFF] transition-all">
                        <Plus className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-center">
                        <span className="block text-lg font-black text-gray-900 dark:text-white mb-1.5">New Space</span>
                        <p className="text-[13px] font-medium text-gray-400 max-w-[180px] mx-auto">Click to create a new testimonial collector</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default DashboardPage
