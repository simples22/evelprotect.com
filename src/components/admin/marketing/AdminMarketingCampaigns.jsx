"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

const initialForm = {
  title: "",
  subject: "",
  previewText: "",
  bodyHtml: "",
  bodyText: "",
  heroImage: "",
  ctaLabel: "",
  ctaUrl: "",
  audience: "newsletter",
  status: "draft",
  scheduledAt: "",
};

export default function AdminMarketingCampaigns() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    const res = await fetch("/api/admin/marketing/campaigns");
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
      ? `/api/admin/marketing/campaigns/${editingId}`
      : "/api/admin/marketing/campaigns";

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
    if (!confirm("Delete this campaign?")) return;

    await fetch(`/api/admin/marketing/campaigns/${id}`, {
      method: "DELETE",
    });

    await loadItems();
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "subject", label: "Subject" },
    { key: "audience", label: "Audience" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="evelAdminPage">
      <section className="adminFormPanel">
        <form className="adminForm" onSubmit={handleSubmit}>
          <div className="adminFormSectionTitle">
            <h2>{editingId ? "Edit Campaign" : "Create Campaign"}</h2>
            <p>Create drafts, scheduled campaigns and sent publications.</p>
          </div>

          <div className="adminFormGrid">
            <div className="adminField">
              <label>Campaign Title</label>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            <div className="adminField">
              <label>Email Subject</label>
              <input
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                required
              />
            </div>

            <div className="adminField adminFormFull">
              <label>Preview Text</label>
              <input
                value={form.previewText}
                onChange={(e) => updateField("previewText", e.target.value)}
              />
            </div>

            <div className="adminField adminFormFull">
              <label>Body HTML</label>
              <textarea
                rows={10}
                value={form.bodyHtml}
                onChange={(e) => updateField("bodyHtml", e.target.value)}
                required
              />
            </div>

            <div className="adminField adminFormFull">
              <label>Plain Text</label>
              <textarea
                rows={5}
                value={form.bodyText}
                onChange={(e) => updateField("bodyText", e.target.value)}
              />
            </div>

            <div className="adminField">
              <label>Hero Image</label>
              <input
                value={form.heroImage}
                onChange={(e) => updateField("heroImage", e.target.value)}
              />
            </div>

            <div className="adminField">
              <label>CTA Label</label>
              <input
                value={form.ctaLabel}
                onChange={(e) => updateField("ctaLabel", e.target.value)}
              />
            </div>

            <div className="adminField">
              <label>CTA URL</label>
              <input
                value={form.ctaUrl}
                onChange={(e) => updateField("ctaUrl", e.target.value)}
              />
            </div>

            <div className="adminField">
              <label>Audience</label>
              <select
                value={form.audience}
                onChange={(e) => updateField("audience", e.target.value)}
              >
                <option value="newsletter">Newsletter</option>
                <option value="contacts">Contacts</option>
                <option value="all">All</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div className="adminField">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
              </select>
            </div>

            <div className="adminField">
              <label>Scheduled At</label>
              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => updateField("scheduledAt", e.target.value)}
              />
            </div>
          </div>

          <div className="adminFormActions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Campaign" : "Create Campaign"}
            </button>
          </div>
        </form>
      </section>

      <AdminTable
        title="Marketing Campaigns"
        description="Manage campaign drafts, scheduled campaigns and sent publications."
        columns={columns}
        data={items}
        emptyText="No campaigns found."
        actions={(item) => (
          <>
            <button
              type="button"
              onClick={() => {
                setEditingId(item.id);
                setForm({
                  ...initialForm,
                  ...item,
                  scheduledAt: item.scheduledAt
                    ? new Date(item.scheduledAt).toISOString().slice(0, 16)
                    : "",
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