import prisma from "@/lib/prisma";
import Link from "next/link";
import MarketingVideoCard from "@/components/publics/marketing/MarketingVideoCard";
import MarketingHero from "@/components/publics/company/MarketingHero";

const PAGE_SIZE = 12;

async function getVideos(page) {
  const skip = (page - 1) * PAGE_SIZE;

  const [videos, total, featured] = await Promise.all([
    prisma.marketingVideo.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      skip,
      take: PAGE_SIZE,
    }),

    prisma.marketingVideo.count({
      where: { isPublished: true },
    }),

    prisma.marketingVideo.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: 4,
    }),
  ]);

  return {
    videos,
    featured,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export const metadata = {
  title: "Marketing Videos | Evel Protect™",
  description: "Watch promotional product videos from Evel Protect™.",
};

export default async function MarketingPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page || 1));

  const { videos, featured, totalPages } = await getVideos(page);

  return (
    <main>
          <MarketingHero />
      <section className="marketingVideoGridSection">
        <div className="evelContainer">
          <div className="marketingVideoGridHead">
            <span>Evel Protect™ Videos</span>
            <h1>Product marketing videos</h1>
            <p>
              Browse promotional product videos created to support our product
              launches, beauty categories and consumer care campaigns.
            </p>
          </div>

          <div className="marketingVideoGrid">
            {videos.map((item) => (
              <MarketingVideoCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>

      {totalPages > 1 && (
        <nav className="evelPagination">
          <div className="evelContainer evelPaginationInner">
            {page > 1 && <Link href={`/marketing?page=${page - 1}`}>Previous</Link>}

            <span>
              Page {page} of {totalPages}
            </span>

            {page < totalPages && <Link href={`/marketing?page=${page + 1}`}>Next</Link>}
          </div>
        </nav>
      )}
    </main>
  );
}