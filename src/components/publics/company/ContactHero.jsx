import HeroCompany from "./HeroCompany";

export default function ContactHero(props) {
  return (
    <HeroCompany
      title="Contact Us"
      subtitle="Connect with our company regarding products, partnerships, support, and future opportunities."
      image="/images/contact/contact-hero.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]}
      {...props}
    />
  );
}