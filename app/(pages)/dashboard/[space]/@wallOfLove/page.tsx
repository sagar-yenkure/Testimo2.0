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
    // await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        testimonials: [] as Testimonial[], // Fetch the specific testimonials for this WOL
        config: {} // Fetch existing configuration if any
    };
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
