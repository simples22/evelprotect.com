"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

const initialForm = {
  name: "",
  description: "",
  source: "custom",
};

export default function AdminMarketingAudiences() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    const res = await fetch("/api/admin/marketing/audiences");
    const data = await res.json();
    if (data.success) setItems(data.items || []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value ?? "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    const endpoint = editingId
      ? `/api/admin/marketing/audiences/${editingId}`
      : "/api/admin/marketing/audiences";

    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to sevel.");
        return;
      }

      setForm(initialForm);
      setEditingId(null);
      await loadItems();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this audience?")) return;

    await fetch(`/api/admin/marketing/audiences/${id}`, {
      method: "DELETE",
    });

    await loadItems();
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "source", label: "Source" },
    {
      key: "members",
      label: "Members",
      render: (item) => item.members?.length || 0,
    },
  ];

  return (
    <div className="evelAdminPage">
      <section className="adminFormPanel">
        <form className="adminForm" onSubmit={handleSubmit}>
          <div className="adminFormSectionTitle">
            <h2>{editingId ? "Edit Audience" : "Create Audience"}</h2>
            <p>Create groups for campaigns and targeted messages.</p>
          </div>

          <div className="adminFormGrid">
            <div className="adminField">
              <label>Audience Name</label>
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>

            <div className="adminField">
              <label>Source</label>
              <select
                value={form.source}
                onChange={(e) => updateField("source", e.target.value)}
              >
                <option value="custom">Custom</option>
                <option value="newsletter">Newsletter</option>
                <option value="contact">Contact</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div className="adminField adminFormFull">
              <label>Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>
          </div>

          <div className="adminFormActions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Audience" : "Create Audience"}
            </button>
          </div>
        </form>
      </section>

      <AdminTable
        title="Marketing Audiences"
        description="Manage subscriber, contact and custom audiences."
        columns={columns}
        data={items}
        emptyText="No audiences found."
        actions={(item) => (
          <>
            <button
              type="button"
              onClick={() => {
                setEditingId(item.id);
                setForm({
                  name: item.name || "",
                  description: item.description || "",
                  source: item.source || "custom",
                });
              }}
            >
              Edit
            </button>

            <button type="button" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </>
        )}
      />
    </div>
  );
}