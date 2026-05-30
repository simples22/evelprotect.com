"use client";

import { useState } from "react";
import PBImage from "./PBImage";

const items = [
  {
    label: "Cosmetics",
    title: "Modern cosmetics designed for everyday beauty expression.",
    text: "Evel™ Cosmetics Group is preparing a cosmetics direction focused on modern beauty routines, everyday confidence, and premium consumer presentation.",
    image: "/images/sections/evel-cosmetics-products.jpg",
  },
  {
    label: "Beauty",
    title: "Building a thoughtful and trusted beauty ecosystem.",
    text: "Evel™ is developing a long-term beauty vision centered around product identity, consumer trust, modern branding, and elevated everyday care experiences.",
    image: "/images/sections/beauty-products.jpg",
  },
  {
    label: "Personal Care",
    title: "Preparing future personal care and lifestyle product categories.",
    text: "Evel™ Cosmetics Group plans to explore multiple personal care segments including deodorants, skincare, body care, fragrance, and hygiene essentials.",
    image: "/images/sections/our-products.jpg",
  },
];

export default function EvelInfoSwitcher() {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="evelInfoSwitcher" id="evel-cosmetics">
      <div className="evelContainer">
        <div className="evelInfoSwitcherIntro">

          <h2>We build global brands by creative care attention.</h2>

          <p>Designed for everyday consumer lifestyles.</p>
        </div>

        <div className="EvelSwitchBtn">
          <div className="evelInfoSwitcherButtons">
            {items.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={active === index ? "isActive" : ""}
                onClick={() => setActive(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <article className="evelInfoPanel">
        <div className="evelInfoPanelMedia">
          <PBImage
            src={current.image}
            alt={current.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="evelInfoPanelImg"
          />
        </div>

        <div className="evelInfoPanelOverlay" />

        <div className="evelContainer evelInfoPanelInner">
          <div className="evelInfoPanelContent">
            <span>{current.label}</span>

            <h2>{current.title}</h2>


            <p>{current.text}</p>
          </div>
        </div>
      </article>
    </section>
  );
}