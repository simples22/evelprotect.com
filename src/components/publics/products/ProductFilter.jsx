"use client";

import { useState } from "react";

const filterBlocks = [
  {
    key: "sort",
    title: "Filter By",
    options: [
      { label: "Latest", value: "latest" },
      { label: "Oldest", value: "oldest" },
      { label: "Most Viewed", value: "views" },
      { label: "Most Clicked", value: "clicks" },
    ],
  },
  {
    key: "category",
    title: "Category",
    options: [
      { label: "All", value: "all" },
      { label: "Cosmetics", value: "Cosmetics" },
      { label: "Face", value: "Face" },
      { label: "Hair", value: "Hair" },
      { label: "Body", value: "Body Care" },
    ],
  },
  {
    key: "type",
    title: "Products Type",
    options: [
      { label: "All Products", value: "all" },
      { label: "New", value: "New" },
      { label: "Best Sellers", value: "bestSeller" },
      { label: "Best Rating", value: "bestRating" },
      { label: "Featured", value: "featured" },
      { label: "Promo", value: "Promo" },
    ],
  },
];

export default function ProductFilter({ filters, setFilters }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [open, setOpen] = useState({
    sort: true,
    category: true,
    price: true,
    type: true,
  });

  function toggle(key) {
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function update(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetFilters() {
    setFilters({
      sort: "latest",
      category: "all",
      type: "all",
      minPrice: "",
      maxPrice: "",
    });
  }

  return (
    <>
      <button
        type="button"
        className="evelMobileFilterButton"
        onClick={() => setMobileOpen(true)}
        aria-label="Open product filters"
      >
        <span className="evelFilterIcon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>

        <span>Filter Products</span>
      </button>

      <aside className={`evelShopFilter ${mobileOpen ? "isOpen" : ""}`}>
        <div className="evelShopFilterMobileHead">
          <div>
            <span>Shop Filter</span>
            <h2>Refine Products</h2>
          </div>

          <button
            type="button"
            className="evelShopFilterClose"
            onClick={() => setMobileOpen(false)}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <div className="evelShopFilterIntro">
          <span>Shop Filter</span>
          <h2>Refine Products</h2>
        </div>

        {filterBlocks.map((block) => (
          <div
            className={`evelShopFilterBlock ${open[block.key] ? "isOpen" : ""}`}
            key={block.key}
          >
            <button
              type="button"
              className="evelShopFilterHeader"
              onClick={() => toggle(block.key)}
            >
              <span>{block.title}</span>
              <strong>{open[block.key] ? "−" : "+"}</strong>
            </button>

            <div className="evelShopFilterContent">
              <div className="evelShopFilterInner">
                {block.options.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={`evelShopFilterOption ${
                      filters[block.key] === option.value ? "isActive" : ""
                    }`}
                    onClick={() => update(block.key, option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className={`evelShopFilterBlock ${open.price ? "isOpen" : ""}`}>
          <button
            type="button"
            className="evelShopFilterHeader"
            onClick={() => toggle("price")}
          >
            <span>Price</span>
            <strong>{open.price ? "−" : "+"}</strong>
          </button>

          <div className="evelShopFilterContent">
            <div className="evelShopFilterInner">
              <div className="evelShopPriceGrid">
                <label>
                  <span>From</span>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => update("minPrice", e.target.value)}
                    placeholder="0"
                  />
                </label>

                <label>
                  <span>To</span>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => update("maxPrice", e.target.value)}
                    placeholder="500"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="evelShopFilterActions">
          <button
            type="button"
            className="evelShopFilterReset"
            onClick={resetFilters}
          >
            Reset Filter
          </button>

          <button
            type="button"
            className="evelShopFilterApply"
            onClick={() => setMobileOpen(false)}
          >
            Apply Filter
          </button>
        </div>
      </aside>

      <div
        className={`evelShopFilterBackdrop ${mobileOpen ? "isOpen" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
    </>
  );
}