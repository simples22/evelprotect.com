import EvelCard from "@/components/publics/ui/EvelCard";

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
    <EvelCard
      type="video"
      title={item.title}
      excerpt={item.excerpt}
      image={item.thumbnail}
      video={item.videoUrl}
      href={`/marketing/${item.slug}`}
      category={item.productName || item.category}
      date={formatDate(item.publishedAt || item.createdAt)}
      badge={item.isFeatured ? "Featured" : ""}
      cta="Watch campaign"
      featured={item.isFeatured}
      size="md"
    />
  );
}