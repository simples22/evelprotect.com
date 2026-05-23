import Link from "next/link";

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function MarketingVideoCard({ item }) {
  if (!item?.slug) return null;

  return (
    <article className="marketingVideoCard">
      <Link href={`/marketing/${item.slug}`} className="marketingVideoMedia">
        <video
          src={item.videoUrl}
          poster={item.thumbnail || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          className="marketingVideoElement"
        />

        <div className="marketingVideoOverlay" />

        <span className="marketingVideoPlay">||</span>

        {(item.category || item.productName) && (
          <span className="marketingVideoBadge">
            {item.productName || item.category}
          </span>
        )}
      </Link>

      <div className="marketingVideoBody">
        <div className="marketingVideoMeta">
          <span>{formatDate(item.publishedAt || item.createdAt)}</span>
        </div>

        <h3>
          <Link href={`/marketing/${item.slug}`}>{item.title}</Link>
        </h3>

        {item.excerpt && <p>{item.excerpt}</p>}

        <Link href={`/marketing/${item.slug}`} className="marketingVideoBtn">
          Watch campaign →
        </Link>
      </div>
    </article>
  );
}