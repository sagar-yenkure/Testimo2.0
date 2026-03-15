"use client"

import React from 'react'
import {
    MessageSquareText,
    Video,
    Star,
    Heart,
    ArrowLeft,
    Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface InboxViewProps {
    spaceName: string;
}

export const InboxView = ({ spaceName }: InboxViewProps) => {
    const stats = [
        { label: 'Total', count: 1, icon: MessageSquareText, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
        { label: 'Text', count: 1, icon: MessageSquareText, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-500/10' },
        { label: 'Video', count: 0, icon: Video, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-500/10' },
        { label: 'Highlighted', count: 0, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    ]

    const testimonials = [
        {
            id: 1,
            author: 'sagar y',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=sagar',
            content: 'good',
            rating: 4,
            date: 'Mar 7, 2026',
            liked: true
        }
    ]

    return (
        < div className="bg-card-bg border border-blue-200/50 dark:border-blue-900/30 rounded-[32px] shadow-sm overflow-hidden transition-colors duration-300" >
            {/* Header Area */}
            < div className="p-6 md:p-8" >
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 dark:bg-white/5">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                        {spaceName}
                    </h1>
                </div>
            </div >

            <div className="h-[1px] w-full bg-blue-200/30 dark:bg-blue-900/20" />

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-blue-200/30 dark:divide-blue-900/20">
                {stats.map((stat, index) => (
                    <div key={index} className="p-6 flex flex-col justify-between relative group hover:bg-white/40 dark:hover:bg-white/[0.02] transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="space-y-0.5">
                                <div className="text-[10px] font-bold tracking-widest text-[#2D6CFF] dark:text-blue-400 uppercase opacity-70">{stat.label}</div>
                                <div className={`text-2xl font-black tracking-tight text-gray-900 dark:text-white`}>
                                    {stat.count}
                                </div>
                            </div>
                            <div className={`bg-white dark:bg-[#0A0A0A] p-2.5 rounded-2xl border border-blue-100/50 dark:border-white/5 shadow-sm transition-transform group-hover:scale-110`}>
                                <stat.icon className={`w-5.5 h-5.5 ${stat.color} dark:text-white`} />
                            </div>
                        </div>
                        {stat.label === 'Highlighted' ? (
                            <div className="mt-2 text-[9px] font-medium text-gray-400 group-hover:text-gray-500 transition-colors leading-tight">
                                Will be visible on wall of love
                            </div>
                        ) : (
                            <div className="mt-2 text-[10px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5 leading-none">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span>Live tracking</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="h-[1px] w-full bg-blue-200/30 dark:bg-blue-900/20" />

            {/* Filter Bar */}
            <div className="p-3 overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max">
                    {['All', 'Video', 'Text', 'Highlighted', 'Liked', 'Archived', 'Spam'].map((filter, i) => (
                        <button
                            key={filter}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${i === 0
                                ? 'bg-[#2D6CFF] text-white shadow-lg shadow-blue-500/20'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                        >
                            {filter}
                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${i === 0 ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/10'
                                }`}>
                                {filter === 'All' || filter === 'Text' || filter === 'Liked' ? 1 : 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[1px] w-full bg-blue-200/30 dark:bg-blue-900/20" />

            {/* Testimonial List Section */}
            <div className="flex flex-col divide-y divide-blue-200/20 dark:divide-blue-900/10">
                <div className="px-6 py-4 md:px-8 bg-gray-50/50 dark:bg-white/[0.01]">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Testimonials</h3>
                </div>
                {testimonials.map((t) => (
                    <div key={t.id} className="p-6 md:p-8 hover:bg-gray-50/30 dark:hover:bg-white/[0.01] transition-colors group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-white/5 shadow-sm">
                                    <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-extrabold text-gray-900 dark:text-white capitalize">{t.author}</h4>
                                        {t.liked && (
                                            <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 text-red-500 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-red-100 dark:border-red-500/20">
                                                <Heart className="w-3 h-3 fill-current" />
                                                Liked
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 mt-1.5">
                                        <div className="flex gap-0.5 text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-current' : ''}`} />
                                            ))}
                                        </div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{t.date}</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Settings className="w-5 h-5 text-gray-400" />
                            </Button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">"{t.content}"</p>
                    </div>
                ))}
                {testimonials.length === 0 && (
                    <div className="p-20 text-center">
                        <MessageSquareText className="w-12 h-12 text-gray-200 dark:text-white/5 mx-auto mb-4" />
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No testimonials yet</p>
                    </div>
                )}
            </div>
        </div >

    )
}
