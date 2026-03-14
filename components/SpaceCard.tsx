import {
    Clock,
    ArrowRight
} from 'lucide-react'
import { CopyLink } from '@/components/copy-link'
import Link from 'next/link'

const SpaceCard = ({ space }: { space: any }) => {
    return (
        <div className="bg-card-bg border border-blue-200/50 dark:border-blue-900/30 rounded-[28px] p-5 shadow-sm hover:shadow-md hover:border-[#2D6CFF]/30 transition-all duration-300 group flex flex-col">
            <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/10 overflow-hidden shrink-0 shadow-md">
                    <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${space.name}&backgroundColor=2D6CFF`}
                        alt={space.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="text-[18px] font-black text-gray-900 dark:text-white group-hover:text-[#2D6CFF] transition-colors line-clamp-1 flex-1 leading-tight">{space.name}</h3>
            </div>

            {/* Link Area */}
            <div className="w-full bg-white/60 dark:bg-white/[0.03] border border-blue-100/50 dark:border-white/5 rounded-xl h-9 px-3 flex items-center justify-between mb-4 group-hover:border-[#2D6CFF]/20 transition-colors">
                <span className="text-[12px] font-bold text-gray-400 truncate mr-3">
                    {space.link}
                </span>
                <div className="scale-90 origin-right">
                    <CopyLink link={space.link} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/60 dark:bg-white/[0.03] rounded-2xl p-3.5 flex flex-col border border-blue-100/50 dark:border-white/10 transition-all group-hover:bg-white dark:group-hover:bg-white/5">
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Text Items</div>
                    <div className="text-xl font-black text-gray-900 dark:text-white leading-none">{space.textCount}</div>
                </div>
                <div className="bg-white/60 dark:bg-white/[0.03] rounded-2xl p-3.5 flex flex-col border border-blue-100/50 dark:border-white/10 transition-all group-hover:bg-white dark:group-hover:bg-white/5">
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Video Items</div>
                    <div className="text-xl font-black text-gray-900 dark:text-white leading-none">{space.videoCount}</div>
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{space.updated}</span>
                </div>
                <Link href={`/dashboard/${space.name}?tab?=inbox`} className="flex items-center gap-1 text-[13px] font-black text-[#2D6CFF] hover:gap-2 transition-all">
                    Manage
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}

export default SpaceCard