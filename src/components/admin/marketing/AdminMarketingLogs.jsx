"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";

export default function AdminMarketingLogs() {
  const [items, setItems] = useState([]);

  async function loadItems() {
    const res = await fetch("/api/admin/marketing/logs");
    const data = await res.json();

    if (data.success) {
      setItems(data.items || []);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const columns = [
    { key: "recipient", label: "Recipient" },
    { key: "subject", label: "Subject" },
    { key: "status", label: "Status" },
    { key: "source", label: "Source" },
    {
      key: "sentAt",
      label: "Sent At",
      render: (item) => new Date(item.sentAt).toLocaleString(),
    },
  ];

  return (
    <div className="evelAdminPage">
      <AdminTable
        title="Sent Email Logs"
        description="Review successful and failed marketing messages."
        columns={columns}
        data={items}
        emptyText="No email logs found."
      />
    </div>
  );
}