"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, priority = false }) {
  async function trackClick() {
    try {
      await fetch(`/api/public/products/${product.slug}/click`, {
        method: "PATCH",
      });
    } catch {}
  }

  return (
    <article className="evelProductCard">
      <Link
        href={`/shop/${product.slug}`}
        className="evelProductCardMedia"
        onClick={trackClick}
      >
        <Image
          src={product.image1}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 28vw"
          className="evelProductCardImg"
        />

        {product.isBestSeller && (
          <span className="evelProductBadge">Best Seller</span>
        )}
      </Link>

      <div className="evelProductCardBody">
        <div className="evelProductCardTop">
          <h3>{product.title}</h3>

          <div className="evelProductInfoWrap">
            <button
              type="button"
              className="evelProductInfoBtn"
              aria-label="Product information"
            >
              i
            </button>

            <div className="evelProductInfoOverlay">
              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Size:</strong>{" "}
                {product.sizeValue
                  ? `${product.sizeValue}${product.sizeUnit}`
                  : "—"}
              </p>

              <p>
                <strong>Pack:</strong> {product.packSize || 1} bottles
              </p>

              {product.pricePerBottle && (
                <p>
                  <strong>Per bottle:</strong> {product.currency}{" "}
                  {product.pricePerBottle}
                </p>
              )}
            </div>
          </div>
        </div>

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

        <div className="evelProductStars">
          {"★".repeat(Math.round(product.rating || 0))}
          {"☆".repeat(5 - Math.round(product.rating || 0))}
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="evelProductBuyBtn"
          onClick={trackClick}
        >
          Buy Now
        </Link>
      </div>
    </article>
  );
}