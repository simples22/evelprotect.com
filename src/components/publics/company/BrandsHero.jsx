import HeroCompany from "./HeroCompany";

export default function BrandsHero(props) {
  return (
    <HeroCompany
      title="Our Brands"
      subtitle="Explore the developing Evel Protect™ brand ecosystem across beauty and personal care."
      image="/images/brands/brands-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Our Brands" },
      ]}
      {...props}
    />
  );
}