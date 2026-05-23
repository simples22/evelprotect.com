import prisma from "@/lib/prisma";
import Link from "next/link";
import MarketingVideoCarousel from "@/components/publics/marketing/MarketingVideoCarousel";
import MarketingHero from "@/components/publics/company/MarketingHero";

async function getVideo(slug) {
  return prisma.marketingVideo.findUnique({
    where: { slug },
  });
}

async function getRelated(id) {
  return prisma.marketingVideo.findMany({
    where: {
      isPublished: true,
      NOT: { id },
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
}

export default async function MarketingSlugPage({ params }) {
  const { slug } = await params;
  const item = await getVideo(slug);

  if (!item || !item.isPublished) {
    return (
      <main className="evelEmptyProduct">
        <div className="evelContainer">
          <h1>Video not found.</h1>
          <p>This marketing video is unavailable.</p>
        </div>
      </main>
    );
  }

  const related = await getRelated(item.id);

  return (
    <main className="marketingVideoPremium">
      <MarketingHero />
      <section className="marketingVideoPremiumHero">
        <video
          src={item.videoUrl}
          poster={item.thumbnail || undefined}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="marketingVideoPremiumOverlay" />

        <div className="evelContainer marketingVideoPremiumContent">
          <Link href="/marketing">← Back to marketing</Link>

          <span>{item.productName || item.category || "Evel Protect™"}</span>

          <h1>{item.title}</h1>

          {item.excerpt && <p>{item.excerpt}</p>}
        </div>
      </section>

      <section className="marketingVideoStickyBar">
        <div className="evelContainer">
          <p>Discover more about this product campaign.</p>
          <Link href="/shop">Shop products →</Link>
        </div>
      </section>

      <section className="marketingVideoResources">
        <div className="evelContainer">
          <h2>Marketing resources</h2>

          <div className="marketingVideoShare">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/marketing/${item.slug}`}
              target="_blank"
            >
              Share on Facebook
            </a>

            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_SITE_URL}/marketing/${item.slug}`}
              target="_blank"
            >
              Share on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <MarketingVideoCarousel
        videos={related}
        title="Related campaigns"
        subtitle="Explore more Evel Protect™ promotional product videos."
      />
    </main>
  );
}