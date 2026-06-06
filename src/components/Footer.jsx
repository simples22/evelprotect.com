"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faFacebook,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import {
  faArrowRightLong,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Company", href: "/our-company" },
      { label: "Our Leadership", href: "/leadership" },
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
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  function toggleGroup(title) {
    setOpenGroup((prev) => (prev === title ? null : title));
  }

  return (
    <footer className="evelFooter">
      <div className="evelContainer">
        <div className="evelFooterTop">
          <div className="evelFooterBrand">
            <p>
              Evel Protect™ is a personal care company focused on everyday
              consumer wellness, beauty, personal care innovation, and long-term
              brand development.
            </p>
          </div>

          <div className="evelFooterSocialBlock">
            <span>Follow us</span>

            <div className="evelFooterSocial">
              <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>

              <a href="#" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTiktok} />
              </a>

              <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
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

                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className={`evelFooterAccordionIcon ${
                      isOpen ? "isOpen" : ""
                    }`}
                  />
                </button>

                <h4>{group.title}</h4>

                <div className="evelFooterLinks">
                  <div className="evelFooterLinksInner">
                    {group.links.map((link, index) => (
                      <Link
                        href={link.href}
                        key={`${group.title}-${link.href}-${index}`}
                      >
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
              investment opportunities, or general company information, contact
              Evel Protect™ through our official communication channels.
            </p>
          </div>

          <Link href="/contact" className="evelFooterContactBtn">
            <span>Contact Us</span>
                
                  <FontAwesomeIcon icon={faArrowRightLong} />
                
          </Link>
        </div>

        <div className="evelFooterPrivacyChoices">
             <Link href="/consumer-data-policy">
            <span>Consumer Data Policy</span>
                <span className="evelExternalArrow">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </span>
          </Link>

          <Link href="/privacy-choices">
            <span>Your Privacy Choices Access</span>
                <span className="evelExternalArrow">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </span>
          </Link>

          <p>
            Do Not Sell or Share My Personal Information · Opt-Out of Targeted
            Advertising
          </p>

          <p> <strong>NOTICE:</strong>We may sell your sensitive personal data.</p>

        </div>
      </div>

      <div className="evelFooterBottom">
        <div className="evelContainer evelFooterBottomInner">
          <p>© {currentYear} Evel Protect™. All rights reserved.</p>

          <div className="evelFooterBottomLinks">
            <Link href="/privacy-policy">
              <span>Privacy</span>                
              <span className="evelExternalArrow">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </span>
            </Link>

            <Link href="/terms-of-use">
              <span>Terms</span>                
              <span className="evelExternalArrow">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </span>
            </Link>

            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}