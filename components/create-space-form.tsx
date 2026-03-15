'use client'

import { useState, useRef } from 'react'
import { ChevronRight, ChevronLeft, Check, Settings, Wand2, Copy, CheckCheck, ExternalLink, Upload, X, PartyPopper } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TestimonialForm } from '@/components/testimonial-form'
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
        formTitle: 'Share Your Experience',
        description: "We'd love to hear about your experience with our product...",
        collectStarRatings: true,
        collectCompany: false,
        collectEmail: false,
        collectUserRole: false,
        collectSocialLink: false,
        language: 'English' as 'English' | 'Spanish' | 'French' | 'German' | 'Japanese',
        theme: 'Light' as 'Light' | 'Dark',
        backgroundPattern: 'Default' as 'Default' | 'Dots' | 'Mesh' | 'Grid' | 'Waves' | 'Glass',
        fontFamily: 'Inter' as 'Inter' | 'Outfit' | 'Playfair' | 'Mono',
    })

    const updateFormData = (key: keyof typeof formData, value: any) =>
        setFormData(prev => ({ ...prev, [key]: value }))

    const steps = [
        { id: 1, name: 'Basic Info', icon: Settings },
        { id: 2, name: 'Settings', icon: Wand2 },
        { id: 3, name: 'Share', icon: Check },
    ]

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
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

            <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-5 overflow-hidden">

                {/* ── Live Preview ── */}
                <div className="lg:w-[44%] order-2 lg:order-1 flex flex-col min-h-0 overflow-hidden">
                    <div className={`relative flex-1 rounded-3xl overflow-hidden border transition-colors duration-500
            ${formData.theme === 'Dark' ? 'bg-[#0A0A0A] border-[#222]' : 'bg-white border-blue-200/50'}`}>
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <div className={`absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-40
                ${formData.theme === 'Dark' ? 'bg-[#2D6CFF]/15' : 'bg-[#2D6CFF]/8'}`} />
                            <div className={`absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-40
                ${formData.theme === 'Dark' ? 'bg-purple-500/15' : 'bg-purple-500/8'}`} />
                        </div>
                        <div className="relative z-10 h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <TestimonialForm formData={formData} isPreview={true} />
                        </div>
                    </div>
                </div>

                {/* ── Form Panel ── */}
                <div className="lg:w-[56%] order-1 lg:order-2 flex flex-col min-h-0 overflow-hidden">
                    <div className="flex-1 bg-card-bg border border-blue-200/50 dark:border-blue-900/30 rounded-3xl p-6 lg:p-7 flex flex-col min-h-0 overflow-hidden shadow-sm">

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
                        <div className={`min-h-0 ${step === 3 ? 'flex-1 flex flex-col' : 'flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-1'}`}>

                            {/* ── Step 1 ── */}
                            {step === 1 && (
                                <div className="space-y-4">
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
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[12px] font-bold text-gray-900 dark:text-white">Language</label>
                                                <Select value={formData.language} onValueChange={(v) => updateFormData('language', v)}>
                                                    <SelectTrigger className="w-full bg-white/50 dark:bg-white/[0.02] border border-blue-100/50 dark:border-white/10 rounded-xl text-[12px] font-semibold h-auto py-2.5 px-3 text-gray-900 dark:text-white transition-all hover:bg-white dark:hover:bg-white/[0.05]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        {['English', 'Spanish', 'French', 'German', 'Japanese'].map(o => (
                                                            <SelectItem key={o} value={o} className="text-[12px] cursor-pointer py-2 px-3">{o}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[12px] font-bold text-gray-900 dark:text-white">Theme</label>
                                                <Select value={formData.theme} onValueChange={(v) => updateFormData('theme', v)}>
                                                    <SelectTrigger className="w-full bg-white/50 dark:bg-white/[0.02] border border-blue-100/50 dark:border-white/10 rounded-xl text-[12px] font-semibold h-auto py-2.5 px-3 text-gray-900 dark:text-white transition-all hover:bg-white dark:hover:bg-white/[0.05]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        <SelectItem value="Light" className="text-[12px] cursor-pointer py-2 px-3">Light</SelectItem>
                                                        <SelectItem value="Dark" className="text-[12px] cursor-pointer py-2 px-3">Dark</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[12px] font-bold text-gray-900 dark:text-white">Font Style</label>
                                                <Select value={formData.fontFamily} onValueChange={(v) => updateFormData('fontFamily', v)}>
                                                    <SelectTrigger className="w-full bg-white/50 dark:bg-white/[0.02] border border-blue-100/50 dark:border-white/10 rounded-xl text-[12px] font-semibold h-auto py-2.5 px-3 text-gray-900 dark:text-white transition-all hover:bg-white dark:hover:bg-white/[0.05]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        <SelectItem value="Inter" className="text-[12px] cursor-pointer py-2 px-3">Inter</SelectItem>
                                                        <SelectItem value="Outfit" className="text-[12px] cursor-pointer py-2 px-3">Outfit</SelectItem>
                                                        <SelectItem value="Playfair" className="text-[12px] cursor-pointer py-2 px-3">Playfair</SelectItem>
                                                        <SelectItem value="Mono" className="text-[12px] cursor-pointer py-2 px-3 font-mono">Mono</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>




                                        {/* Data Collection */}
                                        <div className="space-y-2">
                                            <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Data Collection</h3>
                                            <div className="grid grid-cols-3  gap-2">
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
                                                            {/* Larger toggle — w-11 h-6 */}
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

                                        {/* Background Style */}
                                        <div className="space-y-3">
                                            <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Background Style</h3>
                                            <div className="grid grid-cols-3 gap-2">
                                                {[
                                                    { id: 'Default', label: 'Default' },
                                                    { id: 'Dots', label: 'Dots' },
                                                    { id: 'Mesh', label: 'Mesh' },
                                                    { id: 'Grid', label: 'Grid' },
                                                    { id: 'Waves', label: 'Waves' },
                                                    { id: 'Glass', label: 'Glass' },
                                                ].map((pattern) => {
                                                    const active = formData.backgroundPattern === pattern.id
                                                    return (
                                                        <div
                                                            key={pattern.id}
                                                            onClick={() => updateFormData('backgroundPattern', pattern.id)}
                                                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all cursor-pointer select-none
                                                                ${active
                                                                    ? 'border-[#2D6CFF]/30 bg-blue-50/50 dark:bg-[#2D6CFF]/10 dark:border-[#2D6CFF]/20'
                                                                    : 'border-blue-100/50 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05]'
                                                                }`}
                                                        >
                                                            <span className={`text-[12px] font-semibold ${active ? 'text-[#2D6CFF]' : 'text-gray-700 dark:text-white'}`}>
                                                                {pattern.label}
                                                            </span>
                                                            <div className={`w-8 h-8 rounded-lg border border-inherit overflow-hidden relative shrink-0
                                                                ${formData.theme === 'Dark' ? 'bg-[#111]' : 'bg-blue-50/50'}`}>
                                                                {pattern.id === 'Dots' && (
                                                                    <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle, #2D6CFF 0.8px, transparent 0.8px)', backgroundSize: '4px 4px' }} />
                                                                )}
                                                                {pattern.id === 'Grid' && (
                                                                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(to right, #2D6CFF 1px, transparent 1px), linear-gradient(to bottom, #2D6CFF 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                                                                )}
                                                                {pattern.id === 'Mesh' && (
                                                                    <div className="absolute inset-0 opacity-60 bg-gradient-to-br from-[#2D6CFF]/50 via-purple-500/50 to-[#2D6CFF]/50 blur-md" />
                                                                )}
                                                                {pattern.id === 'Waves' && (
                                                                    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #2D6CFF 2px, #2D6CFF 3px)', backgroundSize: '10px 10px' }} />
                                                                )}
                                                                {pattern.id === 'Glass' && (
                                                                    <div className="absolute inset-0 bg-white/40 dark:bg-white/10 backdrop-blur-[1px]" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {/* ── Step 3 — Celebration ── */}
                            {step === 3 && (
                                <div className="flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-0">
                                    {/* Confetti — full-area burst */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                        {Array.from({ length: 32 }).map((_, i) => (
                                            <ConfettiParticle key={i} index={i} />
                                        ))}
                                    </div>

                                    {/* Badge */}
                                    <div className="relative mb-3 z-10">
                                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-[#2D6CFF]/20 dark:to-purple-500/20 flex items-center justify-center">
                                            <PartyPopper className="w-9 h-9 text-[#2D6CFF]" />
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
                  ${step === 1 || step === 3 ? 'invisible pointer-events-none' : ''}`}
                            >
                                <ChevronLeft className="w-3.5 h-3.5" /> Back
                            </Button>

                            {step === 1 && (
                                <Button onClick={nextStep} className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black rounded-full px-6 h-9 font-bold flex items-center gap-1.5 text-sm shadow-md">
                                    Continue <ChevronRight className="w-3.5 h-3.5" />
                                </Button>
                            )}
                            {step === 2 && (
                                <Button onClick={nextStep} className="bg-[#2D6CFF] hover:bg-[#2057d5] text-white rounded-full px-6 h-9 font-bold flex items-center gap-1.5 text-sm shadow-md shadow-blue-500/20 hover:scale-105 transition-all">
                                    <Check className="w-3.5 h-3.5" /> Create Collection
                                </Button>
                            )}
                            {step === 3 && (
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