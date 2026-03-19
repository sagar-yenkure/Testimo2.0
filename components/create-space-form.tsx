'use client'

import { useState, useRef } from 'react'
import { ChevronRight, ChevronLeft, Check, Settings, Wand2, Copy, CheckCheck, ExternalLink, Upload, X, PartyPopperIcon, Crown, Share2, Globe, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TestimonialForm } from '@/components/testimonial-form'
import { ThankYouPreview } from '@/components/thank-you-preview'
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

function ConfettiParticle({ index }: { index: number }) {
    const colors = ['#2D6CFF', '#a855f7', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4', '#f43f5e']
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
        accentColor: '#2D6CFF',
        consent: "",
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
        { id: 1, name: 'Basic Info', icon: Settings },
        { id: 2, name: 'Settings', icon: Wand2 },
        { id: 3, name: 'Thank You', icon: Share2 },
        { id: 4, name: 'Share', icon: Check },
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

    return (
        <>
            <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-16px) rotate(0deg) scaleX(1);   opacity: 1; }
          60%  { opacity: 1; }
          100% { transform: translateY(520px)  rotate(900deg) scaleX(-1); opacity: 0; }
        }
        .animate-confetti { animation: confettiFall 2.4s cubic-bezier(.25,.46,.45,.94) forwards; }
      `}</style>

            <div className="w-full h-auto lg:h-full flex flex-col lg:flex-row gap-4 lg:gap-6 lg:overflow-hidden pt-4 lg:pt-5">
                {/* ── Live Preview ── */}
                <div className="lg:w-[45%] flex-shrink-0 order-2 lg:order-1 flex flex-col h-auto lg:h-full lg:min-h-0 relative pt-4 lg:pt-0">
                    {/* Floating Preview Pill — Half-in, Half-out on the border */}
                    <div className="absolute top-4 lg:top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none">
                        <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl border
              ${formData.theme === 'Dark' ? 'bg-[#1A1A1A] border-white/10 text-blue-400 font-bold' : 'bg-white border-blue-200/60 text-[#2D6CFF]'}`}>
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                            </span>
                            Live Preview
                        </div>
                    </div>
                    <div className={`relative flex-1 rounded-[32px] overflow-hidden border transition-colors duration-500 min-h-[500px] lg:min-h-0
            ${formData.theme === 'Dark' ? 'bg-[#0A0A0A] border-[#222]' : 'bg-white border-blue-200/50 shadow-sm'}`}>

                        {/* Pattern layer */}
                        {formData.bgPattern !== 'none' && (
                            <div className="pointer-events-none absolute inset-0 z-0">
                                {formData.bgPattern === 'dots' && (
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                                                <circle cx="2" cy="2" r="1.5" fill={formData.theme === 'Dark' ? 'rgba(255,255,255,0.07)' : 'rgba(45,108,255,0.12)'} />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#dots)" />
                                    </svg>
                                )}
                                {formData.bgPattern === 'grid' && (
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                                                <path d="M 32 0 L 0 0 0 32" fill="none" stroke={formData.theme === 'Dark' ? 'rgba(255,255,255,0.06)' : 'rgba(45,108,255,0.1)'} strokeWidth="0.75" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                    </svg>
                                )}
                                {formData.bgPattern === 'waves' && (
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="waves" x="0" y="0" width="80" height="24" patternUnits="userSpaceOnUse">
                                                <path d="M0 12 C 20 4, 40 20, 80 12" fill="none" stroke={formData.theme === 'Dark' ? 'rgba(255,255,255,0.07)' : 'rgba(45,108,255,0.12)'} strokeWidth="1" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#waves)" />
                                    </svg>
                                )}
                                {formData.bgPattern === 'circles' && (
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <circle cx="20" cy="20" r="14" fill="none" stroke={formData.theme === 'Dark' ? 'rgba(255,255,255,0.06)' : 'rgba(45,108,255,0.1)'} strokeWidth="0.75" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#circles)" />
                                    </svg>
                                )}
                            </div>
                        )}

                        {/* Ambient blobs */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
                            <div className={`absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-40
                ${formData.theme === 'Dark' ? 'bg-[#2D6CFF]/15' : 'bg-[#2D6CFF]/8'}`} />
                            <div className={`absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-40
                ${formData.theme === 'Dark' ? 'bg-purple-500/15' : 'bg-purple-500/8'}`} />
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

                {/* ── Form Panel ── */}
                <div className="lg:w-[55%] flex-1 order-1 lg:order-2 flex flex-col h-auto lg:h-full lg:min-h-0 overflow-hidden">
                    <div className="flex-1 bg-card-bg border border-blue-200/50 dark:border-blue-900/30 rounded-[32px] p-6 lg:p-10 flex flex-col h-auto lg:h-full lg:min-h-0 overflow-hidden shadow-sm">

                        {/* Header */}
                        <div className="mb-5 shrink-0">
                            <h1 className="text-[18px] font-extrabold tracking-tight text-gray-900 dark:text-white leading-none mb-0.5">
                                Create New Space
                            </h1>
                            <p className="text-[11px] text-gray-400 font-medium">
                                Customize your testimonial collection form and settings.
                            </p>
                        </div>

                        {/* Progress Steps — pill style */}
                        <div className="mb-6 shrink-0 flex items-center gap-2">
                            {steps.map((s, i) => {
                                const done = step > s.id
                                const active = step === s.id
                                return (
                                    <div key={s.id} className="flex items-center gap-2 flex-1 last:flex-none">
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap
                      ${active
                                                ? 'bg-[#2D6CFF] text-white shadow-md shadow-blue-500/25'
                                                : done
                                                    ? 'bg-[#2D6CFF]/10 dark:bg-[#2D6CFF]/20 text-[#2D6CFF]'
                                                    : 'bg-gray-100 dark:bg-white/5 text-gray-400'
                                            }`}>
                                            <div className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-black shrink-0
                        ${active ? 'bg-white/20' : done ? 'bg-[#2D6CFF]/20' : 'bg-black/5 dark:bg-white/10'}`}>
                                                {done ? <Check className="w-2.5 h-2.5" /> : s.id}
                                            </div>
                                            <span className="text-[11px] font-bold tracking-wide hidden sm:block">{s.name}</span>
                                        </div>
                                        {/* Connector */}
                                        {i < steps.length - 1 && (
                                            <div className="flex-1 h-[2px] rounded-full overflow-hidden bg-gray-100 dark:bg-white/5">
                                                <div
                                                    className="h-full bg-[#2D6CFF] rounded-full transition-all duration-500"
                                                    style={{ width: step > s.id ? '100%' : '0%' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Content */}
                        <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                            {/* ── Step 1 ── */}
                            {step === 1 && (
                                <div className="space-y-4 max-w-2xl">
                                    <div className="space-y-1">
                                        <label className="text-[12px] font-bold text-gray-900 dark:text-white">
                                            Space Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Product Launch Testimonials"
                                            className="w-full bg-white dark:bg-[#0A0A0A] border border-blue-100/50 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/40 transition-all text-gray-900 dark:text-white"
                                            value={formData.collectionName}
                                            onChange={(e) => updateFormData('collectionName', e.target.value)}
                                        />
                                        <p className="text-[10px] text-gray-400 font-medium">Internal reference only — not shown to customers.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[12px] font-bold text-gray-900 dark:text-white">
                                                Brand Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Testimo"
                                                className="w-full bg-white dark:bg-[#0A0A0A] border border-blue-100/50 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/40 transition-all text-gray-900 dark:text-white"
                                                value={formData.brandName}
                                                onChange={(e) => updateFormData('brandName', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[12px] font-bold text-gray-900 dark:text-white">
                                                Form Title <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Share Your Experience"
                                                className="w-full bg-white dark:bg-[#0A0A0A] border border-blue-100/50 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/40 transition-all text-gray-900 dark:text-white"
                                                value={formData.formTitle}
                                                onChange={(e) => updateFormData('formTitle', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[12px] font-bold text-gray-900 dark:text-white">Description</label>
                                        <textarea
                                            placeholder="We'd love to hear about your experience..."
                                            rows={2}
                                            className="w-full bg-white dark:bg-[#0A0A0A] border border-blue-100/50 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/40 transition-all text-gray-900 dark:text-white resize-none"
                                            value={formData.description}
                                            onChange={(e) => updateFormData('description', e.target.value)}
                                        />
                                    </div>

                                    {/* Logo Upload */}
                                    <div className="space-y-1">
                                        <label className="text-[12px] font-bold text-gray-900 dark:text-white">
                                            Logo <span className="text-gray-400 font-normal">(optional)</span>
                                        </label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                                        />
                                        {logoPreview ? (
                                            <div className="flex items-center gap-3 px-3 py-2.5 border border-blue-100/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02]">
                                                <img
                                                    src={logoPreview} alt="Logo"
                                                    className="w-10 h-10 rounded-lg object-cover border border-blue-100 dark:border-white/10 shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[12px] font-semibold text-gray-800 dark:text-white truncate">Logo uploaded</p>
                                                    <p className="text-[10px] text-gray-400">Looks good!</p>
                                                </div>
                                                <button
                                                    onClick={() => { setLogoPreview(null); updateFormData('logo', null) }}
                                                    className="w-6 h-6 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                                                >
                                                    <X className="w-3 h-3 text-red-500" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                                                onDragLeave={() => setIsDragging(false)}
                                                onDrop={handleDrop}
                                                className={`flex flex-col items-center justify-center gap-2 py-5 border-2 border-dashed rounded-xl cursor-pointer transition-all
                          ${isDragging
                                                        ? 'border-[#2D6CFF] bg-blue-50/60 dark:bg-[#2D6CFF]/10'
                                                        : 'border-blue-200/60 dark:border-white/10 bg-blue-50/20 dark:bg-white/[0.02] hover:border-[#2D6CFF]/50 hover:bg-blue-50/40 dark:hover:bg-white/[0.04]'
                                                    }`}
                                            >
                                                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-[#2D6CFF]/20 flex items-center justify-center">
                                                    <Upload className="w-4 h-4 text-[#2D6CFF]" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                                                        Drop image here or <span className="text-[#2D6CFF]">browse</span>
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, SVG · max 2MB</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ── Step 2 ── */}
                            {step === 2 && (
                                <div className="space-y-5 max-w-2xl">

                                    {/* General Settings */}
                                    <div className="space-y-2">
                                        <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Display & Language</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 ml-1">Language</label>
                                                <Select value={formData.language} onValueChange={(v) => updateFormData('language', v)}>
                                                    <SelectTrigger className="w-full bg-white/50 dark:bg-white/[0.02] border border-blue-100/50 dark:border-white/10 rounded-xl text-sm py-4 px-3 text-gray-900 dark:text-white transition-all hover:bg-white dark:hover:bg-white/[0.05] focus:ring-1 focus:ring-[#2D6CFF]/30">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        {['English', 'Arabic', 'Japanese'].map(o => (
                                                            <SelectItem key={o} value={o} className="text-sm cursor-pointer">{o}</SelectItem>
                                                        ))}
                                                        <div className="flex items-center justify-between px-2 py-2 mx-1 rounded-lg cursor-not-allowed opacity-60 select-none">
                                                            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                                                <Crown className="w-3.5 h-3.5 text-amber-400" />
                                                                Auto Detect
                                                            </div>
                                                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">Pro</span>
                                                        </div>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 ml-1">Theme</label>
                                                <Select value={formData.theme} onValueChange={(v) => updateFormData('theme', v)}>
                                                    <SelectTrigger className="w-full bg-white/50 dark:bg-white/[0.02] border border-blue-100/50 dark:border-white/10 rounded-xl text-sm py-4 px-3 text-gray-900 dark:text-white transition-all hover:bg-white dark:hover:bg-white/[0.05] focus:ring-1 focus:ring-[#2D6CFF]/30">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        <SelectItem value="Light" className="text-sm cursor-pointer">Light</SelectItem>
                                                        <SelectItem value="Dark" className="text-sm cursor-pointer">Dark</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data Collection */}
                                    <div className="space-y-2">
                                        <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Data Collection</h3>
                                        <div className="grid grid-cols-3 gap-2">
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
                                                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all cursor-pointer select-none
                              ${active
                                                                ? 'border-[#2D6CFF]/30 bg-blue-50/50 dark:bg-[#2D6CFF]/10 dark:border-[#2D6CFF]/20'
                                                                : 'border-blue-100/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05]'
                                                            }`}
                                                    >
                                                        <span className={`text-[12px] font-semibold ${active ? 'text-[#2D6CFF]' : 'text-gray-700 dark:text-white'}`}>
                                                            {item.label}
                                                        </span>
                                                        <div className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200
                              ${active ? 'bg-[#2D6CFF]' : 'bg-gray-200 dark:bg-white/10'}`}>
                                                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
                                ${active ? 'translate-x-5' : 'translate-x-0'}`} />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Background Pattern */}
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
                                                        <div className={`w-full h-9 flex items-center justify-center
                              ${active ? 'bg-blue-50/80 dark:bg-[#2D6CFF]/10' : 'bg-gray-50 dark:bg-white/[0.03]'}`}>
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
                                                        <span className={`text-[10px] font-bold pb-1 text-center w-full
                              ${active ? 'text-[#2D6CFF]' : 'text-gray-400 dark:text-gray-500'}`}>
                                                            {p.label}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Font Style */}
                                    <div className="space-y-2">
                                        <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Font Style</h3>
                                        <div className="grid grid-cols-4 gap-2">
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
                                                        className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border-2 transition-all
                              ${active
                                                                ? 'border-[#2D6CFF] bg-blue-50/60 dark:bg-[#2D6CFF]/10 shadow-sm shadow-blue-500/20'
                                                                : 'border-blue-100/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:border-[#2D6CFF]/40'
                                                            }`}
                                                    >
                                                        <span className={`text-[18px] leading-none ${f.cls} ${active ? 'text-[#2D6CFF]' : 'text-gray-600 dark:text-gray-300'}`}>
                                                            {f.preview}
                                                        </span>
                                                        <span className={`text-[10px] font-bold ${active ? 'text-[#2D6CFF]' : 'text-gray-400 dark:text-gray-500'}`}>
                                                            {f.label}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        {/* Brand Color */}
                                        <div className="space-y-2">
                                            <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Brand Color</h3>
                                            <div className="p-3.5 rounded-2xl border border-blue-100/40 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] shadow-sm">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            {[
                                                                { color: '#2D6CFF', label: 'Blue' },
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
                                                                        className={`w-7 h-7 rounded-full flex-shrink-0 transition-all duration-200 border-2 flex items-center justify-center relative
                                                                        ${active ? 'scale-110 border-white dark:border-gray-800 shadow-md ring-2 ring-[#2D6CFF]/20' : 'border-transparent hover:scale-110'}`}
                                                                        style={{ backgroundColor: color }}
                                                                    >
                                                                        {active && <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />}
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>

                                                        {/* Custom Color Selector */}
                                                        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-100 dark:border-white/5">
                                                            <label className="group relative w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-white dark:border-gray-800 cursor-pointer shadow-sm overflow-hidden"
                                                                style={{ background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}>
                                                                <input type="color" className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                                                                    value={formData.accentColor} onChange={(e) => updateFormData('accentColor', e.target.value)} />
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-gray-50/50 dark:bg-white/[0.04] border border-gray-100/50 dark:border-white/[0.06]">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded-md border border-white/20 shadow-sm shrink-0" style={{ backgroundColor: formData.accentColor }} />
                                                            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Accent Color</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-[11px] text-gray-400 font-mono">#</span>
                                                            <input
                                                                type="text"
                                                                value={formData.accentColor.replace('#', '')}
                                                                onChange={(e) => {
                                                                    const val = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)
                                                                    if (val.length === 6 || val.length === 3) updateFormData('accentColor', `#${val}`)
                                                                }}
                                                                className="bg-transparent border-none p-0 w-14 text-[11px] font-mono font-bold text-gray-800 dark:text-gray-100 focus:ring-0 uppercase placeholder:text-gray-400"
                                                                placeholder="FFFFFF"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* concent Collection */}
                                    <div className="space-y-2">
                                        <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Concent Required</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div
                                                onClick={() => updateFormData('showConsent', !formData.showConsent)}
                                                className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all cursor-pointer select-none
                              ${formData.showConsent
                                                        ? 'border-[#2D6CFF]/30 bg-blue-50/50 dark:bg-[#2D6CFF]/10 dark:border-[#2D6CFF]/20'
                                                        : 'border-blue-100/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05]'
                                                    }`}
                                            >
                                                <span className={`text-[12px] font-semibold ${formData.showConsent ? 'text-[#2D6CFF]' : 'text-gray-700 dark:text-white'}`}>
                                                    {formData.showConsent ? 'True' : 'False'}
                                                </span>
                                                <div className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200
                              ${formData.showConsent ? 'bg-[#2D6CFF]' : 'bg-gray-200 dark:bg-white/10'}`}>
                                                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
                                ${formData.showConsent ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* ── Step 3 — Thank You Page ── */}
                            {step === 3 && (
                                <div className="space-y-5 max-w-2xl">

                                    {/* Title & Message */}
                                    <div className="space-y-2">
                                        <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Thank You Page</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[12px] font-bold text-gray-900 dark:text-white">Thank You Title <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder="Thank you!"
                                                    className="w-full bg-white dark:bg-[#0A0A0A] border border-blue-100/50 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/40 transition-all text-gray-900 dark:text-white"
                                                    value={formData.thankYou.title}
                                                    onChange={(e) => updateThankYou('title', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1 col-span-2">
                                                <label className="text-[12px] font-bold text-gray-900 dark:text-white">Thank You Message</label>
                                                <textarea
                                                    placeholder="Thank you so much for your shoutout!"
                                                    rows={3}
                                                    className="w-full bg-white dark:bg-[#0A0A0A] border border-blue-100/50 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/40 transition-all text-gray-900 dark:text-white resize-none"
                                                    value={formData.thankYou.message}
                                                    onChange={(e) => updateThankYou('message', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Toggles */}
                                    <div className="space-y-2">
                                        <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Options</h3>
                                        <div className="space-y-2">
                                            {/* Social Share */}
                                            <div
                                                onClick={() => updateThankYou('allowSocialShare', !formData.thankYou.allowSocialShare)}
                                                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer select-none
                                                    ${formData.thankYou.allowSocialShare
                                                        ? 'border-[#2D6CFF]/30 bg-blue-50/50 dark:bg-[#2D6CFF]/10 dark:border-[#2D6CFF]/20'
                                                        : 'border-blue-100/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05]'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${formData.thankYou.allowSocialShare ? 'bg-[#2D6CFF]/10' : 'bg-gray-100 dark:bg-white/5'}`}>
                                                        <Share2 className={`w-4 h-4 ${formData.thankYou.allowSocialShare ? 'text-[#2D6CFF]' : 'text-gray-400'}`} />
                                                    </div>
                                                    <div>
                                                        <p className={`text-[13px] font-semibold leading-tight ${formData.thankYou.allowSocialShare ? 'text-[#2D6CFF]' : 'text-gray-700 dark:text-white'}`}>Allow to share on social media</p>
                                                        <p className="text-[10px] text-gray-400 mt-0.5">Show share buttons after submission</p>
                                                    </div>
                                                </div>
                                                <div className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200 ${formData.thankYou.allowSocialShare ? 'bg-[#2D6CFF]' : 'bg-gray-200 dark:bg-white/10'}`}>
                                                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${formData.thankYou.allowSocialShare ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </div>
                                            </div>

                                            {/* Redirect */}
                                            <div
                                                onClick={() => updateThankYou('redirectEnabled', !formData.thankYou.redirectEnabled)}
                                                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer select-none
                                                    ${formData.thankYou.redirectEnabled
                                                        ? 'border-[#2D6CFF]/30 bg-blue-50/50 dark:bg-[#2D6CFF]/10 dark:border-[#2D6CFF]/20'
                                                        : 'border-blue-100/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05]'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${formData.thankYou.redirectEnabled ? 'bg-[#2D6CFF]/10' : 'bg-gray-100 dark:bg-white/5'}`}>
                                                        <Globe className={`w-4 h-4 ${formData.thankYou.redirectEnabled ? 'text-[#2D6CFF]' : 'text-gray-400'}`} />
                                                    </div>
                                                    <div>
                                                        <p className={`text-[13px] font-semibold leading-tight ${formData.thankYou.redirectEnabled ? 'text-[#2D6CFF]' : 'text-gray-700 dark:text-white'}`}>Redirect to your own page</p>
                                                        <p className="text-[10px] text-gray-400 mt-0.5">Send users to a custom URL after submitting</p>
                                                    </div>
                                                </div>
                                                <div className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200 ${formData.thankYou.redirectEnabled ? 'bg-[#2D6CFF]' : 'bg-gray-200 dark:bg-white/10'}`}>
                                                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${formData.thankYou.redirectEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </div>
                                            </div>

                                            {/* Redirect URL — shown when redirect enabled */}
                                            {formData.thankYou.redirectEnabled && (
                                                <div className="space-y-1 pl-1">
                                                    <label className="text-[11px] font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                                        <Link2 className="w-3 h-3 text-[#2D6CFF]" />
                                                        Redirect URL
                                                    </label>
                                                    <input
                                                        type="url"
                                                        placeholder="https://yourwebsite.com/thank-you"
                                                        className="w-full bg-white dark:bg-[#0A0A0A] border border-blue-100/50 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/40 transition-all text-gray-900 dark:text-white"
                                                        value={formData.thankYou.redirectUrl}
                                                        onChange={(e) => updateThankYou('redirectUrl', e.target.value)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* ── Step 4 — Celebration ── */}
                            {step === 4 && (
                                <div className="flex-1 flex flex-col py-3 items-center justify-center text-center relative overflow-hidden min-h-0">
                                    {/* Confetti — full-area burst */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                        {Array.from({ length: 32 }).map((_, i) => (
                                            <ConfettiParticle key={i} index={i} />
                                        ))}
                                    </div>

                                    {/* Badge */}
                                    <div className="relative mb-3 z-10">
                                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-[#2D6CFF]/20 dark:to-purple-500/20 flex items-center justify-center">
                                            <PartyPopperIcon />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-md shadow-green-500/30">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    </div>

                                    <h2 className="text-[22px] font-black text-gray-900 dark:text-white mb-1 z-10">You're live! 🎉</h2>
                                    <p className="text-[13px] text-gray-500 dark:text-gray-400 max-w-[240px] mx-auto mb-5 leading-relaxed z-10">
                                        Share the link with your customers to start collecting testimonials.
                                    </p>

                                    {/* Browser-frame link card */}
                                    <div className="w-full space-y-2 z-10">
                                        <div className="w-full bg-white dark:bg-white/[0.03] border border-blue-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                                            {/* Fake browser chrome */}
                                            <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-gray-100 dark:border-white/[0.06] bg-gray-50/60 dark:bg-white/[0.02]">
                                                <div className="flex gap-1.5 shrink-0">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                                </div>
                                                <div className="flex-1 bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 rounded-md px-2.5 py-1 flex items-center gap-1.5 min-w-0">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                                                    <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 truncate">
                                                        https://{shareLink}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Copy row */}
                                            <div className="flex items-center gap-2 px-3.5 py-3">
                                                <span className="flex-1 text-[13px] font-mono font-semibold text-gray-700 dark:text-gray-200 truncate">
                                                    {shareLink}
                                                </span>
                                                <button
                                                    onClick={handleCopy}
                                                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all shrink-0
                            ${copied
                                                            ? 'bg-green-500 text-white scale-95'
                                                            : 'bg-[#2D6CFF] hover:bg-[#2057d5] text-white'
                                                        }`}
                                                >
                                                    {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                    {copied ? 'Copied!' : 'Copy'}
                                                </button>
                                            </div>
                                        </div>
                                        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-blue-100/50 dark:border-white/10 text-[12px] font-semibold text-gray-500 dark:text-gray-400 hover:text-[#2D6CFF] hover:border-[#2D6CFF]/30 dark:hover:border-[#2D6CFF]/30 transition-all bg-transparent">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Open in new tab
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-blue-100/50 dark:border-white/10 shrink-0">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                className={`rounded-full px-5 h-9 font-bold flex items-center gap-1.5 border-blue-200 dark:border-white/10 text-sm
                  ${step === 1 || step === 4 ? 'invisible pointer-events-none' : ''}`}
                            >
                                <ChevronLeft className="w-3.5 h-3.5" /> Back
                            </Button>

                            {step === 1 && (
                                <Button onClick={nextStep} className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black rounded-full px-6 h-9 font-bold flex items-center gap-1.5 text-sm shadow-md">
                                    Continue <ChevronRight className="w-3.5 h-3.5" />
                                </Button>
                            )}
                            {step === 2 && (
                                <Button onClick={nextStep} className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black rounded-full px-6 h-9 font-bold flex items-center gap-1.5 text-sm shadow-md">
                                    Continue <ChevronRight className="w-3.5 h-3.5" />
                                </Button>
                            )}
                            {step === 3 && (
                                <Button onClick={nextStep} className="bg-[#2D6CFF] hover:bg-[#2057d5] text-white rounded-full px-6 h-9 font-bold flex items-center gap-1.5 text-sm shadow-md shadow-blue-500/20 hover:scale-105 transition-all">
                                    <Check className="w-3.5 h-3.5" /> Create Collection
                                </Button>
                            )}
                            {step === 4 && (
                                <Button onClick={() => router.push('/dashboard')} className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black rounded-full px-6 h-9 font-bold flex items-center gap-1.5 text-sm shadow-md hover:scale-105 transition-all">
                                    Go to Dashboard <ChevronRight className="w-3.5 h-3.5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}