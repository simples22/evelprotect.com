import Link from "next/link";
import prisma from "@/lib/prisma";
import SustainabilityHero from "@/components/publics/company/SustainabilityHero";
import SustainabilityCards from "@/components/publics/sustainability/SustainabilityCards";

const PAGE_SIZE = 12;

async function getPosts(page) {
  const skip = (page - 1) * PAGE_SIZE;

  const [posts, total] = await Promise.all([
    prisma.sustainabilityPost.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      skip,
      take: PAGE_SIZE,
    }),

    prisma.sustainabilityPost.count({
      where: { isPublished: true },
    }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export const metadata = {
  title: "Sustainability | EVEL™ Cosmetics Group",
  description:
    "Explore Evel protect™ Cosmetics Group sustainability resources, company topics, documents, product responsibility, and updates.",
};

export default async function SustainabilityPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page || 1));

  const { posts, totalPages } = await getPosts(page);

  return (
    <>
      <SustainabilityHero />

    <main className="evelSustainabilityIndex">
      <SustainabilityCards
        posts={posts}
        title="Latest sustainability resources"
        subtitle="Browse published Evel Protect™ resources, company updates, product responsibility posts, and public documents."
      />

      {totalPages > 1 && (
        <nav className="evelPagination" aria-label="Sustainability pagination">
          <div className="evelContainer evelPaginationInner">
            {page > 1 && (
              <Link href={`/sustainability?page=${page - 1}`}>Previous</Link>
            )}

            <span>
              Page {page} of {totalPages}
            </span>

            {page < totalPages && (
              <Link href={`/sustainability?page=${page + 1}`}>Next</Link>
            )}
          </div>
        </nav>
      )}
    </main>
    </>
  );
}