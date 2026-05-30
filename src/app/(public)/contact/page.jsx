import EvelContactForms from "@/components/publics/contacts/EvelContactForms";

import EvelContactMain from "@/components/publics/contacts/EvelContactMain";
import ContactHero from "@/components/publics/company/ContactHero";
import ContactAdress from "@/components/publics/contacts/ContactAdress";


export const metadata = {
  title: "Contact & Careers Support | Evel Protect™ Group",
  description:
    "Contact  | Evel™ Cosmetics Companies for business inquiries, support, partnerships, supplier discussions, or career opportunities.",
};

export default function OurProductsPage() {
  return (
    <main>
      <ContactHero />

      <EvelContactMain />
      <ContactAdress />
    </main>
  );
}