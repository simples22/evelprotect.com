"use client";

import { useMemo } from "react";

import MarketingVideoCard from "./MarketingVideoCard";
import EvelCarousel from "@/components/publics/ui/EvelCarousel";
import EvelCarouselSlide from "@/components/publics/ui/EvelCarouselSlide";

export default function MarketingVideoCarousel({
  title = "Product Videos",
  videos = [],
}) {
  const items = useMemo(() => {
    return videos.filter(Boolean).slice(0, 8);
  }, [videos]);

  if (!items.length) return null;

  return (
    <EvelCarousel
      title={title}
      viewAllHref="/marketing"
      className="is-video"
    >
      {items.map((item) => (
        <EvelCarouselSlide key={item.id || item.slug}>
          <MarketingVideoCard item={item} />
        </EvelCarouselSlide>
      ))}
    </EvelCarousel>
  );
}