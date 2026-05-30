import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function EvelButton({
  children,
  href,
  onClick,
  type = "button",

  variant = "primary",
  size = "md",

  align = "left",
  direction = "", // left | right

  icon,
  disabled = false,
  full = false,
  target,

  showArrow = true,
  arrowType = "default", // default | external | none
}) {
  const isPlay = variant === "play";
  const hasCustomIcon = Boolean(icon);
  const shouldShowArrow =
    showArrow && !isPlay && !hasCustomIcon && arrowType !== "none";

  const ArrowIcon =
    arrowType === "external"
      ? faArrowUpRightFromSquare
      : direction === "left"
        ? faArrowLeftLong
        : faArrowRightLong;

  const className = [
    "evelBtnWrap",
    `is-${align}`,
    full ? "is-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const btnClass = [
    "evelBtn",
    `is-${variant}`,
    `is-${size}`,
    direction ? `is-${direction}` : "",
    shouldShowArrow ? "has-arrow" : "",
    arrowType === "external" ? "has-external-arrow" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {direction === "left" && shouldShowArrow && (
        <span className="evelBtnIcon evelBtnArrow is-leftArrow">
          <FontAwesomeIcon icon={ArrowIcon} />
        </span>
      )}

      {icon && <span className="evelBtnIcon">{icon}</span>}

      <span className="evelBtnText">{children}</span>

      {direction !== "left" && shouldShowArrow && (
        <span className="evelBtnIcon evelBtnArrow is-rightArrow">
          <FontAwesomeIcon icon={ArrowIcon} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <div className={className}>
        <Link href={href} className={btnClass} target={target}>
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        type={type}
        onClick={onClick}
        className={btnClass}
        disabled={disabled}
      >
        {content}
      </button>
    </div>
  );
}