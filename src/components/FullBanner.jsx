import PBImage from "./PBImage";

export default function FullBanner({
  sectionTitle = "Discorver Brand",
  sectionText =
    "Discover our developing cosmetics, body care, and personal wellness ecosystem.",
  image = "/images/banner/evel-banner.png",

  title = "Premium cosmetics and personal care.",
  subtitle =
    "Evel™ Cosmetics Group develops body care and personal wellness products for everyday confidence and long-term consumer trust.",
}) {
  return (
    <section className="evelFullBanner">
      <div className="evelFullBannerOverlay" />
      <div className="evelContainer">

        {/* SECTION INTRO */}
        <div className="evelFullBannerIntro">
          <span>{sectionTitle}</span>
          <p>{sectionText}</p>
        </div>

        {/* MAIN BANNER */}

        <div className="evelFullBannerInner">

          <div className="evelFullBannerMedia">
            <PBImage
              src={image}
              alt={title}
              width={900}
              height={900}
              priority
              className="evelFullBannerImg"
            />
          </div>

          <div className="evelFullBannerContent">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

        </div>
      </div>
    </section>
  );
}