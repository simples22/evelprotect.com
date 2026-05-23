"use client";

import { useState } from "react";
import Link from "next/link";

const items = [
  {
    title: "FAQs Section",
    content: (
      <>
        <p>
          For any answers to the most regularly asked questions,
          explore our FAQs section.
        </p>

        <Link href="/faq">
          Explore →
        </Link>
      </>
    ),
  },

  {
    title: "Newsletter Subscribers",
    content: (
      <>
        <p>
          Be ready to get all news and information about our
          products or company.
        </p>

        <Link href="/newsletter">
          Explore →
        </Link>
      </>
    ),
  },

  {
    title: "evel™ Registered Address",
    content: (
      <p>
        evel™ Cosmetics Companies <br />
        234 Miami Evel <br />
        Stermond Street Building, FL, USA
      </p>
    ),
  },

  {
    title: "Shop Contact",
    content: (
      <>
        <p>
          Use the quick links to contact evel™ teams or buy on store.
        </p>

        <div className="evelContactInfoLinks">
          <Link href="/#contacts">
            Contact evel™ USA
          </Link>

          <Link href="/#contacts">
            Buy on evel-store.com ↗
          </Link>

          <Link href="/#contacts">
            Buy on amazone.com ↗
          </Link>
        </div>
      </>
    ),
  },
];

export default function EvelContactInfos() {
  const [openIndex, setOpenIndex] = useState(3);

  return (
    <aside className="evelContactInfos">
      <h2>
        Explore Our Support Service
      </h2>

      {items.map((item, index) => {
        const alwaysOpen = index < 3;

        const isOpen =
          alwaysOpen || openIndex === index;

        return (
          <article
            key={item.title}
            className={`evelContactAccordionItem ${
              isOpen ? "isOpen" : ""
            }`}
          >
            <button
              type="button"
              className="evelContactAccordionButton"
              onClick={() => {
                if (!alwaysOpen) {
                  setOpenIndex(
                    openIndex === index ? -1 : index
                  );
                }
              }}
              aria-expanded={isOpen}
            >
              <span>
                {item.title}
              </span>

              {!alwaysOpen && (
                <span className="evelContactAccordionIcon">
                  {isOpen ? "−" : "+"}
                </span>
              )}
            </button>

            <div className="evelContactAccordionContent">
              <div className="evelContactAccordionInner">
                {item.content}
              </div>
            </div>
          </article>
        );
      })}
    </aside>
  );
}