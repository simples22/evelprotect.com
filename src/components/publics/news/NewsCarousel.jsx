"use client";

import { useMemo } from "react";
import NewsCard from "./NewsCard";
import EvelCarousel from "@/components/publics/ui/EvelCarousel";
import EvelCarouselSlide from "@/components/publics/ui/EvelCarouselSlide";

export default function NewsCarousel({
  title = "Latest News",
  subtitle = "Explore the latest company updates, product news, and Evel Protect™ announcements.",
  news = [],
}) {
  const latestNews = useMemo(() => {
    return [...news]
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt);
        const dateB = new Date(b.publishedAt || b.createdAt);
        return dateB - dateA;
      })
      .slice(0, 10);
  }, [news]);

  if (!latestNews.length) return null;

  return (
    <EvelCarousel
      eyebrow="News"
      title={title}
      subtitle={subtitle}
      viewAllHref="/news"
      className="is-news"
    >
      {latestNews.map((item) => (
        <EvelCarouselSlide key={item.id}>
          <NewsCard item={item} />
        </EvelCarouselSlide>
      ))}
    </EvelCarousel>
  );
}