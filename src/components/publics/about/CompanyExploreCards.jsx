import Link from "next/link";
import Image from "next/image";

const cards = [
  {
    title: "Our Business",
    href: "/our-company/business",
    image: "/images/company/our-business.jpg",
  },
  {
    title: "Our Leaderships",
    href: "/our-company/leadership",
    image: "/images/company/our-leadership.jpg",
  },
];

export default function CompanyExploreCards() {
  return (
    <section className="companyExploreSection">
      <div className="evelContainer">
        <div className="companyExploreHead">
          <h2>About Our Company</h2>
        </div>

        <div className="companyExploreGrid">
          {cards.map((card) => (
            <div className="companyExploreItem" key={card.title}>
              <Link
                href={card.href}
                className="companyExploreCard"
              >
                <div className="companyExploreMedia">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="companyExploreImg"
                  />
                </div>
              </Link>

              <h3>
                <Link href={card.href}>
                  {card.title}
                </Link>
              </h3>
            </div>
          ))}
        </div>

        <p className="companyExploreNotice">
          Evel Protect™ Company operates within the Beauty and Personal Care
          sector, supporting long-term product development, brand growth,
          consumer products, and everyday care solutions. Sector Code: 003 ·
          NAICS 325620.
        </p>
      </div>
    </section>
  );
}