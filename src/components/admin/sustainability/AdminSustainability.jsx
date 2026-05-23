"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

const initialForm = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  heroImage: "",

  introTitle: "",
  introText: "",
  introImage: "",

  document1Title: "",
  document1Url: "",
  document2Title: "",
  document2Url: "",
  document3Title: "",
  document3Url: "",

  insight1: "",
  insight2: "",
  insight3: "",
  insight4: "",
  insight5: "",
  insight6: "",
  insight7: "",
  insight8: "",
  insight9: "",
  insight10: "",

  section1Title: "",
  section1Text: "",
  section2Title: "",
  section2Text: "",

  card1Title: "",
  card1Text: "",
  card2Title: "",
  card2Text: "",
  card3Title: "",
  card3Text: "",

  conclusion: "",

  section3Title: "",
  section3Text: "",
  section3Image: "",
  section4Title: "",
  section4Text: "",
  section4Image: "",
  section5Title: "",
  section5Text: "",
  section5Image: "",

  fixedBgImage: "",

  source1: "",
  source2: "",
  source3: "",
  source4: "",
  source5: "",
  source6: "",
  source7: "",
  source8: "",
  source9: "",
  source10: "",

  isPublished: false,
  isFeatured: false,
};

function createSafeForm(data = {}) {
  const safe = {};

  Object.keys(initialForm).forEach((key) => {
    if (typeof initialForm[key] === "boolean") {
      safe[key] = Boolean(data[key]);
    } else {
      safe[key] = data[key] ?? "";
    }
  });

  return safe;
}

function isImageUrl(value = "") {
  return /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(value);
}

function UploadBox({ label, value, accept = "image/*", onUploaded, hint }) {
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file) {
    if (!file || uploading) return;

    setUploading(true);

    try {
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

      onUploaded(data.url);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setDrag(false);
    }
  }

  return (
    <div className="adminField adminFormFull">
      <label>{label}</label>

      <div
        className={`adminUploadBox ${drag ? "isDragActive" : ""}`}
        onDragEnter={() => setDrag(true)}
        onDragLeevel={() => setDrag(false)}
        onDrop={() => setDrag(false)}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => uploadFile(e.target.files?.[0])}
        />

        <div className="adminUploadContent">
          <strong>{uploading ? "Uploading..." : "Drag & drop file here"}</strong>
          <span>{hint || "Upload or replace this file."}</span>
        </div>
      </div>

      {value && (
        <div className={`adminImagePreview ${isImageUrl(value) ? "isCard" : ""}`}>
          {isImageUrl(value) && <img src={value} alt={label} />}
          <div className="adminImagePreviewCaption">{value}</div>
        </div>
      )}
    </div>
  );
}

