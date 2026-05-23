import Link from "next/link";
import PBImage from "@/components/PBImage";
import UILine from "@/components/admin/ui/UILine";

function limitWords(text = "", max = 15) {
  const words = String(text).split(" ").filter(Boolean);
  return words.length > max ? `${words.slice(0, max).join(" ")}...` : text;
}

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US");
}

export default function NewsCard({ item }) {
  return (
    <article className="publicNewsCard">
      <Link href={`/news/${item.slug}`} className="publicNewsCardMedia">
        {item.imageUrl && (
          <PBImage
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="publicNewsCardImg"
          />
        )}
      </Link>

      <div className="publicNewsCardBody">

        <h3>
          <Link href={`/news/${item.slug}`}>{item.title}</Link>
        </h3>

        <span className="publicNewsDate">
          {formatDate(item.publishedAt || item.createdAt)}
        </span>

              <UILine />
              
        {item.excerpt && <p>{limitWords(item.excerpt, 15)}</p>}

        <Link href={`/news/${item.slug}`} className="publicNewsCardBtn">
          Read news
        </Link>
      </div>
    </article>
  );
}