"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

export default function AdminContactRequests() {
  const [items, setItems] = useState([]);

  async function loadItems() {
    const res = await fetch("/api/admin/contact-requests", {
      cache: "no-store",
    });

    const data = await res.json();

    if (data.success) {
      setItems(data.items);
    }
  }

  async function updateItem(id, payload) {
    await fetch(`/api/admin/contact-requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    loadItems();
  }

  async function deleteItem(id) {
    if (!confirm("Delete this contact request?")) return;

    await fetch(`/api/admin/contact-requests/${id}`, {
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
        title="Contact Requests"
        description="Manage public contact messages sent to EVEL™ Cosmetics Group."
        data={items}
        emptyText="No contact requests found."
        columns={[
          {
            key: "fullName",
            label: "Name",
          },
          {
            key: "email",
            label: "Email",
          },
          {
            key: "country",
            label: "Country",
            render: (row) => row.country || "—",
          },
          {
            key: "company",
            label: "Company",
            render: (row) => row.company || "—",
          },
          {
            key: "subject",
            label: "Subject",
            render: (row) => row.subject || "—",
          },
          {
            key: "message",
            label: "Message",
            render: (row) => (
              <span className="adminTableClamp">
                {row.message || "—"}
              </span>
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
              <option value="RESOLVED">RESOLVED</option>
              <option value="ARCHIVED">ARCHIVED</option>
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

            <button
              type="button"
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