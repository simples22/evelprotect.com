import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

import EvelSlugPage from "@/components/publics/ui/EvelSlugPage";
import EvelCard from "@/components/publics/ui/EvelCard";
import NewsletterSignup from "@/components/publics/NewsLetter/NewsletterSignup";

function paragraphs(text = "", max = 99) {
  return String(text)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max);
}

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US");
}

async function getArticle(slug) {
  try {
    return await prisma.newsArticle.findFirst({
      where: {
        slug,
        isPublished: true,
      },
    });
  } catch (error) {
    console.error("News detail query failed:", error);
    return null;
  }
}

async function getRelatedNews(slug) {
  try {
    return await prisma.newsArticle.findMany({
      where: {
        isPublished: true,
        NOT: {
          slug,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
  } catch (error) {
    console.error("Related news query failed:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: article
      ? `${article.title} | EVEL Cosmetics Group`
      : "News Not Found | EVEL Cosmetics Group",
    description: article?.excerpt || "EVEL Cosmetics Group company news.",
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedNews = await getRelatedNews(slug);

  const dateLabel = formatDate(
    article.publishedAt || article.createdAt
  );

  return (
    <>
      <EvelSlugPage
        eyebrow={article.category || "Company News"}
        title={article.title}
        subtitle={article.excerpt}
        image={article.imageUrl}
        imageAlt={article.title}
        backHref="/news"
        backLabel="Back to news"
        sections={[
          {
            eyebrow: dateLabel ? `Published ${dateLabel}` : "News",
            title: article.introTitle || "Introduction",
            text: paragraphs(article.introduction, 3).join("\n"),
          },
          {
            eyebrow: "Details",
            title: "Details",
            text: paragraphs(article.body).join("\n"),
          },
          {
            eyebrow: "Declaration",
            title: article.authorTitle,
            text: [
              article.authorFunction || "",
              article.authorCompany || "",
              article.authorBio || "",
            ]
              .filter(Boolean)
              .join("\n"),
          },
          {
            eyebrow: "Question & Approach",
            title: article.approachTitle || "Question & Approach",
            text: paragraphs(article.approachBody).join("\n"),
          },
          {
            eyebrow: "Conclusion",
            title: article.conclusionTitle || "Conclusion",
            text: paragraphs(article.conclusionBody).join("\n"),
          },
        ].filter((section) => section.title || section.text)}
        links={
          article.sourceUrl
            ? [
                {
                  title: article.sourceLabel || "Source",
                  url: article.sourceUrl,
                },
              ]
            : []
        }
        relatedTitle="Related news"
        related={
          relatedNews.length ? (
            <div className="evelSlugRelatedTrack">
              {relatedNews.map((item) => (
                <div
                  className="evelSlugRelatedSlide"
                  key={item.id}
                >
                  <EvelCard
                    type="news"
                    title={item.title}
                    excerpt={item.excerpt}
                    image={item.imageUrl}
                    href={`/news/${item.slug}`}
                    category={item.category || "Company"}
                    date={formatDate(
                      item.publishedAt || item.createdAt
                    )}
                    cta="Read news"
                    size="md"
                  />
                </div>
              ))}
            </div>
          ) : null
        }
      />

      <NewsletterSignup />
    </>
  );
}