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
  return {
    title: data.title || "",
    slug: data.slug || "",
    excerpt: data.excerpt || "",
    videoUrl: data.videoUrl || "",
    thumbnail: data.thumbnail || "",
    productName: data.productName || "",
    category: data.category || "",
    isPublished: Boolean(data.isPublished),
    isFeatured: Boolean(data.isFeatured),
  };
}

export default function AdminMarketingVideos() {
  const [items, setItems] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(safeForm());
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  async function loadItems() {
    const res = await fetch("/api/admin/marketing/videos", {
      cache: "no-store",
    });

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
        typeof initialForm[key] === "boolean"
          ? Boolean(value)
          : value ?? "",
    }));
  }

  async function uploadFile(file, field) {
    if (!file) return;

    const isVideo = field === "videoUrl";

    if (isVideo) setUploadingVideo(true);
    else setUploadingThumbnail(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Upload failed.");
        return;
      }

      updateField(field, data.url);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      if (isVideo) setUploadingVideo(false);
      else setUploadingThumbnail(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving || uploadingVideo || uploadingThumbnail) return;

    const payload = safeForm(form);

    if (!payload.title.trim()) {
      alert("Please enter a video title.");
      return;
    }

    if (!payload.videoUrl.trim()) {
      alert("Please upload a video or paste a video URL.");
      return;
    }

    setSaving(true);

    const endpoint = editingId
      ? `/api/admin/marketing/videos/${editingId}`
      : "/api/admin/marketing/videos";

    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Unable to save video.");
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
          className="adminBtn"
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
                <h2>
                  {editingId
                    ? "Edit Marketing Video"
                    : "Create Marketing Video"}
                </h2>

                <p>
                  Publish promotional product videos for the public website.
                </p>
              </div>

              <div className="adminFormGrid">
                <div className="adminField">
                  <label>Video Title *</label>
                  <input
                    className="adminInput"
                    value={form.title}
                    onChange={(e) =>
                      updateField("title", e.target.value)
                    }
                    placeholder="Example: Evel Protect product campaign"
                    required
                  />
                </div>

                <div className="adminField">
                  <label>Slug</label>
                  <input
                    className="adminInput"
                    value={form.slug}
                    onChange={(e) =>
                      updateField("slug", e.target.value)
                    }
                    placeholder="auto-generated if empty"
                  />
                </div>

                <div className="adminField">
                  <label>Product Name</label>
                  <input
                    className="adminInput"
                    value={form.productName}
                    onChange={(e) =>
                      updateField("productName", e.target.value)
                    }
                  />
                </div>

                <div className="adminField">
                  <label>Category</label>
                  <input
                    className="adminInput"
                    value={form.category}
                    onChange={(e) =>
                      updateField("category", e.target.value)
                    }
                  />
                </div>

                <div className="adminField adminFormFull">
                  <label>Short Description</label>
                  <textarea
                    className="adminTextarea"
                    rows={4}
                    value={form.excerpt}
                    onChange={(e) =>
                      updateField("excerpt", e.target.value)
                    }
                  />
                </div>

                <div className="adminField adminFormFull">
                  <label>Upload Video *</label>

                  <div className="adminUploadBox">
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      disabled={uploadingVideo}
                      onChange={(e) =>
                        uploadFile(e.target.files?.[0], "videoUrl")
                      }
                    />

                    <div className="adminUploadContent">
                      <strong>
                        {uploadingVideo
                          ? "Uploading video..."
                          : "Drag & drop video here"}
                      </strong>
                      <span>MP4, WEBM, MOV accepted.</span>
                    </div>
                  </div>

                  <input
                    className="adminInput"
                    value={form.videoUrl}
                    onChange={(e) =>
                      updateField("videoUrl", e.target.value)
                    }
                    placeholder="Or paste video URL here"
                  />

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
                      disabled={uploadingThumbnail}
                      onChange={(e) =>
                        uploadFile(e.target.files?.[0], "thumbnail")
                      }
                    />

                    <div className="adminUploadContent">
                      <strong>
                        {uploadingThumbnail
                          ? "Uploading thumbnail..."
                          : "Drag & drop thumbnail here"}
                      </strong>
                      <span>JPG, PNG, WEBP accepted.</span>
                    </div>
                  </div>

                  <input
                    className="adminInput"
                    value={form.thumbnail}
                    onChange={(e) =>
                      updateField("thumbnail", e.target.value)
                    }
                    placeholder="Or paste thumbnail URL here"
                  />

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
                <button
                  type="submit"
                  className="adminBtn"
                  disabled={saving || uploadingVideo || uploadingThumbnail}
                >
                  {uploadingVideo
                    ? "Uploading video..."
                    : saving
                    ? "Saving..."
                    : editingId
                    ? "Update Video"
                    : "Create Video"}
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