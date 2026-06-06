import prisma from "@/lib/prisma";

import EvelSlugPage from "@/components/publics/ui/EvelSlugPage";
import EvelCard from "@/components/publics/ui/EvelCard";

function parseJson(value, fallback = []) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

async function getPost(slug) {
  return prisma.sustainabilityPost.findUnique({
    where: { slug },
  });
}

async function getRelatedPosts(slug) {
  return prisma.sustainabilityPost.findMany({
    where: {
      isPublished: true,
      NOT: { slug },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post
      ? `${post.title} | Evel Protect™ Cosmetics Group`
      : "Sustainability | Evel Protect™ Cosmetics Group",
    description:
      post?.excerpt ||
      "Explore Evel Protect™ Cosmetics Group sustainability resources and company updates.",
  };
}

export default async function SustainabilitySlugPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || !post.isPublished) {
    return (
      <main className="evelEmptyProduct">
        <div className="evelContainer">
          <h1>Post not found.</h1>
          <p>This sustainability resource is unavailable.</p>
        </div>
      </main>
    );
  }

  const documents = parseJson(post.documentsJson);
  const links = parseJson(post.postLinksJson);
  const resources = parseJson(post.resourcesJson);
  const points = parseJson(post.section5Json);
  const related = await getRelatedPosts(slug);

  return (
    <EvelSlugPage
      eyebrow={post.category || "Evel Protect™ Sustainability"}
      title={post.title}
      subtitle={post.excerpt}
      image={post.heroImage || post.introImage}
      imageAlt={post.title}
      backHref="/sustainability"
      backLabel="Back to sustainability"
      sections={[
        {
          eyebrow: "Introduction",
          title: post.introTitle,
          text: "",
        },
        {
          eyebrow: "Overview",
          title: post.section4Title,
          text: post.section4Text,
        },
        {
          eyebrow: "Company Direction",
          title: post.section6Title,
          text: post.section6Text,
        },
        {
          eyebrow: "Long-Term Responsibility",
          title: post.section7Title,
          text: post.section7Text,
        },
        {
          eyebrow: "Additional Information",
          title: post.section8Title,
          text: post.section8Text,
        },
        {
          eyebrow: "Conclusion",
          title: "Conclusion",
          text: post.conclusion,
        },
      ].filter((section) => section.title || section.text)}
      points={points.map((point) => ({
        title: point.title,
        text: [point.paragraph1, point.paragraph2]
          .filter(Boolean)
          .join("\n"),
      }))}
      documents={documents}
      links={links}
      resources={resources}
      relatedTitle="Related sustainability posts"
      related={
        related.length ? (
          <div className="evelSlugRelatedTrack">
            {related.map((item) => (
              <div className="evelSlugRelatedSlide" key={item.id}>
                <EvelCard
                  type="sustainability"
                  title={item.title}
                  excerpt={item.excerpt}
                  image={
                    item.heroImage ||
                    "/images/products/about-products.jpg"
                  }
                  href={`/sustainability/${item.slug}`}
                  category={item.category || "Company Topic"}
                  cta="Read more"
                  size="md"
                />
              </div>
            ))}
          </div>
        ) : null
      }
    />
  );
}