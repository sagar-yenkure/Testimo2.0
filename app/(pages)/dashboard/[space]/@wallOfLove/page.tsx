"use client";

import React from "react";
import { WallOfLoveCustomizer } from "@/components/dashboard/WallOfLoveCustomizer";
import { useParams } from "next/navigation";

export default function WallOfLoveSlot() {
  const params = useParams();
  const space = params.space || "default";

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#09090C]">
      <WallOfLoveCustomizer spaceId={typeof space === 'string' ? space : 'default'} initialTestimonials={[]} />
    </div>
  );
}
