import SpaceDetailClient from "@/components/dashboard/SpaceDetailClient";
import { Testimonial } from "@/types";

const CARDS: Testimonial[] = [
    {
        id: "1",
        name: "Sagar Y",
        avatar: "https://i.pravatar.cc/150?u=sagar",
        ratingPos: "name",
        rating: 5,
        badge: { label: "LIKED", css: "text-amber-600 dark:text-[#F3B664] bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 shadow-sm" },
        content: "TestimonialPro has completely changed how we collect social proof. The workflow is seamless, and the widgets look amazing on our landing page. Highly recommended for any SaaS founder.",
        date: "Sep 28, 2023",
        action: null,
    },
    {
        id: "2",
        name: "John Doe",
        title: "Product Designer",
        initials: "JD",
        bg: "bg-indigo-900",
        ratingPos: "bottom",
        rating: 5,
        badge: { label: "TEXT", css: "text-slate-600 dark:text-[#82828C] bg-slate-100 dark:bg-[#1C1C21] border border-slate-200 dark:border-[#2B2B33]" },
        content: "Love the 'Obsidian Logic' aesthetic. It fits perfectly with our dark mode product. The API integration was a breeze. We're now displaying real reviews in our app dashboard thanks to you guys.",
        date: "Sep 28, 2023",
        action: "REPLY"
    },
    {
        id: "3",
        name: "Elena K.",
        title: "E-commerce Owner",
        initials: "EK",
        bg: "bg-purple-900",
        ratingPos: "none",
        badge: { label: "TEXT", css: "text-slate-600 dark:text-[#82828C] bg-slate-100 dark:bg-[#1C1C21] border border-slate-200 dark:border-[#2B2B33]" },
        content: "We saw a 15% increase in conversion rates after adding the 'Wall of Love' to our checkout page. The social proof is undeniable.",
        teamReply: "\"That's amazing news, Elena! We're so glad to hear about the conversion boost.\"",
        date: "Sep 15, 2023",
        actionIcon: true
    },
    {
        id: "4",
        isVideo: true,
        name: "Amanda Chen",
        ratingPos: "right",
        rating: 5,
        content: "\"The video quality is crystal clear and the recording experience was so easy for my clients.\""
    },
    {
        id: "5",
        name: "Marcus R",
        avatar: "https://i.pravatar.cc/150?img=11",
        ratingPos: "name",
        rating: 5,
        badge: { label: "LIKED", css: "text-amber-600 dark:text-[#F3B664] bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 shadow-sm" },
        content: "The best tool for gathering video testimonials. Simple, effective, and beautiful.",
    },
    {
        id: "6",
        name: "Tim Howard",
        avatar: "https://i.pravatar.cc/150?img=12",
        ratingPos: "name",
        rating: 5,
        content: "Fantastic support team. They helped me set up my custom domain in minutes. The obsidian theme is just the icing on the cake. Five stars all around.",
    }
]

export default async function SpaceDetailPage({ 
    params,
    searchParams 
}: { 
    params: Promise<{ space: string }>,
    searchParams: Promise<{ view?: string }>
}) {
    const { space } = await params;
    const { view: viewParam } = await searchParams;
    const view = viewParam || "inbox";
    return <SpaceDetailClient initialCards={CARDS} initialView={view} />;
}