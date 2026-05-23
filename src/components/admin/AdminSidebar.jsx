"use client";

import Link from "next/link";
import EvelLogo from "@/components/EvelLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartLine,
  faNewspaper,
  faEnvelopeOpenText,
  faBullhorn,
  faLeaf,
  faAddressBook,
  faFileCircleCheck,
  faUsers,
  faBoxOpen,
  faGear,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: faChartLine,
  },

  {
    label: "News",
    href: "/admin/news",
    icon: faNewspaper,
  },

  {
    label: "Newsletters",
    href: "/admin/newsletters",
    icon: faEnvelopeOpenText,
  },

  {
    label: "Marketing",
    href: "/admin/marketing",
    icon: faBullhorn,
  },

  {
    label: "Sustainability",
    href: "/admin/sustainability",
    icon: faLeaf,
  },

  {
    label: "Contacts",
    href: "/admin/contacts-requests",
    icon: faAddressBook,
  },

  {
    label: "Applications Requests",
    href: "/admin/applications",
    icon: faFileCircleCheck,
  },

  {
    label: "Leadership",
    href: "/admin/leadership",
    icon: faUsers,
  },

  {
    label: "Products",
    href: "/admin/products",
    icon: faBoxOpen,
  },

  {
    label: "Settings",
    href: "/admin/settings",
    icon: faGear,
  },
];

export default function AdminSidebar({
  collapsed,
  setCollapsed,
}) {
  return (
    <aside className="adminSidebar">
      <div className="adminSidebarTop">
        <div className="adminBrand">
          <EvelLogo href="/admin" className="adminLogo" />
        </div>

        <button
          type="button"
          className="adminCollapseBtn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon
            icon={collapsed ? faChevronRight : faChevronLeft}
          />
        </button>
      </div>

      <nav className="adminNav" aria-label="Admin navigation">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="adminNavLink"
          >
            <span className="adminNavIcon">
              <FontAwesomeIcon icon={item.icon} />
            </span>

            {!collapsed && (
              <span className="adminNavText">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}