"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";
import AdminLeadershipForm from "./AdminLeadershipForm";

export default function AdminLeadershipManager() {
  const [items, setItems] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/leadership", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setItems(data.items || []);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(item) {
    if (!confirm(`Delete ${item.name}?`)) return;

    const res = await fetch(`/api/admin/leadership/${item.id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      loadItems();
    }
  }

  function handleEdit(item) {
    setEditing(item);
    setOpenForm(true);
  }

  function handleCreate() {
    setEditing(null);
    setOpenForm((prev) => !prev);
  }

  useEffect(() => {
    loadItems();
  }, []);

  const columns = useMemo(
    () => [
      {
        key: "displayOrder",
        label: "Order",
      },
      {
        key: "name",
        label: "Name",
      },
      {
        key: "functionTitle",
        label: "Function",
      },
      {
        key: "division",
        label: "Division",
      },
      {
        key: "isPublished",
        label: "Published",
        render: (item) => (item.isPublished ? "Yes" : "No"),
      },
      {
        key: "isFeatured",
        label: "Featured",
        render: (item) => (item.isFeatured ? "Yes" : "No"),
      },
    ],
    []
  );

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      onClick: deleteItem,
    },
  ];

  return (
    <section className="adminLeadershipPage">
      <div className="adminPageHead">
        <div>
          <h1>+ Add a new  Team Member</h1>
        </div>

        <button
          type="button"
          className="adminPrimaryBtn"
          onClick={handleCreate}
        >
          {openForm ? "Close Form" : "Add Leadership Member"}
        </button>
      </div>

      {openForm && (
        <div className="adminFormAccordionPanel">
          <AdminLeadershipForm
            item={editing}
            onSaved={() => {
              setOpenForm(false);
              setEditing(null);
              loadItems();
            }}
          />
        </div>
      )}

      <AdminTable
        title="Published Leadership"
        description={
          loading
            ? "Loading leadership members..."
            : "Manage all leadership members available for the public leadership page."
        }
        columns={columns}
        data={items}
        emptyText="No leadership members found."
        actions={actions}
      />
    </section>
  );
}