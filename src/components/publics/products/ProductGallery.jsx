"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ product }) {
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  const [active, setActive] = useState(images[0]);

  return (
    <div className="evelProductGallery">
      <div className="evelProductGalleryMain">
        <Image
          src={active}
          alt={product.title}
          fill
          priority
          loading="eager"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="evelProductGalleryImg"
        />
      </div>

      <div className="evelProductGalleryThumbs">
        {images.map((image) => (
          <button
            type="button"
            key={image}
            className={active === image ? "isActive" : ""}
            onClick={() => setActive(image)}
          >
            <Image
              src={image}
              alt={product.title}
              fill
              sizes="96px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}