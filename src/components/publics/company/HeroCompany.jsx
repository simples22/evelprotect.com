import Link from "next/link";
import PBImage from "@/components/PBImage";
import PBVideo from "@/components/PBVideo";

export default function HeroCompany({
  title = "Built For Long-Term Growth",
  subtitle = "",
  image = "",
  video = "",
  breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Our Company" },
  ],
  className = "",
  mediaClassName = "isMd",
}) {
  const hasSubtitle = Boolean(subtitle);
  const hasMedia = Boolean(video || image);

  return (
    <section
      className={[
        "companyHero",
        !hasMedia ? "hasNoMedia" : "",
        !hasSubtitle ? "hasNoSubtitle" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="companyHeroOverlay" />

      <div className="evelContainer companyHeroTop">
        {breadcrumbs.length > 0 && (
          <nav className="companyHeroBreadcrumb" aria-label="Breadcrumb">
            <ol>
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li key={`${item.label}-${index}`}>
                    {item.href && !isLast ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined}>
                        {item.label}
                      </span>
                    )}

                    {!isLast && (
                      <span className="companyHeroSeparator">/</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>

      <div className="evelContainer companyHeroInner">
        <div className="companyHeroContent">
          <h1>{title}</h1>

          {hasSubtitle && <p>{subtitle}</p>}
        </div>

        {hasMedia && (
          <div className={`companyHeroMedia ${mediaClassName}`}>
            {video ? (
              <PBVideo src={video} className="companyHeroVideo" />
            ) : (
              <PBImage
                src={image}
                alt={title}
                width={1200}
                height={1200}
                priority
                className="companyHeroImage"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}