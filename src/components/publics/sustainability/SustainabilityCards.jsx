import EvelCard from "@/components/publics/ui/EvelCard";
import EvelCardGrid from "@/components/publics/ui/EvelCardGrid";

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

        <EvelCardGrid
          className="evelSustainabilityCardsGrid"
          columns="3"
        >
          {posts.map((post) => (
            <EvelCard
              key={post.id}
              type="sustainability"
              title={post.title}
              excerpt={post.excerpt}
              image={
                post.heroImage ||
                "/images/products/about-products.jpg"
              }
              href={`/sustainability/${post.slug}`}
              category={post.category || "Company Topic"}
              cta="Read more"
              size="md"
            />
          ))}
        </EvelCardGrid>
      </div>
    </section>
  );
}