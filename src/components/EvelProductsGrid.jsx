import Image from "next/image";

const products = [
  {
    title: "Deodorant Spray",
    category: "Personal Care, ACTIVE MEN™ Sports",
    image: "/images/products/evel-deodorant-pray.png",
  },
  {
    title: "Deodorant Gel",
    category: "Fresh Care, EVEL™ Cosmetics Group",
    image: "/images/products/evel-deodorant-gel.png",
  },
  {
    title: "Body Wash Shower Gel",
    category: "Body Care, EVEL™ Cosmetics Group",
    image: "/images/products/evel-body-wash.png",
  },
  {
    title: "Moisturising Shampoo",
    category: "Hair Care, COsmetics Brand Partners",
    image: "/images/products/evel-shampoo.png",
  },
];

export default function EvelProductsGrid() {
  return (
    <section className="evelProductsGridSection">
      <div className="evelContainer">
        <div className="evelProductsGridHead">
          <h2>Modern Everyday Care Products</h2>
        </div>

        <div className="evelProductsGrid">
          {products.map((product) => (
            <article
              className="evelProductsCard"
              key={product.title}
            >
              <div className="evelProductsCardMedia">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="evelProductsCardImg"
                />
              </div>

              <div className="evelProductsCardBody">
                <small>{product.category}</small>

                <h3>{product.title}</h3>

                <p>Evel Protect™ Cosmetics Group</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}