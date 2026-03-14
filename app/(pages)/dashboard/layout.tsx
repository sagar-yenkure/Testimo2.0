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
        <div className="min-h-screen">
            <UserNavbar />
            <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
