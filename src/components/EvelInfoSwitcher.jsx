import Link from "next/link";

import EvelCarousel from "@/components/publics/ui/EvelCarousel";
import EvelCarouselSlide from "@/components/publics/ui/EvelCarouselSlide";
import PBImage from "./PBImage";

import { productCategories } from "@/data/productCategories";

const FALLBACK_IMAGE = "/images/sections/our-products.jpg";

function getSafeCategories(items = []) {
  const seen = new Set();

  return items
    .filter((item) => item?.slug && item?.label)
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    });
}

export default function EvelInfoSwitcher() {
  const categories = getSafeCategories(productCategories);

  if (!categories.length) return null;

  return (
    <EvelCarousel
      title="Global Products Categories"
      className="is-info-switcher is-4"
      viewAllHref="/categories"
    >
      {categories.map((item) => (
        <EvelCarouselSlide key={`category-${item.slug}`}>
          <Link
            href={`/categories/${item.slug}`}
            className="evelInfoCarouselCard"
          >
            <div className="evelInfoCarouselMedia">
              <PBImage
                src={item.image || FALLBACK_IMAGE}
                alt={item.label || "Product category"}
                fill
                sizes="(max-width:768px) 86vw, 25vw"
                className="evelInfoCarouselImg"
              />
            </div>

            <div className="evelInfoCarouselBody">
              <span>{item.label}</span>

              <h3>{item.title || item.label}</h3>

              <p>
                {item.excerpt ||
                  item.text ||
                  "Explore this Evel Protect™ product category."}
              </p>
            </div>
          </Link>
        </EvelCarouselSlide>
      ))}
    </EvelCarousel>
  );
}