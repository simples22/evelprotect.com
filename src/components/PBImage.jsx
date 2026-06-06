"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION || "1";
const FALLBACK_IMAGE = "/images/placeholders/evel-placeholder.jpg";

function withVersion(src) {
  if (!src || typeof src !== "string") return src;
  if (src.startsWith("data:") || src.startsWith("blob:")) return src;

  return `${src}${src.includes("?") ? "&" : "?"}v=${VERSION}`;
}

export default function PBImage({
  src,
  alt = "",
  className = "",
  fallback = FALLBACK_IMAGE,
  onLoad,
  onError,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [loading, setLoading] = useState(Boolean(src));

  useEffect(() => {
    setImgSrc(src || fallback);
    setLoading(Boolean(src));
  }, [src, fallback]);

  return (
    <>
      {loading && <span className="pbImageLoader" aria-hidden="true" />}

      <Image
        src={withVersion(imgSrc)}
        alt={alt}
        className={className}
        unoptimized
        {...props}
        onLoad={(event) => {
          setLoading(false);
          onLoad?.(event);
        }}
        onError={(event) => {
          if (imgSrc !== fallback) {
            setImgSrc(fallback);
            setLoading(true);
          } else {
            setLoading(false);
          }

          onError?.(event);
        }}
      />
    </>
  );
}