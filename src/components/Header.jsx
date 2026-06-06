"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PBImage from "@/components/PBImage";
import EvelLogo from "./EvelLogo";
import EvelSearchBar from "./publics/ui/EvelSearchBar";

import {
  faArrowRightLong,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [searchOpen, setSearchOpen] = useState(false);
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
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

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

  function toggleMenu() {
    setOpen((prev) => !prev);
    setSearchOpen(false);
  }

  function closeMenu() {
    setOpen(false);
  }

  function toggleSearch() {
    setSearchOpen((prev) => !prev);
    setOpen(false);
  }

  return (
    <>
      <header
        className={`evelHeader ${scrolled ? "isScrolled" : ""} ${
          open ? "isMenuOpen" : ""
        } ${searchOpen ? "isSearchOpen" : ""}`}
      >
        <div className="evelContainer evelHeaderRow">
          <div className="evelHeaderBrand">
            <EvelLogo />
          </div>

          <nav className="evelDesktopNav" aria-label="Primary navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="evelHeaderActions">
            {!open && (
              <button
                className="headerSearchBtn"
                onClick={toggleSearch}
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                type="button"
              >
                <FontAwesomeIcon
                  icon={searchOpen ? faXmark : faMagnifyingGlass}
                />
              </button>
            )}

            <button
              type="button"
              className={`evelMenuButton ${open ? "isOpen" : ""}`}
              onClick={toggleMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="evelMenuText">{open ? "Close" : ""}</span>

              <span className="evelMenuIcon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {searchOpen && !open && (
          <div className="headerSearchMobilePanel">
            <div className="evelContainer headerSearchMobilePanelInner">
              <EvelSearchBar className="evelMobileSearchBar" />
            </div>
          </div>
        )}
      </header>

      <aside className={`evelMobilePanel ${open ? "isOpen" : ""}`}>
        <div className="evelContainer evelMobilePanelHeader">
          <EvelLogo className="EvelNAvLogo" />
        </div>

        <div className="evelContainer evelMobilePanelBody">
            <div className="headerSearchMobilePanelInner">
              <EvelSearchBar className="evelHeaderMobileSearchBar" />
            </div>

          <Link
            href="#newsletter"
            className="evelMobileNewsletterLink"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();

              setTimeout(() => {
                document.getElementById("newsletter")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 250);
            }}
          >
            Sign to our Newsletter
          </Link>

          <nav className="evelMobileNav" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.label} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </nav>

          {topRatedProduct && (
            <Link
              href={`/shop/${topRatedProduct.slug}`}
              className="evelMobileProductCard"
              onClick={closeMenu}
            >
              <div>
                <span>Top Rated Product</span>
                <h3>{topRatedProduct.title}</h3>
              </div>

              <div className="evelMobileProductMedia">
                <PBImage
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
            {[
              { label: "Terms of Use", href: "/terms-of-use" },
              { label: "Consumer Data Policy", href: "/consumer-data-policy" },
              { label: "Your Privacy Choices Access", href: "/privacy-choices" },
              { label: "Privacy Policy", href: "/privacy-policy" },
            ].map((item) => (
              <Link href={item.href} onClick={closeMenu} key={item.href}>
                <span>{item.label}</span>
                <span className="evelExternalArrow">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}