"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    LayoutGrid,
    Code2,
    Settings2,
    MessageSquareText,
    Video,
    Star,
    Archive,
    AlertOctagon,
    Heart,
    MoreHorizontal,
    Trash2,
    BarChart3,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    X,
    TrendingUp,
    TrendingDown,
    ExternalLink,
    Copy,
    HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type FilterTab = "all" | "video" | "text" | "highlighted" | "liked" | "archived" | "spam"

interface Testimonial {
    id: string
    name: string
    initials: string
    avatarColor: string
    rating: number
    type: "text" | "video"
    status: "liked" | "highlighted" | "archived" | "spam" | "none"
    date: string
    content: string
}

const TABS: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: 1 },
    { key: "video", label: "Video", count: 0 },
    { key: "text", label: "Text", count: 1 },
    { key: "highlighted", label: "Highlighted", count: 0 },
    { key: "liked", label: "Liked", count: 1 },
    { key: "archived", label: "Archived", count: 0 },
    { key: "spam", label: "Spam", count: 0 },
]

const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        name: "Sagar Y",
        initials: "SA",
        avatarColor: "bg-emerald-500",
        rating: 4,
        type: "text",
        status: "liked",
        date: "Mar 7, 2026",
        content: '"good"',
    },
]

const NAV_ITEMS = [
    { key: "inbox", label: "Inbox", icon: LayoutGrid },
    { key: "embed", label: "Embed Widgets", icon: Code2 },
    { key: "integrations", label: "Integrations", icon: Settings2 },
]

/* ── Sparkline SVG (inline mini bar chart) ── */
function Sparkline({ bars, color }: { bars: number[]; color: string }) {
    const max = Math.max(...bars, 1)
    const w = 6
    const gap = 3
    const h = 36
    return (
        <svg width={(w + gap) * bars.length - gap} height={h} viewBox={`0 0 ${(w + gap) * bars.length - gap} ${h}`}>
            {bars.map((v, i) => {
                const bh = Math.max(4, (v / max) * h)
                return (
                    <rect
                        key={i}
                        x={i * (w + gap)}
                        y={h - bh}
                        width={w}
                        height={bh}
                        rx={2}
                        fill={color}
                        opacity={i === bars.length - 1 ? 1 : 0.35}
                    />
                )
            })}
        </svg>
    )
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
    const cls = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5"
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className={`${cls} ${i <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700"}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )
}

function StatusBadge({ status }: { status: Testimonial["status"] }) {
    if (status === "none") return <span className="text-[12px] text-gray-300 dark:text-gray-600">—</span>
    const map = {
        liked: { label: "Liked", icon: Heart, cls: "bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 border-red-200/60 dark:border-red-500/20" },
        highlighted: { label: "Highlighted", icon: Star, cls: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20" },
        archived: { label: "Archived", icon: Archive, cls: "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 border-gray-200/60 dark:border-white/[0.08]" },
        spam: { label: "Spam", icon: AlertOctagon, cls: "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200/60 dark:border-orange-500/20" },
    }
    const { label, icon: Icon, cls } = map[status]
    return (
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${cls}`}>
            <Icon className="w-2.5 h-2.5 fill-current" />{label}
        </span>
    )
}

