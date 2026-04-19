"use client";

import { Link2, Check, ExternalLink, Image as ImageIcon } from "lucide-react";
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
                        {/* <div className="flex items-center justify-center gap-2">
                            {[
                                { 
                                    icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>, 
                                    label: 'Twitter', color: '#1DA1F2' 
                                },
                                { 
                                    icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, 
                                    label: 'LinkedIn', color: '#0A66C2' 
                                },
                                { 
                                    icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, 
                                    label: 'Facebook', color: '#1877F2' 
                                },
                            ].map(({ icon, label, color }) => (
                                <button
                                    key={label}
                                    title={label}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold transition-all hover:scale-105 border
                                        ${isDark
                                            ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                                            : "bg-white border-gray-100 text-gray-700 hover:bg-gray-50 shadow-sm"
                                        }`}
                                >
                                    <div style={{ color }} className="flex items-center justify-center">
                                        {icon}
                                    </div>
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
                        </div> */}
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
