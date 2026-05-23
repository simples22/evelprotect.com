"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

export default function AdminApplications() {
  const [items, setItems] = useState([]);

  async function loadItems() {
    const res = await fetch("/api/admin/applications", {
      cache: "no-store",
    });

    const data = await res.json();

    if (data.success) {
      setItems(data.items);
    }
  }

  async function updateItem(id, payload) {
    await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    loadItems();
  }

  async function deleteItem(id) {
    if (!confirm("Delete this application?")) return;

    await fetch(`/api/admin/applications/${id}`, {
      method: "DELETE",
    });

    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <main className="adminPage">
      <AdminTable
        title="Career Applications"
        description="Review and manage candidates applying to EVEL™ Cosmetics Group."
        data={items}
        emptyText="No career applications found."
        columns={[
          { key: "fullName", label: "Name" },
          { key: "email", label: "Email" },
          {
            key: "position",
            label: "Position",
            render: (row) => row.position || "—",
          },
          {
            key: "department",
            label: "Department",
            render: (row) => row.department || "—",
          },
          {
            key: "employmentType",
            label: "Type",
            render: (row) => row.employmentType || "—",
          },
          {
            key: "country",
            label: "Country",
            render: (row) => row.country || "—",
          },
          {
            key: "experienceYears",
            label: "Experience",
            render: (row) =>
              row.experienceYears ? `${row.experienceYears} years` : "—",
          },
          {
            key: "resumeUrl",
            label: "Resume",
            render: (row) =>
              row.resumeUrl ? (
                <a href={row.resumeUrl} target="_blank">
                  View
                </a>
              ) : (
                "—"
              ),
          },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <span className={`adminStatus adminStatus${row.status}`}>
                {row.status}
              </span>
            ),
          },
        ]}
        actions={(row) => (
          <>
            <select
              value={row.status}
              onChange={(e) =>
                updateItem(row.id, {
                  status: e.target.value,
                })
              }
            >
              <option value="NEW">NEW</option>
              <option value="REVIEWING">REVIEWING</option>
              <option value="INTERVIEW">INTERVIEW</option>
              <option value="ACCEPTED">ACCEPTED</option>
              <option value="REJECTED">REJECTED</option>
            </select>

            <button
              type="button"
              onClick={() =>
                updateItem(row.id, {
                  isRead: !row.isRead,
                })
              }
            >
              {row.isRead ? "Unread" : "Read"}
            </button>

            <button type="button" onClick={() => deleteItem(row.id)}>
              Delete
            </button>
          </>
        )}
      />
    </main>
  );
}