import PBImage from "./PBImage";

const categories = [
  {
    title: "Cosmetics",

    description:
      "Modern freshness and beauty products designed for everyday confidence and lifestyle care.",

    image: "/images/products/freshness-cosmetics.jpg",
  },

  {
    title: "Face",

    description:
      "Developing skincare and facial care products focused on comfort, softness, and daily routines.",

    image: "/images/products/skincare.jpg",
  },

  {
    title: "Body",

    description:
      "Body care essentials prepared for hydration, freshness, wellness, and personal care experiences.",

    image: "/images/products/body-care.jpg",
  },

  {
    title: "Hair",

    description:
      "Hair care categories created to support healthy routines, softness, freshness, and modern grooming.",

    image: "/images/products/hair-care.jpg",
  },
];

export default function ProductCategories() {
  return (
    <section className="evelProductCategories" id="products">
      <div className="evelContainer">
        <div className="evelProductCategoriesHead">
          <span>Our Porducts Categories</span>
          <h2>Product Categories</h2>
          <p>
            Explore our developing cosmetics, face care, body care, and hair
            care product directions.
          </p>
        </div>

        <div className="evelProductCategoriesGrid">
          {categories.map((category) => (
            <article className="evelProductCategoryCard" key={category.title}>
              <div className="evelProductCategoryMedia">
                <PBImage
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="evelProductCategoryImg"
                />
              </div>

                <div className="evelProductCategoryBody">
                  <h3>{category.title}</h3>

                  <p>{category.description}</p>
                </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}