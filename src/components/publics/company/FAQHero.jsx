import HeroCompany from "./HeroCompany";

export default function FAQHero(props) {
  return (
    <HeroCompany
      title="Frequently Asked Questions"
      subtitle="Find answers about Evel Protect™, products, categories, company information, and support."
      image="/images/faq/faq-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "FAQ" },
      ]}
      {...props}
    />
  );
}