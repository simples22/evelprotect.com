"use client";

import AdminTable from "@/components/admin/ui/AdminTable";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US");
}

export default function NewsletterAdminTable({
  items,
  markRead,
  toggleActive,
  deleteItem,
}) {
  const columns = [
    {
      key: "email",
      label: "Email",
      render: (item) => (
        <>
          <strong>{item.email}</strong>
          <span>{item.source || "public-newsletter-form"}</span>
        </>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className={item.isActive ? "adminBadge isGreen" : "adminBadge isGray"}>
          {item.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "read",
      label: "Read",
      render: (item) => (
        <span className={item.isRead ? "adminBadge isBlue" : "adminBadge isYellow"}>
          {item.isRead ? "Read" : "New"}
        </span>
      ),
    },
    {
      key: "date",
      label: "Subscribed",
      render: (item) => formatDate(item.subscribedAt),
    },
  ];

  return (
    <AdminTable
      title="Newsletter Subscribers"
      description="Read, activate, deactivate and manage newsletter subscribers."
      columns={columns}
      data={items}
      emptyText="No subscribers yet."
      actions={(item) => (
        <>
          <button
            type="button"
            className="adminTableBtn"
            onClick={() => markRead(item)}
          >
            Mark read
          </button>

          <button
            type="button"
            className="adminTableBtn isGhost"
            onClick={() => toggleActive(item)}
          >
            {item.isActive ? "Deactivate" : "Activate"}
          </button>

          <button
            type="button"
            className="adminTableBtn isDanger"
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
        </>
      )}
    />
  );
}