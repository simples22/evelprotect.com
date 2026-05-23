"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import UILine from "@/components/admin/ui/UILine";

export default function ProductCarousel({
  title = "Top Products",
  subtitle = "Explore selected Evel™ products designed for modern beauty, body care, and everyday personal wellness.",
  products = [],
}) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const duplicated = products.length > 1 ? [...products, ...products] : products;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || products.length <= 1) return;

    let animation;
    let paused = false;

    function autoScroll() {
      if (!paused) {
        track.scrollLeft += 0.55;

        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }

        const card = track.querySelector(".evelProductCard");

        if (card) {
          const gap = parseFloat(getComputedStyle(track).gap || "0");
          const index = Math.round(track.scrollLeft / (card.offsetWidth + gap));
          setActive(index % products.length);
        }
      }

      animation = requestAnimationFrame(autoScroll);
    }

    const pause = () => {
      paused = true;
    };

    const resume = () => {
      paused = false;
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleevel", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });

    animation = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animation);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleevel", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, [products]);

  function scrollToIndex(index) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".evelProductCard");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).gap || "0");
    const width = card.offsetWidth + gap;

    track.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setActive(index);
  }

  if (!products.length) return null;

  return (
    <section className="evelProductCarousel">
      <div className="evelContainer">
        <div className="evelProductCarouselHead">
          <span>{title}</span>
          <p>{subtitle}</p>
        </div>
            <UILine />

        <div className="evelProductCarouselViewport">
          <div className="evelProductCarouselTrack" ref={trackRef}>
            {duplicated.map((product, index) => (
              <ProductCard product={product} key={`${product.id}-${index}`} />
            ))}
          </div>
        </div>

        <div className="evelCarouselBottom">
          <div className="evelCarouselDots">
            {products.map((_, index) => (
              <button
                type="button"
                key={index}
                className={active === index ? "isActive" : ""}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}