"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

export default function AdminContactRequests() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/contacts-requests", {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setItems(data.items || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to load contact requests:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(id, payload) {
    try {
      const res = await fetch(`/api/admin/contacts-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to update request.");
        return;
      }

      await loadItems();
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  async function deleteItem(id) {
    if (!confirm("Delete this contact request?")) return;

    try {
      const res = await fetch(`/api/admin/contacts-requests/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to delete request.");
        return;
      }

      await loadItems();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <main className="adminPage evelAdminPage">
      <AdminTable
        title="Contact Requests"
        description="Manage public contact messages sent to EVEL™ Cosmetics Group."
        data={items}
        emptyText={
          loading
            ? "Loading contact requests..."
            : "No contact requests found."
        }
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
              <span
                className={`adminStatus adminStatus${
                  row.status || "NEW"
                }`}
              >
                {row.status || "NEW"}
              </span>
            ),
          },

          {
            key: "createdAt",
            label: "Date",
            render: (row) =>
              row.createdAt
                ? new Date(row.createdAt).toLocaleDateString()
                : "—",
          },
        ]}
        actions={(row) => (
          <>
            <select
              value={row.status || "NEW"}
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
              className="adminBtnDanger"
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