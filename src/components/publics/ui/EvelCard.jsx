import Link from "next/link";
import PBImage from "@/components/PBImage";
import UILine from "@/components/admin/ui/UILine";

function limitText(text = "", max = 130) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

export default function EvelCard({
  type = "default",
  title = "",
  excerpt = "",
  image = "",
  video = "",
  href = "#",
  category = "",
  eyebrow = "",
  badge = "",
  date = "",
  cta = "Read more",
  stats = [],
  featured = false,
  orientation = "vertical",
  size = "md",
  priority = false,
  showCta = true,
  playLabel = "||",
  onAction,
  children,
}) {
  const isVideo = type === "video" || Boolean(video);
  const metaLabel = eyebrow || category;

  return (
    <article
      className={[
        "evelCard",
        `is-${type}`,
        `is-${orientation}`,
        `is-${size}`,
        featured ? "is-featured" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Link href={href || "#"} className="evelCardLink" onClick={onAction}>
        <div className="evelCardMedia">
          {isVideo && video ? (
            <>
              <video
                src={video}
                poster={image || undefined}
                muted
                loop
                playsInline
                preload="metadata"
                className="evelCardVideo"
              />

              <span className="evelCardPlay">{playLabel}</span>
            </>
          ) : image ? (
            <PBImage
              src={image}
              alt={title || "EVEL card image"}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              sizes="(max-width:768px) 100vw, 33vw"
              className="evelCardImg"
            />
          ) : (
            <div className="evelCardPlaceholder" />
          )}

          {badge && <span className="evelCardBadge">{badge}</span>}
        </div>

        <div className="evelCardBody">
          {(metaLabel || date) && (
            <div className="evelCardMeta">
              {metaLabel && <span>{metaLabel}</span>}
              {date && <time>{date}</time>}
            </div>
          )}

          {title && <h3 className="evelCardTitle">{title}</h3>}

          <UILine />

          {excerpt && <p className="evelCardText">{limitText(excerpt)}</p>}

          {stats?.length > 0 && (
            <div className="evelCardStats">
              {stats.map((stat, index) => (
                <span key={`${stat.label}-${stat.value}-${index}`}>
                  <strong>{stat.value}</strong>
                  {stat.label}
                </span>
              ))}
            </div>
          )}

          {children}

          {showCta && <span className="evelCardBtn">{cta} →</span>}
        </div>
      </Link>
    </article>
  );
}