import Image from "next/image";
import Link from "next/link";
import PBImage from "./PBImage";

export default function EvelFeatureSplit({
  eyebrow = "Evel Protect™ Cosmetics products",
  title = "For everyday confidence.",
  text = "We are developing a premium personal care ecosystem across skincare, freshness cosmetics, body care, deodorants, and daily beauty essentials.",
  buttonText = "Explore Products",
  buttonHref = "#products",
  image = "/images/evel-feature.jpg",
  imageAlt = "Evel Cosmetics product direction",
}) {
  return (
    <section className="evelFeatureSplit">
      <div className="evelContainer evelFeatureSplitInner">
        <div className="evelFeatureSplitContent">
          <span className="evelFeatureSplitEyebrow">{eyebrow}</span>

          <h2>{title}</h2>
          <p>{text}</p>

          <Link href={buttonHref} className="evelFeatureSplitBtn">
            {buttonText}
          </Link>
        </div>

        <div className="evelFeatureSplitMedia">
          <PBImage
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="evelFeatureSplitImg"
            priority
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}