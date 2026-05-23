"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Company", href: "/our-company" },
      { label: "Our Brands", href: "/our-brands" },
      { label: "Financial Highlights", href: "/financial-hightligh" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Our Products", href: "/our-products" },
      { label: "Cosmetics", href: "/shop?category=Cosmetics" },
      { label: "Body Care", href: "/shop?category=Body" },
      { label: "Hair Care", href: "/shop?category=Hair" },
    ],
  },
  {
    title: "Responsibility",
    links: [
      { label: "Sustainability Programme", href: "/sustainability" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms Of Use", href: "/terms-of-use" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Return Policy", href: "/return-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export default function Footer() {
  const [openGroup, setOpenGroup] = useState(null);

  function toggleGroup(title) {
    setOpenGroup((prev) => (prev === title ? null : title));
  }

  return (
    <footer className="evelFooter">
      <div className="evelContainer">
        <div className="evelFooterTop">
          <div className="evelFooterBrand">

            <p>
              Evel Protect™ is a personal care company for everyday consumer
              wellness.
            </p>
          </div>

          <div className="evelFooterSocialBlock">
            <span>Follow us</span>

            <div className="evelFooterSocial">
              <a href="#" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a href="#" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>

              <a href="#" aria-label="TikTok">
                <FontAwesomeIcon icon={faTiktok} />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>

        <div className="evelFooterGrid">
          {footerGroups.map((group) => {
            const isOpen = openGroup === group.title;

            return (
              <div
                className={`evelFooterCol ${isOpen ? "isOpen" : ""}`}
                key={group.title}
              >
                <button
                  type="button"
                  className="evelFooterAccordionBtn"
                  onClick={() => toggleGroup(group.title)}
                  aria-expanded={isOpen}
                >
                  <span>{group.title}</span>
                  <strong>{isOpen ? "−" : "+"}</strong>
                </button>

                <h4>{group.title}</h4>

                <div className="evelFooterLinks">
                <div className="evelFooterLinksInner">
                  {group.links.map((link, index) => (
                    <Link href={link.href} key={`${group.title}-${link.href}-${index}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              </div>
            );
          })}
        </div>

        <div className="evelFooterContactBand">
          <div>
            <span>Business Contact</span>
            <p>
              For supplier inquiries, manufacturing discussions, partnerships,
              or general company information, contact Evel Protect™ through our
              official communication channels.
            </p>
          </div>

          <Link href="/contact">Contact us →</Link>
        </div>
      </div>

      <div className="evelFooterBottom">
        <div className="evelContainer evelFooterBottomInner">
          <p>© 2026 Evel Protect™. All rights reserved.</p>

          <div className="evelFooterBottomLinks">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-use">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}