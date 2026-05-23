"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EvelLogo from "./EvelLogo";

const links = [
  { label: "Company", href: "/our-company" },
  { label: "Our News", href: "/news" },
  { label: "Our Products", href: "/shop" },
  { label: "Financial Highlight", href: "/financial-hightligh" },
  { label: "Brand Partners", href: "/our-brands" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const topRatedProduct = useMemo(() => {
    if (!products.length) return null;

    return [...products].sort((a, b) => {
      const ratingA = Number(a.rating || 0);
      const ratingB = Number(b.rating || 0);
      const countA = Number(a.ratingCount || 0);
      const countB = Number(b.ratingCount || 0);

      return ratingB - ratingA || countB - countA;
    })[0];
  }, [products]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/public/products", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          setProducts(data.items || []);
        }
      } catch {}
    }

    loadProducts();
  }, []);

  return (
    <>
      <header
        className={`evelHeader ${scrolled ? "isScrolled" : ""} ${
          open ? "isMenuOpen" : ""
        }`}
      >
        <div className="evelContainer evelHeaderInner">
          <EvelLogo />

          <nav className="evelDesktopNav" aria-label="Primary navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={`evelMenuButton ${open ? "isOpen" : ""}`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="evelMenuText">{open ? "Close" : "Menu"}</span>

            <span className="evelMenuIcon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <aside className={`evelMobilePanel ${open ? "isOpen" : ""}`}>
        <div className="evelContainer evelMobilePanelHeader">
          <EvelLogo className="EvelNAvLogo" />
        </div>

        <div className="evelContainer evelMobilePanelBody">
          <Link
            href="/#newsletter"
            className="evelMobileNewsletterLink"
            onClick={() => setOpen(false)}
          >
            Sign to our Newsletter
          </Link>

          <nav className="evelMobileNav" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {topRatedProduct && (
            <Link
              href={`/shop/${topRatedProduct.slug}`}
              className="evelMobileProductCard"
              onClick={() => setOpen(false)}
            >
              <div>
                <span>Top Rated Product</span>
                <h3>{topRatedProduct.title}</h3>
              </div>

              <div className="evelMobileProductMedia">
                <Image
                  src={topRatedProduct.image1}
                  alt={topRatedProduct.title}
                  fill
                  sizes="180px"
                  className="evelMobileProductImg"
                />
              </div>

              <p>
                {topRatedProduct.shortDescription ||
                  topRatedProduct.description ||
                  "Explore one of our most appreciated products from Evel Protect™."}
              </p>
            </Link>
          )}

          <div className="evelMobileLegalLinks">
            <Link href="/terms-of-use" onClick={() => setOpen(false)}>
              Terms of Use
            </Link>

            <Link href="/privacy-policy" onClick={() => setOpen(false)}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}