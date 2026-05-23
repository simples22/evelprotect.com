import prisma from "@/lib/prisma";

import EvelCardsGrid from "@/components/EvelCarsGrid";
import EvelInfoSwitcher from "@/components/EvelInfoSwitcher";
import HomeHero from "@/components/Homehero";
import ProductCategories from "@/components/ProductCategories";
import FullBanner from "@/components/FullBanner";
import NewsletterSignup from "@/components/publics/NewsLetter/NewsletterSignup";
import ProductCarousel from "@/components/publics/products/ProductCarousel";
import NewsCarousel from "@/components/publics/news/NewsCarousel";
import MarketingVideoCarousel from "@/components/publics/marketing/MarketingVideoCarousel";

async function getTopProducts() {
  return prisma.product.findMany({
    where: { isPublished: true },
    orderBy: [
      { clickCount: "desc" },
      { viewCount: "desc" },
      { isFeatured: "desc" },
      { createdAt: "desc" },
    ],
    take: 6,
  });
}

async function getMarketingVideos() {
  return prisma.marketingVideo.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 4,
  });
}

async function getNews() {
  return prisma.newsArticle.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

export default async function HomePage() {
  const [topProducts, news, marketingVideos] = await Promise.all([
    getTopProducts(),
    getNews(),
    getMarketingVideos(),
  ]);

  return (
    <main>
      <HomeHero />

      <EvelInfoSwitcher />

      <NewsCarousel news={news} />

      <ProductCategories />

      {/* <ProductCarousel title="Top Viewed Products" products={topProducts} />
      <FullBanner />
      */}

      <MarketingVideoCarousel
        videos={marketingVideos}
        title="Product marketing videos"
        subtitle="Watch promotional videos from Evel Protect™ product categories."
      />

      {/* <EvelCardsGrid /> */}

      <NewsletterSignup />
    </main>
  );
}