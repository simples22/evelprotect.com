"use client";

import { useState } from "react";

const countries = [
  "Haiti",
  "United States",
  "Canada",
  "France",
  "Dominican Republic",
  "Mexico",
  "Brazil",
  "United Kingdom",
  "Germany",
  "Spain",
  "Other",
];

export default function EvelContactForms() {
  const [careerOpen, setCareerOpen] = useState(false);
  const [sent, setSent] = useState("");

  async function submitForm(e, type) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    const endpoint =
      type === "career" ? "/api/public/careers" : "/api/public/contact";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, consent: form.get("consent") === "on" }),
    });

    if (res.ok) {
      setSent(type);
      e.currentTarget.reset();
      if (type === "career") setCareerOpen(false);
    }
  }

  return (
    <div className="evelContactForms">
      <div className="evelContactFormsIntro">
        <h2>Connect with evel™ Cosmetics Group</h2>
        <p>
          Contact evel™ Cosmetics Group for business inquiries, partnerships,
          support requests, supplier discussions, media opportunities, or future
          career applications within our developing beauty and personal care
          ecosystem.
        </p>
      </div>

      <div className="evelContactSwitch">
        <button type="button" className="isActive">
          Contact
        </button>

        <button type="button" onClick={() => setCareerOpen(true)}>
          Careers
        </button>
      </div>

      {sent === "contact" && (
        <div className="evelFormSuccess">
          Your message has been submitted successfully.
        </div>
      )}

      <p className="evelFormNotice">
        Please select a location from the dropdown below.
        <strong> Required fields are marked with *</strong>
      </p>

      <p className="evelFormNoticeSmall">
        Enter the first two letters to quickly navigate to a location.
      </p>

      <form className="evelContactForm" onSubmit={(e) => submitForm(e, "contact")}>
        <div className="evelFormGrid">
          <Field name="fullName" label="Full Name *" required />
          <Field name="email" label="Email Address *" type="email" required />
          <Field name="phone" label="Phone Number" />
          <Select name="country" label="Country *" options={countries} required />
          <Field name="city" label="City" />
          <Field name="company" label="Enterprise / Company *" required />
          <Field name="service" label="Service" />
          <Field name="subject" label="Subject *" required />
        </div>

        <Textarea name="message" label="Message *" required />

        <button className="evelFormSubmit" type="submit">
          Send Message
        </button>
      </form>

      {careerOpen && (
        <div className="evelCareerOverlay">

          <div className="evelCareerPanel">

            <div className="evelCareerPanelHead">
              <div>
                <span>Careers</span>
                <h2>Submit Application</h2>
              </div>

              <button
                type="button"
                className="evelCareerClose"
                onClick={() => setCareerOpen(false)}
              >
                ×
              </button>
            </div>
            <p className="evelFormNotice">
                Please select a location from the dropdown below.
                <strong> Required fields are marked with *</strong>
              </p>

              <p className="evelFormNoticeSmall">
                Enter the first two letters to quickly navigate to a location.
              </p>
              <div className="evelContactFormsIntro">
      
                <p>
                  Submit your application to explore future opportunities within
                  evel™ Cosmetics Group across beauty, skincare, personal care,
                  branding, marketing, operations, and developing consumer product
                  categories.
                </p>
                </div>
            <form
              className="evelContactForm"
              onSubmit={(e) => submitForm(e, "career")}
            >
              <h3 className="evelFormGroupTitle">Personal Information</h3>

              <div className="evelFormGrid">
                <Field name="fullName" label="Full Name *" required />
                <Field name="email" label="Email Address *" type="email" required />
                <Field name="phone" label="Phone Number *" required />
                <Select name="country" label="Country *" options={countries} required />
                <Field name="city" label="City *" required />
                <Field name="address" label="Full Address *" required />
                <Field name="linkedinUrl" label="LinkedIn URL *" required />
                <Field name="portfolioUrl" label="Portfolio / Website *" required />
              </div>

              <h3 className="evelFormGroupTitle">Position Information</h3>

              <div className="evelFormGrid">
                <Field name="position" label="Desired Position *" required />
                <Field name="department" label="Department *" required />

                <Select
                  name="employmentType"
                  label="Employment Type *"
                  options={["Full Time", "Part Time", "Internship", "Freelance"]}
                  required
                />

                <Select
                  name="workMode"
                  label="Work Mode *"
                  options={["Remote", "Hybrid", "On Site"]}
                  required
                />

                <Field name="availability" label="Start Availability *" required />
                <Field name="salaryExpected" label="Expected Salary *" required />
              </div>

              <h3 className="evelFormGroupTitle">Documents</h3>

              <div className="evelFormGrid">
                <Field name="resumeUrl" label="Resume / CV URL *" required />
                <Field name="portfolioFileUrl" label="Portfolio URL *" required />
                <Field
                  name="extraDocumentUrl"
                  label="Additional Document URL *"
                  required
                />
              </div>

              <Textarea name="coverLetter" label="Cover Letter *" required />

              <h3 className="evelFormGroupTitle">Professional Experience</h3>

              <div className="evelFormGrid">
                <Field
                  name="experienceYears"
                  label="Years of Experience *"
                  type="number"
                  required
                />
                <Field name="currentCompany" label="Last / Current Company *" required />
                <Field name="currentRole" label="Current / Previous Role *" required />
                <Field name="languages" label="Languages Spoken *" required />
              </div>

              <Textarea name="skills" label="Main Skills *" required />

              <h3 className="evelFormGroupTitle">Additional Questions</h3>

              <Textarea
                name="whyJoin"
                label="Why do you want to join evel™ Cosmetics Group? *"
                required
              />

              <Textarea
                name="whyGoodCandidate"
                label="Why are you a good candidate? *"
                required
              />

              <label className="evelCheck">
                <input type="checkbox" name="consent" required />
                <span>
                  Yes - I confirm that I am over 16 years old. By submitting
                  this form, I agree that my data may be used for recruitment
                  purposes.
                </span>
              </label>

              <button className="evelFormSubmit" type="submit">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, name, type = "text", required = false }) {
  return (
    <label className="evelField">
      <span>{label}</span>
      <input name={name} type={type} required={required} />
    </label>
  );
}

function Textarea({ label, name, required = false }) {
  return (
    <label className="evelField evelFieldFull">
      <span>{label}</span>
      <textarea name={name} rows="5" required={required} />
    </label>
  );
}

function Select({ label, name, options = [], required = false }) {
  return (
    <label className="evelField">
      <span>{label}</span>
      <select name={name} required={required}>
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}