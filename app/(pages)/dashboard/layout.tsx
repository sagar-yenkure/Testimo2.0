import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Testimo",
    description: "Manage your video testimonial campaigns, view submissions, and track your social proof performance.",
};

import { UserNavbar } from "@/components/user-navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex flex-col bg-background transition-colors duration-300 overflow-hidden">
            <UserNavbar />
            <main className="flex-1 max-w-[1600px] mx-auto w-full relative min-h-0 flex flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
}
