import Link from "next/link";
import EvelCardGrid from "@/components/publics/ui/EvelCardGrid";
import NewsCard from "./NewsCard";

export default function NewsGrid({ items = [], columns = "2" }) {
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