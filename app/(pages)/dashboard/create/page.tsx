import CreateSpaceForm from '@/components/create-space-form'

export default function CreateSpacePage() {
    return (
        <div className="flex flex-col w-full h-full pb-2 lg:overflow-hidden">
            {/* Minimal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 shrink-0">
                <div>
                    <div className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1 text-blue-600 dark:text-[#2D6CFF]">NEW SPACE</div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Let's get started
                    </h1>
                </div>
            </div>

            {/* Main Form Component */}
            <div className="flex-1 min-h-0">
                <CreateSpaceForm />
            </div>
        </div>
    )
}
