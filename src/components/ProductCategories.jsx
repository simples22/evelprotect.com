import Link from "next/link";
import PBImage from "./PBImage";

const cards = [
  {
    title: "Careers",
    description:
      "Explore future opportunities, company culture, and professional paths inside Evel Protect™.",
    image: "/images/careers/evel-careers.jpg",
    href: "/careers",
    cta: "View all careers",
  },
  {
    title: "Sustainability",
    description:
      "Read our featured sustainability direction, product responsibility updates, and long-term initiatives.",
    image: "/images/sustainability/featured-sustainability.jpg",
    href: "/sustainability",
    cta: "Read more information",
  },
];

export default function ProductCategories() {
  return (
    <section className="evelProductCategories" id="company-resources">
      <div className="evelContainer">
        <div className="evelProductCategoriesHead">
          <h2>Explore More</h2>
        </div>

        <div className="evelProductCategoriesGrid">
          {cards.map((card) => (
            <Link
              href={card.href}
              className="evelProductCategoryCard"
              key={card.title}
            >
              <div className="evelProductCategoryMedia">
                <PBImage
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="evelProductCategoryImg"
                />
                <div className="evelProductCategoryTitle">
                  <h3>{card.title}</h3>
                </div>

                <div className="evelProductCategoryOverlay">
                  <div className="evelProductCategoryBody">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span>{card.cta} →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}