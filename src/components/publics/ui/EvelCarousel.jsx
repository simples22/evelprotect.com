"use client";

import { Children, useEffect, useRef, useState } from "react";
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
  const slidesCount = Children.count(children);

  function scrollToIndex(index) {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children);
    const slide = slides[index];

    if (!slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
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
    if (!track) return;

    function handleScroll() {
      const slides = Array.from(track.children);

      const current = slides.reduce(
        (closest, slide, index) => {
          const distance = Math.abs(track.scrollLeft - slide.offsetLeft);

          return distance < closest.distance
            ? { index, distance }
            : closest;
        },
        { index: 0, distance: Infinity }
      );

      setActiveIndex(current.index);
    }

    track.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`evelCarousel ${className}`}>
      <div className="evelContainer">
        <div className="evelCarouselHead">
          <div className="evelCarouselTitle">
            {eyebrow && (
              <span className="evelCarouselEyebrow">
                {eyebrow}
              </span>
            )}

            {title && <h2>{title}</h2>}

            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>

        <div className="evelCarouselViewport">
          <div className="evelCarouselTrack" ref={trackRef}>
            {children}
          </div>
        </div>

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
              {Array.from({ length: slidesCount }).map((_, index) => (
                <button
                  key={index}
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
            <EvelButton
              href={viewAllHref}
              variant="viewall"
              align="center"
            >
              {viewAllLabel}
            </EvelButton>
          )}
        </div>
      </div>
    </section>
  );
}