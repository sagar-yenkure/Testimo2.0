import React from "react";
import InboxClient from "@/components/dashboard/InboxClient";
import { Testimonial } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox | Testimonial Collection",
  description: "Review and manage your latest testimonials and feedback in one place.",
};

// Simulated SSR Data Fetching
async function getInboxData(space: string) {
  const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Sagar Y",
        avatar: "https://i.pravatar.cc/150?u=sagar",
        ratingPos: "name",
        rating: 5,
        badge: { label: "LIKED", css: "text-amber-600 dark:text-[#F3B664] bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 shadow-sm" },
        content: "TestimonialPro has completely changed how we collect social proof. The workflow is seamless, and the widgets look amazing on our landing page.",
        date: "Sep 28, 2023",
    }
  ];
  return { testimonials };
}

export default async function InboxPage({ params }: { params: Promise<{ space: string }> }) {
  const { space } = await params;
  const { testimonials } = await getInboxData(space);

  return <InboxClient initialTestimonials={testimonials} />;
}
