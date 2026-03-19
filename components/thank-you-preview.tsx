"use client";

import { Twitter, Linkedin, Facebook, Link2, Check, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export interface ThankYouData {
    title: string;
    message: string;
    allowSocialShare: boolean;
    redirectEnabled: boolean;
    redirectUrl: string;
}

interface ThankYouPreviewProps {
    thankYou: ThankYouData;
    theme: string;
    accentColor?: string;
    fontFamily?: 'Inter' | 'Outfit' | 'Playfair' | 'Mono';
    logo: string | null;
    brandName: string;
}

export function ThankYouPreview({ thankYou, theme, accentColor, fontFamily, logo, brandName }: ThankYouPreviewProps) {
    const [linkCopied, setLinkCopied] = useState(false);
    const isDark = theme === "Dark";
    const accent = accentColor || '#2D6CFF';
    const fontFamilies = {
        Inter: '"Inter", sans-serif',
        Outfit: '"Outfit", sans-serif',
        Playfair: '"Playfair Display", serif',
        Mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    };
    const fontStyle = fontFamilies[fontFamily || 'Inter'];

    // Simple markdown-like rendering (bold, italic only)
    const renderMessage = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('_') && part.endsWith('_')) {
                return <em key={i}>{part.slice(1, -1)}</em>;
            }
            return part;
        });
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    return (
        <div
            className={`w-full px-6 py-10 flex flex-col items-center text-center ${isDark ? "text-white" : "text-gray-900"}`}
            style={{ fontFamily: fontStyle }}
        >
            <div className="w-full max-w-md mx-auto flex flex-col items-center">

                {/* Logo + Brand — matches testimonial form exactly */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0
                            ${isDark ? "bg-white/5" : "bg-blue-50/50"}`}
                        style={{
                            borderColor: `${accent}30`,
                            boxShadow: logo ? `0 4px 20px -10px ${accent}` : 'none'
                        }}
                    >
                        {logo ? (
                            <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-[14px]" />
                        ) : (
                            <ImageIcon className="w-6 h-6 opacity-70" style={{ color: accent }} />
                        )}
                    </div>
                    {brandName && (
                        <span className={`text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                            {brandName}
                        </span>
                    )}
                </div>

                {/* Success checkmark */}
                <div className="relative mb-6">
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                        style={{ backgroundColor: `${accent}18`, border: `2px solid ${accent}30` }}
                    >
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: accent }}
                        >
                            <Check className="w-8 h-8 text-white" strokeWidth={3} />
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-10" style={{ backgroundColor: accent }} />
                </div>

                {/* Title */}
                <h2 className={`text-[28px] font-black tracking-tight leading-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {thankYou.title || "Thank you!"}
                </h2>

                {/* Message */}
                <p className={`text-[14px] leading-relaxed mb-8 max-w-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {renderMessage(thankYou.message || "Thank you so much for your shoutout! It means a ton for us! 🙏")}
                </p>

                {/* Social Share Buttons */}
                {thankYou.allowSocialShare && (
                    <div className="w-full mb-6">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            Share the love
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            {[
                                { icon: Twitter, label: 'Twitter', color: '#1DA1F2' },
                                { icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
                                { icon: Facebook, label: 'Facebook', color: '#1877F2' },
                            ].map(({ icon: Icon, label, color }) => (
                                <button
                                    key={label}
                                    title={label}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold transition-all hover:scale-105 border
                                        ${isDark
                                            ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                                            : "bg-white border-gray-100 text-gray-700 hover:bg-gray-50 shadow-sm"
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                                    <span>{label}</span>
                                </button>
                            ))}
                            <button
                                onClick={handleCopyLink}
                                title="Copy link"
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 border
                                    ${isDark
                                        ? "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                        : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50 shadow-sm"
                                    }`}
                            >
                                {linkCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Link2 className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                    </div>
                )}

                {/* Redirect notice */}
                {thankYou.redirectEnabled && thankYou.redirectUrl && (
                    <div className={`w-full flex items-center gap-2 px-4 py-3 rounded-2xl border text-[12px]
                        ${isDark ? "bg-white/[0.03] border-white/5 text-gray-400" : "bg-blue-50/40 border-blue-100/40 text-gray-500"}`}>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                        <span>You'll be redirected to <span className="font-semibold truncate" style={{ color: accent }}>{thankYou.redirectUrl}</span></span>
                    </div>
                )}

                {thankYou.redirectEnabled && !thankYou.redirectUrl && (
                    <div className={`w-full flex items-center gap-2 px-4 py-3 rounded-2xl border text-[12px]
                        ${isDark ? "bg-white/[0.03] border-white/5 text-gray-400" : "bg-blue-50/40 border-blue-100/40 text-gray-500"}`}>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-50" />
                        <span className="opacity-60">Redirect URL not set yet</span>
                    </div>
                )}

            </div>
        </div>
    );
}
