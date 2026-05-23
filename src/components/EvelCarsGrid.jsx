"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "About Our Products",
    text:
      "Discover EVEL™ Cosmetics Group and explore our modern approach to beauty, skincare, deodorants, body care, and everyday consumer wellness products developed with a long-term brand vision.",
    href: "#about-us",
    className: "isBlue",
    image: "/images/products/about-products.jpg",
  },
  {
    title: "Perfect For Everyday Use",
    text:
      "EVEL™ products are designed to support modern lifestyles through freshness, comfort, skincare direction, body care routines, and accessible premium experiences created for everyday confidence.",
    href: "#our-vision",
    className: "isDark",
    image: "/images/products/everyday-use.jpg",
  },
  {
    title: "How To Use Our Products",
    text:
      "Learn more about our future cosmetics and personal care categories, including skincare, deodorants, fragrance, body care, and beauty essentials intended for simple and effective daily routines.",
    href: "#products",
    className: "isLight",
    image: "/images/products/how-to-use.jpg",
  },
  {
    title: "Where To Find Our Products",
    text:
      "Explore future availability, product launches, and upcoming EVEL™ Cosmetics Group beauty and personal care collections across our developing consumer product ecosystem.",
    href: "/shop",
    className: "isMuted",
    image: "/images/products/body-care.jpg",
  },
];

export default function EvelCardsAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section className="evelCardsSection">
      <div className="evelContainer">
        <div className="evelCardsGrid">
          {items.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`evelInfoCard ${item.className} ${
                active === index ? "isActive" : ""
              }`}
              onClick={(e) => {
                if (window.innerWidth <= 768 && active !== index) {
                  e.preventDefault();
                  setActive(index);
                }
              }}
            >
              <div className="evelInfoCardMedia">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="evelInfoCardImg"
                />
              </div>

              <div className="evelInfoCardContent">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}