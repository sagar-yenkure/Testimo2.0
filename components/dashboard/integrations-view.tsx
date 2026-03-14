"use client"

import React from 'react'
import { 
    Settings,
    Zap,
    Github,
    Slack,
    Chrome
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export const IntegrationsView = () => {
    const integrations = [
        { name: 'Slack', icon: Slack, desc: 'Get instant notifications for new testimonials.', status: 'Connected', color: 'text-purple-500' },
        { name: 'GitHub', icon: Github, desc: 'Sync your social proof with your repositories.', status: 'Available', color: 'text-gray-900 dark:text-white' },
        { name: 'Chrome Extension', icon: Chrome, desc: 'Capture testimonials from anywhere on the web.', status: 'Available', color: 'text-blue-500' },
        { name: 'Zapier', icon: Zap, desc: 'Connect with 5000+ apps using Zapier.', status: 'Beta', color: 'text-orange-500' },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="bg-card-bg border border-gray-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center border border-orange-100 dark:border-orange-900/20">
                        <Settings className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white">Integrations & Apps</h2>
                        <p className="text-xs text-gray-400 font-bold mt-0.5">Automate your social proof workflow with power-ups.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {integrations.map((item) => (
                        <div key={item.name} className="p-6 rounded-[24px] border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center ${item.color}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                    item.status === 'Connected' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {item.status}
                                </div>
                            </div>
                            <h3 className="font-extrabold text-gray-900 dark:text-white mb-1.5">{item.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6">{item.desc}</p>
                            <Button variant="outline" className="w-full rounded-xl font-bold text-xs">
                                {item.status === 'Connected' ? 'Manage' : 'Configure'}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
