import Link from "next/link";
import PBImage from "@/components/PBImage";

export default function NewsArticleHero({
  title,
  subtitle,
  image,
  category = "Company",
  breadcrumbs = [],
  className = "",
}) {
  return (
    <section className={`newsHero newsArticleHero ${className}`}>
      <div className="evelContainer newsHeroTop">
        {breadcrumbs.length > 0 && (
          <nav className="companyHeroBreadcrumb" aria-label="Breadcrumb">
            <ol>
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li key={`${item.label}-${index}`}>
                    {item.href && !isLast ? (
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined}>
                        {item.label}
                      </span>
                    )}

                    {!isLast && (
                      <span className="companyHeroSeparator">
                        /
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>

      <div className="evelContainer newsHeroInner">
        <div className="newsHeroContent">
          <span className="newsArticleCategory">
            {category}
          </span>

          <h1>{title}</h1>

          {subtitle && <p>{subtitle}</p>}
        </div>

        {image && (
          <div className="newsHeroMedia">
            <PBImage
              src={image}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 44vw"
              className="newsHeroImg"
            />
          </div>
        )}
      </div>
    </section>
  );
}