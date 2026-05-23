// src/app/faq/page.jsx

import FAQSection from "@/components/FAQsSEction";
import FAQHero from "@/components/publics/company/FAQHero";

export const metadata = {
  title: "FAQs | EVEL™ Cosmetics Group",
  description:
    "Frequently asked questions about EVEL™ Cosmetics Group, product categories, beauty direction, skincare, cosmetics, body care, and future labels.",
};

export default function FAQPage() {
  return (
    <main className="evelFaqPage">
      <FAQHero />
      <FAQSection />
      <FAQSection limit={999} showViewAll={false} />
    </main>
  );
}