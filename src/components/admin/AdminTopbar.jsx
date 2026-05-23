"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function AdminTopbar() {
  return (
    <header className="adminTopbar">
      <div className="adminTopbarTitle">
        <strong>Admin Dashboard</strong>
        <span>Manage content, forms, products and settings</span>
      </div>

      <button type="button" className="adminTopbarBtn">
        <FontAwesomeIcon icon={faShieldHalved} />
        <span>Security</span>
      </button>
    </header>
  );
}