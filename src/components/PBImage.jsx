import Image from "next/image";

const VERSION =
  process.env.NEXT_PUBLIC_ASSET_VERSION || "1";
export default function PBImage({
  src,
  alt = "",
  className = "",
  ...props
}) {
  const finalSrc =
    typeof src === "string"
      ? `${src}${src.includes("?") ? "&" : "?"}v=${VERSION}`
      : src;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      className={className}
      unoptimized
      {...props}
    />
  );
}