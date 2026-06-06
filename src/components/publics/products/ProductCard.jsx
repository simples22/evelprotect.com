"use client";

import { useState } from "react";

import EvelCard from "@/components/publics/ui/EvelCard";
import EvelOverlay from "@/components/publics/ui/EvelOverlay";
import EvelButton from "@/components/publics/ui/EvelButton";
import EvelSkeletonCard from "@/components/publics/ui/EvelSkeletonCard";

function productSize(product = {}) {
  if (!product.sizeValue) return "—";

  return `${product.sizeValue}${product.sizeUnit || ""}`;
}

export default function ProductCard({
  product = {},
  loading = false,
}) {
  const [openInfo, setOpenInfo] = useState(false);

  if (loading || !product?.slug) {
    return (
      <EvelSkeletonCard
        lines={4}
        showMedia
        showMeta
        showButton={false}
      />
    );
  }

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
      >
        <div className="evelProductSimpleRow">
          <div className="evelProductPriceRow">
            <strong>
              {product.currency || "USD"} {product.price || "0.00"}
            </strong>

            {product.compareAtPrice && (
              <span>
                {product.currency || "USD"} {product.compareAtPrice}
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
              {product.currency || "USD"} {product.price || "0.00"}
            </strong>

            {product.compareAtPrice && (
              <span>
                {product.currency || "USD"} {product.compareAtPrice}
              </span>
            )}
          </div>

          <div className="evelProductOverlayInfo">
            <p>
              <strong>Category:</strong> {product.category || "—"}
            </p>

            <p>
              <strong>Size:</strong> {productSize(product)}
            </p>

            <p>
              <strong>Pack:</strong> {product.packSize || 1}
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
                {product.currency || "USD"} {product.pricePerBottle}
              </p>
            )}

            {(product.shortDescription || product.description) && (
              <p>
                <strong>Description:</strong>{" "}
                {product.shortDescription || product.description}
              </p>
            )}
          </div>

          <EvelButton
            href={`/shop/${product.slug}`}
            variant="primary"
            full
            onClick={trackClick}
          >
            View Product
          </EvelButton>
        </div>
      </EvelOverlay>
    </>
  );
}