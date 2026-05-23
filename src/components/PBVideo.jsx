const VERSION =
  process.env.NEXT_PUBLIC_IMAGE_VERSION || Date.now();

export default function PBVideo({
  src,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  poster,
  ...props
}) {
  const finalSrc =
    typeof src === "string"
      ? `${src}${src.includes("?") ? "&" : "?"}v=${VERSION}`
      : src;

  const finalPoster =
    poster && typeof poster === "string"
      ? `${poster}${poster.includes("?") ? "&" : "?"}v=${VERSION}`
      : poster;

  return (
    <video
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      poster={finalPoster}
      {...props}
    >
      <source src={finalSrc} type="video/mp4" />
    </video>
  );
}