function TypeBadge({ type }: { type: Testimonial["type"] }) {
    return type === "text" ? (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full border border-blue-200/60 dark:border-blue-500/20">
            <MessageSquareText className="w-2.5 h-2.5" />Text
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full border border-purple-200/60 dark:border-purple-500/20">
            <Video className="w-2.5 h-2.5" />Video
        </span>
    )
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function SpaceDetailPage() {
    const [activeTab, setActiveTab] = useState<FilterTab>("all")
    const [activeNav, setActiveNav] = useState("inbox")
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const [search, setSearch] = useState("")

    const filtered = useMemo(() => TESTIMONIALS.filter((t) => {
        const matchesTab =
            activeTab === "all" ? true :
                activeTab === "video" ? t.type === "video" :
                    activeTab === "text" ? t.type === "text" :
                        activeTab === "liked" ? t.status === "liked" :
                            activeTab === "highlighted" ? t.status === "highlighted" :
                                activeTab === "archived" ? t.status === "archived" :
                                    activeTab === "spam" ? t.status === "spam" : true
        const q = search.toLowerCase()
        const matchesSearch = !q || t.name.toLowerCase().includes(q) || t.content.toLowerCase().includes(q)
        return matchesTab && matchesSearch
    }), [activeTab, search])

    return (
        <div className="flex h-full overflow-hidden bg-gray-50/40 dark:bg-[#0d0d10]">

            {/* ══════════════ LEFT SIDEBAR ══════════════ */}
            <aside className="hidden lg:flex w-[220px] shrink-0 bg-white dark:bg-[#111114] border-r border-blue-100/60 dark:border-white/[0.06] flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                {/* Space identity header */}
                <div className="p-4 border-b border-blue-100/40 dark:border-white/[0.05]">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-[12px] font-bold text-gray-400 dark:text-gray-500 hover:text-[#2D6CFF] transition-colors mb-3 group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Back to dashboard
                    </Link>
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#2D6CFF]/10 dark:bg-[#2D6CFF]/20 flex items-center justify-center text-[11px] font-black text-[#2D6CFF] shrink-0">
                            GS
                        </div>
                        <div className="min-w-0">
                            <p className="text-[13px] font-extrabold text-gray-900 dark:text-white truncate leading-tight">Gojo Satoru</p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">testimo.io/gojo</p>
                        </div>
                        <button className="ml-auto text-gray-300 dark:text-gray-600 hover:text-[#2D6CFF] transition-colors shrink-0">
                            <Copy className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Nav section */}
                <div className="p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 px-2 mb-2">Management</p>
                    {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveNav(key)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all text-left w-full mb-0.5 ${activeNav === key
                                ? "bg-[#2D6CFF]/10 dark:bg-[#2D6CFF]/15 text-[#2D6CFF]"
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.03] hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            <Icon className="w-4 h-4 shrink-0" />{label}
                        </button>
                    ))}
                </div>

                {/* Help center card — mirrors Super Finti bottom CTA */}
                <div className="mt-auto p-3">
                    <div className="bg-[#2D6CFF]/8 dark:bg-[#2D6CFF]/10 border border-[#2D6CFF]/20 dark:border-[#2D6CFF]/20 rounded-2xl p-4 text-center">
                        <div className="w-9 h-9 rounded-full bg-[#2D6CFF] flex items-center justify-center mx-auto mb-3">
                            <HelpCircle className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-[13px] font-extrabold text-gray-900 dark:text-white mb-1">Help Center</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-snug mb-3">
                            Having trouble with Testimo? Contact our support team.
                        </p>
                        <button className="w-full text-[11px] font-black text-[#2D6CFF] bg-white dark:bg-white/[0.08] border border-[#2D6CFF]/30 rounded-xl py-2 hover:bg-[#2D6CFF] hover:text-white transition-all">
                            Go to Help Center
                        </button>
                    </div>
                </div>
            </aside>

            {/* ══════════════ MAIN CONTENT ══════════════ */}
            <main className="flex-1 min-w-0 flex flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                {/* ── Top header ── */}
                <div className="shrink-0 border-b border-blue-100/60 dark:border-white/[0.06] px-6 pt-5 pb-4">
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white truncate">
                            Gojo Satoru - The Strongest Sorcerer
                        </h1>
                        <button className="ml-auto shrink-0 text-gray-300 dark:text-gray-600 hover:text-[#2D6CFF] transition-colors">
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-[13px] text-gray-400 dark:text-gray-500">testimo.io/gojo · Created Mar 7, 2026</p>
                </div>

                <div className="flex-1 px-6 py-5 space-y-5">

                    {/* ── ROW 1: Hero stat cards (like Super Finti balance cards) ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                        {/* Card 1 — Total submissions */}
                        <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col gap-3 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mb-1">Total</p>
                                    <p className="text-[32px] font-black text-gray-900 dark:text-white leading-none">1</p>
                                </div>
                                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                    <BarChart3 className="w-4 h-4 text-blue-500" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center gap-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-green-200/50 dark:border-green-500/20">
                                        <TrendingUp className="w-2.5 h-2.5" /> +1
                                    </div>
                                    <span className="text-[11px] text-gray-400 dark:text-gray-500">This month</span>
                                </div>
                                <Sparkline bars={[0, 0, 1, 0, 0, 0, 1]} color="#378ADD" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">Live tracking active</span>
                            </div>
                        </div>

                        {/* Card 2 — Text testimonials */}
                        <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col gap-3 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mb-1">Text</p>
                                    <p className="text-[32px] font-black text-gray-900 dark:text-white leading-none">1</p>
                                </div>
                                <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                                    <MessageSquareText className="w-4 h-4 text-green-500" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center gap-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-green-200/50 dark:border-green-500/20">
                                        <TrendingUp className="w-2.5 h-2.5" /> +1
                                    </div>
                                    <span className="text-[11px] text-gray-400 dark:text-gray-500">This month</span>
                                </div>
                                <Sparkline bars={[0, 1, 0, 0, 1, 0, 1]} color="#22c55e" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">Live tracking active</span>
                            </div>
                        </div>

                        {/* Card 3 — Video testimonials */}
                        <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col gap-3 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mb-1">Video</p>
                                    <p className="text-[32px] font-black text-gray-900 dark:text-white leading-none">0</p>
                                </div>
                                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
                                    <Video className="w-4 h-4 text-purple-500" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/[0.04] text-gray-400 dark:text-gray-500 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-gray-200/60 dark:border-white/[0.06]">
                                        — 0
                                    </div>
                                    <span className="text-[11px] text-gray-400 dark:text-gray-500">This month</span>
                                </div>
                                <Sparkline bars={[0, 0, 0, 0, 0, 0, 0]} color="#a855f7" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">Live tracking active</span>
                            </div>
                        </div>

                        {/* Card 4 — Highlighted */}
                        <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col gap-3 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mb-1">Highlighted</p>
                                    <p className="text-[32px] font-black text-gray-900 dark:text-white leading-none">0</p>
                                </div>
                                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                                    <Star className="w-4 h-4 text-amber-500" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[11px] text-gray-400 dark:text-gray-500">Will appear on wall of love</p>
                                <Sparkline bars={[0, 0, 0, 0, 0, 0, 0]} color="#f59e0b" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">0 on wall of love</span>
                            </div>
                        </div>
                    </div>

                    {/* ── ROW 2: Testimonials table (left, 2/3) + Recent activity (right, 1/3) ── */}
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">

                        {/* ── TESTIMONIALS TABLE ── */}
                        <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm">

                            {/* Table toolbar */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-100/40 dark:border-white/[0.05]">
                                <div>
                                    <p className="text-[15px] font-extrabold text-gray-900 dark:text-white">Latest Testimonials</p>
                                    <p className="text-[11px] text-gray-400 dark:text-gray-500">{TESTIMONIALS.length} total · updated live</p>
                                </div>
                                <div style={{ flex: 1 }} />
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search…"
                                        className="w-[160px] h-8 pl-9 pr-8 bg-gray-50 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.08] rounded-xl text-[12px] font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-[#2D6CFF] focus:ring-1 focus:ring-[#2D6CFF]/30 transition-all"
                                    />
                                    {search && (
                                        <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                                <Button variant="outline" size="sm" className="h-8 px-3 rounded-xl text-[12px] font-bold border-gray-200/80 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:border-[#2D6CFF] hover:text-[#2D6CFF] gap-1.5">
                                    <SlidersHorizontal className="w-3.5 h-3.5" />Filter
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 px-3 rounded-xl text-[12px] font-bold border-gray-200/80 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:border-[#2D6CFF] hover:text-[#2D6CFF] gap-1.5">
                                    <ArrowUpDown className="w-3.5 h-3.5" />Sort
                                </Button>
                            </div>

                            {/* Filter tab chips */}
                            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-blue-100/30 dark:border-white/[0.04] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-black whitespace-nowrap transition-all ${activeTab === tab.key
                                            ? "bg-[#2D6CFF]/10 dark:bg-[#2D6CFF]/15 text-[#2D6CFF]"
                                            : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                                            }`}
                                    >
                                        {tab.label}
                                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === tab.key
                                            ? "bg-[#2D6CFF]/20 text-[#2D6CFF]"
                                            : "bg-gray-100 dark:bg-white/[0.06] text-gray-400 dark:text-gray-500"
                                            }`}>
                                            {tab.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Column headers */}
                            <div className="hidden md:grid md:grid-cols-[1fr_110px_110px_110px_120px_110px] items-center px-5 py-3 border-b border-blue-100/30 dark:border-white/[0.04] bg-gray-50/60 dark:bg-white/[0.02]">
                                {["Reviewer", "Rating", "Status", "Type", "Date", "Actions"].map((h) => (
                                    <span key={h} className="text-[10px] font-black tracking-[0.14em] uppercase text-gray-400 dark:text-gray-600">{h}</span>
                                ))}
                            </div>

                            {/* Rows */}
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] flex items-center justify-center">
                                        <MessageSquareText className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                                    </div>
                                    <p className="text-[13px] font-bold text-gray-400 dark:text-gray-500">
                                        {search ? `No results for "${search}"` : "No testimonials here"}
                                    </p>
                                    {search && (
                                        <button onClick={() => setSearch("")} className="text-[12px] font-bold text-[#2D6CFF] hover:underline">Clear search</button>
                                    )}
                                </div>
                            ) : (
                                filtered.map((t, idx) => (
                                    <div
                                        key={t.id}
                                        onClick={() => setOpenMenu(null)}
                                        className={`grid grid-cols-1 md:grid-cols-[1fr_110px_110px_110px_120px_110px] items-center px-5 py-4 hover:bg-blue-50/20 dark:hover:bg-white/[0.015] transition-colors group ${idx < filtered.length - 1 ? "border-b border-blue-100/30 dark:border-white/[0.04]" : ""}`}
                                    >
                                        <div className="flex items-start gap-3 mb-3 md:mb-0 min-w-0">
                                            <div className={`w-9 h-9 rounded-full ${t.avatarColor} flex items-center justify-center text-[10px] font-black text-white shrink-0`}>{t.initials}</div>
                                            <div className="min-w-0">
                                                <div className="text-[14px] font-extrabold text-gray-900 dark:text-white leading-tight mb-0.5">{t.name}</div>
                                                <p className="text-[12px] text-gray-400 dark:text-gray-500 line-clamp-1">{t.content}</p>
                                            </div>
                                        </div>
                                        <div className="mb-3 md:mb-0"><StarRating rating={t.rating} /></div>
                                        <div className="mb-3 md:mb-0"><StatusBadge status={t.status} /></div>
                                        <div className="mb-3 md:mb-0"><TypeBadge type={t.type} /></div>
                                        <div className="mb-3 md:mb-0">
                                            <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500">{t.date}</span>
                                        </div>
                                        <div className="relative flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                                            <button title="Like" className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-600 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all">
                                                <Heart className="w-3.5 h-3.5" />
                                            </button>
                                            <button title="Highlight" className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-500 transition-all">
                                                <Star className="w-3.5 h-3.5" />
                                            </button>
                                            <button title="Archive" className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/[0.06] hover:text-gray-600 transition-all">
                                                <Archive className="w-3.5 h-3.5" />
                                            </button>
                                            <div className="relative">
                                                <button onClick={() => setOpenMenu(openMenu === t.id ? null : t.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/[0.06] hover:text-gray-600 transition-all">
                                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                                </button>
                                                {openMenu === t.id && (
                                                    <div className="absolute right-0 top-8 z-30 bg-white dark:bg-[#1a1a1f] border border-blue-100/60 dark:border-white/[0.08] rounded-xl shadow-xl py-1.5 min-w-[150px]">
                                                        <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors">
                                                            <AlertOctagon className="w-3.5 h-3.5 text-orange-400" />Mark as spam
                                                        </button>
                                                        <div className="h-px bg-gray-100 dark:bg-white/[0.06] my-1" />
                                                        <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[12px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                                            <Trash2 className="w-3.5 h-3.5" />Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {/* Footer */}
                            <div className="px-5 py-3 border-t border-blue-100/30 dark:border-white/[0.04] bg-gray-50/50 dark:bg-white/[0.01] flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-300 dark:text-gray-700">
                                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                                </span>
                                {search && (
                                    <button onClick={() => setSearch("")} className="text-[11px] font-bold text-[#2D6CFF] flex items-center gap-1 hover:underline">
                                        <X className="w-3 h-3" />Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* ── RIGHT COLUMN: Upcoming / Quick actions (mirrors Super Finti right panel) ── */}
                        <div className="flex flex-col gap-4">

                            {/* Quick actions card */}
                            <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-[14px] font-extrabold text-gray-900 dark:text-white">Quick Actions</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button className="flex items-center gap-3 w-full px-3 py-2.5 bg-[#2D6CFF] hover:bg-[#2057d5] text-white rounded-xl text-[13px] font-bold transition-all active:scale-95">
                                        <ExternalLink className="w-4 h-4 shrink-0" />
                                        Share collection link
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-3 py-2.5 bg-gray-50 dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 rounded-xl text-[13px] font-bold hover:border-[#2D6CFF] hover:text-[#2D6CFF] transition-all">
                                        <Code2 className="w-4 h-4 shrink-0" />
                                        Copy embed code
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-3 py-2.5 bg-gray-50 dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 rounded-xl text-[13px] font-bold hover:border-[#2D6CFF] hover:text-[#2D6CFF] transition-all">
                                        <Settings2 className="w-4 h-4 shrink-0" />
                                        Space settings
                                    </button>
                                </div>
                            </div>

                            {/* Recent activity card — mirrors "Upcoming Transactions" */}
                            <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl p-4 shadow-sm flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-[14px] font-extrabold text-gray-900 dark:text-white">Recent Activity</p>
                                    <button className="text-[11px] font-bold text-[#2D6CFF] hover:underline">View all</button>
                                </div>

                                {/* Today */}
                                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400 dark:text-gray-600 mb-2">Today</p>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0">
                                        <MessageSquareText className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-extrabold text-gray-900 dark:text-white leading-tight">New text testimonial</p>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-500">Sagar Y · 4 stars</p>
                                    </div>
                                    <span className="text-[12px] font-black text-green-500 shrink-0">+1</span>
                                </div>

                                <div className="h-px bg-blue-100/40 dark:bg-white/[0.05] mb-3" />

                                {/* Mar 7 */}
                                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400 dark:text-gray-600 mb-2">Mar 7, 2026</p>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <Heart className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-extrabold text-gray-900 dark:text-white leading-tight">Testimonial liked</p>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-500">Sagar Y marked as liked</p>
                                    </div>
                                    <span className="text-[11px] font-black text-gray-400 dark:text-gray-500 shrink-0 bg-red-50 dark:bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded-full">♥</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                                        <BarChart3 className="w-4 h-4 text-purple-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-extrabold text-gray-900 dark:text-white leading-tight">Space created</p>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-500">Gojo Satoru space went live</p>
                                    </div>
                                </div>
                            </div>

                            {/* Rating breakdown card */}
                            <div className="bg-white dark:bg-[#111114] border border-blue-100/60 dark:border-white/[0.06] rounded-2xl p-4 shadow-sm">
                                <p className="text-[14px] font-extrabold text-gray-900 dark:text-white mb-3">Rating Breakdown</p>
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = star === 4 ? 1 : 0
                                    const pct = star === 4 ? 100 : 0
                                    return (
                                        <div key={star} className="flex items-center gap-2.5 mb-2">
                                            <div className="flex items-center gap-0.5 w-[52px] shrink-0">
                                                {Array.from({ length: star }).map((_, i) => (
                                                    <svg key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className="text-[11px] font-black text-gray-400 dark:text-gray-500 w-4 text-right">{count}</span>
                                        </div>
                                    )
                                })}
                                <div className="mt-3 pt-3 border-t border-blue-100/40 dark:border-white/[0.05] flex items-center justify-between">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-600">Avg. rating</span>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                        <span className="text-[15px] font-black text-gray-900 dark:text-white">4.0</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}