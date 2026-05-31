import EvelCarousel from "@/components/publics/ui/EvelCarousel";
import PBImage from "./PBImage";

const items = [
  {
    label: "Cosmetics",
    title: "Modern cosmetics designed for everyday beauty expression.",
    text: "Evel™ Cosmetics Group is preparing a cosmetics direction focused on modern beauty routines, everyday confidence, and premium consumer presentation.",
    image: "/images/sections/evel-cosmetics-products.jpg",
  },
  {
    label: "Beauty",
    title: "Building a thoughtful and trusted beauty ecosystem.",
    text: "Evel™ is developing a long-term beauty vision centered around product identity, consumer trust, modern branding, and elevated everyday care experiences.",
    image: "/images/sections/beauty-products.jpg",
  },
  {
    label: "Personal Care",
    title: "Preparing future personal care and lifestyle product categories.",
    text: "Evel™ Cosmetics Group plans to explore multiple personal care segments including deodorants, skincare, body care, fragrance, and hygiene essentials.",
    image: "/images/sections/our-products.jpg",
  },
];

export default function EvelInfoSwitcher() {
  return (
    <EvelCarousel
      title="We build global brands by Categories care attention."
      className="is-info-switcher"
    >
      {items.map((item) => (
        <article className="evelCarouselSlide" key={item.label}>
          <div className="evelInfoCarouselCard">
            <div className="evelInfoCarouselMedia">
              <PBImage
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width:768px) 86vw, 33vw"
                className="evelInfoCarouselImg"
              />
            </div>

            <div className="evelInfoCarouselBody">
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        </article>
      ))}
    </EvelCarousel>
  );
}