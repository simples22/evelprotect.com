import prisma from "@/lib/prisma";
import MarketingVideoCarousel from "@/components/publics/marketing/MarketingVideoCarousel";
import EvelButton from "@/components/publics/ui/EvelButton";

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

          <EvelButton href="/marketing" variant="primary">
            Back to Marketing
          </EvelButton>
        </div>
      </main>
    );
  }

  const related = await getRelated(item.id);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const videoUrl = `${siteUrl}/marketing/${item.slug}`;

  return (
    <main className="marketingVideoPremium">
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
          <EvelButton
            href="/marketing"
            variant="secondary"
            direction="left"
            align="left"
          >
            Back to Marketing
          </EvelButton>

          <span>{item.productName || item.category || "Evel Protect™"}</span>

          <h1>{item.title}</h1>

          {item.excerpt && <p>{item.excerpt}</p>}
        </div>
      </section>

      <section className="marketingVideoStickyBar">
        <div className="evelContainer">
          <p>Discover more about this product campaign.</p>

          <EvelButton href="/shop" variant="primary" align="right">
            Shop Products
          </EvelButton>
        </div>
      </section>

      <section className="marketingVideoResources">
        <div className="evelContainer">
          <h2>Marketing resources</h2>

          <div className="marketingVideoShare">
            <EvelButton
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                videoUrl
              )}`}
              target="_blank"
              variant="secondary"
              align="left"
            >
              Share on Facebook
            </EvelButton>

            <EvelButton
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                videoUrl
              )}`}
              target="_blank"
              variant="secondary"
              align="left"
            >
              Share on LinkedIn
            </EvelButton>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <MarketingVideoCarousel
          videos={related}
          title="Related campaigns"
          subtitle="Explore more Evel Protect™ promotional product videos."
        />
      )}
    </main>
  );
}