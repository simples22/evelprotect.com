"use client";

import { useState } from "react";

export default function NewsAdminForm({
  form,
  editingId,
  loading,
  updateField,
  resetForm,
  handleSubmit,
}) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [authorDragActive, setAuthorDragActive] = useState(false);

  async function uploadImage(file, field = "imageUrl", folder = "news") {
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("folder", folder);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setUploading(false);

    if (!result.success) {
      alert(result.message || "Image upload failed.");
      return;
    }

    updateField(field, result.url);
  }

  return (
    <section className="adminFormPanel">
      <div className="adminFormSection">
        <div className="adminFormSectionTitle">
          
          <p>Create public news articles with full reading structure.</p>
        </div>

        <form className="adminForm" onSubmit={handleSubmit}>
          <div className="adminFormGrid">
            <div className="adminField adminFormFull">
              <label>News Title</label>
              <input
                className="adminInput"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Company update title"
                required
              />
            </div>

            <div className="adminField">
              <label>Slug</label>
              <input
                className="adminInput"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="company-update-title"
              />
              <small className="adminFieldHint">
                Leevel empty to generate automatically from title.
              </small>
            </div>

            <div className="adminField">
              <label>Category / Type</label>
              <input
                className="adminInput"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="Business, Skin care, Operation..."
              />
            </div>

            <div className="adminField adminFormFull">
              <label>Card Description / Excerpt</label>
              <textarea
                className="adminTextarea"
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                placeholder="Short description used on cards and hero preview."
                rows={3}
              />
            </div>

            <div className="adminField adminFormFull">
              <label>News Card / Hero Image</label>

              <div
                className={`adminUploadBox ${dragActive ? "isDragActive" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeevel={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  uploadImage(e.dataTransfer.files?.[0], "imageUrl", "news");
                }}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={(e) =>
                    uploadImage(e.target.files?.[0], "imageUrl", "news")
                  }
                />

                <div className="adminUploadContent">
                  <strong>
                    {uploading ? "Uploading image..." : "Upload or drag news image"}
                  </strong>
                  <span>JPG, PNG or WEBP. Seveld in /uploads/news.</span>
                </div>
              </div>

              {form.imageUrl && (
                <div className="adminImagePreview isHero">
                  <img src={form.imageUrl} alt={form.title || "News preview"} />
                  <div className="adminImagePreviewCaption">
                    {form.imageUrl}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <h3>Introduction</h3>
              <p>Maximum 3 paragraphs recommended.</p>
            </div>

            <div className="adminFormGrid">
              <div className="adminField adminFormFull">
                <label>Introduction Title</label>
                <input
                  className="adminInput"
                  value={form.introTitle}
                  onChange={(e) => updateField("introTitle", e.target.value)}
                  placeholder="Introduction"
                />
              </div>

              <div className="adminField adminFormFull">
                <label>Introduction Text</label>
                <textarea
                  className="adminTextarea isLarge"
                  value={form.introduction}
                  onChange={(e) => updateField("introduction", e.target.value)}
                  placeholder="Write up to 3 paragraphs. Separate paragraphs with line breaks."
                />
              </div>
            </div>
          </div>

          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <h3>Main Body</h3>
              <p>Full article details.</p>
            </div>

            <div className="adminField">
              <label>Body</label>
              <textarea
                className="adminTextarea isLarge"
                value={form.body}
                onChange={(e) => updateField("body", e.target.value)}
                placeholder="Full news body content."
              />
            </div>
          </div>

          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <h3>Author / Declaration Block</h3>
              <p>Use for executive statement, company comment or department declaration.</p>
            </div>

            <div className="adminFormGrid">
              <div className="adminField adminFormFull">
                <label>Declaration Title</label>
                <input
                  className="adminInput"
                  value={form.authorTitle}
                  onChange={(e) => updateField("authorTitle", e.target.value)}
                  placeholder="Statement from EVEL Cosmetics Group"
                />
              </div>

              <div className="adminField">
                <label>Function</label>
                <input
                  className="adminInput"
                  value={form.authorFunction}
                  onChange={(e) => updateField("authorFunction", e.target.value)}
                  placeholder="CEO, Brand Director..."
                />
              </div>

              <div className="adminField">
                <label>Company / Department</label>
                <input
                  className="adminInput"
                  value={form.authorCompany}
                  onChange={(e) => updateField("authorCompany", e.target.value)}
                  placeholder="EVEL Cosmetics Group"
                />
              </div>

              <div className="adminField adminFormFull">
                <label>Description / Statement</label>
                <textarea
                  className="adminTextarea"
                  value={form.authorBio}
                  onChange={(e) => updateField("authorBio", e.target.value)}
                  placeholder="Maximum 2 paragraphs recommended."
                />
              </div>

              <div className="adminField adminFormFull">
                <label>Author / Declaration Image</label>

                <div
                  className={`adminUploadBox ${
                    authorDragActive ? "isDragActive" : ""
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setAuthorDragActive(true);
                  }}
                  onDragLeevel={() => setAuthorDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setAuthorDragActive(false);
                    uploadImage(
                      e.dataTransfer.files?.[0],
                      "authorImageUrl",
                      "news-authors"
                    );
                  }}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={(e) =>
                      uploadImage(
                        e.target.files?.[0],
                        "authorImageUrl",
                        "news-authors"
                      )
                    }
                  />

                  <div className="adminUploadContent">
                    <strong>Upload or drag declaration image</strong>
                    <span>Optional image for person, company or department.</span>
                  </div>
                </div>

                {form.authorImageUrl && (
                  <div className="adminImagePreview isCard">
                    <img
                      src={form.authorImageUrl}
                      alt={form.authorTitle || "Declaration preview"}
                    />
                    <div className="adminImagePreviewCaption">
                      {form.authorImageUrl}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <h3>Question, Approach & Source</h3>
              <p>Explain the issue treated and the approach/source used.</p>
            </div>

            <div className="adminFormGrid">
              <div className="adminField adminFormFull">
                <label>Approach Title</label>
                <input
                  className="adminInput"
                  value={form.approachTitle}
                  onChange={(e) => updateField("approachTitle", e.target.value)}
                  placeholder="Question treated and our approach"
                />
              </div>

              <div className="adminField adminFormFull">
                <label>Approach Body</label>
                <textarea
                  className="adminTextarea"
                  value={form.approachBody}
                  onChange={(e) => updateField("approachBody", e.target.value)}
                  placeholder="Explain the question, analysis, approach, and source context."
                />
              </div>

              <div className="adminField">
                <label>Source Label</label>
                <input
                  className="adminInput"
                  value={form.sourceLabel}
                  onChange={(e) => updateField("sourceLabel", e.target.value)}
                  placeholder="Internal analysis, Statista, Company report..."
                />
              </div>

              <div className="adminField">
                <label>Source URL</label>
                <input
                  className="adminInput"
                  value={form.sourceUrl}
                  onChange={(e) => updateField("sourceUrl", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <h3>Conclusion</h3>
              <p>Close the news post with a final company direction.</p>
            </div>

            <div className="adminFormGrid">
              <div className="adminField adminFormFull">
                <label>Conclusion Title</label>
                <input
                  className="adminInput"
                  value={form.conclusionTitle}
                  onChange={(e) => updateField("conclusionTitle", e.target.value)}
                  placeholder="Conclusion"
                />
              </div>

              <div className="adminField adminFormFull">
                <label>Conclusion Body</label>
                <textarea
                  className="adminTextarea"
                  value={form.conclusionBody}
                  onChange={(e) => updateField("conclusionBody", e.target.value)}
                  placeholder="Final conclusion of the post."
                />
              </div>
            </div>
          </div>

          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <h3>Publishing Settings</h3>
              <p>Control visibility and featured placement.</p>
            </div>

            <div className="adminChecks">
              <label className="adminCheck">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => updateField("isPublished", e.target.checked)}
                />
                Published
              </label>

              <label className="adminCheck">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => updateField("isFeatured", e.target.checked)}
                />
                Featured
              </label>
            </div>
          </div>

          <div className="adminFormActions">
            <button
              type="submit"
              className="adminBtn"
              disabled={loading || uploading}
            >
              {loading ? "Saving..." : editingId ? "Update News" : "Create News"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm} className="adminBtn isGhost">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}