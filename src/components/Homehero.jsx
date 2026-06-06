"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import PBImage from "./PBImage";
import PBVideo from "./PBVideo";

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomeHero({
  image = "/images/hero/evel-hero.jpg",
  video = "/videos/hero/hero-videos.mp4",
  poster,
  title = "Evel Protect™",
  showPlayButton = true,
  news = [],
}) {
  const hasVideo = Boolean(video);
  const [activeIndex, setActiveIndex] = useState(0);

  const latestNews = useMemo(() => {
    return [...news]
      .filter(Boolean)
      .sort((a, b) => {
        const dateA = new Date(a?.publishedAt || a?.createdAt || 0);
        const dateB = new Date(b?.publishedAt || b?.createdAt || 0);

        return dateB - dateA;
      })
      .slice(0, 3);
  }, [news]);

  useEffect(() => {
    if (latestNews.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) =>
        prev >= latestNews.length - 1 ? 0 : prev + 1
      );
    }, 5500);

    return () => clearInterval(timer);
  }, [latestNews.length]);

  const activeNews = latestNews[activeIndex];

  return (
    <section className="evelHero">
      <div className="evelHeroMedia">
        {hasVideo ? (
          <>
            <PBVideo
              src={video}
              className="evelHeroBg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={poster || image}
            />

            {showPlayButton && (
              <span className="marketingVideoPlay">||</span>
            )}
          </>
        ) : (
          <PBImage
            src={image}
            alt={title}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="evelHeroBg"
          />
        )}
      </div>

      <div className="evelHeroOverlay" />

      {activeNews && (
        <div className="evelHeroNewsOverlay">
          <div className="evelHeroNewsCard">
            <span className="evelHeroNewsDate">
              {formatDate(activeNews.publishedAt || activeNews.createdAt)}
            </span>

            <h1>{activeNews.title}</h1>

            <p>
              {activeNews.excerpt ||
                activeNews.subtitle ||
                "Read the latest company update from Evel Protect™."}
            </p>

            <div className="evelHeroNewsActions">
              <Link
                href={`/news/${activeNews.slug}`}
                className="evelHeroNewsBtn"
              >
                View More →
              </Link>
            </div>

            {latestNews.length > 1 && (
              <div className="evelHeroNewsDots">
                {latestNews.map((item, index) => (
                  <button
                    key={item.id || item.slug || index}
                    type="button"
                    className={activeIndex === index ? "isActive" : ""}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show news ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="evelHeroInner" />
    </section>
  );
}