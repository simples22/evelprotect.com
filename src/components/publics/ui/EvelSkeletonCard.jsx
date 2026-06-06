export default function EvelSkeletonCard({
  lines = 4,
  showMedia = true,
  showMeta = true,
  showButton = true,
  className = "",
}) {
  return (
    <article
      className={[
        "evelSkeletonCard",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      {showMedia && (
        <div className="evelSkeletonMedia" />
      )}

      <div className="evelSkeletonBody">

        {showMeta && (
          <span className="evelSkeletonLine is-meta" />
        )}

        <span className="evelSkeletonLine is-title" />

        {Array.from({
          length: Math.max(0, lines - 2),
        }).map((_, index) => (
          <span
            key={index}
            className={[
              "evelSkeletonLine",
              index === lines - 3
                ? "is-short"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}

        {showButton && (
          <span className="evelSkeletonButton" />
        )}

      </div>
    </article>
  );
}