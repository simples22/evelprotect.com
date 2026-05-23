import HeroCompany from "./HeroCompany";

export default function SustainabilityHero(props) {
  return (
    <HeroCompany
      title="Our Sustainability Supports"
      subtitle="We work together to build responsible products and long-term consumer trust."
      image="/images/products/sustainability-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sustainability" },
      ]}
      {...props}
    />
  );
}