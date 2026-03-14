"use client"

import React, { useState } from 'react'
import { 
    Code2, 
    Copy,
    CheckCircle2,
    ExternalLink,
    Terminal,
    Layout,
    Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface EmbedViewProps {
    spaceId: string;
}

export const EmbedView = ({ spaceId }: EmbedViewProps) => {
    const [selectedFramework, setSelectedFramework] = useState('react')

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            {/* FrameWork Selector */}
            <div className="bg-card-bg border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[#2D6CFF]/10 flex items-center justify-center border border-blue-100 dark:border-blue-900/20">
                        <Layout className="w-5 h-5 text-[#2D6CFF]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white">Choose Your Framework</h2>
                        <p className="text-xs text-gray-400 font-bold mt-0.5">Select a framework to see tailored integration instructions.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {['React', 'Next.js', 'Remix', 'Angular', 'Vue.js'].map((fw) => (
                        <button
                            key={fw}
                            onClick={() => setSelectedFramework(fw.toLowerCase())}
                            className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 group relative overflow-hidden ${
                                selectedFramework === fw.toLowerCase()
                                ? 'border-[#2D6CFF] bg-blue-50/50 dark:bg-[#2D6CFF]/5'
                                : 'border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 bg-white dark:bg-white/5'
                            }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                selectedFramework === fw.toLowerCase() ? 'bg-[#2D6CFF] text-white shadow-lg' : 'bg-gray-100 dark:bg-white/10 text-gray-400'
                            }`}>
                                <Terminal className="w-5 h-5" />
                            </div>
                            <span className={`text-xs font-black uppercase tracking-widest ${
                                selectedFramework === fw.toLowerCase() ? 'text-[#2D6CFF]' : 'text-gray-50'
                            }`}>{fw}</span>
                            {selectedFramework === fw.toLowerCase() && (
                                <div className="absolute top-2 right-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#2D6CFF]" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Implementation Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card-bg border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center">
                                <Terminal className="w-4 h-4 text-green-600" />
                            </div>
                            <h3 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-widest">Installation</h3>
                        </div>
                        <div className="bg-[#050505] rounded-2xl p-6 relative group border border-white/5">
                            <code className="text-gray-300 font-mono text-sm">npm install testimo-react@latest</code>
                            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-500 hover:text-white">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="bg-card-bg border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                <Code2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-widest">Implementation Example</h3>
                        </div>
                        <div className="bg-[#050505] rounded-2xl p-6 relative group border border-white/5">
                            <pre className="text-gray-300 font-mono text-[13px] leading-relaxed overflow-x-auto">
{`import { Testimonials } from "testimo-react";

export default function App() {
  return (
    <Testimonials 
      collectionId="${spaceId}"
      theme="light"
      layout="grid"
    />
  );
}`}
                            </pre>
                            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-500 hover:text-white">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-card-bg border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                        <h3 className="font-black text-xs tracking-widest uppercase mb-6 text-gray-400">Live Preview</h3>
                        <div className="aspect-[3/4] rounded-[24px] border-2 border-dashed border-gray-100 dark:border-white/5 flex items-center justify-center relative group">
                            <div className="text-center p-6">
                                <Star className="w-12 h-12 text-amber-400/20 mx-auto mb-4" />
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Interactive preview of your wall</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 dark:from-[#2D6CFF]/10 to-transparent rounded-[22px] pointer-events-none" />
                        </div>
                        <Button className="w-full mt-6 bg-[#2D6CFF] rounded-xl font-bold">
                            Open Full Preview
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
