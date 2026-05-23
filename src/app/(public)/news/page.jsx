
import NewsHero from "@/components/publics/company/NewsHero";
import NewsCenter from "@/components/publics/news/NewsCenter";
import NewsletterSignup from "@/components/publics/NewsLetter/NewsletterSignup";

export default function NewsPage() {
  return (
    <main>
      <NewsHero />

      <NewsCenter />
      <NewsletterSignup />
    </main>
  );
}