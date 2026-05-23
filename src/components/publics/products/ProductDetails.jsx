"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ProductRatingAccordion from "./ProductRatingAccordion";

export default function ProductDetails({ product }) {
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  const [activeImage, setActiveImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);

  const [openSections, setOpenSections] = useState({
    description: true,
    packDescription: true,
    ingredientsText: false,
  });

  const tags = product.tags
    ? product.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  function toggleSection(key) {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  const descriptionSections = [
    {
      key: "description",
      title: "Product Description",
      content: product.description,
    },
    {
      key: "packDescription",
      title: "Pack Description",
      content: product.packDescription,
    },
    {
      key: "ingredientsText",
      title: "Ingredients & Product Points",
      content: product.ingredientsText,
      isList: true,
    },
  ].filter((item) => item.content);

  return (
    <main className="evelProductDetailsPage">
      <section className="evelProductHero">
        <div className="evelContainer">
          <nav className="evelBreadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            <strong>{product.title}</strong>
          </nav>
        </div>
      </section>

      <section className="evelProductDetails">
        <div className="evelContainer">
          <div className="evelProductDetailsGrid">
            {/* LEFT IMAGE */}
            <div className="evelProductMainGallery">
              <div className="evelProductMainGalleryMedia">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="evelProductMainGalleryImg"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="evelProductDetailsContent">
              <div className="evelProductDetailsTitleRow">
                <h1>{product.title}</h1>

                <strong>
                  {product.currency} {product.price}
                </strong>
              </div>

              <div className="evelProductDetailsStars">
                {"★".repeat(Math.round(product.rating || 0))}
                {"☆".repeat(5 - Math.round(product.rating || 0))}
                <span>({product.ratingCount || 0})</span>
              </div>

              {product.shortDescription && (
                <p className="evelProductSubtitle">
                  {product.shortDescription}
                </p>
              )}

              <div className="evelProductTags">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="evelProductDetailsActions">
                <div className="evelQty">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button type="button" className="evelAddCart">
                  Add To Cart
                </button>

                <button
                  type="button"
                  className={`evelFavorite ${favorite ? "isActive" : ""}`}
                  onClick={() => setFavorite(!favorite)}
                >
                  ★
                </button>
              </div>

              <div className="evelProductMeta">
                <p>
                  <strong>Category:</strong> {product.category}
                </p>

                <p>
                  <strong>Size:</strong>{" "}
                  {product.sizeValue
                    ? `${product.sizeValue}${product.sizeUnit}`
                    : "—"}
                </p>

                <p>
                  <strong>Pack:</strong> {product.packSize || 1} bottles
                </p>

                {product.pricePerBottle && (
                  <p>
                    <strong>Price per bottle:</strong> {product.currency}{" "}
                    {product.pricePerBottle}
                  </p>
                )}
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="evelProductThumbsBottom">
                  {images.map((image) => (
                    <button
                      type="button"
                      key={image}
                      className={
                        activeImage === image ? "isActive" : ""
                      }
                      onClick={() => setActiveImage(image)}
                    >
                      <Image
                        src={image}
                        alt={product.title}
                        fill
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ACCORDIONS */}
          <div className="evelProductReviewDetails">
            <h2>Product Details</h2>

            {descriptionSections.map((section) => {
              const isOpen = openSections[section.key];

              return (
                <article
                  className={`evelProductDescAccordion ${
                    isOpen ? "isOpen" : ""
                  }`}
                  key={section.key}
                >
                  <button
                    type="button"
                    className="evelProductDescButton"
                    onClick={() => toggleSection(section.key)}
                  >
                    <span>{section.title}</span>
                    <strong>{isOpen ? "−" : "+"}</strong>
                  </button>

                  <div className="evelProductDescContent">
                    <div className="evelProductDescInner">
                      {section.isList ? (
                        <ul>
                          {section.content
                            .split("\n")
                            .filter(Boolean)
                            .map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                        </ul>
                      ) : (
                        <p>{section.content}</p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            <ProductRatingAccordion slug={product.slug} />
          </div>
        </div>
      </section>
    </main>
  );
}