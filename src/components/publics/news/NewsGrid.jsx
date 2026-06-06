import Link from "next/link";
import EvelCardGrid from "@/components/publics/ui/EvelCardGrid";
import NewsCard from "./NewsCard";

export default function NewsGrid({
  items = [],
  columns = "2",
  loading = false,
  skeletonCount = 6,
}) {
  if (loading) {
    return (
      <EvelCardGrid className="newsContentGrid" columns={columns}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <article className="evelSkeletonCard" key={`news-skeleton-${index}`}>
            <div className="evelSkeletonMedia" />

            <div className="evelSkeletonBody">
              <span className="evelSkeletonLine is-small" />
              <span className="evelSkeletonLine is-title" />
              <span className="evelSkeletonLine" />
              <span className="evelSkeletonLine is-short" />
            </div>
          </article>
        ))}
      </EvelCardGrid>
    );
  }

  if (!items.length) {
    return (
      <div className="evelContentEmpty">
        No news articles available yet.
        <Link href="#newsletter-signup"> Sign Up to Join newsletter</Link>
      </div>
    );
  }

  return (
    <EvelCardGrid className="newsContentGrid" columns={columns}>
      {items.map((item) => (
        <NewsCard item={item} key={item.id} />
      ))}
    </EvelCardGrid>
  );
}