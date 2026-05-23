"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import NewsletterAdminTable from "@/components/admin/newsletters/NewsletterAdminTable";

export default function AdminNewslettersPage() {
  const [items, setItems] = useState([]);

  async function loadItems() {
    const res = await fetch("/api/admin/newsletters", { cache: "no-store" });
    const data = await res.json();

    if (data.success) {
      setItems(data.items);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function updateItem(id, payload) {
    const res = await fetch(`/api/admin/newsletters/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Unable to update subscriber.");
      return;
    }

    loadItems();
  }

  async function markRead(item) {
    updateItem(item.id, { isRead: true });
  }

  async function toggleActive(item) {
    updateItem(item.id, { isActive: !item.isActive });
  }

  async function deleteItem(id) {
    if (!confirm("Delete this subscriber?")) return;

    const res = await fetch(`/api/admin/newsletters/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Unable to delete subscriber.");
      return;
    }

    loadItems();
  }

  return (
    <main className="adminResourcePage">
      <AdminPageHeader
        eyebrow="Audience Management"
        title="Newsletters"
        description="Manage newsletter subscribers, activation status, read state and future marketing audience."
      />

      <div className="adminResourceLayout isSingle">
        <NewsletterAdminTable
          items={items}
          markRead={markRead}
          toggleActive={toggleActive}
          deleteItem={deleteItem}
        />
      </div>
    </main>
  );
}