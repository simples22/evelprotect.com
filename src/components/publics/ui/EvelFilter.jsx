"use client";

import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function EvelFilter({
  title = "Filters",
  filters = {},
  setFilters,
  sections = [],
  resetValues = {},
  stats = [],
}) {
  const [openMobile, setOpenMobile] = useState(false);

  const [openSection, setOpenSection] = useState(() =>
    sections.reduce((acc, section) => {
      acc[section.key] = section.defaultOpen ?? true;
      return acc;
    }, {})
  );

  useEffect(() => {
    document.body.classList.toggle("evelFilterOpen", openMobile);

    return () => {
      document.body.classList.remove("evelFilterOpen");
    };
  }, [openMobile]);

  const activeCount = useMemo(() => {
    return Object.entries(filters).filter(([key, value]) => {
      if (["page", "limit"].includes(key)) return false;
      if (value === "" || value === "all" || value === false) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return value !== undefined && value !== null;
    }).length;
  }, [filters]);

  function updateFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      [key]: value,
    }));
  }

  function toggleArrayValue(key, value) {
    setFilters((prev) => {
      const current = Array.isArray(prev[key]) ? prev[key] : [];

      return {
        ...prev,
        page: 1,
        [key]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  }

function resetFilters() {
    setFilters({
            ...resetValues,
            page: 1,
        });

        setOpenMobile(false);
        }

    function saveChoices() {
     setOpenMobile(false);
 }

  function renderOptions(section, inputType = "radio") {
    return (
      <div className="evelFilterList">
        {(section.options || []).map((option) => {
          const checked =
            inputType === "checkbox"
              ? (filters[section.filterKey] || []).includes(option.value)
              : filters[section.filterKey] === option.value;

          return (
            <label className="evelFilterCheck" key={option.value}>
              <input
                type={inputType}
                name={section.key}
                checked={checked}
                onChange={() =>
                  inputType === "checkbox"
                    ? toggleArrayValue(section.filterKey, option.value)
                    : updateFilter(section.filterKey, option.value)
                }
              />

              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <div className="evelFilterShell">
      <button
        type="button"
        className="evelMobileFilterBtn"
        onClick={() => setOpenMobile(true)}
      >
        <FontAwesomeIcon icon={faSliders} />
        <span>Filter{activeCount ? ` (${activeCount})` : ""}</span>
      </button>

      <aside className={`evelFilters ${openMobile ? "isOpen" : ""}`}>
        <div className="evelFiltersTop">
          <strong>{title}</strong>

          <button
            type="button"
            className="evelFiltersClose"
            onClick={() => setOpenMobile(false)}
            aria-label="Close filters"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {(stats.length > 0 || activeCount > 0) && (
          <div className="evelFilterStats">
            {stats.map((item) => (
              <span key={`${item.label}-${item.value}`}>
                <strong>{item.value}</strong>
                {item.label}
              </span>
            ))}

            {activeCount > 0 && (
              <span>
                <strong>{activeCount}</strong>
                Active
              </span>
            )}
          </div>
        )}

        {sections.map((section) => (
          <div className="evelFilterAccordion" key={section.key}>
            <button
              type="button"
              className="evelFilterAccordionBtn"
              onClick={() =>
                setOpenSection((prev) => ({
                  ...prev,
                  [section.key]: !prev[section.key],
                }))
              }
            >
              {section.label}
              <span>{openSection[section.key] ? "−" : "+"}</span>
            </button>

            {openSection[section.key] && (
              <div className="evelFilterAccordionBody">
                {section.description && (
                  <p className="evelFilterDescription">
                    {section.description}
                  </p>
                )}

                {section.type === "search" && (
                  <div className="evelFilterSearch">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                      type="search"
                      value={filters[section.filterKey] || ""}
                      placeholder={section.placeholder || "Search..."}
                      onChange={(e) =>
                        updateFilter(section.filterKey, e.target.value)
                      }
                    />
                  </div>
                )}

                {section.type === "radio" && renderOptions(section, "radio")}

                {section.type === "checkbox" &&
                  renderOptions(section, "checkbox")}

                {section.type === "chips" && (
                  <div className="evelFilterChips">
                    {(section.options || []).map((option) => {
                      const current = Array.isArray(filters[section.filterKey])
                        ? filters[section.filterKey]
                        : [];

                      const selected = current.includes(option.value);

                      return (
                        <button
                          type="button"
                          key={option.value}
                          className={selected ? "isSelected" : ""}
                          onClick={() =>
                            toggleArrayValue(section.filterKey, option.value)
                          }
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {section.type === "select" && (
                  <select
                    className="evelFilterSelect"
                    value={filters[section.filterKey] || ""}
                    onChange={(e) =>
                      updateFilter(section.filterKey, e.target.value)
                    }
                  >
                    {(section.options || []).map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {section.type === "boolean" && (
                  <label className="evelFilterToggle">
                    <input
                      type="checkbox"
                      checked={Boolean(filters[section.filterKey])}
                      onChange={(e) =>
                        updateFilter(section.filterKey, e.target.checked)
                      }
                    />
                    <span>{section.toggleLabel || section.label}</span>
                  </label>
                )}

                {section.type === "number" && (
                  <div className="evelFilterRange">
                    <label>
                      {section.inputLabel || section.label}
                      <input
                        type="number"
                        min={section.min}
                        max={section.max}
                        step={section.step || 1}
                        value={filters[section.filterKey] || ""}
                        onChange={(e) =>
                          updateFilter(section.filterKey, e.target.value)
                        }
                      />
                    </label>
                  </div>
                )}

                {section.type === "rating" && (
                  <div className="evelFilterList">
                    {(section.options || [5, 4, 3, 2, 1]).map((rating) => (
                      <label className="evelFilterCheck" key={rating}>
                        <input
                          type="radio"
                          name={section.key}
                          checked={
                            String(filters[section.filterKey]) ===
                            String(rating)
                          }
                          onChange={() =>
                            updateFilter(section.filterKey, String(rating))
                          }
                        />

                        <span>{"★".repeat(rating)} & up</span>
                      </label>
                    ))}
                  </div>
                )}

                {section.type === "range" && (
                  <div className="evelFilterRange">
                    <label>
                      {section.minLabel || "Min"}
                      <input
                        type="number"
                        min={section.min}
                        max={section.max}
                        step={section.step || 1}
                        value={filters[section.minKey] || ""}
                        onChange={(e) =>
                          updateFilter(section.minKey, e.target.value)
                        }
                      />
                    </label>

                    <label>
                      {section.maxLabel || "Max"}
                      <input
                        type="number"
                        min={section.min}
                        max={section.max}
                        step={section.step || 1}
                        value={filters[section.maxKey] || ""}
                        onChange={(e) =>
                          updateFilter(section.maxKey, e.target.value)
                        }
                      />
                    </label>
                  </div>
                )}

                {section.type === "period" && (
                  <div className="evelFilterRange">
                    <label>
                      {section.fromLabel || "From"}
                      <input
                        type={section.inputType || "month"}
                        value={filters[section.fromKey] || ""}
                        onChange={(e) =>
                          updateFilter(section.fromKey, e.target.value)
                        }
                      />
                    </label>

                    <label>
                      {section.toLabel || "To"}
                      <input
                        type={section.inputType || "month"}
                        value={filters[section.toKey] || ""}
                        onChange={(e) =>
                          updateFilter(section.toKey, e.target.value)
                        }
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="evelFilterActions">
            <button
                type="button"
                className="evelSaveFilterBtn"
                onClick={saveChoices}
            >
                Save choices
            </button>

            <button
                type="button"
                className="evelResetFilterBtn"
                onClick={resetFilters}
            >
                Reset filters
            </button>
            </div>
      </aside>

      {openMobile && (
        <button
          type="button"
          className="evelFilterBackdrop"
          onClick={() => setOpenMobile(false)}
          aria-label="Close filters"
        />
      )}
    </div>
  );
}