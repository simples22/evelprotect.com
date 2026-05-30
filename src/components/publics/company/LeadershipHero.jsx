import HeroCompany from "./HeroCompany";

export default function LeadershipHero(props) {
  return (
    <HeroCompany
      title="Leadership"
      subtitle=""
      image=""
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Our Company", href: "/our-company" },
        { label: "Leadership" },
      ]}
      {...props}
    />
  );
}