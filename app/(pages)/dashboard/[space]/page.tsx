"use client"

import { useState } from "react"
import {
    Settings, Bell, Search, Star, MessageSquareText,
    Heart, Play, CheckCircle2, Monitor, LogOut, HelpCircle, Sparkles, Link as LinkIcon,
    Menu, AlignJustify, Plus, LayoutGrid, Layers, ChevronDown
} from "lucide-react"

const CARDS = [
    {
        id: "1",
        name: "Sagar Y",
        avatar: "https://i.pravatar.cc/150?u=sagar",
        ratingPos: "name",
        rating: 5,
        badge: { label: "LIKED", css: "text-blue-600 dark:text-[#6C85FF] bg-blue-50 dark:bg-[#1A1C2E]" },
        content: "TestimonialPro has completely changed how we collect social proof. The workflow is seamless, and the widgets look amazing on our landing page. Highly recommended for any SaaS founder.",
        date: "Sep 28, 2023",
        action: null,
    },
    {
        id: "2",
        name: "John Doe",
        title: "Product Designer",
        initials: "JD",
        bg: "bg-indigo-900",
        ratingPos: "bottom",
        rating: 5,
        badge: { label: "TEXT", css: "text-slate-600 dark:text-[#82828C] bg-slate-100 dark:bg-[#1C1C21] border border-slate-200 dark:border-[#2B2B33]" },
        content: "Love the 'Obsidian Logic' aesthetic. It fits perfectly with our dark mode product. The API integration was a breeze. We're now displaying real reviews in our app dashboard thanks to you guys.",
        date: "Sep 28, 2023",
        action: "REPLY"
    },
    {
        id: "3",
        name: "Elena K.",
        title: "E-commerce Owner",
        initials: "EK",
        bg: "bg-purple-900",
        ratingPos: "none",
        badge: { label: "TEXT", css: "text-slate-600 dark:text-[#82828C] bg-slate-100 dark:bg-[#1C1C21] border border-slate-200 dark:border-[#2B2B33]" },
        content: "We saw a 15% increase in conversion rates after adding the 'Wall of Love' to our checkout page. The social proof is undeniable.",
        teamReply: "\"That's amazing news, Elena! We're so glad to hear about the conversion boost.\"",
        date: "Sep 15, 2023",
        actionIcon: true
    },
    {
        id: "4",
        isVideo: true,
        name: "Amanda Chen",
        ratingPos: "right",
        rating: 5,
        content: "\"The video quality is crystal clear and the recording experience was so easy for my clients.\""
    },
    {
        id: "5",
        name: "Marcus R",
        avatar: "https://i.pravatar.cc/150?img=11",
        ratingPos: "name",
        rating: 5,
        badge: { label: "LIKED", css: "text-blue-600 dark:text-[#6C85FF] bg-blue-50 dark:bg-[#1A1C2E]" },
        content: "The best tool for gathering video testimonials. Simple, effective, and beautiful.",
    },
    {
        id: "6",
        name: "Tim Howard",
        avatar: "https://i.pravatar.cc/150?img=12",
        ratingPos: "name",
        rating: 5,
        content: "Fantastic support team. They helped me set up my custom domain in minutes. The obsidian theme is just the icing on the cake. Five stars all around.",
    }
]

const TABS = ["All", "Video", "Text", "Highlighted", "Liked", "Archived", "Spam"]

function Stars({ count }: { count?: number }) {
    if (!count) return null
    return (
        <div className="flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < count ? "fill-emerald-500 text-emerald-500 dark:fill-[#65E3AD] dark:text-[#65E3AD]" : "fill-slate-200 text-slate-200 dark:fill-[#2B2B33] dark:text-[#2B2B33]"}`} />
            ))}
        </div>
    )
}

