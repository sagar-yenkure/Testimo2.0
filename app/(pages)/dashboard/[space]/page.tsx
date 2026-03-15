"use client"

import {
    Inbox,
    Code2,
    Settings
} from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// New modular components
import { InboxView } from '@/components/dashboard/inbox-view'
import { EmbedView } from '@/components/dashboard/embed-view'
import { IntegrationsView } from '@/components/dashboard/integrations-view'

const SpaceDetailPage = ({ params }: { params: { space: string } }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // Manage tab state through URL search params
    const activeTab = searchParams.get('tab') || 'inbox'

    const setActiveTab = (tab: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', tab)
        router.push(`${pathname}?${params.toString()}`)
    }

    const sidebarItems = [
        { id: 'inbox', label: 'Inbox', icon: Inbox },
        { id: 'embed', label: 'Embed Widgets', icon: Code2 },
        { id: 'integrations', label: 'Integrations', icon: Settings },
    ]

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-140px)]">
            {/* Secondary Sidebar */}
            <div className="w-full md:w-64 shrink-0 space-y-2">
                <div className="bg-card-bg border border-gray-100 dark:border-white/5 rounded-[24px] p-4 py-6 shadow-sm">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all relative overflow-hidden group ${activeTab === item.id
                                ? 'text-white'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                        >
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 bg-[#2D6CFF]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon className={`w-5 h-5 relative z-10 ${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200'}`} />
                            <span className="relative z-10">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-6">

                {activeTab === 'inbox' && (
                    <InboxView key="inbox" spaceName="Gojo Satoru - The Strongest Sorcerer" />
                )}

                {activeTab === 'embed' && (
                    <EmbedView key="embed" spaceId={params.space} />
                )}

                {activeTab === 'integrations' && (
                    <IntegrationsView key="integrations" />
                )}
            </div>
        </div>
    )
}

export default SpaceDetailPage
