"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import MarketingVideoCard from "./MarketingVideoCard";

export default function MarketingVideoCarousel({
  title = "Product Videos",
  subtitle = "Watch promotional videos from Evel Protect™ product categories.",
  videos = [],
}) {
  const trackRef = useRef(null);
  const [active, setActive] = useState("next");

  const items = videos.filter(Boolean).slice(0, 4);

  function scroll(direction) {
    const track = trackRef.current;
    if (!track) return;

    setActive(direction);

    const amount = track.clientWidth * 0.9;

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }

  if (!items.length) return null;

  return (
    <section className="marketingVideoCarousel">
      <div className="evelContainer">
        <div className="marketingVideoCarouselHead">
          <div className="marketingVideoCarouselIntro">
            <span>Marketing</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <Link href="/marketing" className="marketingVideoViewAll">
            View all →
          </Link>
        </div>

        <div className="marketingVideoViewport">
          <div className="marketingVideoTrack" ref={trackRef}>
            {items.map((item) => (
              <div className="marketingVideoSlide" key={item.id || item.slug}>
                <MarketingVideoCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="marketingVideoControls">
          <button
            type="button"
            className={active === "prev" ? "isActive" : ""}
            onClick={() => scroll("prev")}
          >
            Previous
          </button>

          <button
            type="button"
            className={active === "next" ? "isActive" : ""}
            onClick={() => scroll("next")}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}