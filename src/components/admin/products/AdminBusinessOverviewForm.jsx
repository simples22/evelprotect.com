"use client";

import { useEffect, useState } from "react";

const initialForm = {
  title: "Business Overview",
  description: "",
  currentYear: new Date().getFullYear(),
  currentUnitsSold: 0,
  currentRevenueUsd: 0,
  previousYear: new Date().getFullYear() - 1,
  previousChangePct: 0,
  previousUnitsSold: 0,
  previousRevenueUsd: 0,
  isPublished: true,
};

function safeValue(value) {
  return value ?? "";
}

export default function AdminBusinessOverviewForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function loadOverview() {
    try {
      const res = await fetch("/api/admin/business-overview", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success && data.item) {
        setForm({
          ...initialForm,
          ...data.item,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    try {
      const res = await fetch("/api/admin/business-overview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          currentYear: Number(form.currentYear),
          currentUnitsSold: Number(form.currentUnitsSold),
          currentRevenueUsd: Number(form.currentRevenueUsd),
          previousYear: Number(form.previousYear),
          previousChangePct: Number(form.previousChangePct),
          previousUnitsSold: Number(form.previousUnitsSold),
          previousRevenueUsd: Number(form.previousRevenueUsd),
          isPublished: Boolean(form.isPublished),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to save business overview.");
        return;
      }

      setForm({
        ...initialForm,
        ...data.item,
      });

      alert("Business overview saved.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadOverview();
  }, []);

  return (
    <section className="adminAccordion">
      <button
        type="button"
        className="adminAccordionToggle"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>
          <span>Business Overview</span>
          <strong>Manage business sales, revenues and public overview.</strong>
        </div>

        <span className={`adminAccordionArrow ${open ? "isOpen" : ""}`}>
          +
        </span>
      </button>

      <div className={`adminAccordionContent ${open ? "isOpen" : ""}`}>
        <form className="adminFormPanel adminForm" onSubmit={handleSubmit}>
          {loading ? (
            <p>Loading business overview...</p>
          ) : (
            <>
              <div className="adminFormGrid">
                <div className="adminField adminFormFull">
                  <label>Title</label>
                  <input
                    value={safeValue(form.title)}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Business Overview"
                    required
                  />
                </div>

                <div className="adminField adminFormFull">
                  <label>Description</label>
                  <textarea
                    rows={4}
                    value={safeValue(form.description)}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                    placeholder="Write the public overview description..."
                  />
                </div>
              </div>

              <div className="adminBusinessOverviewGrid">
                <div className="adminBusinessOverviewColumn">
                  <div className="adminBusinessOverviewHead">
                    <span>Current Year</span>
                    <strong>Current business performance and revenues</strong>
                  </div>

                  <div className="adminField">
                    <label>Current Year</label>
                    <input
                      type="number"
                      value={safeValue(form.currentYear)}
                      onChange={(e) =>
                        updateField("currentYear", e.target.value)
                      }
                    />
                  </div>

                  <div className="adminField">
                    <label>Sales Units</label>
                    <input
                      type="number"
                      value={safeValue(form.currentUnitsSold)}
                      onChange={(e) =>
                        updateField("currentUnitsSold", e.target.value)
                      }
                    />
                  </div>

                  <div className="adminField">
                    <label>Global Revenue USD</label>
                    <input
                      type="number"
                      step="0.01"
                      value={safeValue(form.currentRevenueUsd)}
                      onChange={(e) =>
                        updateField("currentRevenueUsd", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="adminBusinessOverviewColumn">
                  <div className="adminBusinessOverviewHead">
                    <span>Previous Year</span>
                    <strong>Compare yearly growth and performance</strong>
                  </div>

                  <div className="adminField">
                    <label>Previous Year</label>
                    <input
                      type="number"
                      value={safeValue(form.previousYear)}
                      onChange={(e) =>
                        updateField("previousYear", e.target.value)
                      }
                    />
                  </div>

                  <div className="adminField">
                    <label>% Increase / Decrease</label>
                    <input
                      type="number"
                      step="0.01"
                      value={safeValue(form.previousChangePct)}
                      onChange={(e) =>
                        updateField("previousChangePct", e.target.value)
                      }
                    />
                  </div>

                  <div className="adminField">
                    <label>Products Sold</label>
                    <input
                      type="number"
                      value={safeValue(form.previousUnitsSold)}
                      onChange={(e) =>
                        updateField("previousUnitsSold", e.target.value)
                      }
                    />
                  </div>

                  <div className="adminField">
                    <label>Revenue USD</label>
                    <input
                      type="number"
                      step="0.01"
                      value={safeValue(form.previousRevenueUsd)}
                      onChange={(e) =>
                        updateField("previousRevenueUsd", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="adminChecks">
                <label className="adminCheck">
                  <input
                    type="checkbox"
                    checked={Boolean(form.isPublished)}
                    onChange={(e) =>
                      updateField("isPublished", e.target.checked)
                    }
                  />
                  Published
                </label>
              </div>

              <div className="adminFormActions">
                <button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Business Overview"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}