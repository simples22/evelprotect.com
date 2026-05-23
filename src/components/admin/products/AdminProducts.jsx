"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

const initialForm = {
  title: "",
  slug: "",
  category: "",
  subCategory: "",
  shortDescription: "",
  description: "",
  packDescription: "",
  ingredientsText: "",
  price: "",
  compareAtPrice: "",
  currency: "USD",
  sizeValue: "",
  sizeUnit: "ml",
  packSize: "1",
  pricePerBottle: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  tags: "",
  isPublished: false,
  isFeatured: false,
  isBestSeller: false,
};

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState("");

  async function loadItems() {
    const res = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await res.json();
    if (data.success) setItems(data.items);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadImage(file, key) {
    if (!file) return;

    setUploadingImage(key);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/uploads/products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploadingImage("");

    if (!data.success) {
      alert(data.message || "Upload failed.");
      return;
    }

    updateField(key, data.url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const endpoint = editingId
      ? `/api/admin/products/${editingId}`
      : "/api/admin/products";

    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.message || "Failed to sevel product.");
      return;
    }

    setForm(initialForm);
    setEditingId(null);
    setFormOpen(false);
    loadItems();
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "",
      subCategory: item.subCategory || "",
      shortDescription: item.shortDescription || "",
      description: item.description || "",
      packDescription: item.packDescription || "",
      ingredientsText: item.ingredientsText || "",
      price: item.price ?? "",
      compareAtPrice: item.compareAtPrice ?? "",
      currency: item.currency || "USD",
      sizeValue: item.sizeValue ?? "",
      sizeUnit: item.sizeUnit || "ml",
      packSize: item.packSize || "1",
      pricePerBottle: item.pricePerBottle ?? "",
      image1: item.image1 || "",
      image2: item.image2 || "",
      image3: item.image3 || "",
      image4: item.image4 || "",
      tags: item.tags || "",
      isPublished: Boolean(item.isPublished),
      isFeatured: Boolean(item.isFeatured),
      isBestSeller: Boolean(item.isBestSeller),
    });

    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteItem(id) {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadItems();
  }

  const tableData = useMemo(() => items, [items]);

  return (
    <main className="adminPage">
      <div className="adminFormActions">
        <button
          type="button"
          className="adminBtn"
          onClick={() => {
            setFormOpen((prev) => !prev);
            setEditingId(null);
            setForm(initialForm);
          }}
        >
          {formOpen ? "Close Product Form" : "Add New Product"}
        </button>
      </div>

      {formOpen && (
        <section className="adminFormPanel">
          <div className="adminFormSectionTitle">
            <h2>{editingId ? "Edit Product" : "Create Product"}</h2>
            <p>
              Manage EVEL™ beauty, cosmetics, skincare, and personal care
              products.
            </p>
          </div>

          <form className="adminForm" onSubmit={handleSubmit}>
            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Basic Information</h3>
              </div>

              <div className="adminFormGrid">
                <AdminField label="Product Title">
                  <input
                    className="adminInput"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    required
                  />
                </AdminField>

                <AdminField label="Slug">
                  <input
                    className="adminInput"
                    value={form.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                  />
                </AdminField>

                <AdminField label="Category">
                  <select
                    className="adminSelect"
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Fragrance">Fragrance</option>
                  </select>
                </AdminField>

                <AdminField label="Sub Category">
                  <input
                    className="adminInput"
                    value={form.subCategory}
                    onChange={(e) =>
                      updateField("subCategory", e.target.value)
                    }
                  />
                </AdminField>
              </div>
            </section>

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Pricing & Size</h3>
              </div>

              <div className="adminFormGrid isThree">
                <AdminField label="Price">
                  <input
                    type="number"
                    step="0.01"
                    className="adminInput"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    required
                  />
                </AdminField>

                <AdminField label="Compare At Price">
                  <input
                    type="number"
                    step="0.01"
                    className="adminInput"
                    value={form.compareAtPrice}
                    onChange={(e) =>
                      updateField("compareAtPrice", e.target.value)
                    }
                  />
                </AdminField>

                <AdminField label="Currency">
                  <select
                    className="adminSelect"
                    value={form.currency}
                    onChange={(e) => updateField("currency", e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="HTG">HTG</option>
                  </select>
                </AdminField>

                <AdminField label="Size Value">
                  <input
                    type="number"
                    className="adminInput"
                    value={form.sizeValue}
                    onChange={(e) => updateField("sizeValue", e.target.value)}
                  />
                </AdminField>

                <AdminField label="Size Unit">
                  <select
                    className="adminSelect"
                    value={form.sizeUnit}
                    onChange={(e) => updateField("sizeUnit", e.target.value)}
                  >
                    <option value="ml">ml</option>
                    <option value="oz">oz</option>
                    <option value="gm">gm</option>
                    <option value="kg">kg</option>
                  </select>
                </AdminField>

                <AdminField label="Pack Size">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    className="adminInput"
                    value={form.packSize}
                    onChange={(e) => updateField("packSize", e.target.value)}
                  />
                </AdminField>

                <AdminField label="Price Per Bottle">
                  <input
                    type="number"
                    step="0.01"
                    className="adminInput"
                    value={form.pricePerBottle}
                    onChange={(e) =>
                      updateField("pricePerBottle", e.target.value)
                    }
                  />
                </AdminField>
              </div>
            </section>

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Images</h3>
                <p>
                  Upload at least one image. Drag and drop or click to select.
                  Maximum 4 images.
                </p>
              </div>

              <div className="adminFormGrid">
                {[1, 2, 3, 4].map((num) => {
                  const key = `image${num}`;
                  const value = form[key];

                  return (
                    <div className="adminField" key={key}>
                      <label>
                        Image {num}
                        {num === 1 ? " Required" : ""}
                      </label>

                      <div
                        className={`adminUploadBox ${
                          uploadingImage === key ? "isDragActive" : ""
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          uploadImage(e.dataTransfer.files?.[0], key);
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          required={num === 1 && !value}
                          onChange={(e) =>
                            uploadImage(e.target.files?.[0], key)
                          }
                        />

                        <div className="adminUploadContent">
                          <strong>
                            {uploadingImage === key
                              ? "Uploading..."
                              : value
                              ? "Replace image"
                              : "Drop image here or click to upload"}
                          </strong>

                          <span>
                            JPG, PNG, WEBP. Image {num}
                            {num === 1 ? " is required." : " is optional."}
                          </span>
                        </div>
                      </div>

                      {value && (
                        <div className="adminImagePreview isSquare">
                          <img src={value} alt={`Product image ${num}`} />

                          <div className="adminImagePreviewCaption">
                            {value}

                            <button
                              type="button"
                              className="adminBtn isGhost"
                              onClick={() => updateField(key, "")}
                              style={{ marginTop: ".75em" }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Descriptions</h3>
              </div>

              <AdminField label="Short Description">
                <textarea
                  className="adminTextarea"
                  value={form.shortDescription}
                  onChange={(e) =>
                    updateField("shortDescription", e.target.value)
                  }
                />
              </AdminField>

              <AdminField label="Product Description">
                <textarea
                  className="adminTextarea isLarge"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </AdminField>

              <AdminField label="Pack Description">
                <textarea
                  className="adminTextarea"
                  value={form.packDescription}
                  onChange={(e) =>
                    updateField("packDescription", e.target.value)
                  }
                />
              </AdminField>

              <AdminField label="Ingredients / Bullet Points">
                <textarea
                  className="adminTextarea"
                  value={form.ingredientsText}
                  onChange={(e) =>
                    updateField("ingredientsText", e.target.value)
                  }
                />
              </AdminField>
            </section>

            <section className="adminFormSection">
              <div className="adminFormSectionTitle">
                <h3>Tags & Status</h3>
              </div>

              <AdminField label="Tags comma separated">
                <input
                  className="adminInput"
                  value={form.tags}
                  onChange={(e) => updateField("tags", e.target.value)}
                  placeholder="New, Best Seller, Promo..."
                />
              </AdminField>

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

                <label className="adminCheck">
                  <input
                    type="checkbox"
                    checked={form.isBestSeller}
                    onChange={(e) =>
                      updateField("isBestSeller", e.target.checked)
                    }
                  />
                  Best Seller
                </label>
              </div>
            </section>

            <div className="adminFormActions">
              <button type="submit" className="adminBtn" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Product"
                  : "Create Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="adminBtn isGhost"
                  onClick={() => {
                    setEditingId(null);
                    setForm(initialForm);
                    setFormOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
      )}

      <div style={{ height: "2em" }} />

      <AdminTable
        title="Products"
        description="Manage products, featured items, best sellers, and product visibility."
        data={tableData}
        emptyText="No products found."
        columns={[
          {
            key: "image1",
            label: "Image",
            render: (row) => (
              <img
                src={row.image1}
                alt={row.title}
                style={{
                  width: "4em",
                  height: "4em",
                  objectFit: "cover",
                }}
              />
            ),
          },
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          {
            key: "price",
            label: "Price",
            render: (row) => `${row.currency} ${row.price}`,
          },
          {
            key: "packSize",
            label: "Pack",
            render: (row) => `${row.packSize} bottles`,
          },
          { key: "clickCount", label: "Clicks" },
          { key: "viewCount", label: "Views" },
          { key: "status", label: "Status" },
        ]}
        actions={(row) => (
          <>
            <button className="adminBtn isGhost" onClick={() => startEdit(row)}>
              Edit
            </button>

            <button
              className="adminBtn isDanger"
              onClick={() => deleteItem(row.id)}
            >
              Delete
            </button>
          </>
        )}
      />
    </main>
  );
}

function AdminField({ label, children }) {
  return (
    <div className="adminField">
      <label>{label}</label>
      {children}
    </div>
  );
}