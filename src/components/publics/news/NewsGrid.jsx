import NewsCard from "./NewsCard";

export default function NewsGrid({ items = [] }) {
  if (!items.length) {
    return (
      <div className="publicNewsEmpty">
        No news articles available yet.
        <a href="#newsletter-signup"> Sign Up to Join newsletter</a>
      </div>
    );
  }

  return (
    <div className="publicNewsGrid">
      {items.map((item) => (
        <NewsCard item={item} key={item.id} />
      ))}
    </div>
  );
}