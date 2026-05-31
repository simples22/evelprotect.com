"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function EvelSearchBar({
  label = "Search by",
  value = "",
  onChange,
  onClear,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`evelSearchBar ${className}`}>
      {label && <label>{label}</label>}

      <div className="evelSearchBarBox">
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />

        <button
          type="button"
          onClick={() => (value ? onClear?.() : null)}
          aria-label={value ? "Clear search" : "Search"}
        >
          <FontAwesomeIcon
            icon={value ? faXmark : faArrowRightLong}
            />
        </button>
      </div>
    </div>
  );
}