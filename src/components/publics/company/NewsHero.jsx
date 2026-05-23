import HeroCompany from "./HeroCompany";

export default function NewsHero(props) {
  return (
    <HeroCompany
      title="Company News & Updates"
      subtitle="Explore the latest Evel Protect™ announcements, articles, and company updates."
      image="/images/news/news-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "News" },
      ]}
      {...props}
    />
  );
}