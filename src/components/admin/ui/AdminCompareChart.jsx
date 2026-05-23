"use client";

import { useMemo, useState } from "react";

export default function AdminCompareChart({
  title = "Section comparison",
  subtitle = "Compare one admin section at a time and review its activity behavior.",
  items = [],
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items[activeIndex] || items[0];

  const maxValue = useMemo(() => {
    return Math.max(...items.map((item) => Number(item.value || 0)), 1);
  }, [items]);

  if (!items.length) return null;

  return (
    <section className="adminCompareChart">
      <div className="adminCompareChartHead">
        <div>
          <span>Comparison</span>
          <h2>{title}</h2>
        </div>

        <p>{subtitle}</p>
      </div>

      <div className="adminCompareChartLayout">
        <div className="adminCompareChartTabs">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={activeIndex === index ? "isActive" : ""}
              onClick={() => setActiveIndex(index)}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </button>
          ))}
        </div>

        <article className="adminCompareChartPanel">
          <div className="adminComparePanelTop">
            <span>{activeItem.label}</span>
            <strong>{activeItem.value}</strong>
          </div>

          <h3>{activeItem.title || activeItem.label}</h3>

          <p>
            {activeItem.description ||
              "This section shows the current activity level compared with the other admin modules."}
          </p>

          <div className="adminCompareBarWrap">
            <div className="adminCompareBarLabel">
              <span>Activity level</span>
              <strong>
                {Math.round((Number(activeItem.value || 0) / maxValue) * 100)}%
              </strong>
            </div>

            <div className="adminCompareBar">
              <i
                style={{
                  width: `${Math.max(
                    4,
                    (Number(activeItem.value || 0) / maxValue) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="adminCompareMiniBars">
            {items.map((item) => (
              <div className="adminCompareMiniRow" key={item.label}>
                <span>{item.label}</span>

                <div>
                  <i
                    style={{
                      width: `${Math.max(
                        4,
                        (Number(item.value || 0) / maxValue) * 100
                      )}%`,
                    }}
                  />
                </div>

                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}