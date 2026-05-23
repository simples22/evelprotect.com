"use client";

import { useState } from "react";
import "@/styles/admin.css";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`adminShell ${collapsed ? "isCollapsed" : ""}`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <section className="adminMain">
        <AdminTopbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="adminContent">
          {children}
        </main>
      </section>
    </div>
  );
}