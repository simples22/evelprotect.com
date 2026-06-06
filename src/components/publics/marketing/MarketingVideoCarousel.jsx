"use client";

import { useMemo } from "react";

import MarketingVideoCard from "./MarketingVideoCard";
import EvelCarousel from "@/components/publics/ui/EvelCarousel";
import EvelCarouselSlide from "@/components/publics/ui/EvelCarouselSlide";
import EvelSkeletonCard from "@/components/publics/ui/EvelSkeletonCard";

export default function MarketingVideoCarousel({
  title = "Product Videos",
  videos = [],
  loading = false,
}) {
  const items = useMemo(() => {
    return videos.filter(Boolean).slice(0, 8);
  }, [videos]);

  if (!loading && !items.length) {
    return null;
  }

  return (
    <EvelCarousel
      title={title}
      viewAllHref="/marketing"
      className="is-video"
    >
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <EvelCarouselSlide
              key={`video-skeleton-${index}`}
            >
              <EvelSkeletonCard
                lines={4}
                showMedia
                showMeta
                showButton
              />
            </EvelCarouselSlide>
          ))
        : items.map((item) => (
            <EvelCarouselSlide
              key={item.id || item.slug}
            >
              <MarketingVideoCard item={item} />
            </EvelCarouselSlide>
          ))}
    </EvelCarousel>
  );
}