import HeroCompany from "./HeroCompany";

export default function MarketingHero(props) {
  return (
    <HeroCompany
      title="Our marketing program"
      subtitle="Find news, categories, uptade protucts by our  company information, and support."
      image="/images/faq/marketing-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Marketing" },
      ]}
      {...props}
    />
  );
}