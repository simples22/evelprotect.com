"use client";

import { useEffect, useState } from "react";
import EvelButton from "@/components/publics/ui/EvelButton";
import UILine from "@/components/admin/ui/UILine";
const countries = [
  "United States",
  "Canada",
  "Haiti",
  "France",
  "Dominican Republic",
  "Mexico",
  "Brazil",
  "United Kingdom",
  "Germany",
  "Spain",
  "Other",
];

const cities = [
  "Brandon, FL",
  "Tampa, FL",
  "Orlando, FL",
  "Miami, FL",
  "Fort Lauderdale, FL",
  "Jacksonville, FL",
  "New York, NY",
  "Brooklyn, NY",
  "Queens, NY",
  "Albany, NY",
  "Los Angeles, CA",
  "San Diego, CA",
  "San Francisco, CA",
  "Sacramento, CA",
  "Atlanta, GA",
  "Dallas, TX",
  "Houston, TX",
  "Charlotte, NC",
  "Toronto, Canada",
  "Montreal, Canada",
  "Ottawa, Canada",
  "Vancouver, Canada",
  "Port-au-Prince, Haiti",
  "Les Cayes, Haiti",
  "Cap-Haïtien, Haiti",
  "Jacmel, Haiti",
  "Other",
];

const departments = [
  "RH",
  "Accounting",
  "Marketing and Brand",
  "Sales",
  "Research and Development",
  "Financial",
  "Technology and Informatics",
  "Manufacturing and Quality",
];

const services = [
  "Inquiry",
  "Customer Service",
  "Quality",
  "Sales",
  "Marketing",
];

const languages = [
  "English",
  "French",
  "Haitian Creole",
  "Spanish",
];

