import Image from "next/image";

export default function FullBannerProducts({
  image = "/images/banners/evel-products-banner.jpg",
 
  title = "uncover your formular Designed For Everyday Care",
  text = "Explore a growing direction of cosmetics, beauty, skincare, and personal care experiences.",
}) {
  return (
    <section className="evelFullBannerProducts">
      <div className="evelFullBannerProductsMedia">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="evelFullBannerProductsImg"
        />
      </div>

      <div className="evelContainer">
        <div className="evelFullBannerProductsContent">

          <h2>{title}</h2>

          <p>{text}</p>
        </div>
      </div>
    </section>
  );
}