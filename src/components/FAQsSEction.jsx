"use client";

import Link from "next/link";
import { useState } from "react";
import {
  faChevronDown,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faqs } from "@/data/faqs";

export default function FAQSection({ limit = 5, showViewAll = true }) {
  const items = faqs.slice(0, limit);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="evelFaqSection" id="faq">
      <div className="evelContainer">
        <div className="evelFaqIntro">
          <span>FAQS</span>

          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="evelFaq">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                className={`evelFaqItem ${isOpen ? "active" : ""}`}
                key={item.question}
              >
                <button
                  type="button"
                  className="evelFaqQuestion"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="evelFaqIcon">
                    <FontAwesomeIcon icon={faCircleQuestion} />
                  </span>

                  <span className="evelFaqQuestionText">{item.question}</span>

                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="evelFaqChevron"
                  />
                </button>

                <div className="evelFaqAnswer">
                  <div className="evelFaqAnswerInner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {showViewAll && (
          <div className="evelFaqFooter">
            <Link href="/faq" className="evelMiniLink">
              View all FAQ →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}