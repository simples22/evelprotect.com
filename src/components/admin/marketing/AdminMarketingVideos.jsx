"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

const initialForm = {
  title: "",
  slug: "",
  excerpt: "",
  videoUrl: "",
  thumbnail: "",
  productName: "",
  category: "",
  isPublished: false,
  isFeatured: false,
};

function safeForm(data = {}) {
  const clean = {};

  Object.keys(initialForm).forEach((key) => {
    clean[key] =
      typeof initialForm[key] === "boolean"
        ? Boolean(data[key])
        : data[key] ?? "";
  });

  return clean;
}

export default function AdminMarketingVideos() {
  const [items, setItems] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(safeForm());
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    const res = await fetch("/api/admin/marketing/videos");
    const data = await res.json();

    if (data.success) setItems(data.items || []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]:
        typeof initialForm[key] === "boolean" ? Boolean(value) : value ?? "",
    }));
  }

  async function uploadFile(file, field) {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Upload failed.");
      return;
    }

    updateField(field, data.url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    const endpoint = editingId
      ? `/api/admin/marketing/videos/${editingId}`
      : "/api/admin/marketing/videos";

    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safeForm(form)),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to sevel.");
        return;
      }

      setForm(safeForm());
      setEditingId(null);
      setFormOpen(false);
      await loadItems();
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm(safeForm(item));
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this marketing video?")) return;

    await fetch(`/api/admin/marketing/videos/${id}`, {
      method: "DELETE",
    });

    await loadItems();
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "productName", label: "Product" },
    { key: "category", label: "Category" },
    {
      key: "isPublished",
      label: "Published",
      render: (item) => (item.isPublished ? "Yes" : "No"),
    },
  ];

  return (
    <div className="evelAdminPage">
      <div className="adminFormActions">
        <button
          type="button"
          onClick={() => {
            setFormOpen(true);
            setEditingId(null);
            setForm(safeForm());
          }}
        >
          Create Marketing Video
        </button>
      </div>

      {formOpen && (
        <section className="adminFormPanel">
          <form className="adminForm" onSubmit={handleSubmit}>
            <div className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h2>{editingId ? "Edit Marketing Video" : "Create Marketing Video"}</h2>
                <p>Publish promotional product videos for the public website.</p>
              </div>

              <div className="adminFormGrid">
                <div className="adminField">
                  <label>Video Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    required
                  />
                </div>

                <div className="adminField">
                  <label>Slug</label>
                  <input
                    value={form.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                    placeholder="auto-generated if empty"
                  />
                </div>

                <div className="adminField">
                  <label>Product Name</label>
                  <input
                    value={form.productName}
                    onChange={(e) => updateField("productName", e.target.value)}
                  />
                </div>

                <div className="adminField">
                  <label>Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                  />
                </div>

                <div className="adminField adminFormFull">
                  <label>Short Description</label>
                  <textarea
                    rows={4}
                    value={form.excerpt}
                    onChange={(e) => updateField("excerpt", e.target.value)}
                  />
                </div>

                <div className="adminField adminFormFull">
                  <label>Upload Video</label>
                  <div className="adminUploadBox">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        uploadFile(e.target.files?.[0], "videoUrl")
                      }
                    />
                    <div className="adminUploadContent">
                      <strong>Drag & drop video here</strong>
                      <span>MP4, WEBM, MOV accepted.</span>
                    </div>
                  </div>
                    {form.videoUrl && (
                        <div className="adminVideoPreview">
                            <video
                            src={form.videoUrl}
                            controls
                            muted
                            playsInline
                            preload="metadata"
                            />

                            <div className="adminImagePreviewCaption">
                            {form.videoUrl}
                            </div>
                        </div>
                        )}
                </div>

                <div className="adminField adminFormFull">
                  <label>Upload Thumbnail</label>
                  <div className="adminUploadBox">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        uploadFile(e.target.files?.[0], "thumbnail")
                      }
                    />
                    <div className="adminUploadContent">
                      <strong>Drag & drop thumbnail here</strong>
                      <span>JPG, PNG, WEBP accepted.</span>
                    </div>
                  </div>

                  {form.thumbnail && (
                    <div className="adminImagePreview isCard">
                      <img src={form.thumbnail} alt="Thumbnail preview" />
                      <div className="adminImagePreviewCaption">
                        {form.thumbnail}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="adminChecks">
                <label className="adminCheck">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) =>
                      updateField("isPublished", e.target.checked)
                    }
                  />
                  Published
                </label>

                <label className="adminCheck">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) =>
                      updateField("isFeatured", e.target.checked)
                    }
                  />
                  Featured
                </label>
              </div>

              <div className="adminFormActions">
                <button type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Update Video" : "Create Video"}
                </button>

                <button
                  type="button"
                  className="adminBtn isGhost"
                  onClick={() => {
                    setFormOpen(false);
                    setEditingId(null);
                    setForm(safeForm());
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </section>
      )}

      <AdminTable
        title="Marketing Videos"
        description="Manage product videos and public marketing content."
        columns={columns}
        data={items}
        emptyText="No marketing videos found."
        actions={(item) => (
          <>
            <button type="button" onClick={() => handleEdit(item)}>
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