"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

export default function ProductGrid({ products = [] }) {
  const [filters, setFilters] = useState({
    sort: "latest",
    category: "all",
    type: "all",
    minPrice: "",
    maxPrice: "",
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== "all") {
      result = result.filter((item) => item.category === filters.category);
    }

    if (filters.type === "bestSeller") {
      result = result.filter((item) => item.isBestSeller);
    }

    if (filters.type === "featured") {
      result = result.filter((item) => item.isFeatured);
    }

    if (filters.type === "bestRating") {
      result = result.filter((item) => Number(item.rating || 0) >= 4);
    }

    if (filters.type !== "all" && !["bestSeller", "featured", "bestRating"].includes(filters.type)) {
      result = result.filter((item) =>
        item.tags?.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.minPrice) {
      result = result.filter((item) => Number(item.price) >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((item) => Number(item.price) <= Number(filters.maxPrice));
    }

    if (filters.sort === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (filters.sort === "latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (filters.sort === "views") {
      result.sort((a, b) => Number(b.viewCount || 0) - Number(a.viewCount || 0));
    }

    if (filters.sort === "clicks") {
      result.sort((a, b) => Number(b.clickCount || 0) - Number(a.clickCount || 0));
    }

    return result.slice(0, 6);
  }, [products, filters]);

  return (
    <section className="evelShopGridSection">
      <div className="evelContainer">
        <div className="evelShopLayout">
          <ProductFilter filters={filters} setFilters={setFilters} />

          <div className="evelShopProductsArea">
            <div className="evelShopGridTopbar">
              <p>
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className="evelShopGrid">
              {filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}