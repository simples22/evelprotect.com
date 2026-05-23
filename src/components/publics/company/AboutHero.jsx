import HeroCompany from "./HeroCompany";

export default function AboutHero(props) {
  return (
    <HeroCompany
      title="About Evel Protect™"
      subtitle="Building a modern beauty and personal care ecosystem focused on quality, trust, and long-term product identity."
      image="/images/company/about-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
      ]}
      {...props}
    />
  );
}