import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import SustainabilityCards from "@/components/publics/sustainability/SustainabilityCards";

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
    take: 3,
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
      "Explore Evel™ Cosmetics Group sustainability resources and company updates.",
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
  const postLinks = parseJson(post.postLinksJson);
  const resources = parseJson(post.resourcesJson);
  const points = parseJson(post.section5Json);
  const related = await getRelatedPosts(slug);

  return (
    <main className="evelSustainabilityPage">
        <section className="evelSustainabilityHero">
        <div className="evelContainer evelSustainabilityHeroGrid">
            <div className="evelSustainabilityHeroContent">
            <span>{post.category || "Evel Protect™ Sustainability"}</span>

            <h1>{post.title}</h1>

            {post.excerpt && <p>{post.excerpt}</p>}
            </div>

            {post.heroImage && (
            <div className="evelSustainabilityHeroImage">
                <Image
                src={post.heroImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width:768px) 100vw, 42vw"
                />
            </div>
            )}
        </div>
        </section>

      {(post.introTitle || post.introImage) && (
        <section className="evelSustainabilityIntro">
          <div className="evelContainer evelSustainabilityTwoCol">
            <div className="evelSustainabilityIntroText">
              <span>Introduction</span>
              {post.introTitle && <h2>{post.introTitle}</h2>}
            </div>

            {post.introImage && (
              <div className="evelSustainabilityImage">
                <Image
                  src={post.introImage}
                  alt={post.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {(documents.length > 0 || postLinks.length > 0) && (
        <section className="evelSustainabilityContent">
          <div className="evelContainer evelSustainabilityLinkGrid">
            {documents.length > 0 && (
              <Block title="Documents for download">
                {documents.map((item, index) => (
                  <a
                    href={item.url}
                    key={`${item.url}-${index}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {index + 1} → {item.title}
                  </a>
                ))}
              </Block>
            )}

            {postLinks.length > 0 && (
              <Block title="Post links">
                {postLinks.slice(0, 5).map((item, index) => (
                  <a
                    href={item.url}
                    key={`${item.url}-${index}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {index + 1} → {item.title}
                  </a>
                ))}
              </Block>
            )}
          </div>
        </section>
      )}

      {post.fixedBgImage && (
        <section className="evelSustainabilityFixedBgWrap">
          <div
            className="evelSustainabilityFixedBg"
            style={{ backgroundImage: `url(${post.fixedBgImage})` }}
          />
        </section>
      )}

      <section className="evelSustainabilityContent">
        <div className="evelContainer">
          <TextBlock title={post.section4Title} text={post.section4Text} />

          {points.length > 0 && (
            <Block title={post.section5Title || "Key points"}>
              <div className="evelSustainabilityPointsGrid">
                {points.slice(0, 3).map((point, index) => (
                  <article className="evelSustainabilityPoint" key={index}>
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    {point.title && <h3>{point.title}</h3>}

                    {point.paragraph1 && <p>{point.paragraph1}</p>}
                    {point.paragraph2 && <p>{point.paragraph2}</p>}
                  </article>
                ))}
              </div>

              {post.section5Bold && (
                <strong className="evelSustainabilityStrong">
                  {post.section5Bold}
                </strong>
              )}
            </Block>
          )}

          <TextBlock title={post.section6Title} text={post.section6Text} />
          <TextBlock title={post.section7Title} text={post.section7Text} />

          {(post.section8Title || post.section8Text || post.section8Image) && (
            <div className="evelSustainabilityTwoCol isImageRight">
              <TextBlock title={post.section8Title} text={post.section8Text} />

              {post.section8Image && (
                <div className="evelSustainabilityImage">
                  <Image
                    src={post.section8Image}
                    alt={post.section8Title || post.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          )}

          <TextBlock title="Conclusion" text={post.conclusion} />
        </div>
      </section>

      <SustainabilityCards
        posts={related}
        title="Related sustainability posts"
        subtitle="Continue exploring Evel Protect™ company resources and responsibility updates."
      />

      {resources.length > 0 && (
        <section className="evelSustainabilityContent">
          <div className="evelContainer">
            <Block title="Resources">
              <div className="evelSustainabilityResources">
                {resources.slice(0, 10).map((item, index) => (
                  <a
                    href={item.url}
                    key={`${item.url}-${index}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {index + 1} → {item.title}
                  </a>
                ))}
              </div>
            </Block>
          </div>
        </section>
      )}
    </main>
  );
}

function Block({ title, children }) {
  return (
    <section className="evelSustainabilityBlock">
      {title && <h2>{title}</h2>}
      <div className="evelSustainabilityBlockInner">{children}</div>
    </section>
  );
}

function TextBlock({ title, text }) {
  if (!title && !text) return null;

  return (
    <section className="evelSustainabilityBlock">
      {title && <h2>{title}</h2>}

      {text
        ?.split("\n")
        .filter(Boolean)
        .map((p, index) => (
          <p key={index}>{p}</p>
        ))}
    </section>
  );
}