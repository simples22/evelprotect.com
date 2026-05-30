import EvelCard from "@/components/publics/ui/EvelCard";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US");
}

export default function NewsCard({ item }) {
  return (
    <EvelCard
      type="news"
      title={item.title}
      excerpt={item.excerpt}
      image={item.imageUrl}
      href={`/news/${item.slug}`}
      category={item.category || "Company"}
      date={formatDate(item.publishedAt || item.createdAt)}
      cta="Read news"
      size="md"
    />
  );
}