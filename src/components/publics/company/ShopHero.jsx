import HeroCompany from "./HeroCompany";

export default function ShopHero(props) {
  return (
    <HeroCompany
      title="Our Products"
      subtitle="Discover Evel Protect™ cosmetics, skincare, deodorants, body care, and personal wellness categories."
      image="/images/products/products-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop" },
      ]}
      {...props}
    />
  );
}