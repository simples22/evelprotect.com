"use client";

import { useEffect } from "react";
import EvelButton from "@/components/publics/ui/EvelButton";

export default function EvelOverlay({
  open = false,
  onClose,
  title = "",
  eyebrow = "",
  children,
  size = "md",
}) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="evelOverlay" role="dialog" aria-modal="true">
      <button
        type="button"
        className="evelOverlayBackdrop"
        onClick={onClose}
        aria-label="Close overlay"
      />

      <div className={`evelOverlayPanel is-${size}`}>
        <div className="evelOverlayTop">
          <div>
            {eyebrow && <span>{eyebrow}</span>}
            {title && <h3>{title}</h3>}
          </div>

          <EvelButton variant="close" onClick={onClose}>
            ×
          </EvelButton>
        </div>

        <div className="evelOverlayBody">{children}</div>
      </div>
    </div>
  );
}