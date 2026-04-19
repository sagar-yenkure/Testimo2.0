'use client'

import { useState, useRef } from 'react'
import {
    ChevronRight, ChevronLeft, Check, Settings, Wand2,
    Copy, CheckCheck, ExternalLink, Upload, X, PartyPopperIcon,
    Crown, Share2, Globe, Link2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TestimonialForm } from '@/components/testimonial-form'
import { ThankYouPreview } from '@/components/thank-you-preview'
import { useRouter } from 'next/navigation'
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from '@/components/ui/select'

/* ─── Confetti ─── */
function ConfettiParticle({ index }: { index: number }) {
    const colors = ['#6C85FF', '#a855f7', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4', '#f43f5e']
    const color = colors[index % colors.length]
    const left = `${4 + (index * 13.7) % 92}%`
    const delay = `${(index * 0.09) % 1.4}s`
    const size = 8 + (index % 5) * 4
    const isRect = index % 3 !== 0
    return (
        <div
            className="absolute top-0 animate-confetti pointer-events-none"
            style={{
                left, animationDelay: delay,
                width: isRect ? size : size + 2,
                height: isRect ? size * 0.45 : size + 2,
                borderRadius: isRect ? '3px' : '50%',
                backgroundColor: color,
                transform: `rotate(${index * 43}deg)`,
            }}
        />
    )
}

/* ─── Sidebar step item ─── */
function SidebarStep({
    id, label, desc, icon: Icon, status, onClick,
}: {
    id: number; label: string; desc: string; icon: any
    status: 'done' | 'active' | 'inactive'; onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all duration-200 group
                ${status === 'active'
                    ? 'bg-blue-600/10 dark:bg-[#6C85FF]/10'
                    : status === 'done'
                        ? 'hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer'
                        : 'cursor-default opacity-50'
                }`}
        >
            {/* dot / number */}
            <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-black transition-all
                ${status === 'active'
                    ? 'bg-blue-600 dark:bg-[#6C85FF] text-white shadow-md shadow-blue-500/30'
                    : status === 'done'
                        ? 'bg-blue-600/20 dark:bg-[#6C85FF]/20 text-blue-600 dark:text-[#6C85FF]'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                }`}>
                {status === 'done'
                    ? <Check className="w-3.5 h-3.5" />
                    : id
                }
            </div>

            {/* text */}
            <div className="min-w-0">
                <p className={`text-[13px] font-bold leading-none mb-1
                    ${status === 'active' ? 'text-blue-600 dark:text-[#6C85FF]'
                        : status === 'done' ? 'text-slate-900 dark:text-white'
                            : 'text-slate-400 dark:text-slate-500'}`}>
                    {label}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none truncate font-sans">
                    {desc}
                </p>
            </div>
        </button>
    )
}

