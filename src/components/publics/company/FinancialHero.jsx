import HeroCompany from "./HeroCompany";

export default function FinancialHighlightHero(props) {
  return (
    <HeroCompany
      title="Financial Highlights"
      subtitle="Explore Evel Protect™ company growth, strategic direction, operational performance, and long-term business development initiatives."
      image="/images/company/financial-highlight-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Financial Highlights" },
      ]}
      {...props}
    />
  );
}