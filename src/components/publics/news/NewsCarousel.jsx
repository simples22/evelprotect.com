"use client";

import { useMemo } from "react";

import NewsCard from "./NewsCard";
import EvelCarousel from "@/components/publics/ui/EvelCarousel";
import EvelCarouselSlide from "@/components/publics/ui/EvelCarouselSlide";
import EvelSkeletonCard from "@/components/publics/ui/EvelSkeletonCard";

export default function NewsCarousel({
  title = "Latest News",
  news = [],
  loading = false,
}) {
  const latestNews = useMemo(() => {
    return [...news]
      .sort((a, b) => {
        const dateA = new Date(
          a?.publishedAt || a?.createdAt || 0
        );

        const dateB = new Date(
          b?.publishedAt || b?.createdAt || 0
        );

        return dateB - dateA;
      })
      .slice(0, 10);
  }, [news]);

  if (!loading && !latestNews.length) {
    return null;
  }

  return (
    <EvelCarousel
      title={title}
      viewAllHref="/news"
      className="is-news"
    >
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <EvelCarouselSlide
              key={`news-skeleton-${index}`}
            >
              <EvelSkeletonCard
                lines={4}
                showMedia
                showMeta
                showButton
              />
            </EvelCarouselSlide>
          ))
        : latestNews.map((item) => (
            <EvelCarouselSlide key={item.id}>
              <NewsCard item={item} />
            </EvelCarouselSlide>
          ))}
    </EvelCarousel>
  );
}