"use client";

import { useState } from "react";
import { Star, MessageSquareText, Video, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialFormProps {
  formData: {
    collectionName: string;
    logo: string | null;
    brandName: string;
    formTitle: string;
    description: string;
    collectStarRatings: boolean;
    collectCompany: boolean;
    collectEmail: boolean;
    collectUserRole: boolean;
    collectSocialLink: boolean;
    language: string;
    theme: string;
    bgPattern?: string;
    fontFamily?: 'Inter' | 'Outfit' | 'Playfair' | 'Mono';
    accentColor?: string;
  };
  isPreview?: boolean;
}

export function TestimonialForm({ formData, isPreview = false }: TestimonialFormProps) {
  const [submissionType, setSubmissionType] = useState<"text" | "video">("text");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [testimonial, setTestimonial] = useState("");
  const MAX_CHARS = 500;
  const isDark = formData.theme === "Dark";
  const accent = formData.accentColor || '#2D6CFF'
  const fontFamilies = {
    Inter: '"Inter", sans-serif',
    Outfit: '"Outfit", sans-serif',
    Playfair: '"Playfair Display", serif',
    Mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  }
  const fontStyle = fontFamilies[formData.fontFamily || 'Inter']

  const inputCls = `w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 border transition-all
    ${isDark
      ? "bg-[#0A0A0A] border-white/10 text-white placeholder:text-gray-600"
      : "bg-white border-blue-100/50 text-gray-900 shadow-sm placeholder:text-gray-400"
    }`;

  const labelCls = `text-[11px] font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`;

  return (
    <div className={`w-full px-6 py-7 ${isDark ? "text-white" : "text-gray-900"}`} style={{ fontFamily: fontStyle }}>
      <div className="flex flex-col items-center text-center w-full max-w-md mx-auto relative z-10">

        {/* Logo & Title Section — Always stacked and centered for layout stability */}
        <div className="mb-5 w-full">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0
              ${isDark ? "bg-white/5" : "bg-blue-50/50"}`}
              style={{
                borderColor: `${accent}30`,
                boxShadow: formData.logo ? `0 4px 20px -10px ${accent}` : 'none'
              }}
            >
              {formData.logo ? (
                <img src={formData.logo} alt="Logo" className="w-full h-full object-cover rounded-[14px]" />
              ) : (
                <ImageIcon className="w-6 h-6 opacity-70" style={{ color: accent }} />
              )}
            </div>
            {formData.brandName && (
              <span className={`text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {formData.brandName}
              </span>
            )}
          </div>
          <h3 className="text-[25px] font-extrabold leading-tight tracking-tight">
            {formData.formTitle || "Share Your Experience"}
          </h3>

          {formData.collectionName && (
            <p className={`text-[11px] mt-1.5 font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              {formData.collectionName}
            </p>
          )}
        </div>

        {/* Description */}
        <p className={`text-[12.5px] mb-5 leading-relaxed max-w-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {formData.description || "We'd love to hear about your experience..."}
        </p>

        {/* Star Ratings — integrated card, no uppercase label */}
        {formData.collectStarRatings && (
          <div className={`w-full mb-5 rounded-2xl px-4 py-3.5 flex flex-col items-center gap-2
            ${isDark ? "bg-white/[0.03] border border-white/5" : "bg-blue-50/40 border border-blue-100/40"}`}>
            <p className={`text-[11px] font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              How would you rate your experience?
            </p>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  // disabled={isPreview}
                  onMouseEnter={() => setHoveredStar(i)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setSelectedStar(i)}
                  className="transition-transform hover:scale-115 active:scale-95 disabled:cursor-default"
                >
                  <Star
                    className={`w-7 h-7 transition-all duration-100
                      ${(hoveredStar || selectedStar) >= i
                        ? "fill-yellow-400 text-yellow-400"
                        : isDark ? "text-white/10" : "text-gray-200"
                      }`}
                  />
                </button>
              ))}
            </div>
            <p className={`text-[10px] font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              {(hoveredStar || selectedStar) > 0 ? (
                ["", "Poor", "Fair", "Good", "Great", "Excellent!"][(hoveredStar || selectedStar)]
              ) : "Not rated"}
            </p>
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
                  // disabled={isPreview}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[12px] font-bold transition-all duration-200
                    ${active
                      ? "text-white shadow-md"
                      : isDark
                        ? "text-gray-400 hover:text-white hover:bg-white/5"
                        : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                    }`}
                  style={active ? { backgroundColor: accent } : {}}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="capitalize">{type}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Text Form ── */}
        <div className="w-full space-y-3 text-left">
          {submissionType === "text" && (
            <div className="space-y-1">
              <label className={labelCls}>
                Your testimonial <span className="text-red-400">*</span>
              </label>
              <div className="space-y-1">
                <textarea
                  placeholder="Share your experience..."
                  disabled={isPreview}
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value.slice(0, MAX_CHARS))}
                  className={`${inputCls} resize-none min-h-[110px]`}
                />
                <div className="flex justify-end">
                  <span className={`text-[10px] font-medium transition-colors ${testimonial.length >= MAX_CHARS ? "text-red-500" : "text-gray-400"
                    }`}>
                    {testimonial.length} / {MAX_CHARS} characters
                  </span>
                </div>
              </div>
            </div>
          )}


          {/* ── Video Options ── */}
          {submissionType === "video" && (
            <div className="w-full flex gap-3">
              {[
                { icon: Video, label: "Record Video", sub: "Use your camera to record a testimonial" },
                { icon: Upload, label: "Upload Video", sub: "MP4, MOV, WEBM · up to 100MB" },
              ].map(({ icon: Icon, label, sub }) => (
                <button
                  key={label}
                  disabled={isPreview}
                  className={`flex-1 flex flex-col items-center justify-center gap-4 py-6 rounded-2xl border-2 border-dashed transition-all group
                  ${isDark
                      ? "border-white/10 bg-white/[0.02]"
                      : "border-blue-100/60 bg-blue-50/20"
                    } cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98]`}
                  style={{ borderColor: submissionType === "video" ? `${accent}40` : undefined }}

                >
                  {/* Icon circle */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200
                  ${isDark
                      ? "bg-white/5"
                      : "bg-white shadow-sm"
                    }`}>
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <div className="text-center px-2">
                    <p className={`text-[13px] font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>{label}</p>
                    <p className={`text-[11px] leading-relaxed ${isDark ? "text-gray-500" : "text-gray-400"}`}>{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelCls}>Your Name <span className="text-red-400">*</span></label>
              <input type="text" placeholder="John Doe" disabled={isPreview} className={inputCls} />
            </div>

            {/* Profile image — clean upload zone */}
            <div className="space-y-1">
              <label className={labelCls}>Profile Image</label>
              <label className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 border cursor-pointer transition-all text-sm
                  ${isDark
                  ? "bg-[#0A0A0A] border-white/10 text-gray-400 hover:text-white"
                  : "bg-white border-blue-100/50 text-gray-400 shadow-sm hover:text-gray-700"
                } ${isPreview ? "opacity-60" : ""}`}
                style={{ borderColor: isPreview ? undefined : `${accent}30` }} // Custom border logic
                onMouseEnter={(e) => {
                  if (!isPreview) e.currentTarget.style.borderColor = accent;
                }}
                onMouseLeave={(e) => {
                  if (!isPreview) e.currentTarget.style.borderColor = `${accent}30`;
                }}
              >
                <Upload className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <span className="truncate font-medium">Upload photo</span>
                <input type="file" accept="image/*" className="hidden" disabled={isPreview} />
              </label>
            </div>
          </div>



          {/* Optional fields */}
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
              className={`w-full text-white rounded-xl py-5 font-bold text-sm transition-all ${isPreview ? "pointer-events-none opacity-80" : "hover:scale-[1.01] active:scale-[0.99]"}`} style={{ backgroundColor: accent }}
            >
              Submit Testimonial
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}