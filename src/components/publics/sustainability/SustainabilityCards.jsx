import Image from "next/image";
import Link from "next/link";

export default function SustainabilityCards({
  posts = [],
  title = "Explore sustainability resources",
  subtitle = "Read company topics, product responsibility updates, documents, and long-term initiatives from EVEL™ Cosmetics Group.",
}) {
  if (!posts.length) return null;

  return (
    <section className="evelSustainabilityCards">
      <div className="evelContainer">
        <div className="evelSustainabilityCardsHead">
          <span>Evel™ Sustainability</span>

          <h2>{title}</h2>

          <p>{subtitle}</p>
        </div>

        <div className="evelSustainabilityCardsGrid">
          {posts.map((post) => (
            <Link
              href={`/sustainability/${post.slug}`}
              className="evelSustainabilityCard"
              key={post.id}
            >
              {/* IMAGE TOP */}

              <div className="evelSustainabilityCardMedia">
                <Image
                  src={
                    post.heroImage ||
                    "/images/products/about-products.jpg"
                  }
                  alt={post.title}
                  fill
                  sizes="(max-width:768px) 100vw, 25vw"
                  className="evelSustainabilityCardImg"
                />
              </div>

              {/* CONTENT BOTTOM */}

              <div className="evelSustainabilityCardContent">
                <span className="evelSustainabilityCardCategory">
                  {post.category || "Company Topic"}
                </span>

                <h3>{post.title}</h3>

                {post.excerpt && (
                  <p>{post.excerpt}</p>
                )}

                <strong className="evelSustainabilityCardLink">
                  Read more →
                </strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}