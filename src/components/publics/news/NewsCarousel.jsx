"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import NewsCard from "./NewsCard";

export default function NewsCarousel({
  title = "Latest News",
  subtitle = "Explore the latest company updates, product news, and Evel Protect™ announcements.",
  news = [],
}) {
  const trackRef = useRef(null);
  const [activeDirection, setActiveDirection] = useState("next");

  const latestNews = useMemo(() => {
    return [...news]
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt);
        const dateB = new Date(b.publishedAt || b.createdAt);
        return dateB - dateA;
      })
      .slice(0, 10);
  }, [news]);

  function scrollCarousel(direction) {
    const track = trackRef.current;
    if (!track) return;

    setActiveDirection(direction);

    track.scrollBy({
      left: direction === "next" ? track.clientWidth * 0.85 : -track.clientWidth * 0.85,
      behavior: "smooth",
    });
  }

  if (!latestNews.length) return null;

  return (
    <section className="evelNewsCarousel">
      <div className="evelContainer">
        <div className="evelNewsCarouselHead">
          <div className="evelNewsCarouselTitle">
            <span>News</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <Link href="/news" className="evelNewsViewAll">
            View all →
          </Link>
        </div>

        <div className="evelNewsCarouselTrack" ref={trackRef}>
          {latestNews.map((item) => (
            <div className="evelNewsCarouselSlide" key={item.id}>
              <NewsCard item={item} />
            </div>
          ))}
        </div>

        <div className="evelNewsCarouselControls">
          <button
            type="button"
            className={activeDirection === "prev" ? "isActive" : ""}
            onClick={() => scrollCarousel("prev")}
          >
            Previous
          </button>

          <button
            type="button"
            className={activeDirection === "next" ? "isActive" : ""}
            onClick={() => scrollCarousel("next")}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}