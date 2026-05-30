"use client";

import { useState } from "react";

const divisions = [
  "Corporate Leadership",
  "Executive Management",
  "Beauty and Personal Care",
  "Marketing and Brand",
  "Research and Development",
  "Manufacturing and Quality",
  "Finance and Accounting",
  "Technology and Informatics",
  "Human Resources",
  "Sales and Distribution",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_DOC_SIZE = 10 * 1024 * 1024;

function cleanDate(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

function getInitialPositions(item) {
  if (Array.isArray(item?.positions) && item.positions.length) {
    return item.positions;
  }

  return [{ title: "", date: "" }];
}

function isValidUrl(value = "") {
  if (!value) return true;

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export default function AdminLeadershipForm({ item = null, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || "");
  const [bioFileUrl, setBioFileUrl] = useState(item?.bioFileUrl || "");
  const [positions, setPositions] = useState(() => getInitialPositions(item));
  const [message, setMessage] = useState("");

  const isEdit = Boolean(item?.id);
  const isBusy = saving || Boolean(uploading);

  function updatePosition(index, key, value) {
    setPositions((prev) =>
      prev.map((position, i) =>
        i === index ? { ...position, [key]: value } : position
      )
    );
  }

  function addPosition() {
    setPositions((prev) => [...prev, { title: "", date: "" }]);
  }

  function removePosition(index) {
    setPositions((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [{ title: "", date: "" }];
    });
  }

  function validateFile(file, type) {
    if (!file) return "No file selected.";

    if (type === "image") {
      if (!file.type.startsWith("image/")) {
        return "Please upload a valid image file.";
      }

      if (file.size > MAX_IMAGE_SIZE) {
        return "Image must be 5 MB or less.";
      }
    }

    if (type === "bio") {
      const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowed.includes(file.type)) {
        return "Please upload a PDF, DOC, or DOCX file.";
      }

      if (file.size > MAX_DOC_SIZE) {
        return "Document must be 10 MB or less.";
      }
    }

    return "";
  }

  async function uploadFile(file, type) {
    const error = validateFile(file, type);

    if (error) {
      alert(error);
      return;
    }

    setMessage("");
    setUploading(type);

    const body = new FormData();
    body.append("file", file);
    body.append("folder", "leadership");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });

      const text = await res.text();

      let json = {};
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(text || "Upload returned an invalid response.");
      }

      const url = json.url || json.fileUrl || json.secure_url || "";

      if (!res.ok || !url) {
        throw new Error(json.message || "Upload failed. No file URL returned.");
      }

      if (type === "image") setImageUrl(url);
      if (type === "bio") setBioFileUrl(url);

      setMessage("File uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to upload file.");
    } finally {
      setUploading("");
    }
  }

  function validateForm(data) {
    if (!data.name?.trim()) return "Member full name is required.";
    if (!data.functionTitle?.trim()) return "Function / Position is required.";

    const urls = [
      ["LinkedIn URL", data.linkedinUrl],
      ["Facebook URL", data.facebookUrl],
      ["Instagram URL", data.instagramUrl],
      ["X / Twitter URL", data.xUrl],
      ["Biography PDF URL", bioFileUrl],
      ["Profile Image URL", imageUrl],
    ];

    for (const [label, value] of urls) {
      if (value && !isValidUrl(value) && !String(value).startsWith("/")) {
        return `${label} is not valid.`;
      }
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isBusy) return;

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const data = Object.fromEntries(form.entries());

    data.imageUrl = imageUrl;
    data.bioFileUrl = bioFileUrl;
    data.displayOrder = Number(data.displayOrder || 0);
    data.isPublished = form.get("isPublished") === "on";
    data.isFeatured = form.get("isFeatured") === "on";
    data.positions = positions
      .map((position) => ({
        title: position.title?.trim() || "",
        date: position.date?.trim() || "",
      }))
      .filter((position) => position.title || position.date);

    const formError = validateForm(data);

    if (formError) {
      alert(formError);
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(
        isEdit ? `/api/admin/leadership/${item.id}` : "/api/admin/leadership",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const text = await res.text();

      let json = {};
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(text || "Server returned an invalid response.");
      }

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Unable to save leadership profile.");
      }

      setMessage(
        isEdit
          ? "Leadership profile updated successfully."
          : "Leadership profile saved successfully."
      );

      if (!isEdit) {
        formEl.reset();
        setImageUrl("");
        setBioFileUrl("");
        setPositions([{ title: "", date: "" }]);
      }

      onSaved?.();
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to save leadership profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="adminFormPanel">
      <form className="adminForm" onSubmit={handleSubmit}>
        <section className="adminFormSection">
          <div className="adminFormSectionTitle">
            <h2>
              {isEdit ? "Edit Leadership Profile" : "Create Leadership Profile"}
            </h2>
            <p>
              Manage leadership information, biography, media, social links,
              publication status, and display order.
            </p>
          </div>

          {message && <p className="adminFieldHint">{message}</p>}

          <div className="adminFormGrid">
            <Field name="name" label="Member Full Name" defaultValue={item?.name} required />
            <Field name="slug" label="Custom Slug" defaultValue={item?.slug} />
            <Field name="displayOrder" label="Display Order" type="number" defaultValue={item?.displayOrder || 0} />
            <Field name="functionTitle" label="Function / Position" defaultValue={item?.functionTitle} required />

            <Select name="division" label="Enterprise Division" options={divisions} defaultValue={item?.division} />

            <UploadBox
              label="Leadership Profile Image"
              value={imageUrl}
              accept="image/*"
              uploading={uploading === "image"}
              onFile={(file) => uploadFile(file, "image")}
              previewType="image"
              hint="Accepted: JPG, PNG, WEBP. Max 5 MB."
            />

            <Textarea
              name="heroDescription"
              label="Leadership Hero Description"
              defaultValue={item?.heroDescription}
            />
          </div>
        </section>

        <section className="adminFormSection">
          <div className="adminFormSectionTitle">
            <h3>Education & Career</h3>
            <p>Formation, joining date, career summary, and positions history.</p>
          </div>

          <div className="adminFormGrid">
            <Field name="formationOne" label="Formation 1" defaultValue={item?.formationOne} />
            <Field name="formationTwo" label="Formation 2" defaultValue={item?.formationTwo} />
            <Field name="joinedAt" label="Join Company Date" type="date" defaultValue={cleanDate(item?.joinedAt)} />
            <Field name="careerSummary" label="Career Summary" defaultValue={item?.careerSummary} />
          </div>

          <div className="adminFormSectionTitle">
            <h3>Positions History</h3>
            <p>Add as many position and date entries as needed.</p>
          </div>

          <div className="adminRepeatList">
            {positions.map((position, index) => (
              <div className="adminRepeatRow" key={index}>
                <label className="adminField">
                  <span className="adminFieldLabel">Position</span>
                  <input
                    className="adminInput"
                    type="text"
                    value={position.title || ""}
                    placeholder="Chief Executive Officer"
                    onChange={(e) => updatePosition(index, "title", e.target.value)}
                  />
                </label>

                <label className="adminField">
                  <span className="adminFieldLabel">Date</span>
                  <input
                    className="adminInput"
                    type="text"
                    value={position.date || ""}
                    placeholder="January 2026"
                    onChange={(e) => updatePosition(index, "date", e.target.value)}
                  />
                </label>

                <button
                  type="button"
                  className="adminBtn isDanger"
                  disabled={isBusy}
                  onClick={() => removePosition(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button type="button" className="adminBtn isGhost" disabled={isBusy} onClick={addPosition}>
            Add Position
          </button>
        </section>

        <section className="adminFormSection">
          <div className="adminFormSectionTitle">
            <h3>Biography</h3>
            <p>Write a complete public biography. Three paragraphs are recommended.</p>
          </div>

          <Textarea name="bio" label="Biography / Description" defaultValue={item?.bio} large />
        </section>

        <section className="adminFormSection">
          <div className="adminFormSectionTitle">
            <h3>Downloads</h3>
            <p>Upload the biography document used on the public profile page.</p>
          </div>

          <div className="adminFormGrid">
            <UploadBox
              label="Biography PDF / Document"
              value={bioFileUrl}
              accept=".pdf,.doc,.docx"
              uploading={uploading === "bio"}
              onFile={(file) => uploadFile(file, "bio")}
              previewType="file"
              hint="Accepted: PDF, DOC, DOCX. Max 10 MB."
            />
          </div>
        </section>

        <section className="adminFormSection">
          <div className="adminFormSectionTitle">
            <h3>Social Links</h3>
            <p>These links appear on the public leadership profile page.</p>
          </div>

          <div className="adminFormGrid">
            <Field name="linkedinUrl" label="LinkedIn URL" type="url" defaultValue={item?.linkedinUrl} />
            <Field name="facebookUrl" label="Facebook URL" type="url" defaultValue={item?.facebookUrl} />
            <Field name="instagramUrl" label="Instagram URL" type="url" defaultValue={item?.instagramUrl} />
            <Field name="xUrl" label="X / Twitter URL" type="url" defaultValue={item?.xUrl} />
          </div>
        </section>

        <section className="adminFormSection">
          <div className="adminFormSectionTitle">
            <h3>Publication Settings</h3>
          </div>

          <div className="adminChecks">
            <label className="adminCheck">
              <input type="checkbox" name="isPublished" defaultChecked={Boolean(item?.isPublished)} />
              <span>Published</span>
            </label>

            <label className="adminCheck">
              <input type="checkbox" name="isFeatured" defaultChecked={Boolean(item?.isFeatured)} />
              <span>Featured Leadership Member</span>
            </label>
          </div>
        </section>

        <div className="adminFormActions">
          <button type="submit" disabled={isBusy}>
            {saving
              ? "Saving..."
              : uploading
                ? "Uploading..."
                : isEdit
                  ? "Update Leadership Profile"
                  : "Publish Leadership Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", required = false, placeholder = "", defaultValue = "" }) {
  return (
    <label className="adminField">
      <span className="adminFieldLabel">{label}</span>
      <input
        className="adminInput"
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue || ""}
      />
    </label>
  );
}

function Textarea({ label, name, defaultValue = "", large = false }) {
  return (
    <label className="adminField adminFormFull">
      <span className="adminFieldLabel">{label}</span>
      <textarea
        className={`adminTextarea ${large ? "isLarge" : ""}`}
        name={name}
        defaultValue={defaultValue || ""}
      />
    </label>
  );
}

function Select({ label, name, options = [], defaultValue = "" }) {
  return (
    <label className="adminField">
      <span className="adminFieldLabel">{label}</span>
      <select className="adminSelect" name={name} defaultValue={defaultValue || ""}>
        <option value="">Select Division</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function UploadBox({
  label,
  value,
  accept,
  onFile,
  uploading = false,
  previewType = "file",
  hint = "",
}) {
  return (
    <div className="adminField adminFormFull">
      <span className="adminFieldLabel">{label}</span>

      <label className="adminUploadBox">
        <input
          type="file"
          accept={accept}
          disabled={uploading}
          onChange={(e) => onFile(e.target.files?.[0])}
        />

        <span className="adminUploadContent">
          <strong>{uploading ? "Uploading..." : "Drag & drop or click to upload"}</strong>
          <span>{hint || accept}</span>
        </span>
      </label>

      {value && previewType === "image" && (
        <div className="adminImagePreview isSquare">
          <img src={value} alt={label} />
          <div className="adminImagePreviewCaption">{value}</div>
        </div>
      )}

      {value && previewType === "file" && (
        <span className="adminFieldHint">{value}</span>
      )}
    </div>
  );
}