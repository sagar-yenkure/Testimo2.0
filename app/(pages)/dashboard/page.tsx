"use client"
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
import { StatsCard } from '@/components/stats-card-1'



const DashboardPage = () => {

    const stats = [
        { label: 'Total Collections', value: '1' },
        { label: 'Text Testimonials', value: '1' },
        { label: 'Video Testimonials', value: '0' },
        { label: 'Submissions', value: '1' },
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


                    <Link href="/dashboard/create">
                        <Button className="bg-[#2D6CFF] hover:bg-[#2057d5] text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm h-10 shrink-0">
                            <Plus className="w-4 h-4 mr-2" />
                            Create a new space
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ── Stats Strip ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <StatsCard
                    title="Total Collections"
                    currentValue={1}
                    description="Your workspace at a glance"
                    chartData={[
                        { name: "Jan", value: 20 },
                        { name: "Feb", value: 45 },
                        { name: "Mar", value: 35 },
                        { name: "Apr", value: 60 },
                        { name: "May", value: 50 },
                        { name: "Jun", value: 100 },
                    ]}
                    defaultBarColor="bg-blue-200/40"
                    highlightedBarColor="bg-blue-500"
                />
                <StatsCard
                    title="Text Testimonials"
                    currentValue={1}
                    description="Submissions received"
                    chartData={[
                        { name: "Jan", value: 10 },
                        { name: "Feb", value: 25 },
                        { name: "Mar", value: 30 },
                        { name: "Apr", value: 50 },
                        { name: "May", value: 45 },
                        { name: "Jun", value: 100 },
                    ]}
                    defaultBarColor="bg-blue-200/40"
                    highlightedBarColor="bg-blue-500"
                />
                <StatsCard
                    title="Video Testimonials"
                    currentValue={0}
                    description="Video submissions"
                    chartData={[
                        { name: "Jan", value: 0 },
                        { name: "Feb", value: 15 },
                        { name: "Mar", value: 20 },
                        { name: "Apr", value: 10 },
                        { name: "May", value: 25 },
                        { name: "Jun", value: 0 },
                    ]}
                    defaultBarColor="bg-gray-200/30"
                    highlightedBarColor="bg-gray-400"
                />
                <StatsCard
                    title="Submissions"
                    currentValue={1}
                    description="Total responses"
                    chartData={[
                        { name: "Jan", value: 30 },
                        { name: "Feb", value: 40 },
                        { name: "Mar", value: 50 },
                        { name: "Apr", value: 65 },
                        { name: "May", value: 70 },
                        { name: "Jun", value: 100 },
                    ]}
                    defaultBarColor="bg-cyan-200/40"
                    highlightedBarColor="bg-cyan-500"
                />
            </div>

            {/* ── Collections Grid with Sidebar ── */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Collections Table */}
                    <div className="bg-white dark:bg-white/[0.02] border border-gray-200/30 dark:border-white/[0.08] rounded-xl overflow-hidden">

                        {/* Table header bar */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/30 dark:border-white/[0.08]">
                            <span className="text-xs font-semibold tracking-wide uppercase text-gray-600 dark:text-gray-400">
                                Spaces
                            </span>
                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                                {spaces.length} active
                            </span>
                        </div>

                        {/* Column headers */}
                        <div className="hidden md:grid md:grid-cols-[1.5fr_80px_80px_100px_120px_100px] items-center px-6 py-3 border-b border-gray-200/30 dark:border-white/[0.08] bg-gray-50/50 dark:bg-white/[0.02]">
                            {['Space', 'Text', 'Video', 'Status', 'Created', ''].map((h, i) => (
                                <span key={i} className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-500">
                                    {h}
                                </span>
                            ))}
                        </div>

                        {/* Rows */}
                        {spaces.map((space, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-1 md:grid-cols-[1.5fr_80px_80px_100px_120px_100px] items-center px-6 py-4 border-b border-gray-200/30 dark:border-white/[0.08] hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group last:border-b-0"
                            >
                                {/* Space identity */}
                                <div className="flex items-center gap-3 min-w-0 mb-3 md:mb-0">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100/50 dark:bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
                                        {space.initials}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                            {space.name}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500 dark:text-gray-500 truncate">
                                                {space.link}
                                            </span>
                                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Copy className="w-3 h-3 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Text count */}
                                <div className="flex flex-col md:block">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 md:hidden mb-1">Text</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{space.textCount}</span>
                                </div>

                                {/* Video count */}
                                <div className="flex flex-col md:block">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 md:hidden mb-1">Video</span>
                                    <span className="text-sm font-semibold text-gray-400 dark:text-gray-500">{space.videoCount}</span>
                                </div>

                                {/* Status badge */}
                                <div>
                                    <span className="inline-flex items-center gap-2 text-xs font-semibold bg-green-100/50 dark:bg-green-500/10 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg border border-green-200/50 dark:border-green-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        Active
                                    </span>
                                </div>

                                {/* Created date */}
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                    {space.updated}
                                </div>

                                {/* Manage CTA */}
                                <div>
                                    <Link href={`/dashboard/${space.slug}`}>
                                        <Button
                                            variant="outline"
                                            className="h-9 px-4 rounded-lg text-xs font-semibold border-gray-200/50 dark:border-white/[0.08] text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all"
                                        >
                                            Manage
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Add new space row */}
                        <Link
                            href="/dashboard/create"
                            className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group cursor-pointer border-t border-gray-200/30 dark:border-white/[0.08]"
                        >
                            <div className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-300/50 dark:border-gray-600/50 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400/50 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-500/5 transition-all">
                                <Plus className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                Create new space
                            </span>
                            <span className="ml-auto text-xs font-semibold text-amber-700 bg-amber-100/50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-200/50 dark:border-amber-500/20">
                                Pro
                            </span>
                        </Link>

                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-white/[0.02] border border-gray-200/30 dark:border-white/[0.08] rounded-xl p-6">
                        <h3 className="text-xs font-semibold tracking-wide uppercase text-gray-600 dark:text-gray-400 mb-4">
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex gap-3 pb-4 border-b border-gray-200/30 dark:border-white/[0.08] last:border-0 last:pb-0">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.text}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default DashboardPage
