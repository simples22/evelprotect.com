"use client";

import { useMemo, useState } from "react";

const initialForm = {
  title: "",
  subject: "",
  previewText: "",
  audience: "all",
  status: "draft",
  scheduledAt: "",
};

const blockTypes = [
  "hero",
  "text",
  "product",
  "cta",
  "two-columns",
  "social",
  "footer",
];

export default function AdminMarketingCompose() {
  const [form, setForm] = useState(initialForm);

  const [blocks, setBlocks] = useState([
    {
      id: crypto.randomUUID(),
      type: "hero",
      title: "",
      text: "",
      image: "",
    },
  ]);

  const [sending, setSending] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value ?? "",
    }));
  }

  function addBlock(type) {
    setBlocks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,

        title: "",
        text: "",

        image: "",
        url: "",

        label: "",

        leftTitle: "",
        leftText: "",

        rightTitle: "",
        rightText: "",
      },
    ]);
  }

  function updateBlock(id, key, value) {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id
          ? {
              ...block,
              [key]: value,
            }
          : block
      )
    );
  }

  function removeBlock(id) {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  }

  function moveUp(index) {
    if (index === 0) return;

    const updated = [...blocks];

    [updated[index - 1], updated[index]] = [
      updated[index],
      updated[index - 1],
    ];

    setBlocks(updated);
  }

  function moveDown(index) {
    if (index === blocks.length - 1) return;

    const updated = [...blocks];

    [updated[index], updated[index + 1]] = [
      updated[index + 1],
      updated[index],
    ];

    setBlocks(updated);
  }

  const bodyHtml = useMemo(() => {
    return blocks
      .map((block) => {
        switch (block.type) {
          case "hero":
            return `
              <section style="padding:40px;background:#0b1f52;color:white;text-align:center;">
                ${
                  block.image
                    ? `<img src="${block.image}" style="max-width:100%;margin-bottom:20px;" />`
                    : ""
                }

                <h1>${block.title || ""}</h1>

                <p>${block.text || ""}</p>
              </section>
            `;

          case "text":
            return `
              <section style="padding:30px;">
                <h2>${block.title || ""}</h2>
                <p>${block.text || ""}</p>
              </section>
            `;

          case "product":
            return `
              <section style="padding:30px;text-align:center;">
                ${
                  block.image
                    ? `<img src="${block.image}" style="max-width:240px;" />`
                    : ""
                }

                <h2>${block.title || ""}</h2>

                <p>${block.text || ""}</p>

                ${
                  block.url
                    ? `<a href="${block.url}" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#0b1f52;color:white;text-decoration:none;">View product</a>`
                    : ""
                }
              </section>
            `;

          case "cta":
            return `
              <section style="padding:40px;text-align:center;">
                <h2>${block.title || ""}</h2>

                <p>${block.text || ""}</p>

                ${
                  block.url
                    ? `<a href="${block.url}" style="display:inline-block;margin-top:20px;padding:14px 26px;background:#0b1f52;color:white;text-decoration:none;">${block.label || "Learn more"}</a>`
                    : ""
                }
              </section>
            `;

          case "two-columns":
            return `
              <section style="padding:30px;">
                <table width="100%">
                  <tr>
                    <td width="50%" valign="top" style="padding-right:15px;">
                      <h3>${block.leftTitle || ""}</h3>
                      <p>${block.leftText || ""}</p>
                    </td>

                    <td width="50%" valign="top" style="padding-left:15px;">
                      <h3>${block.rightTitle || ""}</h3>
                      <p>${block.rightText || ""}</p>
                    </td>
                  </tr>
                </table>
              </section>
            `;

          case "social":
            return `
              <section style="padding:30px;text-align:center;">
                <h3>${block.title || "Follow Evel Protect™"}</h3>

                <p>${block.text || ""}</p>
              </section>
            `;

          case "footer":
            return `
              <footer style="padding:30px;background:#f5f5f5;text-align:center;">
                <p>${block.text || ""}</p>
              </footer>
            `;

          default:
            return "";
        }
      })
      .join("");
  }, [blocks]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);

    try {
      const res = await fetch("/api/admin/marketing/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,
          bodyHtml,
          builderJson: JSON.stringify(blocks),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to process campaign.");
        return;
      }

      alert("Campaign processed successfully.");

      setForm(initialForm);

      setBlocks([]);
    } catch (error) {
      alert("Unexpected error.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="evelAdminPage">
      <section className="adminFormPanel">
        <form className="adminForm" onSubmit={handleSubmit}>
          <div className="adminFormSectionTitle">
            <h2>Compose Marketing Campaign</h2>

            <p>
              Build promotional emails, product launches and branded campaigns
              using flexible content blocks.
            </p>
          </div>

          {/* SETTINGS */}

          <section className="adminFormSection">
            <div className="adminFormGrid">
              <div className="adminField">
                <label>Campaign Title</label>

                <input
                  className="adminInput"
                  value={form.title}
                  onChange={(e) =>
                    updateField("title", e.target.value)
                  }
                  required
                />
              </div>

              <div className="adminField">
                <label>Email Subject</label>

                <input
                  className="adminInput"
                  value={form.subject}
                  onChange={(e) =>
                    updateField("subject", e.target.value)
                  }
                  required
                />
              </div>

              <div className="adminField adminFormFull">
                <label>Preview Text</label>

                <input
                  className="adminInput"
                  value={form.previewText}
                  onChange={(e) =>
                    updateField("previewText", e.target.value)
                  }
                />
              </div>

              <div className="adminField">
                <label>Audience</label>

                <select
                  className="adminSelect"
                  value={form.audience}
                  onChange={(e) =>
                    updateField("audience", e.target.value)
                  }
                >
                  <option value="all">All</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="contacts">Contacts</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className="adminField">
                <label>Status</label>

                <select
                  className="adminSelect"
                  value={form.status}
                  onChange={(e) =>
                    updateField("status", e.target.value)
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="sent">Send now</option>
                </select>
              </div>

              {form.status === "scheduled" && (
                <div className="adminField adminFormFull">
                  <label>Scheduled Date</label>

                  <input
                    type="datetime-local"
                    className="adminInput"
                    value={form.scheduledAt}
                    onChange={(e) =>
                      updateField(
                        "scheduledAt",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
            </div>
          </section>

          {/* BLOCKS */}

          <section className="adminFormSection">
            <div className="adminFormSectionTitle">
              <h3>Email Builder</h3>

              <p>
                Add and organize visual content blocks.
              </p>
            </div>

            <div className="marketingBuilderToolbar">
              {blockTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className="adminBtn isGhost"
                  onClick={() => addBlock(type)}
                >
                  + {type}
                </button>
              ))}
            </div>

            <div className="marketingBuilderBlocks">
              {blocks.map((block, index) => (
                <div
                  className="marketingBuilderBlock"
                  key={block.id}
                >
                  <div className="marketingBuilderBlockTop">
                    <strong>{block.type}</strong>

                    <div className="marketingBuilderActions">
                      <button
                        type="button"
                        onClick={() => moveUp(index)}
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => moveDown(index)}
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeBlock(block.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="adminFormGrid">
                    <div className="adminField">
                      <label>Title</label>

                      <input
                        className="adminInput"
                        value={block.title || ""}
                        onChange={(e) =>
                          updateBlock(
                            block.id,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="adminField">
                      <label>Image URL</label>

                      <input
                        className="adminInput"
                        value={block.image || ""}
                        onChange={(e) =>
                          updateBlock(
                            block.id,
                            "image",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="adminField adminFormFull">
                      <label>Text</label>

                      <textarea
                        className="adminTextarea"
                        rows={5}
                        value={block.text || ""}
                        onChange={(e) =>
                          updateBlock(
                            block.id,
                            "text",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {(block.type === "cta" ||
                      block.type === "product") && (
                      <>
                        <div className="adminField">
                          <label>Button Label</label>

                          <input
                            className="adminInput"
                            value={block.label || ""}
                            onChange={(e) =>
                              updateBlock(
                                block.id,
                                "label",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="adminField">
                          <label>Button URL</label>

                          <input
                            className="adminInput"
                            value={block.url || ""}
                            onChange={(e) =>
                              updateBlock(
                                block.id,
                                "url",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </>
                    )}

                    {block.type === "two-columns" && (
                      <>
                        <div className="adminField">
                          <label>Left Title</label>

                          <input
                            className="adminInput"
                            value={block.leftTitle || ""}
                            onChange={(e) =>
                              updateBlock(
                                block.id,
                                "leftTitle",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="adminField">
                          <label>Right Title</label>

                          <input
                            className="adminInput"
                            value={block.rightTitle || ""}
                            onChange={(e) =>
                              updateBlock(
                                block.id,
                                "rightTitle",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="adminField">
                          <label>Left Text</label>

                          <textarea
                            className="adminTextarea"
                            rows={4}
                            value={block.leftText || ""}
                            onChange={(e) =>
                              updateBlock(
                                block.id,
                                "leftText",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="adminField">
                          <label>Right Text</label>

                          <textarea
                            className="adminTextarea"
                            rows={4}
                            value={block.rightText || ""}
                            onChange={(e) =>
                              updateBlock(
                                block.id,
                                "rightText",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PREVIEW */}

          <section className="adminFormSection">
            <div className="adminFormSectionTitle">
              <h3>Email Preview</h3>
            </div>

            <div
              className="marketingEmailPreview"
              dangerouslySetInnerHTML={{
                __html: bodyHtml,
              }}
            />
          </section>

          {/* ACTIONS */}

          <div className="adminFormActions">
            <button
              type="submit"
              className="adminBtn"
              disabled={sending}
            >
              {sending
                ? "Processing..."
                : form.status === "draft"
                ? "Sevel Draft"
                : form.status === "scheduled"
                ? "Schedule Campaign"
                : "Send Campaign"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}