export default function EvelContactForms() {
  const [careerOpen, setCareerOpen] = useState(false);
  const [sent, setSent] = useState("");

  useEffect(() => {
    document.body.classList.toggle("evelCareerOpen", careerOpen);

    return () => {
      document.body.classList.remove("evelCareerOpen");
    };
  }, [careerOpen]);

  async function submitForm(e, type) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    form.set("consent", form.get("consent") === "on" ? "true" : "false");

    const endpoint =
      type === "career" ? "/api/public/careers" : "/api/public/contact";

    const res = await fetch(endpoint, {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      setSent(type);
      e.currentTarget.reset();
      if (type === "career") setCareerOpen(false);
    }
  }

  return (
    <div className="evelContactForms">
      <datalist id="evelCities">
        {cities.map((city) => (
          <option value={city} key={city} />
        ))}
      </datalist>

      <div className="evelContactFormsIntro">
        <h2>Use our contact form</h2>
        <p>
          Contact Evel Protect™ Cosmetics Group for business inquiries, partnerships,
          support requests, supplier discussions, media opportunities, or future
          career applications.
        </p>
      </div>

        <div className="evelContactActions">
          <EvelButton
            type="button"
            variant="secondary"
            align="left"
            onClick={() => {
              setCareerOpen(false);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Contact Us
          </EvelButton>

          <EvelButton
            type="button"
            variant="secondary"
            align="left"
            onClick={() => setCareerOpen(true)}
          >
            Career Application
          </EvelButton>
        </div>

        <UILine />

    <div className="evelContactFormsIntro">
            <p className="evelFormNotice">
            Please complete the form below to contact EVEL™ Cosmetics Group.
            <strong> Fields marked with * are required.</strong>
              </p>

              <p className="evelFormNoticeSmall">
            Select your country, preferred language and service category to
            help us route your request to the appropriate department.
          </p>
    </div>

      {sent === "contact" && (
        <div className="evelFormSuccess">
          Your message has been submitted successfully.
        </div>
      )}

      <form className="evelContactForm" onSubmit={(e) => submitForm(e, "contact")}>
        <div className="evelFormGrid">
          <Field name="fullName" label="Full Name *" required />
          <Field name="email" label="Email Address *" type="email" required />
          <Field name="phone" label="Phone Number" type="tel" />

          <Select name="country" label="Country *" options={countries} required />
          <Field name="city" label="City" list="evelCities" />
          <Field name="company" label="Enterprise / Company" />

          <Select name="service" label="Service *" options={services} required />
          <Select name="language" label="Preferred Language" options={languages} />

          <Field name="subject" label="Subject *" required />
          <Field name="preferredDate" label="Preferred Date MM/DD/YYYY" placeholder="MM/DD/YYYY" />
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

            <div className="NoticeCareerspanel">
              <strong> Fields marked with * are required.</strong>
                <p className="evelFormNotice">
                  Submit your application for future opportunities within
                  Evel Protect™ Cosmetics Group.
                </p>

                <p className="evelFormNoticeSmall">
                  Please provide accurate personal, professional and employment
                  information. Supporting documents may be uploaded in PDF,
                  DOC, DOCX, JPG or PNG format.
                </p>
            </div>

            <form
              className="evelContactForm"
              encType="multipart/form-data"
              onSubmit={(e) => submitForm(e, "career")}
            >
              <h3 className="evelFormGroupTitle">Personal Information</h3>

              <div className="evelFormGrid">
                <Field name="fullName" label="Full Name *" required />
                <Field name="email" label="Email Address *" type="email" required />
                <Field name="phone" label="Phone Number *" type="tel" required />
                <Field name="birthDate" label="Date of Birth MM/DD/YYYY" placeholder="MM/DD/YYYY" />

                <Select name="country" label="Country *" options={countries} required />
                <Field name="city" label="City *" list="evelCities" required />
                <Field name="address" label="Full Address" />
                <Field name="zipCode" label="Zip Code" />

                <Select name="preferredLanguage" label="Preferred Language" options={languages} required />
                <Field name="linkedinUrl" label="LinkedIn URL" type="url" />
                <Field name="portfolioUrl" label="Portfolio / Website" type="url" />
              </div>

              <h3 className="evelFormGroupTitle">Position Information</h3>

              <div className="evelFormGrid">
                <Field name="position" label="Desired Position *" required />
                <Select name="department" label="Department to Work *" options={departments} required />

                <Select
                  name="employmentType"
                  label="Employment Type *"
                  options={["Full Time", "Part Time", "Internship", "Freelance", "Contract"]}
                  required
                />

                <Select
                  name="workMode"
                  label="Work Mode *"
                  options={["Remote", "Hybrid", "On Site"]}
                  required
                />

                <Field name="availability" label="Start Availability MM/DD/YYYY" placeholder="MM/DD/YYYY" />
                <Field name="salaryExpected" label="Expected Salary" />
              </div>

              <h3 className="evelFormGroupTitle">Documents</h3>

                <div className="evelFormNoticeBox">
                  <strong>Document Uploads</strong>

                  <p>
                    Upload your resume, portfolio and supporting documents.
                    Accepted formats: PDF, DOC, DOCX, JPG and PNG.
                  </p>
                </div>

              <div className="evelFormGrid">
                <UploadField name="resume" label="Resume / CV *" required />
                <UploadField name="coverDocument" label="Cover Letter Document" />
                <UploadField name="portfolioFile" label="Portfolio / Work Sample" />
                <UploadField name="extraDocument" label="Additional Document" />
              </div>

              <Textarea name="coverLetter" label="Cover Letter / Message *" required />

              <h3 className="evelFormGroupTitle">Professional Experience</h3>

              <div className="evelFormGrid">
                <Field name="experienceYears" label="Years of Experience *" type="number" required />
                <Field name="currentCompany" label="Last / Current Company" />
                <Field name="currentRole" label="Current / Previous Role" />
                <Field name="languages" label="Languages Spoken" />
              </div>

              <Textarea name="skills" label="Main Skills *" required />

              <h3 className="evelFormGroupTitle">Additional Questions</h3>

              <Textarea name="whyJoin" label="Why do you want to join EVEL™ Cosmetics Group? *" required />
              <Textarea name="whyGoodCandidate" label="Why are you a good candidate? *" required />

              <label className="evelCheck">
                <input type="checkbox" name="consent" required />
                  <span>
                    I confirm that I am over 16 years old and agree that my data
                    may be used for recruitment purposes.
                  </span>
                </label>

                <div className="evelFormNoticeBox">
                  <p>
                    Submission of this application does not guarantee employment.
                    Applications are reviewed based on current and future business
                    needs of Evel Protect™ Cosmetics Group.
                  </p>
                </div>

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

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  list,
}) {
  return (
    <label className="evelField">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        list={list}
      />
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

function UploadField({ label, name, required = false }) {
  return (
    <label className="evelField evelUploadField">
      <span>{label}</span>

      <input
        name={name}
        type="file"
        required={required}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
      />

      <small>Upload or drag and drop PDF, DOC, DOCX, JPG or PNG.</small>
    </label>
  );
}