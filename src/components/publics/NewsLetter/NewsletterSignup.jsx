"use client";

import { useState } from "react";
import PBImage from "@/components/PBImage";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewsletterSignup({
  id = "newsletter-signup",
  image = "/images/newsletter/newsletter.jpg",
  source = "public-newsletter-form",
}) {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    if (!accepted) {
      setStatus("Please confirm that you agree before signing up.");
      return;
    }

    setLoading(true);
    setStatus("");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          email,
          source,
          consent: true,
          ageConfirmed: true,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus(data.message || "Unable to subscribe. Please try again.");
        return;
      }

      setEmail("");
      setAccepted(false);
      setStatus("Thank you. You are now subscribed.");
    } catch (error) {
      setStatus(
        error.name === "AbortError"
          ? "Request timeout. Please try again."
          : "Network error. Please try again."
      );
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <section className="newsletterSignup" id={id}>
      <div id="newsletter" />

      <div className="evelContainer newsletterSignupInner">
        <div className="newsletterSignupContent">
          <h2>Sign up to our newsletter.</h2>

          <p>
            Be the first to know about product updates, promotional offers,
            company news, and future Evel Protect™ product releases.
          </p>

          <form className="newsletterSignupForm" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              placeholder="Enter your email address →"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="newsletterConsent">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                required
              />

              <span>
                By proceeding, I agree to receive emails from Evel Protect™ and
                other trusted Evel Protect™ programme group communications,
                including product updates, promotional offers, launch news, and
                marketing messages. I also confirm that I am at least 18 years
                of age and understand that I can unsubscribe at any time.
              </span>
            </label>

            <button type="submit" disabled={loading || !accepted}>
              {loading ? "PLEASE WAIT..." : "SIGN ME UP"}
              <span className="evelBtnArrow">
                <FontAwesomeIcon icon={faArrowRightLong} />
              </span>
            </button>
          </form>

          {status && <span className="newsletterSignupStatus">{status}</span>}
        </div>

        <div className="newsletterSignupMedia">
          <PBImage
            src={image}
            alt="Newsletter signup"
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="newsletterSignupImg"
          />
        </div>
      </div>
    </section>
  );
}