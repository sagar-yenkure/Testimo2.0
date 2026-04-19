import CreateSpaceForm from '@/components/create-space-form'
import BreadcrumbNav from '@/components/breadrcrumb'

export default function CreateSpacePage() {
    return (
        <div className="flex flex-col w-full h-full pb-2 overflow-hidden px-6 pt-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <BreadcrumbNav items={[{ label: 'Create' }]} />
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Let&apos;s get started
                    </h1>
                </div>
            </div>

            {/* Main Form Component */}
            <div className="flex-1 min-h-0 overflow-hidden py-4">
                <div className="w-full h-full max-h-[900px] mx-auto">
                    <CreateSpaceForm />
                </div>
            </div>
        </div>
    )
}
