"use client"

import { Activity, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// Extracted Components
import { DashboardStatsBar } from '@/components/dashboard/DashboardStatsBar'
import { SpaceCard } from '@/components/dashboard/SpaceCard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { ActivityTray } from '@/components/dashboard/ActivityTray'
import { Space, ActivityItem } from '@/types'
import { EmptyState } from '@/components/dashboard/EmptyState'
import DashboardLoading from './loading'
import BreadcrumbNav from '@/components/breadrcrumb'

const DashboardPage = () => {

    const spaces: Space[] = [
        {
            name: "Gojo Satoru",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            description: "Executive coaching and mentorship portal for high-growth tech leaders and product managers.",
            textCount: 128,
            videoCount: 42,
            members: "1.2k",
            slug: "gojo",
        },
        {
            name: "Design Systems Collective",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            description: "Community space for sharing design patterns, tokens, and accessibility documentation.",
            textCount: 856,
            videoCount: 12,
            members: "4.8k",
            slug: "design",
        },
        {
            name: "Obsidian Masterclass",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            description: "Private educational space for advanced obsidian workflows and knowledge management.",
            textCount: 12,
            videoCount: 156,
            members: "342",
            slug: "obsidian",
        }
    ]

    const recentActivity: ActivityItem[] = [
        {
            type: 'video',
            title: 'New video submission',
            desc: 'Gojo Satoru space received a new 3min video from Alex.',
            time: '2 MINUTES AGO'
        },
        {
            type: 'text',
            title: 'New text testimonial',
            desc: 'A 5-star review was posted on Obsidian Masterclass.',
            time: '1 HOUR AGO'
        },
        {
            type: 'video',
            title: 'New video submission',
            desc: 'Product feedback received from Marc at TechFlow.',
            time: '5 HOURS AGO'
        },
        {
            type: 'video',
            title: 'New video submission',
            desc: 'Product feedback received from Marc at TechFlow.',
            time: '5 HOURS AGO'
        },

    ]

    return (
        <div className="space-y-4 px-6 md:space-y-10 py-3 overflow-y-auto h-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full">

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div className="w-full">
                    <BreadcrumbNav items={[]} />
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Your Spaces
                    </h1>
                </div>
            </div>

            {/* ── Compact Floating Stats Bar ── */}
            <DashboardStatsBar />

            {/* ── Collections Grid with Sidebar ── */}
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 pt-2">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[20px] font-extrabold text-slate-900 dark:text-white leading-none">Active Spaces</h2>

                        {/* Mobile Activity Notifcation Style Trigger */}
                        <div className="lg:hidden">
                            <Popover>
                                <PopoverTrigger >
                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#1A1A20] border border-slate-200 dark:border-[#2A2A35] text-slate-600 dark:text-[#A1A1AA] text-[11px] font-bold hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer">
                                        <Activity className="w-3.5 h-3.5" />
                                        Activity
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="w-[calc(100vw-2rem)] sm:w-[380px] p-0 border-0 bg-transparent shadow-none">
                                    <ActivityTray activities={recentActivity} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <motion.div 
                        className="flex flex-col gap-2"
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {spaces && spaces.length > 0 ? (
                            spaces.map((space, idx) => (
                                <motion.div 
                                    key={idx} 
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                                    }}
                                >
                                    <SpaceCard space={space} />
                                </motion.div>
                            ))
                        ) : (
                            <EmptyState
                                icon={Plus}
                                title="No spaces yet"
                                description="Create your first space to start collecting and displaying testimonials."
                                actionLabel="Create My First Space"
                                className="h-full"
                            />
                        )}
                    </motion.div>

                    {/* Pagination */}
                    <div className="flex items-center justify-end mt-3 ">
                        <div className="flex items-center gap-2">
                            <button disabled className="px-3 py-1.5 rounded-lg text-[12px] font-bold text-slate-400 dark:text-[#666] transition-colors cursor-not-allowed">
                                Prev
                            </button>
                            <div className="flex items-center gap-1">
                                <button className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-[#6C85FF] text-white text-[12px] font-bold flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.2)] dark:shadow-[0_2px_10px_rgba(108,133,255,0.2)] cursor-pointer">1</button>
                                <button className="w-8 h-8 rounded-lg text-slate-600 dark:text-[#A0A0AB] hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white text-[12px] font-bold flex items-center justify-center transition-colors cursor-pointer">2</button>
                                <button className="w-8 h-8 rounded-lg text-slate-600 dark:text-[#A0A0AB] hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white text-[12px] font-bold flex items-center justify-center transition-colors cursor-pointer">3</button>
                                <span className="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-[#666] text-[12px] font-bold tracking-widest">...</span>
                            </div>
                            <button className="px-3 py-1.5 rounded-lg text-[12px] font-bold text-slate-600 dark:text-[#A0A0AB] hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Recent Activity */}
                <ActivityFeed activities={recentActivity} />
            </div>

        </div>
    )
}

export default DashboardPage
