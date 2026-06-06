import Link from "next/link";

export default function EvelLogo({
  href = "/",
  className = "",
}) {
  return (
    <Link href={href} className={`evelLogo ${className}`}>
      <span className="evelLogoTop">
        <span className="evelLogoText">EVEL PROTECT</span>
        <span className="evelLogoTrademark">™</span>
      </span>

      <span className="evelLogoBottom">
        cosmetics
      </span>
    </Link>
  );
}