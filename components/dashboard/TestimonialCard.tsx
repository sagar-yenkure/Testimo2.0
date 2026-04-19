"use client";

import { useState } from "react";
import { Play, CheckCircle2, Send, Mail, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Stars } from "./Stars";
import { Testimonial } from "@/types";
import { SEND_MSG_MAX_LIMIT, SEND_MSG_MIN_LIMIT } from "@/constants";

interface TestimonialCardProps {
    data: Testimonial;
}

export const TestimonialCard = ({ data }: TestimonialCardProps) => {
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSendReply = async () => {
        setIsSending(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSending(false);
        setIsReplyModalOpen(false);
        setReplyMessage("");
        toast.success("Reply sent successfully", { description: `Your message to ${data.name} has been dispatched.` });
    };

    const charCount = replyMessage?.length;
    const isTooShort = charCount < SEND_MSG_MIN_LIMIT;
    const isTooLong = charCount > SEND_MSG_MAX_LIMIT;
    const isValid = !isTooShort && !isTooLong;
    const charCountColor = isTooShort || isTooLong ? 'text-red-500' : 'text-emerald-500';

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
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (data.action === "REPLY") setIsReplyModalOpen(true);
                            }}
                            className="text-[10px] font-bold text-blue-600 dark:text-[#6C85FF] tracking-widest hover:text-blue-700 dark:hover:text-white transition-colors uppercase cursor-pointer"
                        >
                            {data.action}
                        </button>
                    )}
                    {data.actionIcon && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#65E3AD] fill-emerald-500/20 dark:fill-[#65E3AD]/20" />
                    )}
                </div>
            )}

            <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
                <DialogContent className="sm:max-w-[550px] rounded-[24px]! bg-white/95 dark:bg-[#09090C]/90 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 !p-0 overflow-hidden shadow-[0_30px_100px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)]">
                    <div className="flex flex-col h-full w-full">
                        {/* Header Area */}
                        <div className="px-5 py-4 border-b border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-[#111115]/50 flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-[13px]">
                                <span className="font-semibold text-slate-400 dark:text-[#6A6A75] w-8">To:</span>
                                <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-slate-200/50 dark:border-transparent px-2 py-1 rounded-md shadow-sm dark:shadow-none">
                                    {data.avatar ? (
                                        <img src={data.avatar} className="w-4 h-4 rounded object-cover" alt="" />
                                    ) : (
                                        <div className={`w-4 h-4 rounded text-[8px] font-bold text-white flex items-center justify-center ${data.bg || 'bg-blue-600'}`}>
                                            {data.initials}
                                        </div>
                                    )}
                                    <span className="font-semibold text-slate-800 dark:text-white leading-none">{data.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] border-t border-slate-150 dark:border-white/5 pt-3">
                                <span className="font-semibold text-slate-400 dark:text-[#6A6A75] w-8">Sub:</span>
                                <span className="font-medium text-slate-900 dark:text-blue-100">Following up on your Testimonial</span>
                            </div>
                        </div>

                        {/* Compose Area */}
                        <div className="p-5">
                            <textarea
                                className="w-full min-h-[180px] bg-transparent text-[15px] leading-relaxed text-slate-900 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-[#555] outline-none resize-none"
                                placeholder={`Write your reply to ${data.name}...`}
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                autoFocus
                            />
                            <div className="flex justify-end mt-1">
                                <span className={`text-[11px] font-medium ${charCountColor}`}>
                                    {charCount} / 500
                                </span>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="px-5 py-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/80 dark:bg-[#000000]/20 flex items-center justify-between">
                            <button
                                onClick={() => setIsReplyModalOpen(false)}
                                className="px-4 py-2 text-[13px] font-semibold text-slate-500 dark:text-[#666] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            >
                                Discard
                            </button>
                            <button
                                disabled={isSending || !isValid}
                                onClick={handleSendReply}
                                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full min-w-[130px] text-[13px] font-bold text-white transition-all active:scale-95 shadow-[0_5px_15px_rgba(37,99,235,0.3)] dark:shadow-[0_5px_15px_rgba(255,255,255,0.15)] cursor-pointer disabled:opacity-70 disabled:pointer-events-none ${isTooLong ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-slate-200'
                                    }`}
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-3.5 h-3.5" />
                                        Send Reply
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
