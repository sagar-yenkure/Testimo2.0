import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import {
    BarChart3,
    MessageSquareText,
    Video,
    TrendingUp,
    Plus,
    Crown,
    Copy,
    Clock,
    Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const DashboardPage = async () => {
    const { userId } = await auth();

    const stats = [
        { label: 'Total Collections', value: '1', icon: BarChart3, iconColor: 'text-blue-600 dark:text-blue-400' },
        { label: 'Text Testimonials', value: '1', icon: MessageSquareText, iconColor: 'text-blue-500 dark:text-blue-400' },
        { label: 'Video Testimonials', value: '0', icon: Video, iconColor: 'text-blue-600 dark:text-blue-400' },
        { label: 'Submissions', value: '1', icon: TrendingUp, iconColor: 'text-cyan-500 dark:text-cyan-400' },
    ]

    const spaces = [
        {
            name: "Gojo Satoru - The Strongest Sorcerer",
            initials: "GS",
            textCount: 1,
            videoCount: 0,
            link: "testimo.io/gojo",
            slug: "gojo",
            updated: "3/7/2026",
            status: "active",
            responseRate: 100,
        }
    ]

    const recentActivity = [
        { type: 'submission', text: 'New submission from Sarah', time: '2 hours ago' },
        { type: 'space', text: 'Created "Gojo Satoru" space', time: '1 day ago' },
        { type: 'milestone', text: 'Reached 1 submission', time: '1 day ago' },
    ]

    return (
        <div className="space-y-5 px-6 md:space-y-6 pb-16 overflow-y-auto h-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-1">

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="text-[11px] font-black tracking-[0.2em] uppercase mb-1 text-[#2D6CFF]">
                        Dashboard
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Your Spaces
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    {/* Plan banner inline — compact */}
                    <div className="hidden sm:flex items-center gap-3 bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl px-4 py-2.5 shadow-sm">
                        <div className="w-7 h-7 rounded-[8px] bg-gray-50 dark:bg-white/4 border border-gray-100 dark:border-white/6 flex items-center justify-center shrink-0">
                            <Crown className="w-3 h-3 text-[#2D6CFF]" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[16px] font-extrabold text-gray-900 dark:text-white">Starter Plan</span>
                            <span className="text-[9px] bg-blue-50 dark:bg-[#2D6CFF]/15 text-[#2D6CFF] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-blue-100 dark:border-[#2D6CFF]/20">
                                Free
                            </span>
                        </div>
                        <div className="w-px h-5 bg-blue-100/40 dark:bg-white/5" />
                        <div className="flex flex-col gap-1 w-[80px]">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">1 of 1</span>
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Full</span>
                            </div>
                            <div className="w-full h-1 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-red-500 rounded-full" />
                            </div>
                        </div>
                        <Button className="bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:opacity-90 transition-all text-xs h-8 px-4 whitespace-nowrap shadow-sm">
                            Upgrade to Pro
                        </Button>
                    </div>

                    <Link href="/dashboard/create">
                        <Button className="bg-[#2D6CFF] hover:bg-[#2057d5] text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm h-10 shrink-0">
                            <Plus className="w-4 h-4 mr-2" />
                            Create a new space
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ── Stats Strip ── */}
            <div className=" border border-blue-100/60 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm">
                <div className="flex divide-y md:divide-y-0 md:divide-x divide-blue-100/40 dark:divide-white/[0.05]">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="px-4 py-3 flex items-center justify-between gap-3 group hover:bg-blue-50/30 dark:hover:bg-white/2 transition-colors"
                        >
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-xs font-black tracking-[0.12em] uppercase text-[#2D6CFF]/60 dark:text-blue-400/50 truncate">
                                    {stat.label}
                                </span>
                                <span className="text-[22px] font-black tracking-tight text-gray-900 dark:text-white leading-none">
                                    {stat.value}
                                </span>

                            </div>
                            <div className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-white/4 border border-gray-100 dark:border-white/6 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Collections Grid with Sidebar ── */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Collections Table */}
                    <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm">

                        {/* Table header bar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-blue-100/40 dark:border-white/[0.05]">
                            <span className="text-[12px] font-black tracking-[0.12em] uppercase text-[#2D6CFF]/60 dark:text-blue-400/50">
                                Spaces
                            </span>
                            <span className="text-[12px] font-bold text-gray-400 dark:text-gray-500">
                                {spaces.length} of 1
                            </span>
                        </div>

                        {/* Column headers */}
                        <div className="hidden md:grid md:grid-cols-[1fr_100px_100px_110px_130px_120px] items-center px-5 py-2.5 border-b border-blue-100/30 dark:border-white/4 bg-gray-50/60 dark:bg-white/2">
                            {['Space', 'Text', 'Video', 'Status', 'Created', ''].map((h, i) => (
                                <span key={i} className="text-[11px] font-black tracking-[0.12em] uppercase text-gray-400 dark:text-gray-600">
                                    {h}
                                </span>
                            ))}
                        </div>

                        {/* Rows */}
                        {spaces.map((space, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-1 md:grid-cols-[1fr_100px_100px_110px_130px_120px] items-center px-5 py-5 border-b border-blue-100/30 dark:border-white/4 hover:bg-blue-50/20 dark:hover:bg-white/1.5 transition-colors group last:border-b-0"
                            >
                                {/* Space identity */}
                                <div className="flex items-center gap-3 min-w-0 mb-3 md:mb-0">
                                    <div className="w-9 h-9 rounded-full bg-[#2D6CFF]/10 dark:bg-[#2D6CFF]/20 flex items-center justify-center text-[11px] font-black text-[#2D6CFF] flex-shrink-0">
                                        {space.initials}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[16px] font-extrabold text-gray-900 dark:text-white truncate leading-tight">
                                            {space.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="text-[13px] text-gray-400 dark:text-gray-500 truncate">
                                                {space.link}
                                            </span>
                                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Copy className="w-2.5 h-2.5 text-gray-400 hover:text-[#2D6CFF] transition-colors" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Text count */}
                                <div className="flex flex-col md:block">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 md:hidden mb-0.5">Text</span>
                                    <span className="text-lg font-black text-gray-900 dark:text-white">{space.textCount}</span>
                                </div>

                                {/* Video count */}
                                <div className="flex flex-col md:block">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 md:hidden mb-0.5">Video</span>
                                    <span className="text-lg font-black text-gray-400 dark:text-gray-500">{space.videoCount}</span>
                                </div>

                                {/* Status badge */}
                                <div>
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200/60 dark:border-green-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Active
                                    </span>
                                </div>

                                {/* Created date */}
                                <div className="flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-gray-500">
                                    <Clock className="w-3 h-3 shrink-0" />
                                    {space.updated}
                                </div>

                                {/* Manage CTA */}
                                <div>
                                    <Link href={`/dashboard/${space.slug}`}>
                                        <Button
                                            variant="outline"
                                            className="h-9 px-5 rounded-full text-[12px] font-bold border-blue-200/60 dark:border-white/8 text-[#2D6CFF] dark:text-blue-400 hover:bg-[#2D6CFF] hover:text-white hover:border-[#2D6CFF] transition-all"
                                        >
                                            Manage →
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Add new space row */}
                        <Link
                            href="/dashboard/create"
                            className="flex items-center gap-3 px-5 py-4 hover:bg-blue-50/20 dark:hover:bg-white/[0.015] transition-colors group cursor-pointer border-t border-blue-100/30 dark:border-white/[0.04]"
                        >
                            <div className="w-9 h-9 rounded-full border-2 border-dashed border-blue-200/50 dark:border-blue-900/40 flex items-center justify-center flex-shrink-0 group-hover:border-[#2D6CFF]/50 group-hover:bg-[#2D6CFF]/5 transition-all">
                                <Plus className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-[#2D6CFF] transition-colors" />
                            </div>
                            <span className="text-[13px] font-bold text-gray-300 dark:text-gray-600 group-hover:text-[#2D6CFF] transition-colors">
                                Create a new space…
                            </span>
                            <span className="ml-auto text-[10px] font-bold text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full border border-red-200/50 dark:border-red-500/20">
                                Upgrade to unlock more
                            </span>
                        </Link>

                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl p-5 shadow-sm">
                        <h3 className="text-[12px] font-black tracking-[0.12em] uppercase text-[#2D6CFF]/60 dark:text-blue-400/50 mb-4">
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex gap-3 pb-3 border-b border-blue-100/30 dark:border-white/[0.04] last:border-0 last:pb-0">
                                    <div className="w-2 h-2 rounded-full bg-[#2D6CFF] flex-shrink-0 mt-1"></div>
                                    <div>
                                        <p className="text-[15px] font-semibold text-gray-900 dark:text-white">{activity.text}</p>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Quick Tips */}
                    <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl p-5 shadow-sm">
                        <h4 className="text-[12px] font-black tracking-[0.12em] uppercase text-gray-400 dark:text-gray-600 mb-3">Quick Tips</h4>
                        <ul className="space-y-2 text-[13px] text-gray-600 dark:text-gray-400">
                            <li className="flex gap-2">
                                <span className="text-[#2D6CFF] font-bold flex-shrink-0">→</span>
                                <span>Share your testimonial link</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#2D6CFF] font-bold flex-shrink-0">→</span>
                                <span>Embed video testimonials</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[#2D6CFF] font-bold flex-shrink-0">→</span>
                                <span>Track responses in real-time</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardPage
