import type { Metadata } from "next";
import "../../app/globals.css";


export const metadata: Metadata = {
    title: "Testimo - Collect Video Testimonials Effortlessly",
    description: "The most intuitive platform to collect, manage, and showcase video testimonials that convert. Build trust with authentic customer stories.",
};

export default function TestimoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen transition-colors duration-300 bg-background text-foreground">
            {children}
        </main>

    );
}
