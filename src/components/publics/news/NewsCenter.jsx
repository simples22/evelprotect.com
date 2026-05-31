"use client";

import { useEffect, useMemo, useState } from "react";

import NewsGrid from "./NewsGrid";

import EvelButton from "@/components/publics/ui/EvelButton";
import EvelContentLayout from "@/components/publics/ui/EvelContentLayout";
import EvelFilter from "@/components/publics/ui/EvelFilter";
import EvelSearchBar from "@/components/publics/ui/EvelSearchBar";

const initialFilters = {
  page: 1,
  limit: 6,
  search: "",
  sort: "latest",
  category: "all",
  type: [],
  topic: [],
  period: "",
  from: "",
  to: "",
};

export default function NewsCenter() {
  const [filters, setFilters] = useState(initialFilters);

  const [data, setData] = useState({
    items: [],
    totalPages: 1,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  const filterSections = useMemo(
    () => [
      {
        key: "sort",
        label: "Published",
        type: "radio",
        filterKey: "sort",
        options: [
          { label: "Latest newest", value: "latest" },
          { label: "Oldest", value: "oldest" },
          { label: "Most viewed", value: "views" },
        ],
      },
      {
        key: "category",
        label: "Category",
        type: "select",
        filterKey: "category",
        options: [
          { label: "All categories", value: "all" },
          { label: "Business", value: "Business" },
          { label: "Products", value: "Products" },
          { label: "Company", value: "Company" },
          { label: "Marketing", value: "Marketing" },
          { label: "Sustainability", value: "Sustainability" },
          { label: "Operations", value: "Operations" },
        ],
      },
      {
        key: "topics",
        label: "Topics",
        type: "checkbox",
        filterKey: "topic",
        options: [
          { label: "Freshness", value: "Freshness" },
          { label: "Body care", value: "Body care" },
          { label: "Hair care", value: "Hair care" },
          { label: "Skin care", value: "Skin care" },
          { label: "Cosmetics", value: "Cosmetics" },
          { label: "Wellness", value: "Wellness" },
          { label: "Innovation", value: "Innovation" },
          { label: "Global", value: "Global" },
        ],
      },
      {
        key: "period",
        label: "Period",
        type: "period",
        fromKey: "from",
        toKey: "to",
        inputType: "month",
      },
    ],
    []
  );

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: String(filters.page),
      limit: String(filters.limit),
      sort: filters.sort,
    });

    if (filters.search) params.set("search", filters.search);

    if (filters.category !== "all") {
      params.set("category", filters.category);
    }

    if (filters.from) params.set("from", `${filters.from}-01`);
    if (filters.to) params.set("to", `${filters.to}-31`);

    if (filters.topic.length) {
      params.set("topics", filters.topic.join(","));
    }

    return params.toString();
  }, [filters]);

    useEffect(() => {
      async function loadNews() {
        setLoading(true);

        try {
          const res = await fetch(`/api/public/news?${queryString}`, {
            cache: "no-store",
          });

          const json = await res.json();

          if (json.success) {
            const total = Number(json.total || 0);
            const totalPages = Number(
              json.totalPages || Math.ceil(total / initialFilters.limit) || 1
            );

            setData({
              items: json.items || [],
              totalPages,
              total,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      loadNews();
    }, [queryString]);


  const showPagination = data.total > filters.limit;

  return (
    <section className="newsCenterSection">
      <div className="evelContainer">
        <EvelSearchBar
          label="Search by"
          value={filters.search}
          placeholder="Search news, products, sustainability, operations..."
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
            <p>
              Showing {data.items.length} of {data.total} news
              {loading && <span> Loading...</span>}
            </p>
          }
          filter={
            <EvelFilter
              title="News Filters"
              filters={filters}
              setFilters={setFilters}
              resetValues={initialFilters}
              sections={filterSections}
              stats={[
                { label: "Articles", value: data.total },
                { label: "Showing", value: data.items.length },
              ]}
            />
          }
        >
          <NewsGrid items={data.items} columns="2" />

          {showPagination && (
            <div className="evelContentPagination">
              <div className="evelPaginationBtn">
                <EvelButton
                  variant="nav"
                  direction="left"
                  disabled={filters.page <= 1}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.max(1, prev.page - 1),
                    }))
                  }
                >
                  Previous
                </EvelButton>
              </div>

              <span className="evelPaginationText">
                Page {filters.page} of {data.totalPages}
              </span>

              <div className="evelPaginationBtn">
                <EvelButton
                  variant="nav"
                  direction="right"
                  disabled={filters.page >= data.totalPages}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.min(data.totalPages, prev.page + 1),
                    }))
                  }
                >
                  Next
                </EvelButton>
              </div>
            </div>
          )}
        </EvelContentLayout>
      </div>
    </section>
  );
}