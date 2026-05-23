"use client";

import AdminTable from "@/components/admin/ui/AdminTable";

export default function NewsAdminTable({ items, editItem, deleteItem }) {
  const columns = [
    {
      key: "title",
      label: "Title",
      render: (item) => (
        <>
          <strong>{item.title}</strong>
          <span>{item.slug}</span>
        </>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (item) => item.category || "Company",
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={item.isPublished ? "adminBadge isGreen" : "adminBadge isGray"}
        >
          {item.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (item) => (
        <span
          className={item.isFeatured ? "adminBadge isBlue" : "adminBadge isGray"}
        >
          {item.isFeatured ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <AdminTable
      title="All News"
      description="Review, edit, publish status and manage featured articles."
      columns={columns}
      data={items}
      emptyText="No news articles yet."
      actions={(item) => (
        <>
          <button
            type="button"
            className="adminTableBtn"
            onClick={() => editItem(item)}
          >
            Edit
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