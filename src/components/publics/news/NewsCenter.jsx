"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import NewsGrid from "./NewsGrid";
import NewsFilters from "./NewsFilters";
import UILine from "@/components/admin/ui/UILine";

export default function NewsCenter() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    search: "",
    from: "",
    to: "",
    types: [],
    sort: "latest",
  });

  const [data, setData] = useState({
    items: [],
    totalPages: 1,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(filters.page),
        limit: String(filters.limit),
        sort: filters.sort,
      });

      if (filters.search) params.set("search", filters.search);
      if (filters.from) params.set("from", `${filters.from}-01`);
      if (filters.to) params.set("to", `${filters.to}-28`);
      if (filters.types.length) params.set("types", filters.types.join(","));

      const res = await fetch(`/api/public/news?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setData({
          items: json.items,
          totalPages: json.totalPages,
          total: json.total,
        });
      }

      setLoading(false);
    }

    loadNews();
  }, [filters]);

  return (
    <section className="newsCenterSection">
      <div className="evelContainer">
        <div className="newsSearchTop">
          <label>Search by</label>

          <div className="newsSearchTopBox">
            <input
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  page: 1,
                  search: e.target.value,
                }))
              }
              placeholder="Search news..."
            />

            {filters.search && (
              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: 1,
                    search: "",
                  }))
                }
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>
        </div>
<UILine />
        <div className="newsCenterLayout">
          <div className="newsCenterMain">
            <div className="newsCenterMeta">
              <div className="newsCenterMetaText">
                <span>{data.total} results</span>
                {loading && <span>Loading...</span>}
              </div>

              <NewsFilters filters={filters} setFilters={setFilters} />
            </div>

            <NewsGrid items={data.items} />

            <div className="newsPagination">
              <button
                type="button"
                disabled={filters.page <= 1}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                aria-label="Previous page"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <span>
                Page {filters.page} of {data.totalPages}
              </span>

              <button
                type="button"
                disabled={filters.page >= data.totalPages}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                aria-label="Next page"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>

          <div className="newsCenterSidebar">
            <NewsFilters filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>
    </section>
  );
}