function TestimonialCard({ data }: { data: typeof CARDS[0] }) {
    return (
        <div className="bg-white dark:bg-[#141417] border border-slate-200 dark:border-[#1F1F24] shadow-sm dark:shadow-none rounded-2xl p-5 w-full flex flex-col group transition-all duration-300 hover:border-slate-300 dark:hover:border-[#333]">
            {data.isVideo && (
                <div className="w-full aspect-[16/10] bg-slate-900 dark:bg-[#1F1F24] rounded-xl mb-4 relative overflow-hidden flex items-center justify-center shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 dark:from-[#2a2a30] dark:to-[#111114]"></div>
                    <div className="relative w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition shadow-xl">
                        <Play className="w-6 h-6 text-white fill-white ml-1 opacity-90" />
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                        <span className="bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider">VIDEO</span>
                        <span className="bg-purple-600/90 dark:bg-[#8A63D2]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider">0:45</span>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center w-full min-w-0">
                    {!data.isVideo && (
                        data.avatar ? (
                            <img src={data.avatar} alt={data.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        ) : (
                            <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold text-white shadow-inner ${data.bg || 'bg-blue-900'}`}>
                                {data.initials}
                            </div>
                        )
                    )}

                    <div className={`${data.isVideo ? 'w-full min-w-0' : 'min-w-0'}`}>
                        <div className={`flex items-center ${data.isVideo ? 'justify-between' : ''}`}>
                            <div className="text-[14.5px] font-semibold text-slate-900 dark:text-white leading-none truncate">{data.name}</div>
                            {data.ratingPos === "right" && <Stars count={data.rating} />}
                        </div>

                        {!data.isVideo && data.title && (
                            <div className="text-[11px] text-slate-500 dark:text-[#82828C] mt-1 truncate">{data.title}</div>
                        )}
                        {data.ratingPos === "name" && (
                            <div className="mt-1.5"><Stars count={data.rating} /></div>
                        )}
                    </div>
                </div>

                {data.badge && (
                    <div className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded tracking-wider shrink-0 ml-3 ${data.badge.css}`}>
                        {data.badge.label}
                    </div>
                )}
            </div>

            <p className={`text-[13px] text-slate-600 dark:text-[#A0A0AB] leading-relaxed ${data.isVideo ? 'italic' : ''}`}>
                {data.content}
            </p>

            {data.ratingPos === "bottom" && (
                <div className="mt-5"><Stars count={data.rating} /></div>
            )}

            {data.teamReply && (
                <div className="mt-5 w-full">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-[#6C85FF] mb-2 px-1">Team Reply</div>
                    <div className="bg-slate-50 dark:bg-[#1C1C21]/60 border border-slate-100 dark:border-[#2B2B33] rounded-xl p-3.5 text-[12px] text-slate-600 dark:text-[#82828C] italic">
                        {data.teamReply}
                    </div>
                </div>
            )}

            {(data.date || data.action || data.actionIcon) && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-[#1F1F24]/50">
                    <div className="text-[11px] text-slate-400 dark:text-[#6A6A75] font-medium">{data.date}</div>
                    {data.action && (
                        <button className="text-[10px] font-bold text-blue-600 dark:text-[#6C85FF] tracking-widest hover:text-blue-700 dark:hover:text-white transition-colors uppercase">
                            {data.action}
                        </button>
                    )}
                    {data.actionIcon && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#65E3AD] fill-emerald-500/20 dark:fill-[#65E3AD]/20" />
                    )}
                </div>
            )}
        </div>
    )
}

const SPACES = [
    { label: "Gojo Satoru's Space", value: "gojo" },
    { label: "Obsidian Logic App", value: "obsidian" },
    { label: "Testimo Marketing", value: "testimo" },
]

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [activeSpace, setActiveSpace] = useState(SPACES[0])

    return (
        <aside className="w-[260px] bg-white dark:bg-[#09090C] border-r border-slate-200 dark:border-[#1F1F24] flex flex-col h-full shrink-0 z-20 relative transition-colors duration-300">
            <div className="relative px-6 pt-3 pb-2">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full p-2 -ml-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative z-20"
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 shrink-0 bg-blue-600 dark:bg-[#6C85FF] rounded-lg flex items-center justify-center text-white shadow-sm dark:shadow-[0_0_15px_rgba(108,133,255,0.3)]">
                            <Layers className="w-5 h-5 fill-current" />
                        </div>
                        <div className="text-left min-w-0 flex flex-col justify-center">
                            <div className="text-slate-900 dark:text-white font-bold text-[14px] tracking-wide truncate pr-2">{activeSpace.label}</div>
                            <div className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-[#666] font-bold mt-0.5">Power User Console</div>
                        </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 dark:text-[#666] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Overlay for capturing outside clicks */}
                <div
                    className={`fixed inset-0 z-30 transition-opacity duration-200 ${isDropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsDropdownOpen(false)}
                />

                {/* Dropdown Menu with Animation */}
                <div
                    className={`absolute top-full left-4 right-4 mt-2 bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] z-40 overflow-hidden flex flex-col origin-top transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isDropdownOpen
                        ? 'opacity-100 scale-100 translate-y-0 visible pointer-events-auto'
                        : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                        }`}
                >
                    <div className="p-2 flex flex-col gap-1 max-h-[200px] overflow-y-auto no-scrollbar">
                        {SPACES.map(space => (
                            <button
                                key={space.value}
                                onClick={() => { setActiveSpace(space); setIsDropdownOpen(false); }}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[13px] font-semibold transition-colors ${activeSpace.value === space.value
                                    ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white'
                                    : 'text-slate-600 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${activeSpace.value === space.value ? 'bg-blue-600 dark:bg-[#6C85FF]' : 'bg-slate-100 dark:bg-white/5'}`}>
                                    <Layers className={`w-3 h-3 ${activeSpace.value === space.value ? 'text-white' : 'text-slate-400 dark:text-[#82828C]'}`} />
                                </div>
                                <span className="truncate">{space.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="p-2 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent">
                        <button className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-left text-[13px] font-semibold text-blue-600 dark:text-[#8CB4FC] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                            <Plus className="w-4 h-4" /> Create new space
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-4 mt-6 flex flex-col gap-1 flex-1 relative z-10 w-full">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#555] px-3 mb-3">Management</div>

                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-50/80 dark:bg-[#141721] border border-blue-100/50 dark:border-[#1F2436] text-blue-600 dark:text-[#8CB4FC] shadow-sm dark:shadow-none transition-all w-full text-left">
                    <Monitor className="w-[18px] h-[18px] shrink-0 fill-blue-600/10 dark:fill-[#8CB4FC]/10 animate-pulse" />
                    <span className="text-[13px] font-semibold">Inbox</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                    <LayoutGrid className="w-[18px] h-[18px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[13px] font-semibold">Embed Widgets</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                    <Sparkles className="w-[18px] h-[18px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[13px] font-semibold">Integrations</span>
                </button>

                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#555] px-3 mb-3 mt-8">Support</div>

                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                    <HelpCircle className="w-[18px] h-[18px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[13px] font-semibold">Help Center</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full text-left group">
                    <Star className="w-[18px] h-[18px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[13px] font-semibold">What's New</span>
                </button>
            </div>

            <div className="p-5 mt-auto relative z-10">
                <button className="flex items-center gap-3 px-3 py-2.5 text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all w-full text-left group">
                    <LogOut className="w-[18px] h-[18px] shrink-0 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-[13px] font-semibold">Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default function SpaceDetailPage() {
    const [activeTab, setActiveTab] = useState("All")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    return (
        <div className="flex h-screen font-sans overflow-hidden transition-colors duration-300">
            <Sidebar />

            <main className="flex-1 flex flex-col relative h-full min-w-0 transition-colors duration-300">
                <div className="px-6 shrink-0 z-20">
                    <div className="w-full relative mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300 group/bar">

                        {/* Subtle ambient glows floating in the background */}
                        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-[#6C85FF]/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none transition-opacity duration-500 group-hover/bar:opacity-100 opacity-50"></div>

                        <div className="flex items-center gap-10 md:gap-12 relative z-10">
                            <div className="relative group cursor-default">
                                <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover:-translate-y-0.5">

                                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Total Reviews</div>
                                </div>
                                <div className="text-[28px] font-extrabold text-slate-800 dark:text-white leading-none tracking-tight">128</div>
                            </div>

                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-[#2A2A35] to-transparent"></div>

                            <div className="relative group cursor-default">
                                <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover:-translate-y-0.5">

                                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Avg Rating</div>
                                </div>
                                <div className="text-[28px] font-extrabold text-slate-800 dark:text-white leading-none tracking-tight">4.9</div>
                            </div>

                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-[#2A2A35] to-transparent"></div>

                            <div className="relative group cursor-default">
                                <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover:-translate-y-0.5">

                                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#82828C] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Video Responses</div>
                                </div>
                                <div className="text-[28px] font-extrabold text-slate-800 dark:text-white leading-none tracking-tight">32</div>
                            </div>
                        </div>

                        <div className="flex items-center relative z-10 shrink-0">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-500 dark:text-[#82828C] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1A20] font-semibold text-[13px] transition-all duration-300 active:scale-95 group border border-transparent hover:border-slate-200 dark:hover:border-[#2A2A35]">
                                <LinkIcon className="w-4 h-4 transition-transform group-hover:-rotate-12" />
                                Copy Public Link
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab;
                                if (tab === "Liked") {
                                    return (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-5 py-2 rounded-full text-[12px] font-semibold transition-all flex items-center gap-1.5 ${isActive
                                                ? 'bg-blue-600 dark:bg-[#6C85FF] text-white shadow-[0_2px_10px_rgba(37,99,235,0.3)] dark:shadow-[0_2px_10px_rgba(108,133,255,0.3)]'
                                                : 'bg-white dark:bg-[#18181D] hover:bg-slate-100 dark:hover:bg-[#202025] text-slate-600 dark:text-[#82828C] border border-slate-200 dark:border-[#222228]'
                                                }`}
                                        >
                                            <Heart className={`w-3.5 h-3.5 ${isActive ? 'fill-white' : 'text-slate-400 dark:text-[#82828C]'}`} /> Liked
                                        </button>
                                    )
                                }
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-5 py-2 rounded-full text-[12px] font-semibold transition-all ${isActive
                                            ? 'bg-blue-600 dark:bg-[#6C85FF] text-white shadow-[0_2px_10px_rgba(37,99,235,0.3)] dark:shadow-[0_2px_10px_rgba(108,133,255,0.3)]'
                                            : 'bg-white dark:bg-[#18181D] hover:bg-slate-100 dark:hover:bg-[#202025] text-slate-600 dark:text-[#82828C] border border-slate-200 dark:border-[#222228]'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="flex bg-white dark:bg-[#131316] rounded-xl p-1 border border-slate-200 dark:border-[#1F1F24] shrink-0 ml-4 shadow-sm dark:shadow-none">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`rounded-lg p-1.5 transition-all ${viewMode === "grid" ? "bg-slate-100 dark:bg-[#222228] text-blue-600 dark:text-white shadow-sm" : "text-slate-400 dark:text-[#6A6A75] hover:text-slate-900 dark:hover:text-white"}`}
                            >
                                <LayoutGrid className="w-[18px] h-[18px]" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`rounded-lg p-1.5 transition-all ${viewMode === "list" ? "bg-slate-100 dark:bg-[#222228] text-blue-600 dark:text-white shadow-sm" : "text-slate-400 dark:text-[#6A6A75] hover:text-slate-900 dark:hover:text-white"}`}
                            >
                                <AlignJustify className="w-[18px] h-[18px]" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-32">
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="flex flex-col gap-6">
                                <TestimonialCard data={CARDS[0]} />
                                <TestimonialCard data={CARDS[3]} />
                            </div>
                            <div className="flex flex-col gap-6">
                                <TestimonialCard data={CARDS[1]} />
                                <TestimonialCard data={CARDS[4]} />
                            </div>
                            <div className="flex flex-col gap-6">
                                <TestimonialCard data={CARDS[2]} />
                                <TestimonialCard data={CARDS[5]} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5 max-w-3xl mx-auto w-full transition-all duration-300">
                            {CARDS.map(card => (
                                <TestimonialCard key={card.id} data={card} />
                            ))}
                        </div>
                    )}
                </div>

                <button className="fixed bottom-10 right-10 w-[54px] h-[54px] rounded-full bg-blue-600 dark:bg-[#6C85FF] hover:bg-blue-700 dark:hover:bg-[#5C75FF] flex items-center justify-center text-white shadow-[0_8px_30px_rgba(37,99,235,0.4)] dark:shadow-[0_8px_30px_rgba(108,133,255,0.4)] transition-transform hover:scale-105 z-50">
                    <Plus className="w-6 h-6" />
                </button>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    )
}