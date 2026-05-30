"use client";

import { useMemo, useState } from "react";

import ProductCard from "./ProductCard";

import EvelCardGrid from "@/components/publics/ui/EvelCardGrid";
import EvelContentLayout from "@/components/publics/ui/EvelContentLayout";
import EvelFilter from "@/components/publics/ui/EvelFilter";
import EvelSearchBar from "@/components/publics/ui/EvelSearchBar";

const initialFilters = {
  search: "",
  sort: "latest",
  category: "all",
  type: "all",
  gamme: "all",
  flavor: "all",
  size: "all",
  availability: "all",
  rating: "",
  minPrice: "",
  maxPrice: "",
  page: 1,
};

function uniqueOptions(items, key, allLabel) {
  const values = [
    ...new Set(items.map((item) => item?.[key]).filter(Boolean)),
  ];

  return [
    { label: allLabel, value: "all" },
    ...values.map((value) => ({
      label: value,
      value,
    })),
  ];
}

export default function ProductGrid({ products = [] }) {
  const [filters, setFilters] = useState(initialFilters);

  const categoryOptions = useMemo(
    () => uniqueOptions(products, "category", "All categories"),
    [products]
  );

  const gammeOptions = useMemo(
    () => uniqueOptions(products, "gamme", "All gammes"),
    [products]
  );

  const flavorOptions = useMemo(() => {
    const values = [
      ...new Set(
        products
          .map((item) => item.flavor || item.scent)
          .filter(Boolean)
      ),
    ];

    return [
      { label: "All scents", value: "all" },
      ...values.map((value) => ({
        label: value,
        value,
      })),
    ];
  }, [products]);

  const filterSections = useMemo(
    () => [
      {
        key: "sort",
        label: "Sort products",
        type: "radio",
        filterKey: "sort",
        options: [
          { label: "Latest", value: "latest" },
          { label: "Oldest", value: "oldest" },
          { label: "Most viewed", value: "views" },
          { label: "Most clicked", value: "clicks" },
        ],
      },
      {
        key: "category",
        label: "Category",
        type: "select",
        filterKey: "category",
        options: categoryOptions,
      },
      {
        key: "gamme",
        label: "Gamme",
        type: "select",
        filterKey: "gamme",
        options: [
          { label: "All gamme", value: "all" },
          { label: "Serative", value: "serative" },
          { label: "Serative Plus ", value: "serative-plus" },
          { label: "Conditioner ", value: "condiditioner" },
          { label: "Shampoo ", value: "shampoo" },
          { label: "Deodorants ", value: "deodorant" },
          { label: "Benefics ", value: "moisturizing" },
          { label: "Shower Lotions ", value: "lotion" },
          { label: "Shower Gels", value: "Gel" },
          { label: "Body Care", value: "body-care" },
          { label: "Shampoo", value: "shampoo" },
          { label: "Hair Care", value: "hair-care" },
          { label: "Face Wash ", value: "face" },
        ],
      },

      {
        key: "flavor",
        label: "Scent",
        type: "select",
        filterKey: "flavor",
        options: flavorOptions,
      },
      {
        key: "size",
        label: "Size",
        type: "radio",
        filterKey: "size",
        options: [
          { label: "All sizes", value: "all" },
          { label: "Travel size", value: "travel" },
          { label: "Regular", value: "regular" },
          { label: "Family size", value: "family" },
        ],
      },
      {
        key: "availability",
        label: "Availability",
        type: "radio",
        filterKey: "availability",
        options: [
          { label: "All", value: "all" },
          { label: "Available", value: "available" },
          { label: "Coming soon", value: "comingSoon" },
          { label: "Featured", value: "featured" },
          { label: "Best Seller", value: "bestSeller" },
        ],
      },
      {
        key: "rating",
        label: "Rating",
        type: "rating",
        filterKey: "rating",
        options: [5, 4, 3, 2, 1],
      },
      {
        key: "price",
        label: "Price range",
        type: "range",
        minKey: "minPrice",
        maxKey: "maxPrice",
        minLabel: "Min price",
        maxLabel: "Max price",
        step: "0.01",
      },
    ],
    [categoryOptions, gammeOptions, flavorOptions]
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const search = filters.search.trim().toLowerCase();

    if (search) {
      result = result.filter((item) =>
        [
          item.title,
          item.category,
          item.type,
          item.gamme,
          item.flavor,
          item.scent,
          item.tags,
          item.shortDescription,
          item.description,
          item.sizeUnit,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search)
      );
    }

    if (filters.category !== "all") {
      result = result.filter((item) => item.category === filters.category);
    }

    if (filters.type !== "all") {
      result = result.filter((item) => item.type === filters.type);
    }

    if (filters.gamme !== "all") {
      result = result.filter(
        (item) =>
          item.gamme?.toLowerCase() === filters.gamme.toLowerCase()
      );
    }

    if (filters.flavor !== "all") {
      result = result.filter((item) => {
        const value = item.flavor || item.scent || "";
        return value.toLowerCase() === filters.flavor.toLowerCase();
      });
    }

    if (filters.size !== "all") {
      result = result.filter((item) => {
        const sizeValue = Number(item.sizeValue || 0);

        if (filters.size === "travel") return sizeValue > 0 && sizeValue <= 3;
        if (filters.size === "regular") return sizeValue > 3 && sizeValue <= 16;
        if (filters.size === "family") return sizeValue > 16;

        return true;
      });
    }

    if (filters.availability === "available") {
      result = result.filter((item) => item.isPublished);
    }

    if (filters.availability === "comingSoon") {
      result = result.filter((item) => item.isComingSoon);
    }

    if (filters.availability === "featured") {
      result = result.filter((item) => item.isFeatured);
    }

    if (filters.availability === "bestSeller") {
      result = result.filter((item) => item.isBestSeller);
    }

    if (filters.rating) {
      result = result.filter(
        (item) => Number(item.rating || 0) >= Number(filters.rating)
      );
    }

    if (filters.minPrice) {
      result = result.filter(
        (item) => Number(item.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(
        (item) => Number(item.price) <= Number(filters.maxPrice)
      );
    }

    if (filters.sort === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (filters.sort === "latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (filters.sort === "views") {
      result.sort(
        (a, b) => Number(b.viewCount || 0) - Number(a.viewCount || 0)
      );
    }

    if (filters.sort === "clicks") {
      result.sort(
        (a, b) => Number(b.clickCount || 0) - Number(a.clickCount || 0)
      );
    }

    return result.slice(0, 12);
  }, [products, filters]);

  return (
    <section className="evelShopGridSection">
      <div className="evelContainer">
        <EvelSearchBar
          label="Search by"
          value={filters.search}
          placeholder="Search products, category, scent..."
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              page: 1,
              search: value,
            }))
          }
          onClear={() =>
            setFilters((prev) => ({
              ...prev,
              page: 1,
              search: "",
            }))
          }
        />
      
        <EvelContentLayout
          topbar={
            <h3>
              Showing {filteredProducts.length} of {products.length} products
            </h3>
          }
          filter={
            <EvelFilter
              title="Product Filters"
              filters={filters}
              setFilters={setFilters}
              resetValues={initialFilters}
              sections={filterSections}
              stats={[
                { label: "Products", value: products.length },
                { label: "Showing", value: filteredProducts.length },
              ]}
            />
          }
        >
          <EvelCardGrid className="evelShopGrid" columns="2">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </EvelCardGrid>
        </EvelContentLayout>
      </div>
    </section>
  );
}