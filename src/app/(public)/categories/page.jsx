import EvelCard from "@/components/publics/ui/EvelCard";
import EvelCardGrid from "@/components/publics/ui/EvelCardGrid";
import HeroCompany from "@/components/publics/company/HeroCompany";
import { productCategories } from "@/data/productCategories";

export const metadata = {
  title: "Product Categories | Evel Protect™",
  description:
    "Explore Evel Protect™ product categories including cosmetics, beauty, body care, hair care, fragrance, and deodorants.",
};

export default function CategoriesPage() {
  return (
    <main>
      <HeroCompany
        title="Global Product Categories"
        subtitle="Explore the product directions Evel Protect™ is preparing across beauty, body care, hair care, fragrance, deodorants, and cosmetics."
        image="/images/sections/our-products.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories" },
        ]}
      />

      <section className="evelCategoriesPage">
        <div className="evelContainer">
          <EvelCardGrid columns="3" className="evelCategoriesGrid">
            {productCategories.map((category) => (
              <EvelCard
                key={category.slug}
                type="category"
                title={category.label}
                excerpt={category.excerpt}
                image={category.image}
                href={`/categories/${category.slug}`}
                category="Product Category"
                cta="Read more"
                size="md"
              />
            ))}
          </EvelCardGrid>
        </div>
      </section>
    </main>
  );
}