"use client";

import { Children, useEffect, useMemo, useRef, useState } from "react";
import EvelButton from "@/components/publics/ui/EvelButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(
    () => Children.toArray(children).filter(Boolean),
    [children]
  );

  const slidesCount = slides.length;
  const hasSlides = slidesCount > 0;

  useEffect(() => {
    if (!hasSlides) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex > slidesCount - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, hasSlides, slidesCount]);

  function scrollToIndex(index) {
    const track = trackRef.current;

    if (!track || !hasSlides) return;

    const safeIndex = Math.max(0, Math.min(index, slidesCount - 1));
    const slide = track.children[safeIndex];

    if (!slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(safeIndex);
  }

  function scrollCarousel(direction) {
    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, slidesCount - 1)
        : Math.max(activeIndex - 1, 0);

    scrollToIndex(nextIndex);
  }

  useEffect(() => {
    const track = trackRef.current;

    if (!track || !hasSlides) return;

    let frame = null;

    function handleScroll() {
      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const slideItems = Array.from(track.children);

        if (!slideItems.length) return;

        const current = slideItems.reduce(
          (closest, slide, index) => {
            const distance = Math.abs(track.scrollLeft - slide.offsetLeft);

            return distance < closest.distance
              ? { index, distance }
              : closest;
          },
          { index: 0, distance: Infinity }
        );

        setActiveIndex(current.index);
      });
    }

    track.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", handleScroll);
    };
  }, [hasSlides, slidesCount]);

  return (
    <section
      className={[
        "evelCarousel",
        className,
        !hasSlides ? "is-empty" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="evelContainer">
        {(eyebrow || title || subtitle) && (
          <div className="evelCarouselHead">
            <div className="evelCarouselTitle">
              {eyebrow && (
                <span className="evelCarouselEyebrow">{eyebrow}</span>
              )}

              {title && <h2>{title}</h2>}

              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        )}

        <div className="evelCarouselViewport">
          <div className="evelCarouselTrack" ref={trackRef}>
            {hasSlides ? (
              slides
            ) : (
              <div className="evelCarouselEmpty">
                <p>No content available.</p>
              </div>
            )}
          </div>
        </div>

        {hasSlides && (
          <div className="evelCarouselControlsWrapper">
            <div className="evelCarouselControls">
              <button
                type="button"
                className="evelCarouselArrow isPrev"
                onClick={() => scrollCarousel("prev")}
                aria-label="Previous"
                disabled={activeIndex === 0}
              >
                <FontAwesomeIcon icon={faArrowRightLong} />
              </button>

              <div
                className="evelCarouselPagination"
                aria-label="Carousel pagination"
              >
                {slides.map((_, index) => (
                  <button
                    key={`carousel-dot-${index}`}
                    type="button"
                    className={`evelCarouselDot ${
                      activeIndex === index ? "isActive" : ""
                    }`}
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="evelCarouselArrow isNext"
                onClick={() => scrollCarousel("next")}
                aria-label="Next"
                disabled={activeIndex === slidesCount - 1}
              >
                <FontAwesomeIcon icon={faArrowRightLong} />
              </button>
            </div>

            {viewAllHref && (
              <EvelButton href={viewAllHref} variant="viewall" align="center">
                {viewAllLabel}
              </EvelButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
}