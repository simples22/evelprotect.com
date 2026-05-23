"use client";

import { useState } from "react";

export default function ProductRatingAccordion({ slug }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);

  async function submitReview(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    await fetch(`/api/public/products/${slug}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        name: form.get("name"),
        message: form.get("message"),
      }),
    });

    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <div className="evelRatingAccordion">
      <button
        type="button"
        className="evelRatingAccordionBtn"
        onClick={() => setOpen(!open)}
      >
        Add Product Rating
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <form className="evelRatingForm" onSubmit={submitReview}>
          <div className="evelRatingBoxes">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={rating === value ? "isActive" : ""}
                onClick={() => setRating(value)}
              >
                {value} ★
              </button>
            ))}
          </div>

          <input name="name" placeholder="Your name optional" />
          <textarea name="message" placeholder="Write a short review optional" />

          <button type="submit">Submit Rating</button>

          {sent && <p>Thank you. Your rating has been submitted.</p>}
        </form>
      )}
    </div>
  );
}