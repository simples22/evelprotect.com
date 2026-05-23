import Image from "next/image";
import Link from "next/link";

export default function EvelCareerCard({
  image = "/images/careers/evel-careers.jpg",
  href = "/contact",
}) {
  return (
    <section className="evelCareerCard">
      <div className="evelCareerCardMedia">
        <Image
          src={image}
          alt="EVEL™ Cosmetics Group careers"
          fill
          className="evelCareerCardImg"
        />
      </div>

      <div className="evelCareerCardContent">
        <span>Career</span>

        <h2>
          Join a growing team shaping the future and
          Be part of a collaborative team working to bring EVEL™ beauty,
          skincare, body care, and personal care products closer to customers.
        </h2>

        <Link href={href} className="evelCareerCardBtn">
          Join Now
        </Link>
      </div>
    </section>
  );
}