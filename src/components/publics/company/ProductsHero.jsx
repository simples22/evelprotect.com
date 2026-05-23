import HeroCompany from "./HeroCompany";

export default function ProductsHero(props) {
  return (
    <HeroCompany
      title="Beauty & Personal Care"
      subtitle="Modern cosmetics and personal care categories designed for everyday confidence and freshness."
      image="/images/products/products-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Our Products" },
      ]}
      {...props}
    />
  );
}