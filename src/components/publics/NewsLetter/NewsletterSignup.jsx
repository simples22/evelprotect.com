"use client";

import { useState } from "react";
import EvelButton from "@/components/publics/ui/EvelButton";

export default function NewsletterSignup({
  id = "newsletter",
  source = "public-newsletter-form",
}) {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
  });

  function openModal(type, message) {
    setModal({
      open: true,
      type,
      message,
    });
  }

  function closeModal() {
    setModal({
      open: false,
      type: "",
      message: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    if (!accepted) {
      openModal(
        "error",
        "Please confirm that you agree before signing up."
      );
      return;
    }

    setLoading(true);

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
        openModal(
          "error",
          data.message || "Unable to subscribe. Please try again."
        );
        return;
      }

      setEmail("");
      setAccepted(false);

      openModal("success", "Thank you. You are now subscribed.");
    } catch (error) {
      openModal(
        "error",
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
      <div className="evelContainer newsletterSignupInner">
        <div className="newsletterSignupContent">
          <h2>Sign up to our newsletter.</h2>

          <p>
            Be the first to know about product updates, promotional offers,
            company news, and future Evel Protect™ product releases.
          </p>

          <form className="newsletterSignupForm" onSubmit={handleSubmit}>
            <div className="newsletterSignupRow">
            <input
              type="email"
              value={email}
              placeholder="Enter your email address →"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          <div className="newsletterSubmitAction">
            <EvelButton
                  type="submit"
                  variant="primary"
                  className="newsletterSubmitBtn"
                  disabled={loading || !accepted}
                >
                  {loading ? "Please Wait..." : "Sign Up"}
                </EvelButton>
            </div>
            </div>

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
          </form>
        </div>
      </div>

      {modal.open && (
        <div
          className="newsletterConfirmOverlay"
          role="dialog"
          aria-modal="true"
        >
          <div className="newsletterConfirmBox">
            <span>{modal.type === "success" ? "Success" : "Notice"}</span>

            <h3>
              {modal.type === "success"
                ? "Subscription Confirmed"
                : "Action Required"}
            </h3>

            <p>{modal.message}</p>

            <div className="newsletterModalAction">
              <EvelButton
                type="button"
                variant="primary"
                className="newsletterModalBtn"
                align="center"
                onClick={closeModal}
              >
                Continue
              </EvelButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}