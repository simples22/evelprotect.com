"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import NewsAdminForm from "@/components/admin/news/NewsAdminForm";
import NewsAdminTable from "@/components/admin/news/NewsAdminTable";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  imageUrl: "",
  category: "Company",

  introTitle: "",
  introduction: "",

  authorTitle: "",
  authorFunction: "",
  authorCompany: "",
  authorBio: "",
  authorImageUrl: "",

  approachTitle: "",
  approachBody: "",
  sourceLabel: "",
  sourceUrl: "",

  conclusionTitle: "",
  conclusionBody: "",

  isPublished: false,
  isFeatured: false,
};

export default function AdminNewsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  async function loadNews() {
    const res = await fetch("/api/admin/news", { cache: "no-store" });
    const data = await res.json();

    if (data.success) setItems(data.items);
  }

  useEffect(() => {
    loadNews();
  }, []);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function editItem(item) {
    setEditingId(item.id);
setForm({
  title: item.title || "",
  slug: item.slug || "",
  excerpt: item.excerpt || "",
  body: item.body || "",
  imageUrl: item.imageUrl || "",
  category: item.category || "Company",

  introTitle: item.introTitle || "",
  introduction: item.introduction || "",

  authorTitle: item.authorTitle || "",
  authorFunction: item.authorFunction || "",
  authorCompany: item.authorCompany || "",
  authorBio: item.authorBio || "",
  authorImageUrl: item.authorImageUrl || "",

  approachTitle: item.approachTitle || "",
  approachBody: item.approachBody || "",
  sourceLabel: item.sourceLabel || "",
  sourceUrl: item.sourceUrl || "",

  conclusionTitle: item.conclusionTitle || "",
  conclusionBody: item.conclusionBody || "",

  isPublished: Boolean(item.isPublished),
  isFeatured: Boolean(item.isFeatured),
});
    setFormOpen(true);
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const url = editingId ? `/api/admin/news/${editingId}` : "/api/admin/news";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.message || "Something went wrong.");
      return;
    }

    resetForm();
    loadNews();
  }

  async function deleteItem(id) {
    if (!confirm("Delete this news article?")) return;

    const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Unable to delete.");
      return;
    }

    loadNews();
  }

  return (
    <main className="adminResourcePage">
      <AdminPageHeader
        eyebrow="Content Management"
        title="News"
        description="Create, edit, publish, feature and delete company news."
      >
        <button type="button" className="adminBtn" onClick={openCreateForm}>
          Create News
        </button>
      </AdminPageHeader>

      <div className="adminResourceLayout isSingle">
        <NewsAdminTable
          items={items}
          editItem={editItem}
          deleteItem={deleteItem}
        />
      </div>

      {formOpen && (
        <div className="adminOverlay">
          <div className="adminOverlayBackdrop" onClick={resetForm} />

          <aside className="adminOverlayPanel">
            <div className="adminOverlayTop">
              <div>
                <span className="adminPageEyebrow">
                  {editingId ? "Editing Mode" : "Create Mode"}
                </span>
                <h2>{editingId ? "Edit News" : "Create News"}</h2>
              </div>

              <button type="button" className="adminOverlayClose" onClick={resetForm}>
                ×
              </button>
            </div>

            <NewsAdminForm
              form={form}
              editingId={editingId}
              loading={loading}
              updateField={updateField}
              resetForm={resetForm}
              handleSubmit={handleSubmit}
            />
          </aside>
        </div>
      )}
    </main>
  );
}