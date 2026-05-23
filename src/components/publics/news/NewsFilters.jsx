"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";

const types = [
  "Business",
  "Freshness",
  "Skin care",
  "Body care",
  "Sustainability",
  "Operation",
];

export default function NewsFilters({ filters, setFilters }) {
  const [openMobile, setOpenMobile] = useState(false);
  const [openSection, setOpenSection] = useState({
    published: true,
    period: true,
    type: true,
  });

  function toggleType(type) {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      types: prev.types.includes(type)
        ? prev.types.filter((item) => item !== type)
        : [...prev.types, type],
    }));
  }

  function resetFilters() {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      from: "",
      to: "",
      types: [],
      sort: "latest",
    }));
  }

  return (
    <>
      <button
        type="button"
        className="newsMobileFilterBtn"
        onClick={() => setOpenMobile(true)}
      >
        <FontAwesomeIcon icon={faFilter} />
        <span>Filter</span>
      </button>

      <aside className={`newsFilters ${openMobile ? "isOpen" : ""}`}>
        <div className="newsFiltersTop">
          <strong>Filters</strong>

          <button
            type="button"
            className="newsFiltersClose"
            onClick={() => setOpenMobile(false)}
            aria-label="Close filters"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="newsFilterAccordion">
          <button
            type="button"
            className="newsFilterAccordionBtn"
            onClick={() =>
              setOpenSection((prev) => ({
                ...prev,
                published: !prev.published,
              }))
            }
          >
            Search by published
            <span>{openSection.published ? "−" : "+"}</span>
          </button>

          {openSection.published && (
            <div className="newsFilterAccordionBody">
              <div className="newsSortList">
                <label className="newsTypeCheck">
                  <input
                    type="radio"
                    name="newsSort"
                    checked={filters.sort === "latest"}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        page: 1,
                        sort: "latest",
                      }))
                    }
                  />
                  Latest newest →
                </label>

                <label className="newsTypeCheck">
                  <input
                    type="radio"
                    name="newsSort"
                    checked={filters.sort === "oldest"}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        page: 1,
                        sort: "oldest",
                      }))
                    }
                  />
                  Oldest ←
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="newsFilterAccordion">
          <button
            type="button"
            className="newsFilterAccordionBtn"
            onClick={() =>
              setOpenSection((prev) => ({
                ...prev,
                period: !prev.period,
              }))
            }
          >
            Period
            <span>{openSection.period ? "−" : "+"}</span>
          </button>

          {openSection.period && (
            <div className="newsFilterAccordionBody">
              <div className="newsPeriodGrid">
                <label>
                  From
                  <input
                    type="month"
                    value={filters.from}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        page: 1,
                        from: e.target.value,
                      }))
                    }
                  />
                </label>

                <label>
                  To
                  <input
                    type="month"
                    value={filters.to}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        page: 1,
                        to: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="newsFilterAccordion">
          <button
            type="button"
            className="newsFilterAccordionBtn"
            onClick={() =>
              setOpenSection((prev) => ({
                ...prev,
                type: !prev.type,
              }))
            }
          >
            Type
            <span>{openSection.type ? "−" : "+"}</span>
          </button>

          {openSection.type && (
            <div className="newsFilterAccordionBody">
              <div className="newsTypeList">
                {types.map((type) => (
                  <label key={type} className="newsTypeCheck">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="button" className="newsResetFilterBtn" onClick={resetFilters}>
          Reset filters
        </button>
      </aside>

      {openMobile && (
        <button
          type="button"
          className="newsFilterBackdrop"
          onClick={() => setOpenMobile(false)}
          aria-label="Close filters"
        />
      )}
    </>
  );
}