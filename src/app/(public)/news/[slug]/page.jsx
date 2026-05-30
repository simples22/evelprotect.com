import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PBImage from "@/components/PBImage";
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

  if (!article) notFound();

  return (
    <main className="newsReadPage">
      <section className="newsReadTop">
        <div className="evelContainer">
          <nav className="companyHeroBreadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/">Home</a>
                <span className="companyHeroSeparator">/</span>
              </li>

              <li>
                <a href="/news">News</a>
                <span className="companyHeroSeparator">/</span>
              </li>

              <li>
                <span aria-current="page">{article.title}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="evelContainer newsReadHero">
          <div className="newsReadMedia">
            {article.imageUrl && (
              <PBImage
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width:768px) 100vw, 48vw"
                className="newsReadImg"
              />
            )}
          </div>

          <div className="newsReadIntro">
            <h1>{article.title}</h1>

            <span>
              Published: {formatDate(article.publishedAt || article.createdAt)}
            </span>

            {article.excerpt && <p>{article.excerpt}</p>}
          </div>
        </div>
      </section>

      <section className="newsReadBody">
        <div className="evelContainer newsReadBodyInner">
          {article.introduction && (
            <section className="newsReadBlock">
              <h2>{article.introTitle || "Introduction"}</h2>
              {paragraphs(article.introduction, 3).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          )}

          {article.body && (
            <section className="newsReadBlock">
              <h2>Details</h2>
              {paragraphs(article.body).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          )}

          {(article.authorTitle ||
            article.authorBio ||
            article.authorImageUrl) && (
            <section className="newsReadAuthor">
              {article.authorImageUrl && (
                <div className="newsReadAuthorImgWrap">
                  <PBImage
                    src={article.authorImageUrl}
                    alt={article.authorTitle || "Declaration image"}
                    fill
                    sizes="220px"
                    className="newsReadAuthorImg"
                  />
                </div>
              )}

              <div className="newsReadAuthorContent">
                {article.authorTitle && <h2>{article.authorTitle}</h2>}

                {(article.authorFunction || article.authorCompany) && (
                  <strong>
                    {article.authorFunction}
                    {article.authorCompany
                      ? ` · ${article.authorCompany}`
                      : ""}
                  </strong>
                )}

                {paragraphs(article.authorBio, 2).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {article.approachBody && (
            <section className="newsReadBlock">
              <h2>{article.approachTitle || "Question & Approach"}</h2>

              {paragraphs(article.approachBody).map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {article.sourceUrl && (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="newsReadSource"
                >
                  Source: {article.sourceLabel || article.sourceUrl}
                </a>
              )}
            </section>
          )}

          {article.conclusionBody && (
            <section className="newsReadBlock">
              <h2>{article.conclusionTitle || "Conclusion"}</h2>

              {paragraphs(article.conclusionBody).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          )}
        </div>
      </section>

      <NewsletterSignup />
    </main>
  );
}