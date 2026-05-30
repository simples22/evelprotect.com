"use client";

import { useState } from "react";
import Link from "next/link";

import EvelCard from "@/components/publics/ui/EvelCard";
import EvelOverlay from "@/components/publics/ui/EvelOverlay";

function productSize(product) {
  if (!product.sizeValue) return "—";

  return `${product.sizeValue}${product.sizeUnit || ""}`;
}

export default function ProductCard({ product }) {
  const [openInfo, setOpenInfo] = useState(false);

  async function trackClick() {
    try {
      await fetch(`/api/public/products/${product.slug}/click`, {
        method: "PATCH",
      });
    } catch {}
  }

  function openOverlay(e) {
    e.preventDefault();
    e.stopPropagation();

    setOpenInfo(true);
  }

  return (
    <>
      <EvelCard
        type="product"
        title={product.title}
        image={product.image1}
        href={`/shop/${product.slug}`}
        badge={product.isBestSeller ? "Best Seller" : ""}
        featured={product.isFeatured}
        size="md"
        showCta={false}
        onAction={trackClick}
        onMediaClick={trackClick}
      >
        <div className="evelProductSimpleRow">
          <div className="evelProductPriceRow">
            <strong>
              {product.currency} {product.price}
            </strong>

            {product.compareAtPrice && (
              <span>
                {product.currency} {product.compareAtPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            className="evelProductInfoBtn"
            onClick={openOverlay}
            aria-label="View product details"
          >
            i
          </button>
        </div>
      </EvelCard>

      <EvelOverlay
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        eyebrow={product.category}
        title={product.title}
        size="sm"
      >
        <div className="evelProductOverlayContent">
          <div className="evelProductOverlayPrice">
            <strong>
              {product.currency} {product.price}
            </strong>

            {product.compareAtPrice && (
              <span>
                {product.currency} {product.compareAtPrice}
              </span>
            )}
          </div>

          <div className="evelProductOverlayInfo">
            <p>
              <strong>Category:</strong>{" "}
              {product.category || "—"}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {productSize(product)}
            </p>

            <p>
              <strong>Pack:</strong>{" "}
              {product.packSize || 1}
            </p>

            {product.rating && (
              <p>
                <strong>Rating:</strong>{" "}
                {Number(product.rating).toFixed(1)} / 5
              </p>
            )}

            {product.pricePerBottle && (
              <p>
                <strong>Per bottle:</strong>{" "}
                {product.currency} {product.pricePerBottle}
              </p>
            )}

            {(product.shortDescription || product.description) && (
              <p>
                <strong>Description:</strong>{" "}
                {product.shortDescription || product.description}
              </p>
            )}
          </div>

          <Link
            href={`/shop/${product.slug}`}
            className="evelProductOverlayLink"
            onClick={trackClick}
          >
            View product →
          </Link>
        </div>
      </EvelOverlay>
    </>
  );
}