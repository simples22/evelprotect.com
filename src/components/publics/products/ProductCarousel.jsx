"use client";

import { useMemo } from "react";

import ProductCard from "./ProductCard";
import EvelCarousel from "@/components/publics/ui/EvelCarousel";
import EvelCarouselSlide from "@/components/publics/ui/EvelCarouselSlide";
import EvelSkeletonCard from "@/components/publics/ui/EvelSkeletonCard";

export default function ProductCarousel({
  title = "Top Products",
  subtitle = "Explore selected Evel™ products designed for modern beauty, body care, and everyday personal wellness.",
  products = [],
  loading = false,
}) {
  const selectedProducts = useMemo(() => products.slice(0, 12), [products]);

  if (!loading && !selectedProducts.length) return null;

  return (
    <EvelCarousel
      eyebrow={title}
      subtitle={subtitle}
      viewAllHref="/shop"
      className="is-product"
    >
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <EvelCarouselSlide key={`product-skeleton-${index}`}>
              <EvelSkeletonCard />
            </EvelCarouselSlide>
          ))
        : selectedProducts.map((product) => (
            <EvelCarouselSlide key={product.id}>
              <ProductCard product={product} />
            </EvelCarouselSlide>
          ))}
    </EvelCarousel>
  );
}