"use client";

import { useState } from "react";
import PBImage from "@/components/PBImage";

export default function ProductGallery({ product }) {
  const images = [
    product?.image1,
    product?.image2,
    product?.image3,
    product?.image4,
  ].filter(Boolean);

  const [active, setActive] = useState(images[0] || null);

  if (!images.length) {
    return (
      <div className="evelProductGallery">
        <div className="evelProductGalleryMain">
          <div className="evelSkeletonMedia" />
        </div>
      </div>
    );
  }

  return (
    <div className="evelProductGallery">
      <div className="evelProductGalleryMain">
        <PBImage
          src={active}
          alt={product?.title || "Product image"}
          fill
          priority
          loading="eager"
          sizes="(max-width:768px) 100vw, 50vw"
          className="evelProductGalleryImg"
        />
      </div>

      {images.length > 1 && (
        <div className="evelProductGalleryThumbs">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              className={
                active === image
                  ? "isActive"
                  : ""
              }
              onClick={() => setActive(image)}
              aria-label={`Product image ${index + 1}`}
            >
              <PBImage
                src={image}
                alt={`${product?.title || "Product"} ${index + 1}`}
                fill
                sizes="96px"
                className="evelProductGalleryThumbImg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}