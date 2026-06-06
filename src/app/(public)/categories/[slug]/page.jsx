import { notFound } from "next/navigation";

import EvelSlugPage from "@/components/publics/ui/EvelSlugPage";
import EvelCard from "@/components/publics/ui/EvelCard";

import {
  getProductCategoryBySlug,
  productCategories,
} from "@/data/productCategories";

export function generateStaticParams() {
  return productCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);

  return {
    title: category
      ? `${category.label} | Evel Protect™`
      : "Product Category | Evel Protect™",
    description:
      category?.excerpt ||
      "Explore Evel Protect™ product categories.",
  };
}

export default async function CategorySlugPage({ params }) {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);

  if (!category) notFound();

  const relatedCategories = productCategories.filter(
    (item) => item.slug !== category.slug
  );

  return (
    <EvelSlugPage
      eyebrow=""
      title={category.label}
      subtitle={category.excerpt}
      image={category.image}
      imageAlt={category.label}
      backHref="/categories"
      backLabel="Back to categories"
      sections={[
        {
          eyebrow: "Overview",
          title: category.title,
          text: category.description,
        },
        {
          eyebrow: "Category Direction",
          title: category.section4Title,
          text: category.section4Text,
        },
        {
          eyebrow: "Conclusion",
          title: "Long-term category vision",
          text: category.conclusion,
        },
      ]}
      points={category.points?.map((point) => ({
        title: point.title,
        text: point.paragraph1,
      }))}
      relatedTitle="Explore other product categories"
      related={
        <div className="evelSlugRelatedTrack">
          {relatedCategories.map((item) => (
            <div className="evelSlugRelatedSlide" key={item.slug}>
              <EvelCard
                type="category"
                title={item.label}
                excerpt={item.excerpt}
                image={item.image}
                href={`/categories/${item.slug}`}
                category="Product Category"
                cta="Read more"
                size="md"
              />
            </div>
          ))}
        </div>
      }
    />
  );
}