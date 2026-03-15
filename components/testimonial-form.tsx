"use client";

import { useState } from "react";
import { Star, MessageSquareText, Video, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialFormProps {
  formData: {
    collectionName: string;
    logo: string | null;
    formTitle: string;
    description: string;
    collectStarRatings: boolean;
    collectCompany: boolean;
    collectEmail: boolean;
    collectUserRole: boolean;
    collectSocialLink: boolean;
    language: string;
    theme: string;
  };
  isPreview?: boolean;
}

export function TestimonialFormPreview({ formData, isPreview = false }: TestimonialFormProps) {
  const [submissionType, setSubmissionType] = useState<"text" | "video">("text");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const isDark = formData.theme === "Dark";

  const inputCls = `w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/40 border transition-all
    ${isDark
      ? "bg-[#0A0A0A] border-white/10 text-white placeholder:text-gray-600"
      : "bg-white border-blue-100/50 text-gray-900 shadow-sm placeholder:text-gray-400"
    }`;

  const labelCls = `text-[11px] font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`;

  return (
    <div className={`w-full px-6 py-8 ${isDark ? "text-white" : "text-gray-900"}`}>
      <div className="flex flex-col items-center text-center w-full max-w-md mx-auto">

        {/* Logo */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 overflow-hidden shrink-0 border
          ${isDark ? "bg-white/5 border-white/10" : "bg-blue-50/50 border-blue-100/50"}`}>
          {formData.logo ? (
            <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-[#2D6CFF] opacity-40" />
          )}
        </div>

        <h3 className="text-xl font-extrabold mb-1.5 leading-tight tracking-tight">
          {formData.formTitle || "Share Your Experience"}
        </h3>
        <p className={`text-[13px] mb-6 leading-relaxed max-w-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {formData.description || "We'd love to hear about your experience..."}
        </p>

        {/* Star Ratings */}
        {formData.collectStarRatings && (
          <div className="mb-5 w-full">
            <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Rate your experience
            </label>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHoveredStar(i)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setSelectedStar(i)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-8 h-8 transition-all duration-150
                      ${(hoveredStar || selectedStar) >= i
                        ? "fill-yellow-400 text-yellow-400"
                        : isDark ? "text-white/10" : "text-gray-200"
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Submission Type — pill bar matching step bar style */}
        <div className="w-full mb-5">
          <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Choose how to share
          </label>
          <div className={`flex items-center gap-1.5 p-1 rounded-2xl ${isDark ? "bg-white/5" : "bg-blue-50/60"}`}>
            {(["text", "video"] as const).map((type) => {
              const Icon = type === "text" ? MessageSquareText : Video;
              const active = submissionType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSubmissionType(type)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[12px] font-bold transition-all duration-200
                    ${active
                      ? "bg-[#2D6CFF] text-white shadow-md shadow-blue-500/25"
                      : isDark
                        ? "text-gray-400 hover:text-white hover:bg-white/5"
                        : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="capitalize">{type}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Input Section (Text or Video) ── */}
        <div className="w-full mb-5">
          {submissionType === "text" ? (
            <div className="space-y-1 text-left">
              <label className={labelCls}>
                Your testimonial <span className="text-red-400">*</span>
              </label>
              <textarea
                placeholder="Share your experience..."
                disabled={isPreview}
                className={`${inputCls} resize-none min-h-[96px]`}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              {[
                { icon: Video, label: "Record Video", sub: "Record testimonial" },
                { icon: Upload, label: "Upload Video", sub: "MP4, MOV, up to 100MB" },
              ].map(({ icon: Icon, label, sub }) => (
                <button
                  key={label}
                  disabled={isPreview}
                  className={`flex-1 flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border-2 border-dashed transition-all group
                    ${isDark
                      ? "border-white/10 bg-white/[0.02] hover:border-[#2D6CFF]/50 hover:bg-[#2D6CFF]/5"
                      : "border-blue-100/60 bg-blue-50/20 hover:border-[#2D6CFF]/40 hover:bg-blue-50/60"
                    } ${isPreview ? "opacity-70 cursor-not-allowed pointer-events-none" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                    ${isDark
                      ? "bg-white/5 group-hover:bg-[#2D6CFF]/20"
                      : "bg-white shadow-sm group-hover:shadow-md group-hover:bg-[#2D6CFF]/5"
                    }`}>
                    <Icon className="w-5 h-5 text-[#2D6CFF]" />
                  </div>
                  <div className="text-center px-1">
                    <p className={`text-[12px] font-bold mb-0.5 ${isDark ? "text-white" : "text-gray-800"}`}>{label}</p>
                    <p className={`text-[10px] leading-relaxed ${isDark ? "text-gray-500" : "text-gray-400"}`}>{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Shared User Fields (Always Visible) ── */}
        <div className="w-full space-y-3 text-left">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelCls}>Your Name <span className="text-red-400">*</span></label>
              <input type="text" placeholder="John Doe" disabled={isPreview} className={inputCls} />
            </div>

            <div className="space-y-1">
              <label className={labelCls}>Profile Image</label>
              <label className={`flex items-center gap-2 rounded-xl px-3 py-2 border cursor-pointer transition-all text-[12px]
                ${isDark
                  ? "bg-[#0A0A0A] border-white/10 text-gray-400 hover:border-[#2D6CFF]/50 hover:text-[#2D6CFF]"
                  : "bg-white border-blue-100/50 text-gray-400 shadow-sm hover:border-[#2D6CFF]/40 hover:text-[#2D6CFF]"
                } ${isPreview ? "pointer-events-none opacity-60" : ""}`}>
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate font-medium">Upload photo</span>
                <input type="file" accept="image/*" className="hidden" disabled={isPreview} />
              </label>
            </div>
          </div>

          {/* Optional fields based on settings */}
          {(formData.collectEmail || formData.collectUserRole || formData.collectCompany || formData.collectSocialLink) && (
            <div className="grid grid-cols-2 gap-3">
              {formData.collectEmail && (
                <div className="space-y-1">
                  <label className={labelCls}>Email <span className="text-red-400">*</span></label>
                  <input type="email" placeholder="you@company.com" disabled={isPreview} className={inputCls} />
                </div>
              )}
              {formData.collectUserRole && (
                <div className="space-y-1">
                  <label className={labelCls}>Designation <span className="text-red-400">*</span></label>
                  <input type="text" placeholder="Product Manager" disabled={isPreview} className={inputCls} />
                </div>
              )}
              {formData.collectCompany && (
                <div className="space-y-1">
                  <label className={labelCls}>Company <span className="text-red-400">*</span></label>
                  <input type="text" placeholder="TechCorp Inc." disabled={isPreview} className={inputCls} />
                </div>
              )}
              {formData.collectSocialLink && (
                <div className="space-y-1">
                  <label className={labelCls}>Social Link <span className="text-red-400">*</span></label>
                  <input type="url" placeholder="linkedin.com/in/you" disabled={isPreview} className={inputCls} />
                </div>
              )}
            </div>
          )}

          <div className="pt-1">
            <Button
              disabled={isPreview}
              className={`w-full bg-[#2D6CFF] hover:bg-[#2057d5] text-white rounded-xl py-5 font-bold text-sm shadow-md shadow-blue-500/20 transition-all
                ${isPreview ? "pointer-events-none opacity-80" : "hover:scale-[1.01] active:scale-[0.99]"}`}
            >
              Submit Testimonial
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}