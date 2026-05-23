"use client";

import { useState } from "react";

const productFaqs = [
  {
    question: "What should customers know about evel™ face products?",
    answer:
      "evel™ face product direction focuses on daily care, clean presentation, and modern beauty routines. Face products may include skincare-inspired essentials, complexion support, and everyday-use items designed to help customers build a consistent routine. The goal is to support comfort, freshness, and confidence while keeping the brand experience simple, clear, and premium.",
  },
  {
    question: "What is the direction of evel™ body care products?",
    answer:
      "evel™ body care products are designed around everyday freshness, hygiene, comfort, and modern personal care. This category may include deodorants, body wash, lotions, fragrance care, and daily essentials. The focus is to create products that feel practical, visually premium, and suitable for active routines, self-care, and long-term consumer trust.",
  },
  {
    question: "What type of hair care products can evel™ develop?",
    answer:
      "evel™ hair care direction may include shampoos, conditioners, hair freshness products, and routine-focused care essentials. The objective is to support simple daily grooming with clean packaging, accessible premium positioning, and products that fit naturally into beauty and personal care routines. Hair care remains part of the group’s long-term product ecosystem.",
  },
  {
    question: "What makes evel™ cosmetics products different?",
    answer:
      "evel™ cosmetics products are positioned around modern beauty expression, visual identity, and everyday confidence. This category may include makeup, complexion products, lip care, beauty accessories, and cosmetics care essentials. The goal is to develop products that feel polished, easy to understand, and aligned with the lifestyle of today’s beauty consumers.",
  },
  {
    question: "Why choose products from evel™ Cosmetics Group?",
    answer:
      "evel™ Cosmetics Group is building a long-term beauty and personal care ecosystem with a focus on brand identity, consumer trust, and quality positioning. The company aims to develop products across face, body, hair, cosmetics, deodorants, fragrance, and care essentials. Each product direction is created to support everyday routines, modern presentation, and a premium customer experience.",
  },
];

export default function ProductFaqs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="evelProductFaqs">
      <div className="evelContainer">
        <div className="evelProductFaqsHead">
          <span>Product FAQs</span>
          <h2>Helpful answers about evel™ product categories</h2>
        </div>

        <div className="evelProductFaqsList">
          {productFaqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                className={`evelProductFaqItem ${isOpen ? "isOpen" : ""}`}
                key={item.question}
              >
                <button
                  type="button"
                  className="evelProductFaqButton"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <strong>{isOpen ? "−" : "+"}</strong>
                </button>

                <div className="evelProductFaqContent">
                  <div className="evelProductFaqInner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}