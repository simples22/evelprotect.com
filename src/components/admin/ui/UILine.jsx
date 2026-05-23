"use client";

export default function UILine({
  className = "",
  vertical = false,
  soft = false,
  dark = false,
  white = false,
  blue = false,
  spacing = "",
}) {
  return (
    <div
      className={[
        "uiLine",

        vertical ? "isVertical" : "",
        soft ? "isSoft" : "",
        dark ? "isDark" : "",
        white ? "isWhite" : "",
        blue ? "isBlue" : "",

        spacing === "sm" ? "isSpacingSm" : "",
        spacing === "md" ? "isSpacingMd" : "",
        spacing === "lg" ? "isSpacingLg" : "",

        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    />
  );
}