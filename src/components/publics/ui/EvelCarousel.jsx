"use client";

import { useRef } from "react";
import EvelButton from "@/components/publics/ui/EvelButton";

export default function EvelCarousel({
  eyebrow = "",
  title = "",
  subtitle = "",
  viewAllHref = "",
  viewAllLabel = "View all",
  children,
  className = "",
}) {
  const trackRef = useRef(null);

  function scrollCarousel(direction) {
    const track = trackRef.current;

    if (!track) return;

    track.scrollBy({
      left:
        direction === "next"
          ? track.clientWidth * 0.85
          : -track.clientWidth * 0.85,

      behavior: "smooth",
    });
  }

  return (
    <section className={`evelCarousel ${className}`}>
      <div className="evelContainer">
        <div className="evelCarouselHead">
          <div className="evelCarouselTitle">
            {(eyebrow || viewAllHref) && (
              <div className="evelCarouselTopRow">
                {eyebrow && (
                  <span className="evelCarouselEyebrow">
                    {eyebrow}
                  </span>
                )}

                {viewAllHref && (
                  <EvelButton
                    href={viewAllHref}
                    variant="viewall"
                    align="right"
                  >
                    {viewAllLabel}
                  </EvelButton>
                )}
              </div>
            )}

            {title && <h2>{title}</h2>}

            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>

        <div className="evelCarouselViewport">
          <div
            className="evelCarouselTrack"
            ref={trackRef}
          >
            {children}
          </div>
        </div>

        <div className="evelCarouselControls">
          <EvelButton
            variant="nav"
            direction="left"
            onClick={() => scrollCarousel("prev")}
          >
            Previous
          </EvelButton>

          <EvelButton
            variant="nav"
            direction="right"
            onClick={() => scrollCarousel("next")}
          >
            Next
          </EvelButton>
        </div>
      </div>
    </section>
  );
}