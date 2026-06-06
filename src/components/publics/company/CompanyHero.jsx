import HeroCompany from "./HeroCompany";

export default function CompanyHero(props) {
  return (
    <HeroCompany
      title="Our Company"
      subtitle=""
      image=""
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Our Company", href: "/our-company" },
      ]}
      {...props}
    />
  );
}