export default function AdminSustainability() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(createSafeForm());

  async function loadItems() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/sustainability");
      const data = await res.json();

      if (data.success) {
        setItems(data.items || []);
      }
    } finally {
      setLoading(false);
    }
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving) return;

    setSaving(true);

    try {
      const endpoint = editingId
        ? `/api/admin/sustainability/${editingId}`
        : "/api/admin/sustainability";

      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createSafeForm(form)),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to sevel.");
        return;
      }

      setForm(createSafeForm());
      setEditingId(null);
      setFormOpen(false);

      await loadItems();
    } finally {
      setSaving(false);
    }
  }

  function handleCreateNew() {
    setEditingId(null);
    setForm(createSafeForm());
    setFormOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm(createSafeForm(item));
    setFormOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this sustainability post?")) return;

    await fetch(`/api/admin/sustainability/${id}`, {
      method: "DELETE",
    });

    await loadItems();
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "isPublished",
      label: "Published",
      render: (item) => (item.isPublished ? "Yes" : "No"),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (item) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  function renderInput(name, label, props = {}) {
    return (
      <div className="adminField" key={name}>
        <label>{label}</label>

        <input
          className="adminInput"
          value={form[name] || ""}
          onChange={(e) => updateField(name, e.target.value)}
          {...props}
        />
      </div>
    );
  }

  function renderTextarea(name, label, rows = 6, large = false) {
    return (
      <div className="adminField adminFormFull" key={name}>
        <label>{label}</label>

        <textarea
          className={`adminTextarea ${large ? "isLarge" : ""}`}
          rows={rows}
          value={form[name] || ""}
          onChange={(e) => updateField(name, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="evelAdminPage">
      <div className="adminFormActions">
        <button type="button" onClick={handleCreateNew}>
          {formOpen ? "Create Another Post" : "Create Sustainability Post"}
        </button>

        {formOpen && (
          <button
            type="button"
            className="adminBtn isGhost"
            onClick={() => {
              setFormOpen(false);
              setEditingId(null);
              setForm(createSafeForm());
            }}
          >
            Close Form
          </button>
        )}
      </div>

      {formOpen && (
        <section className="adminFormPanel">
          <form className="adminForm" onSubmit={handleSubmit}>
            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h2>{editingId ? "Edit Sustainability Post" : "Create Sustainability Post"}</h2>
                <p>
                  Simple editor for writers with upload, mobile editing, and
                  publish controls.
                </p>
              </div>

              <div className="adminFormGrid">
                {renderInput("title", "Hero Title", { required: true })}
                {renderInput("slug", "Slug")}
                {renderInput("category", "Category")}
                {renderTextarea("excerpt", "Hero Subtitle", 4)}

                <UploadBox
                  label="Hero Image"
                  value={form.heroImage}
                  hint="JPG, PNG, WEBP recommended."
                  accept="image/*"
                  onUploaded={(url) => updateField("heroImage", url)}
                />
              </div>
            </section>

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Introduction</h3>
              </div>

              <div className="adminFormGrid">
                {renderInput("introTitle", "Introduction Title")}
                {renderTextarea("introText", "Introduction Text", 8, true)}

                <UploadBox
                  label="Introduction Image"
                  value={form.introImage}
                  hint="Image shown with the introduction section."
                  accept="image/*"
                  onUploaded={(url) => updateField("introImage", url)}
                />
              </div>
            </section>

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Documents</h3>
              </div>

              {[1, 2, 3].map((n) => (
                <div className="adminFormGrid" key={`doc-${n}`}>
                  {renderInput(`document${n}Title`, `Document ${n} Title`)}
                  {renderInput(`document${n}Url`, `Document ${n} Link`)}

                  <UploadBox
                    label={`Upload Document ${n}`}
                    value={form[`document${n}Url`]}
                    hint="PDF, DOC, DOCX accepted."
                    accept=".pdf,.doc,.docx"
                    onUploaded={(url) => updateField(`document${n}Url`, url)}
                  />
                </div>
              ))}
            </section>

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Insights & Topics</h3>
              </div>

              <div className="adminFormGrid">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`insight-${i + 1}`}>
                    {renderInput(`insight${i + 1}`, `Insight ${i + 1}`)}
                  </div>
                ))}
              </div>
            </section>

            {[1, 2].map((n) => (
              <section className="adminFormSection" key={`section-${n}`}>
                <div className="adminFormSectionTitle">
                  <h3>Content Section {n}</h3>
                </div>

                {renderInput(`section${n}Title`, "Section Title")}
                {renderTextarea(`section${n}Text`, "Section Text", 8, true)}
              </section>
            ))}

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Feature Cards</h3>
              </div>

              {[1, 2, 3].map((n) => (
                <div className="adminFormGrid" key={`card-${n}`}>
                  {renderInput(`card${n}Title`, `Card ${n} Title`)}
                  {renderTextarea(`card${n}Text`, `Card ${n} Text`, 4)}
                </div>
              ))}
            </section>

            {[3, 4, 5].map((n) => (
              <section className="adminFormSection" key={`extra-${n}`}>
                <div className="adminFormSectionTitle">
                  <h3>Additional Section {n}</h3>
                </div>

                <div className="adminFormGrid">
                  {renderInput(`section${n}Title`, "Title")}
                  {renderTextarea(`section${n}Text`, "Text", 8, true)}

                  <UploadBox
                    label={`Section ${n} Image`}
                    value={form[`section${n}Image`]}
                    hint="Optional image for this section."
                    accept="image/*"
                    onUploaded={(url) => updateField(`section${n}Image`, url)}
                  />
                </div>
              </section>
            ))}

            <section className="adminFormSection">
              <UploadBox
                label="Fixed Background Image"
                value={form.fixedBgImage}
                hint="Large image for the fixed background separator."
                accept="image/*"
                onUploaded={(url) => updateField("fixedBgImage", url)}
              />
            </section>

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Sources</h3>
              </div>

              <div className="adminFormGrid">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`source-${i + 1}`}>
                    {renderInput(`source${i + 1}`, `Source ${i + 1}`)}
                  </div>
                ))}
              </div>
            </section>

            <section className="adminFormSection">
              {renderTextarea("conclusion", "Conclusion", 8, true)}
            </section>

            <section className="adminFormSection">
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

                <label className="adminCheck">
                  <input
                    type="checkbox"
                    checked={Boolean(form.isFeatured)}
                    onChange={(e) =>
                      updateField("isFeatured", e.target.checked)
                    }
                  />
                  Featured
                </label>
              </div>
            </section>

            <div className="adminFormActions">
              <button type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Sustainability Post"
                  : "Create Sustainability Post"}
              </button>

              <button
                type="button"
                className="adminBtn isGhost"
                onClick={() => {
                  setFormOpen(false);
                  setEditingId(null);
                  setForm(createSafeForm());
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <AdminTable
        title="Sustainability Posts"
        description="Manage sustainability topics, resources, and initiatives."
        columns={columns}
        data={items}
        loading={loading}
        emptyText="No sustainability posts found."
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