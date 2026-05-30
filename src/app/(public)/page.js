import prisma from "@/lib/prisma";

import EvelInfoSwitcher from "@/components/EvelInfoSwitcher";
import HomeHero from "@/components/Homehero";
import ProductCategories from "@/components/ProductCategories";
import NewsletterSignup from "@/components/publics/NewsLetter/NewsletterSignup";
import NewsCarousel from "@/components/publics/news/NewsCarousel";
import MarketingVideoCarousel from "@/components/publics/marketing/MarketingVideoCarousel";
import BusinessOverview from "@/components/publics/business/BusinessOverview";
import SustainabilityCards from "@/components/publics/sustainability/SustainabilityCards";

async function safeQuery(query, fallback = []) {
  try {
    return await query();
  } catch (error) {
    console.error("Homepage query failed:", error);
    return fallback;
  }
}

async function getTopProducts() {
  return safeQuery(() =>
    prisma.product.findMany({
      where: { isPublished: true },
      orderBy: [
        { clickCount: "desc" },
        { viewCount: "desc" },
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
      take: 6,
    })
  );
}

async function getMarketingVideos() {
  return safeQuery(() =>
    prisma.marketingVideo.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: 4,
    })
  );
}

async function getNews() {
  return safeQuery(() =>
    prisma.newsArticle.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    })
  );
}

async function getBusinessOverview() {
  return safeQuery(
    () =>
      prisma.businessOverview.findFirst({
        where: { isPublished: true },
        orderBy: { updatedAt: "desc" },
      }),
    null
  );
}

export default async function HomePage() {
  const [topProducts, news, marketingVideos, businessOverview] =
    await Promise.all([
      getTopProducts(),
      getNews(),
      getMarketingVideos(),
      getBusinessOverview(),
    ]);

  return (
    <main>
      <HomeHero />

      <BusinessOverview data={businessOverview} />

      <EvelInfoSwitcher />

      <NewsCarousel news={news} />

      <ProductCategories />

      <MarketingVideoCarousel
        videos={marketingVideos}
        title="Product marketing videos"
        subtitle="Watch promotional videos from Evel Protect™ product categories."
      />

      <SustainabilityCards />

      <NewsletterSignup />
    </main>
  );
}