/* ─── Main component ─── */
export default function CreateSpaceForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [copied, setCopied] = useState(false)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        collectionName: '',
        logo: null as string | null,
        brandName: 'Testimo',
        formTitle: "Love us? Roast us? Let's hear it! 📢",
        description: "Your feedback is our secret sauce. Whether we made your day or need a reality check, don't hold back!",
        collectStarRatings: true,
        collectCompany: false,
        collectEmail: false,
        collectUserRole: false,
        collectSocialLink: false,
        language: 'English',
        theme: 'Light',
        bgPattern: 'none' as 'none' | 'dots' | 'grid' | 'waves' | 'circles',
        fontFamily: 'Inter' as 'Inter' | 'Outfit' | 'Playfair' | 'Mono',
        accentColor: '#6C85FF',
        consent: '',
        showConsent: true,
        thankYou: {
            title: 'Thank you!',
            message: 'Thank you so much for your shoutout! It means a ton for us! 🙏',
            allowSocialShare: true,
            redirectEnabled: false,
            redirectUrl: '',
        },
    })

    const updateFormData = (key: keyof typeof formData, value: any) =>
        setFormData(prev => ({ ...prev, [key]: value }))

    const updateThankYou = (key: keyof typeof formData.thankYou, value: any) =>
        setFormData(prev => ({ ...prev, thankYou: { ...prev.thankYou, [key]: value } }))

    const steps = [
        { id: 1, label: 'Basic Info', desc: 'Name & branding', icon: Settings },
        { id: 2, label: 'Settings', desc: 'Fields & appearance', icon: Wand2 },
        { id: 3, label: 'Thank You', desc: 'Post-submit page', icon: Share2 },
        { id: 4, label: 'Share', desc: 'Get your link', icon: Check },
    ]

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

    const slug = formData.collectionName.toLowerCase().replace(/\s+/g, '-') || 'new-space'
    const shareLink = `testimo.io/${slug}`

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) return
        const reader = new FileReader()
        reader.onload = (e) => {
            const url = e.target?.result as string
            setLogoPreview(url)
            updateFormData('logo', url)
        }
        reader.readAsDataURL(file)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }

    const progressPct = ((step - 1) / 3) * 100

    return (
        <>
            <style>{`
                @keyframes confettiFall {
                    0%   { transform: translateY(-16px) rotate(0deg) scaleX(1);  opacity: 1; }
                    60%  { opacity: 1; }
                    100% { transform: translateY(520px) rotate(900deg) scaleX(-1); opacity: 0; }
                }
                .animate-confetti { animation: confettiFall 2.4s cubic-bezier(.25,.46,.45,.94) forwards; }
            `}</style>

            <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-3 overflow-hidden pt-2 lg:pt-5">

                {/* ══════════════════════════════════════════
                    LEFT COLUMN  →  Sidebar  +  Form panel
                ══════════════════════════════════════════ */}
                <div className="lg:w-[62%] flex-1 order-1 flex flex-col h-full min-h-0 overflow-hidden">
                    <div className="flex-1 bg-white dark:bg-[#1A1A20] border border-slate-200 dark:border-[#2A2A35] rounded-[24px] flex h-full min-h-0 overflow-hidden shadow-sm">

                        {/* ── Sidebar ── */}
                        <aside className="w-[180px] flex-shrink-0 border-r border-slate-200 dark:border-[#2A2A35] bg-slate-50 dark:bg-[#131316] flex flex-col p-4 gap-1 hidden lg:flex">

                            {/* Steps */}
                            <div className="flex flex-col gap-0.5">
                                {steps.map((s, i) => {
                                    const status = step > s.id ? 'done' : step === s.id ? 'active' : 'inactive'
                                    return (
                                        <div key={s.id}>
                                            <SidebarStep
                                                id={s.id}
                                                label={s.label}
                                                desc={s.desc}
                                                icon={s.icon}
                                                status={status}
                                                onClick={() => status === 'done' && setStep(s.id)}
                                            />
                                            {/* connector line */}
                                            {i < steps.length - 1 && (
                                                <div className="ml-[27px] w-px h-3 bg-slate-200 dark:bg-[#2A2A35] mx-auto" />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Progress footer */}
                            <div className="mt-auto pt-5 border-t border-slate-200 dark:border-[#2A2A35]">
                                <div className="flex items-center justify-between mb-2 px-1">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Progress</span>
                                    <span className="text-[10px] text-blue-600 dark:text-[#6C85FF] font-black">{Math.round(progressPct)}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 overflow-hidden mx-0.5">
                                    <div
                                        className="h-full rounded-full bg-blue-600 dark:bg-[#6C85FF] transition-all duration-500 shadow-[0_0_10px_rgba(108,133,255,0.3)]"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                </div>
                                {/* Auto-save */}
                                <div className="flex items-center gap-1.5 mt-4 px-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sync Active</span>
                                </div>
                            </div>
                        </aside>

                        {/* ── Form content ── */}
                        <div className="flex-1 min-w-0 flex flex-col h-full min-h-0 overflow-hidden p-4 lg:p-5">

                            {/* Step header */}
                            <div className="mb-4 shrink-0">
                                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Let's get started
                                </h1>
                                <h2 className="text-[16px] font-bold text-slate-900 dark:text-white leading-none mb-1">
                                    {steps[step - 1]?.label}
                                </h2>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                    {step === 1 && 'Set up your space name, brand and logo.'}
                                    {step === 2 && 'Control what data you collect and how the form looks.'}
                                    {step === 3 && 'Customize what customers see after submitting.'}
                                    {step === 4 && 'Your space is live — share it with customers!'}
                                </p>
                            </div>

                            {/* Mobile-only pill progress (hidden on lg) */}
                            <div className="mb-5 shrink-0 flex items-center gap-2 lg:hidden">
                                {steps.map((s, i) => {
                                    const done = step > s.id
                                    const active = step === s.id
                                    return (
                                        <div key={s.id} className="flex items-center gap-2 flex-1 last:flex-none">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap
                                                ${active
                                                    ? 'bg-blue-600 dark:bg-[#6C85FF] text-white shadow-md shadow-blue-500/25'
                                                    : done
                                                        ? 'bg-blue-600/10 dark:bg-[#6C85FF]/10 text-blue-600 dark:text-[#6C85FF]'
                                                        : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                                                }`}>
                                                <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-black shrink-0
                                                    ${active ? 'bg-white/20' : done ? 'bg-blue-600/20 dark:bg-[#6C85FF]/20' : 'bg-black/5 dark:bg-white/10'}`}>
                                                    {done ? <Check className="w-2.5 h-2.5" /> : s.id}
                                                </div>
                                                <span className="text-[11px] font-bold tracking-wide hidden sm:block">{s.label}</span>
                                            </div>
                                            {i < steps.length - 1 && (
                                                <div className="flex-1 h-[2px] rounded-full overflow-hidden bg-slate-100 dark:bg-[#2A2A35]">
                                                    <div className="h-full bg-blue-600 dark:bg-[#6C85FF] rounded-full transition-all duration-500" style={{ width: step > s.id ? '100%' : '0%' }} />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* ── Scrollable step content ── */}
                            <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                                {/* ── Step 1 ── */}
                                {step === 1 && (
                                    <div className="space-y-4 max-w-2xl">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">
                                                Space Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Product Launch Testimonials"
                                                className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl px-4 py-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                                value={formData.collectionName}
                                                onChange={(e) => updateFormData('collectionName', e.target.value)}
                                            />
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider ml-1">Internal reference only — not shown to customers.</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">
                                                    Brand Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., Testimo"
                                                    className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl px-4 py-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                                    value={formData.brandName}
                                                    onChange={(e) => updateFormData('brandName', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">
                                                    Form Title <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Share Your Experience"
                                                    className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl px-4 py-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                                    value={formData.formTitle}
                                                    onChange={(e) => updateFormData('formTitle', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Description</label>
                                            <textarea
                                                placeholder="We'd love to hear about your experience..."
                                                rows={3}
                                                className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl px-4 py-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                                                value={formData.description}
                                                onChange={(e) => updateFormData('description', e.target.value)}
                                            />
                                        </div>

                                        {/* Logo Upload */}
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">
                                                Logo <span className="text-slate-400 font-bold uppercase tracking-wider ml-1 text-[9px]">(Optional)</span>
                                            </label>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                                            />
                                            {logoPreview ? (
                                                <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 dark:border-[#2A2A35] rounded-xl bg-slate-50/50 dark:bg-[#131316]">
                                                    <img src={logoPreview} alt="Logo" className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-white/5 shrink-0 shadow-sm" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[13px] font-bold text-slate-900 dark:text-white truncate">Logo uploaded</p>
                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">Looks amazing!</p>
                                                    </div>
                                                    <button
                                                        onClick={() => { setLogoPreview(null); updateFormData('logo', null) }}
                                                        className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors group"
                                                    >
                                                        <X className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                                                    onDragLeave={() => setIsDragging(false)}
                                                    onDrop={handleDrop}
                                                    className={`flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all
                                                        ${isDragging
                                                            ? 'border-blue-600 bg-blue-50/60 dark:border-[#6C85FF] dark:bg-[#6C85FF]/10'
                                                            : 'border-slate-200 dark:border-[#2A2A35] bg-slate-50/50 dark:bg-[#131316] hover:border-blue-600 dark:hover:border-[#6C85FF] hover:bg-white dark:hover:bg-white/5'
                                                        }`}
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-[#6C85FF]/20 flex items-center justify-center">
                                                        <Upload className="w-5 h-5 text-blue-600 dark:text-[#6C85FF]" />
                                                    </div>
                                                    <div className="text-center px-4">
                                                        <p className="text-[13px] font-bold text-slate-900 dark:text-slate-200">
                                                            Drop image here or <span className="text-blue-600 dark:text-[#6C85FF]">browse</span>
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">PNG, JPG, SVG · max 2MB</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* ── Step 2 ── */}
                                {step === 2 && (
                                    <div className="space-y-5 max-w-2xl">
                                        <div className="space-y-4">
                                            <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Display &amp; Language</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 ml-1">Language</label>
                                                    <Select value={formData.language} onValueChange={(v) => updateFormData('language', v)}>
                                                        <SelectTrigger className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl text-sm font-semibold h-11 px-4 text-slate-900 dark:text-white transition-all hover:bg-white dark:hover:bg-white/[0.05] focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 shadow-sm outline-none">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-[#1A1A20] shadow-2xl">
                                                            {['English', 'Arabic', 'Japanese'].map(o => (
                                                                <SelectItem key={o} value={o} className="text-sm font-medium cursor-pointer py-2.5">{o}</SelectItem>
                                                            ))}
                                                            <div className="flex items-center justify-between px-2 py-2.5 mx-1 rounded-lg cursor-not-allowed opacity-60 select-none border-t border-slate-100 dark:border-white/5 mt-1">
                                                                <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-400 dark:text-slate-500">
                                                                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                                                                    Auto Detect
                                                                </div>
                                                                <span className="text-[8px] font-black uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">Pro</span>
                                                            </div>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 ml-1">Theme</label>
                                                    <Select value={formData.theme} onValueChange={(v) => updateFormData('theme', v)}>
                                                        <SelectTrigger className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl text-sm font-semibold h-11 px-4 text-slate-900 dark:text-white transition-all hover:bg-white dark:hover:bg-white/[0.05] focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 shadow-sm outline-none">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-[#1A1A20] shadow-2xl">
                                                            <SelectItem value="Light" className="text-sm font-medium cursor-pointer py-2.5">Light</SelectItem>
                                                            <SelectItem value="Dark" className="text-sm font-medium cursor-pointer py-2.5">Dark</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Data Collection</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {[
                                                    { id: 'collectStarRatings', label: 'Star Ratings' },
                                                    { id: 'collectCompany', label: 'Company' },
                                                    { id: 'collectEmail', label: 'Email' },
                                                    { id: 'collectUserRole', label: 'Job Title' },
                                                    { id: 'collectSocialLink', label: 'Social Link' },
                                                ].map((item) => {
                                                    const active = (formData as any)[item.id]
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => updateFormData(item.id as any, !active)}
                                                            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer select-none
                                                                ${active
                                                                    ? 'border-blue-600/30 bg-blue-50/50 dark:bg-[#6C85FF]/10 dark:border-[#6C85FF]/20 shadow-sm'
                                                                    : 'border-slate-200 dark:border-[#2A2A35] bg-slate-50/50 dark:bg-[#131316] hover:bg-white dark:hover:bg-white/[0.05]'
                                                                }`}
                                                        >
                                                            <span className={`text-[12px] font-bold ${active ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-600 dark:text-slate-400'}`}>
                                                                {item.label}
                                                            </span>
                                                            <div className={`relative w-10 h-5.5 rounded-full flex-shrink-0 transition-colors duration-200 ${active ? 'bg-blue-600 dark:bg-[#6C85FF]' : 'bg-slate-200 dark:bg-white/10'}`}>
                                                                <div className={`absolute top-1 left-1 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${active ? 'translate-x-4.5' : 'translate-x-0'}`} />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Background Pattern</h3>
                                            <div className="grid grid-cols-5 gap-2">
                                                {([
                                                    { id: 'none', label: 'None' },
                                                    { id: 'dots', label: 'Dots' },
                                                    { id: 'grid', label: 'Grid' },
                                                    { id: 'waves', label: 'Waves' },
                                                    { id: 'circles', label: 'Rings' },
                                                ] as const).map((p) => {
                                                    const active = formData.bgPattern === p.id
                                                    return (
                                                        <button
                                                            key={p.id}
                                                            onClick={() => updateFormData('bgPattern', p.id)}
                                                            className={`flex flex-col gap-1.5 rounded-xl border-2 overflow-hidden transition-all
                                                                ${active
                                                                    ? 'border-[#2D6CFF] shadow-sm shadow-blue-500/20'
                                                                    : 'border-blue-100/50 dark:border-white/10 hover:border-[#2D6CFF]/40'
                                                                }`}
                                                        >
                                                            <div className={`w-full h-9 flex items-center justify-center ${active ? 'bg-blue-50/80 dark:bg-[#2D6CFF]/10' : 'bg-gray-50 dark:bg-white/[0.03]'}`}>
                                                                {p.id === 'none' && (
                                                                    <div className="w-4 h-4 rounded border border-gray-300 dark:border-white/20 flex items-center justify-center">
                                                                        <div className="w-2.5 h-[1.5px] bg-gray-400 dark:bg-white/40 rotate-45" />
                                                                    </div>
                                                                )}
                                                                {p.id === 'dots' && (
                                                                    <svg width="30" height="24" viewBox="0 0 30 24">
                                                                        {[4, 12, 20, 28].map(x => [4, 12, 20].map(y => (
                                                                            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={active ? '#2D6CFF' : '#94a3b8'} opacity={active ? 0.7 : 0.5} />
                                                                        )))}
                                                                    </svg>
                                                                )}
                                                                {p.id === 'grid' && (
                                                                    <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
                                                                        {[0, 10, 20, 30].map(x => <line key={x} x1={x} y1="0" x2={x} y2="24" stroke={active ? '#2D6CFF' : '#94a3b8'} strokeWidth="0.75" opacity={active ? 0.7 : 0.4} />)}
                                                                        {[0, 8, 16, 24].map(y => <line key={y} x1="0" y1={y} x2="30" y2={y} stroke={active ? '#2D6CFF' : '#94a3b8'} strokeWidth="0.75" opacity={active ? 0.7 : 0.4} />)}
                                                                    </svg>
                                                                )}
                                                                {p.id === 'waves' && (
                                                                    <svg width="34" height="24" viewBox="0 0 34 24" fill="none">
                                                                        {[4, 12, 20].map((y, i) => <path key={i} d={`M0 ${y} C 8 ${y - 4}, 17 ${y + 4}, 34 ${y}`} stroke={active ? '#2D6CFF' : '#94a3b8'} strokeWidth="1" opacity={active ? 0.8 : 0.5} />)}
                                                                    </svg>
                                                                )}
                                                                {p.id === 'circles' && (
                                                                    <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
                                                                        <circle cx="15" cy="12" r="10" stroke={active ? '#2D6CFF' : '#94a3b8'} strokeWidth="0.75" opacity={active ? 0.8 : 0.4} />
                                                                        <circle cx="15" cy="12" r="5.5" stroke={active ? '#2D6CFF' : '#94a3b8'} strokeWidth="0.75" opacity={active ? 0.6 : 0.3} />
                                                                        <circle cx="15" cy="12" r="2" fill={active ? '#2D6CFF' : '#94a3b8'} opacity={active ? 0.8 : 0.4} />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <span className={`text-[10px] font-bold pb-1 text-center w-full ${active ? 'text-[#2D6CFF]' : 'text-gray-400 dark:text-gray-500'}`}>
                                                                {p.label}
                                                            </span>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Font Style</h3>
                                            <div className="grid grid-cols-4 gap-3">
                                                {([
                                                    { id: 'Inter', label: 'Inter', preview: 'Aa', cls: 'font-sans' },
                                                    { id: 'Outfit', label: 'Outfit', preview: 'Aa', cls: 'font-sans tracking-wide' },
                                                    { id: 'Playfair', label: 'Serif', preview: 'Aa', cls: 'font-serif' },
                                                    { id: 'Mono', label: 'Mono', preview: 'Aa', cls: 'font-mono' },
                                                ] as const).map((f) => {
                                                    const active = formData.fontFamily === f.id
                                                    return (
                                                        <button
                                                            key={f.id}
                                                            onClick={() => updateFormData('fontFamily', f.id)}
                                                            className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all
                                                                ${active
                                                                    ? 'border-blue-600 dark:border-[#6C85FF] bg-blue-600/5 dark:bg-[#6C85FF]/10 shadow-md shadow-blue-500/10'
                                                                    : 'border-slate-200 dark:border-[#2A2A35] bg-slate-50/50 dark:bg-[#131316] hover:border-blue-600/40 dark:hover:border-[#6C85FF]/40'
                                                                }`}
                                                        >
                                                            <span className={`text-[20px] font-bold leading-none ${f.cls} ${active ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-600 dark:text-slate-300'}`}>{f.preview}</span>
                                                            <span className={`text-[10px] font-black uppercase tracking-wider ${active ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-400 dark:text-slate-500'}`}>{f.label}</span>
                                                        </button>
                                                    )
                                                })}
                                            </div>

                                            {/* Brand Color */}
                                            <div className="space-y-4">
                                                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Brand Color</h3>
                                                <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#2A2A35] bg-slate-50/50 dark:bg-[#131316] shadow-sm">
                                                    <div className="flex flex-col gap-5">
                                                        <div className="flex items-center justify-between gap-4">
                                                            <div className="flex items-center gap-2.5 flex-wrap">
                                                                {[
                                                                    { color: '#6C85FF', label: 'Blue' },
                                                                    { color: '#7C3AED', label: 'Purple' },
                                                                    { color: '#059669', label: 'Green' },
                                                                    { color: '#DC2626', label: 'Red' },
                                                                    { color: '#D97706', label: 'Amber' },
                                                                    { color: '#DB2777', label: 'Pink' },
                                                                    { color: '#18181b', label: 'Black' },
                                                                ].map(({ color, label }) => {
                                                                    const active = formData.accentColor === color
                                                                    return (
                                                                        <button
                                                                            key={color}
                                                                            title={label}
                                                                            onClick={() => updateFormData('accentColor', color)}
                                                                            className={`w-8 h-8 rounded-full flex-shrink-0 transition-all duration-200 border-2 flex items-center justify-center relative
                                                                                ${active ? 'scale-115 border-white dark:border-slate-800 shadow-lg ring-2 ring-blue-600/20 dark:ring-[#6C85FF]/20' : 'border-transparent hover:scale-110'}`}
                                                                            style={{ backgroundColor: color }}
                                                                        >
                                                                            {active && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                                                                        </button>
                                                                    )
                                                                })}
                                                            </div>
                                                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-[#2A2A35]">
                                                                <label
                                                                    className="group relative w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-white dark:border-slate-800 cursor-pointer shadow-md overflow-hidden active:scale-95 transition-transform"
                                                                    style={{ background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}
                                                                >
                                                                    <input
                                                                        type="color"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                                                                        value={formData.accentColor}
                                                                        onChange={(e) => updateFormData('accentColor', e.target.value)}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#1A1A20] border border-slate-200 dark:border-[#2A2A35]">
                                                            <div className="flex items-center gap-2.5">
                                                                <div className="w-6 h-6 rounded-md border border-slate-200 dark:border-white/10 shadow-sm shrink-0" style={{ backgroundColor: formData.accentColor }} />
                                                                <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">Accent HEX</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-[13px] font-mono font-bold">
                                                                <span className="text-slate-400">#</span>
                                                                <input
                                                                    type="text"
                                                                    value={formData.accentColor.replace('#', '')}
                                                                    onChange={(e) => {
                                                                        const val = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)
                                                                        if (val.length === 6 || val.length === 3) updateFormData('accentColor', `#${val}`)
                                                                    }}
                                                                    className="bg-transparent border-none p-0 w-16 text-slate-900 dark:text-white focus:ring-0 uppercase placeholder:text-slate-300"
                                                                    placeholder="FFFFFF"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Consent */}
                                        <div className="space-y-4">
                                            <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Consent Required</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                <div
                                                    onClick={() => updateFormData('showConsent', !formData.showConsent)}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer select-none
                                                        ${formData.showConsent
                                                            ? 'border-blue-600/30 bg-blue-50/50 dark:bg-[#6C85FF]/10 dark:border-[#6C85FF]/20 shadow-sm'
                                                            : 'border-slate-200 dark:border-[#2A2A35] bg-slate-50/50 dark:bg-[#131316] hover:bg-white dark:hover:bg-white/[0.05]'
                                                        }`}
                                                >
                                                    <span className={`text-[12px] font-bold ${formData.showConsent ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-600 dark:text-slate-400'}`}>
                                                        {formData.showConsent ? 'Required' : 'Disabled'}
                                                    </span>
                                                    <div className={`relative w-10 h-5.5 rounded-full flex-shrink-0 transition-colors duration-200 ${formData.showConsent ? 'bg-blue-600 dark:bg-[#6C85FF]' : 'bg-slate-200 dark:bg-white/10'}`}>
                                                        <div className={`absolute top-1 left-1 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${formData.showConsent ? 'translate-x-4.5' : 'translate-x-0'}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ── Step 3 ── */}
                                {step === 3 && (
                                    <div className="space-y-6 max-w-2xl">
                                        <div className="space-y-4">
                                            <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Thank You Page</h3>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Thank You Title <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        placeholder="Thank you!"
                                                        className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl px-4 py-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                                        value={formData.thankYou.title}
                                                        onChange={(e) => updateThankYou('title', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Thank You Message</label>
                                                    <textarea
                                                        placeholder="Thank you so much for your shoutout!"
                                                        rows={4}
                                                        className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl px-4 py-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                                                        value={formData.thankYou.message}
                                                        onChange={(e) => updateThankYou('message', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] ml-0.5">Options</h3>
                                            <div className="space-y-3">
                                                {/* Social Share */}
                                                <div
                                                    onClick={() => updateThankYou('allowSocialShare', !formData.thankYou.allowSocialShare)}
                                                    className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all cursor-pointer select-none
                                                        ${formData.thankYou.allowSocialShare
                                                            ? 'border-blue-600/30 bg-blue-50/50 dark:bg-[#6C85FF]/10 dark:border-[#6C85FF]/20 shadow-sm'
                                                            : 'border-slate-200 dark:border-[#2A2A35] bg-slate-50/50 dark:bg-[#131316] hover:bg-white dark:hover:bg-white/[0.05]'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${formData.thankYou.allowSocialShare ? 'bg-blue-600/10 border-blue-200 dark:border-[#6C85FF]/20' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5'}`}>
                                                            <Share2 className={`w-5 h-5 ${formData.thankYou.allowSocialShare ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-400'}`} />
                                                        </div>
                                                        <div>
                                                            <p className={`text-[14px] font-bold leading-tight ${formData.thankYou.allowSocialShare ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-700 dark:text-slate-200'}`}>Allow social sharing</p>
                                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Show share buttons after submission</p>
                                                        </div>
                                                    </div>
                                                    <div className={`relative w-10 h-5.5 rounded-full flex-shrink-0 transition-colors duration-200 ${formData.thankYou.allowSocialShare ? 'bg-blue-600 dark:bg-[#6C85FF]' : 'bg-slate-200 dark:bg-white/10'}`}>
                                                        <div className={`absolute top-1 left-1 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${formData.thankYou.allowSocialShare ? 'translate-x-4.5' : 'translate-x-0'}`} />
                                                    </div>
                                                </div>

                                                {/* Redirect */}
                                                <div
                                                    onClick={() => updateThankYou('redirectEnabled', !formData.thankYou.redirectEnabled)}
                                                    className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all cursor-pointer select-none
                                                        ${formData.thankYou.redirectEnabled
                                                            ? 'border-blue-600/30 bg-blue-50/50 dark:bg-[#6C85FF]/10 dark:border-[#6C85FF]/20 shadow-sm'
                                                            : 'border-slate-200 dark:border-[#2A2A35] bg-slate-50/50 dark:bg-[#131316] hover:bg-white dark:hover:bg-white/[0.05]'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${formData.thankYou.redirectEnabled ? 'bg-blue-600/10 border-blue-200 dark:border-[#6C85FF]/20' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5'}`}>
                                                            <Globe className={`w-5 h-5 ${formData.thankYou.redirectEnabled ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-400'}`} />
                                                        </div>
                                                        <div>
                                                            <p className={`text-[14px] font-bold leading-tight ${formData.thankYou.redirectEnabled ? 'text-blue-600 dark:text-[#6C85FF]' : 'text-slate-700 dark:text-slate-200'}`}>Custom Redirect</p>
                                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Send users to a custom URL</p>
                                                        </div>
                                                    </div>
                                                    <div className={`relative w-10 h-5.5 rounded-full flex-shrink-0 transition-colors duration-200 ${formData.thankYou.redirectEnabled ? 'bg-blue-600 dark:bg-[#6C85FF]' : 'bg-slate-200 dark:bg-white/10'}`}>
                                                        <div className={`absolute top-1 left-1 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${formData.thankYou.redirectEnabled ? 'translate-x-4.5' : 'translate-x-0'}`} />
                                                    </div>
                                                </div>

                                                {formData.thankYou.redirectEnabled && (
                                                    <div className="space-y-1.5 pl-1.5">
                                                        <label className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-600 dark:text-[#6C85FF] flex items-center gap-2">
                                                            <Link2 className="w-3.5 h-3.5" />
                                                            Redirect URL
                                                        </label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://yourwebsite.com/thank-you"
                                                            className="w-full bg-slate-50/50 dark:bg-[#131316] border border-slate-200 dark:border-[#2A2A35] rounded-xl px-4 py-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-[#6C85FF]/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                                            value={formData.thankYou.redirectUrl}
                                                            onChange={(e) => updateThankYou('redirectUrl', e.target.value)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ── Step 4 ── */}
                                {step === 4 && (
                                    <div className="flex-1 flex flex-col py-6 items-center justify-center text-center relative overflow-hidden min-h-0">
                                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                            {Array.from({ length: 32 }).map((_, i) => (
                                                <ConfettiParticle key={i} index={i} />
                                            ))}
                                        </div>
                                        <div className="relative mb-4 z-10">
                                            <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-600/20 dark:to-purple-500/20 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 shadow-xl shadow-blue-500/10">
                                                <PartyPopperIcon className="w-10 h-10 text-blue-600 dark:text-[#6C85FF]" />
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white dark:border-[#1A1A20]">
                                                <Check className="w-3.5 h-3.5 text-white" />
                                            </div>
                                        </div>
                                        <h2 className="text-[24px] font-black text-slate-900 dark:text-white mb-2 z-10 tracking-tight">You&apos;re live! 🎉</h2>
                                        <p className="text-[14px] text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto mb-8 font-medium leading-relaxed z-10">
                                            Your space is ready for action. Share the link below to start collecting testimonials.
                                        </p>
                                        <div className="w-full max-w-sm space-y-3 z-10">
                                            <div className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                                                <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02]">
                                                    <div className="flex gap-1.5 shrink-0">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400/50" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
                                                    </div>
                                                    <div className="flex-1 bg-slate-100/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-md px-3 py-1 flex items-center gap-2 min-w-0">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-500 truncate lowercase tracking-tight">https://{shareLink}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 px-5 py-4">
                                                    <span className="flex-1 text-[14px] font-mono font-bold text-slate-900 dark:text-white truncate">{shareLink}</span>
                                                    <button
                                                        onClick={handleCopy}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all shrink-0 active:scale-95
                                                            ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-blue-600 dark:bg-[#6C85FF] hover:bg-blue-700 dark:hover:bg-[#5C75FF] text-white shadow-lg shadow-blue-500/20'}`}
                                                    >
                                                        {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                        {copied ? 'Copied' : 'Copy Link'}
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-[#6C85FF] hover:border-blue-600/30 dark:hover:border-[#6C85FF]/30 transition-all bg-white dark:bg-[#1A1A20] active:scale-98">
                                                <ExternalLink className="w-4 h-4" />
                                                View Live Space
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Footer nav ── */}
                            <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-200 dark:border-[#2A2A35] shrink-0">
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    className={`rounded-full px-6 h-10 font-black uppercase tracking-wider flex items-center gap-2 border-slate-200 dark:border-white/10 text-[11px] hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95
                                        ${step === 1 || step === 4 ? 'invisible pointer-events-none' : ''}`}
                                >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </Button>

                                {step === 1 && (
                                    <Button onClick={nextStep} className="bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-full px-7 h-10 font-black uppercase tracking-widest flex items-center gap-2 text-[11px] shadow-lg active:scale-95 transition-all">
                                        Next Step <ChevronRight className="w-4 h-4" />
                                    </Button>
                                )}
                                {step === 2 && (
                                    <Button onClick={nextStep} className="bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-full px-7 h-10 font-black uppercase tracking-widest flex items-center gap-2 text-[11px] shadow-lg active:scale-95 transition-all">
                                        Next Step <ChevronRight className="w-4 h-4" />
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button onClick={nextStep} className="bg-blue-600 dark:bg-[#6C85FF] hover:bg-blue-700 dark:hover:bg-[#5C75FF] text-white rounded-full px-8 h-10 font-black uppercase tracking-widest flex items-center gap-2 text-[11px] shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                                        <Check className="w-4 h-4" /> Launch Space
                                    </Button>
                                )}
                                {step === 4 && (
                                    <Button onClick={() => router.push('/dashboard')} className="bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-full px-7 h-10 font-black uppercase tracking-widest flex items-center gap-2 text-[11px] shadow-lg active:scale-95 transition-all">
                                        Dashboard <ChevronRight className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════
                    RIGHT COLUMN  →  Live Preview
                    (100% unchanged from your original)
                ══════════════════════════════════════════ */}
                <div className="lg:w-[38%] flex-shrink-0 order-2 flex flex-col h-full min-h-0 relative pt-4 lg:pt-0">


                    <div className={`relative flex-1 rounded-[24px] overflow-hidden border transition-all duration-500 min-h-0 shadow-2xl                        ${formData.theme === 'Dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>

                        {/* Pattern layer */}
                        {formData.bgPattern !== 'none' && (
                            <div className="pointer-events-none absolute inset-0 z-0">
                                {formData.bgPattern === 'dots' && (
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs><pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                                            <circle cx="2" cy="2" r="1.5" fill={formData.theme === 'Dark' ? 'rgba(255,255,255,0.07)' : 'rgba(45,108,255,0.12)'} />
                                        </pattern></defs>
                                        <rect width="100%" height="100%" fill="url(#dots)" />
                                    </svg>
                                )}
                                {formData.bgPattern === 'grid' && (
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs><pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke={formData.theme === 'Dark' ? 'rgba(255,255,255,0.06)' : 'rgba(45,108,255,0.1)'} strokeWidth="0.75" />
                                        </pattern></defs>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                    </svg>
                                )}
                                {formData.bgPattern === 'waves' && (
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs><pattern id="waves" x="0" y="0" width="80" height="24" patternUnits="userSpaceOnUse">
                                            <path d="M0 12 C 20 4, 40 20, 80 12" fill="none" stroke={formData.theme === 'Dark' ? 'rgba(255,255,255,0.07)' : 'rgba(45,108,255,0.12)'} strokeWidth="1" />
                                        </pattern></defs>
                                        <rect width="100%" height="100%" fill="url(#waves)" />
                                    </svg>
                                )}
                                {formData.bgPattern === 'circles' && (
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs><pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <circle cx="20" cy="20" r="14" fill="none" stroke={formData.theme === 'Dark' ? 'rgba(255,255,255,0.06)' : 'rgba(45,108,255,0.1)'} strokeWidth="0.75" />
                                        </pattern></defs>
                                        <rect width="100%" height="100%" fill="url(#circles)" />
                                    </svg>
                                )}
                            </div>
                        )}

                        {/* Ambient blobs */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
                            <div className={`absolute -top-16 -left-16 w-64 h-64 rounded-full blur-[100px] opacity-30 ${formData.theme === 'Dark' ? 'bg-blue-600/20' : 'bg-blue-600/10'}`} />
                            <div className={`absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-[100px] opacity-30 ${formData.theme === 'Dark' ? 'bg-indigo-600/20' : 'bg-indigo-600/10'}`} />
                        </div>

                        <div className="relative z-10 h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {step === 3 ? (
                                <ThankYouPreview
                                    thankYou={formData.thankYou}
                                    theme={formData.theme}
                                    accentColor={formData.accentColor}
                                    fontFamily={formData.fontFamily}
                                    logo={formData.logo}
                                    brandName={formData.brandName}
                                />
                            ) : (
                                <TestimonialForm formData={formData} isPreview={true} />
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}