import Image from "next/image";
import Link from "next/link";
import EvelButton from "@/components/publics/ui/EvelButton";

function TextParagraphs({ text }) {
  if (!text) return null;

  return text
    .split("\n")
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={`paragraph-${index}`}>
        {paragraph}
      </p>
    ));
}

function LinkList({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <section className="evelSlugBlock">
      {title && <h2>{title}</h2>}

      <div className="evelSlugLinkList">
        {items.map((item, index) => (
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
    </section>
  );
}

export default function EvelSlugPage({
  eyebrow = "",
  title = "",
  subtitle = "",
  image = "",
  imageAlt = "",
  backHref = "",
  backLabel = "Back",
  sections = [],
  points = [],
  documents = [],
  links = [],
  resources = [],
  relatedTitle = "",
  related = null,
}) {
  return (
    <main className="evelSlugPage">
      <section className="evelSlugHero">
        <div className="evelContainer">
          {backHref && (
            <div className="evelSlugTopBack">
              <EvelButton
                href={backHref}
                variant="secondary"
                className="evelSlugBackBtn"
              >
                ← {backLabel}
              </EvelButton>
            </div>
          )}

          {eyebrow && <span>{eyebrow}</span>}
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>

      <section className="evelSlugContent">
        <div className="evelContainer evelSlugGrid">
          {image && (
            <div className="evelSlugImage">
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                priority
                sizes="(max-width:768px) 100vw, 42vw"
              />
            </div>
          )}

          <div className="evelSlugText">
            {sections.map((section, index) => (
              <section
                className="evelSlugBlock"
                key={`${section.title || "section"}-${index}`}
              >
                {section.eyebrow && <span>{section.eyebrow}</span>}
                {section.title && <h2>{section.title}</h2>}
                <TextParagraphs text={section.text} />
              </section>
            ))}

            {points.length > 0 && (
              <section className="evelSlugBlock">
                <h2>Key points</h2>

                <div className="evelSlugPoints">
                  {points.map((point, index) => (
                    <article key={`${point.title}-${index}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {point.title && <h3>{point.title}</h3>}
                      {point.text && <p>{point.text}</p>}
                    </article>
                  ))}
                </div>
              </section>
            )}

            <LinkList title="Documents" items={documents} />
            <LinkList title="Links" items={links} />
            <LinkList title="Resources" items={resources} />
          </div>
        </div>
      </section>

      {related && (
        <section className="evelSlugRelated">
          <div className="evelContainer">
            {relatedTitle && <h2>{relatedTitle}</h2>}
            {related}
          </div>
        </section>
      )}
    </main>
  );
}