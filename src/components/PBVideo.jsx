"use client";

import { useEffect, useState } from "react";

const VERSION =
  process.env.NEXT_PUBLIC_ASSET_VERSION || "1";

const FALLBACK_POSTER =
  "/images/placeholders/evel-video-placeholder.jpg";

function withVersion(url) {
  if (!url || typeof url !== "string") {
    return url;
  }

  if (
    url.startsWith("blob:") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  return `${url}${url.includes("?") ? "&" : "?"}v=${VERSION}`;
}

export default function PBVideo({
  src,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  poster,
  preload = "metadata",
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setVideoSrc(src);
    setLoaded(false);
    setHasError(false);
  }, [src]);

  const finalSrc = withVersion(videoSrc);

  const finalPoster = withVersion(
    poster || FALLBACK_POSTER
  );

  return (
    <div
      className={[
        "pbVideoWrap",
        loaded ? "isLoaded" : "",
        hasError ? "hasError" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!loaded && (
        <span
          className="pbVideoLoader"
          aria-hidden="true"
        />
      )}

      <video
        className={className}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        preload={preload}
        poster={finalPoster}
        {...props}
        onLoadedData={() => {
          setLoaded(true);
        }}
        onCanPlay={() => {
          setLoaded(true);
        }}
        onWaiting={() => {
          setLoaded(false);
        }}
        onPlaying={() => {
          setLoaded(true);
        }}
        onError={() => {
          setHasError(true);
          setLoaded(false);
        }}
      >
        <source
          src={finalSrc}
          type="video/mp4"
        />
      </video>

      {hasError && (
        <div className="pbVideoFallback">
          <span>
            Video unavailable
          </span>
        </div>
      )}
    </div>
  );
}