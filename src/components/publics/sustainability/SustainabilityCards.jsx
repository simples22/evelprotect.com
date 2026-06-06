import Link from "next/link";

import EvelCard from "@/components/publics/ui/EvelCard";
import EvelCardGrid from "@/components/publics/ui/EvelCardGrid";
import EvelSkeletonCard from "@/components/publics/ui/EvelSkeletonCard";

export default function SustainabilityCards({
  posts = [],
  loading = false,
  title = "Explore sustainability resources",
  subtitle = "Read company topics, product responsibility updates, documents, and long-term initiatives from EVEL™ Cosmetics Group.",
}) {
  return (
    <section className="evelSustainabilityCards">
      <div className="evelContainer">
        <div className="evelSustainabilityCardsHead">
          <span>Evel Protect™ Sustainability</span>

          <h2>{title}</h2>

          <p>{subtitle}</p>
        </div>

        <EvelCardGrid
          className="evelSustainabilityCardsGrid"
          columns="3"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <EvelSkeletonCard
                key={`sustainability-skeleton-${index}`}
                lines={4}
                showMedia
                showMeta
                showButton
              />
            ))
          ) : posts.length ? (
            posts.map((post) => (
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
            ))
          ) : (
            <div className="evelContentEmpty">
              No sustainability resources available.
              <Link href="#newsletter-signup">
                {" "}
                Sign Up to Join newsletter
              </Link>
            </div>
          )}
        </EvelCardGrid>
      </div>
    </section>
  );
}