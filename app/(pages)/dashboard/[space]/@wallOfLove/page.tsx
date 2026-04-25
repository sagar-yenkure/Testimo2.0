import React from "react";
import { WallOfLoveCustomizer } from "@/components/dashboard/WallOfLoveCustomizer";
import { Testimonial } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall of Love | Customizer",
  description: "Design and customize your beautiful wall of love to showcase social proof.",
};

// Simulated SSR Fetch for Wall of Love configuration and testimonials
async function getWallOfLoveData(space: string) {
  // We explicitly type the array so TypeScript knows the exact union values
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sagar Y",
      avatar: "https://i.pravatar.cc/150?u=sagar",
      ratingPos: "name", // Now correctly recognized as the literal "name"
      rating: 5,
      badge: { label: "LIKED", css: "text-amber-600 dark:text-[#F3B664] bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 shadow-sm" },
      content: "TestimonialPro has completely changed how we collect social proof. The workflow is seamless, and the widgets look amazing on our landing page.",
      date: "Sep 28, 2023",
    }
  ];

  return { testimonials };
}

export default async function WallOfLovePage({ params }: { params: Promise<{ space: string }> }) {
  const { space } = await params;
  const { testimonials } = await getWallOfLoveData(space);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#09090C]">
      <WallOfLoveCustomizer spaceId={space} initialTestimonials={testimonials} />
    </div>
  );
}
