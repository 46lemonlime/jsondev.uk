import React, { useState, useRef } from "react";

// import form validation dependencies
import { useFormik } from "formik";
import * as Yup from "yup";

// import styles
import styles from "../../../style";

// import images
import { location, linkedin, github } from "../../../assets";

// import components
import { Button, Badge } from "../../../components";

const SUBJECT_LABELS = {
  role: "Software Developer role / recruitment",
  collaboration: "Collaboration proposal",
  project: "Question about a portfolio project",
  query: "General query",
  feedback: "Website feedback",
};

const formatDraftMessage = (values) => {
  const subjectText =
    SUBJECT_LABELS[values.subject] || values.subject || "General query";
  const lines = [
    `Subject: ${subjectText}`,
    `From: ${values.name.trim() || "(Not provided)"}${
      values.email.trim() ? ` <${values.email.trim()}>` : ""
    }`,
  ];
  if (values.phone.trim()) {
    lines.push(`Phone: ${values.phone.trim()}`);
  }
  lines.push("", values.message.trim());
  return lines.join("\n");
};

const ContactForm = () => {
  const [preparedMessage, setPreparedMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle"); // "idle" | "copied" | "manual"
  const fallbackTextareaRef = useRef(null);

  const attemptCopyText = async (textToCopy) => {
    if (!textToCopy || !textToCopy.trim()) return;

    // 1. Try modern async Clipboard API first
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopyStatus("copied");
        return;
      } catch {
        // Fall through to manual selection fallback if permission denied or insecure context
      }
    }

    // 2. Manual selection fallback
    setCopyStatus("manual");
    setTimeout(() => {
      if (fallbackTextareaRef.current) {
        fallbackTextareaRef.current.focus();
        fallbackTextareaRef.current.select();
      }
    }, 50);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .max(50, "Name must be 50 characters or less.")
        .required("Name is required."),
      email: Yup.string()
        .trim()
        .email("Please enter a valid email address.")
        .required("Email is required."),
      phone: Yup.string()
        .trim()
        .min(7, "Phone number must be at least 7 characters.")
        .max(20, "Phone number must be 20 characters or less.")
        .notRequired(),
      subject: Yup.string().required("Please select a subject."),
      message: Yup.string()
        .trim()
        .min(10, "Message must be at least 10 characters.")
        .required("Message is required."),
    }),

    onSubmit: async (values) => {
      const formatted = formatDraftMessage(values);
      setPreparedMessage(formatted);
      await attemptCopyText(formatted);
    },
  });

  const handleCopyAgain = async () => {
    const textToCopy = preparedMessage || formatDraftMessage(formik.values);
    await attemptCopyText(textToCopy);
  };

  const handleSelectFallbackText = () => {
    if (fallbackTextareaRef.current) {
      fallbackTextareaRef.current.focus();
      fallbackTextareaRef.current.select();
    }
  };

  const inputBaseClasses =
    "bg-canvas text-textPrimary placeholder:text-textMuted border border-borderSubtle rounded-lg w-full px-3.5 py-2.5 mt-1.5 font-sans text-[15px] focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors";

  return (
    <section
      aria-labelledby="contact-form-heading"
      className={`${styles.marginY} ${styles.padding} bg-black-gradient-2 border border-borderSubtle rounded-2xl box-shadow`}
    >
      <div className="mb-8">
        <Badge variant="neutral" className="mb-3">
          DIRECT CHANNELS &amp; MESSAGE COMPOSER
        </Badge>
        <h2 id="contact-form-heading" className={styles.heading2}>
          Prepare a Message
        </h2>

        {/* Honest Delivery Status Notice */}
        <div
          role="note"
          className="mt-4 p-4 rounded-xl bg-surface border border-crimson/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <p className={`${styles.paragraph2} text-textPrimary`}>
            <strong className="font-mono text-[13px] uppercase tracking-wider text-crimson-soft block mb-1">
              Notice // Direct Form Delivery Unavailable
            </strong>
            Automated email submission is not configured on this static site, so
            messages entered below are{" "}
            <strong className="text-textPrimary">
              not transmitted automatically
            </strong>
            . Use this composer to validate and format your inquiry for{" "}
            <strong className="text-textPrimary">one-click copying</strong>,
            then paste and send it directly via{" "}
            <a
              href="https://www.linkedin.com/in/jpplazasanchez/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson-soft underline hover:text-white"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Validated Message Composer Form */}
        <form
          noValidate
          onSubmit={formik.handleSubmit}
          className="lg:col-span-7 flex flex-col gap-5 w-full"
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono font-medium text-[13px] text-textPrimary"
            >
              Name <span className="text-crimson">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Your name or organization"
              aria-invalid={Boolean(formik.touched.name && formik.errors.name)}
              aria-describedby={
                formik.touched.name && formik.errors.name
                  ? "contact-name-error"
                  : undefined
              }
              className={inputBaseClasses}
            />
            {formik.touched.name && formik.errors.name && (
              <p
                id="contact-name-error"
                role="alert"
                className="font-sans text-[13px] text-crimson-soft mt-1.5"
              >
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email & Phone Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono font-medium text-[13px] text-textPrimary"
              >
                Email <span className="text-crimson">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="you@company.com"
                aria-invalid={Boolean(
                  formik.touched.email && formik.errors.email
                )}
                aria-describedby={
                  formik.touched.email && formik.errors.email
                    ? "contact-email-error"
                    : undefined
                }
                className={inputBaseClasses}
              />
              {formik.touched.email && formik.errors.email && (
                <p
                  id="contact-email-error"
                  role="alert"
                  className="font-sans text-[13px] text-crimson-soft mt-1.5"
                >
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="block font-mono font-medium text-[13px] text-textPrimary"
              >
                Phone <span className="text-textMuted">(Optional)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Optional contact number"
                aria-invalid={Boolean(
                  formik.touched.phone && formik.errors.phone
                )}
                aria-describedby={
                  formik.touched.phone && formik.errors.phone
                    ? "contact-phone-error"
                    : undefined
                }
                className={inputBaseClasses}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p
                  id="contact-phone-error"
                  role="alert"
                  className="font-sans text-[13px] text-crimson-soft mt-1.5"
                >
                  {formik.errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Subject Select */}
          <div>
            <label
              htmlFor="contact-subject"
              className="block font-mono font-medium text-[13px] text-textPrimary"
            >
              Subject <span className="text-crimson">*</span>
            </label>
            <select
              id="contact-subject"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              aria-invalid={Boolean(
                formik.touched.subject && formik.errors.subject
              )}
              aria-describedby={
                formik.touched.subject && formik.errors.subject
                  ? "contact-subject-error"
                  : undefined
              }
              className={inputBaseClasses}
            >
              <option value="" disabled>
                Select a subject...
              </option>
              <option value="role">
                Software Developer role / recruitment
              </option>
              <option value="collaboration">Collaboration proposal</option>
              <option value="project">
                Question about a portfolio project
              </option>
              <option value="query">General query</option>
              <option value="feedback">Website feedback</option>
            </select>
            {formik.touched.subject && formik.errors.subject && (
              <p
                id="contact-subject-error"
                role="alert"
                className="font-sans text-[13px] text-crimson-soft mt-1.5"
              >
                {formik.errors.subject}
              </p>
            )}
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono font-medium text-[13px] text-textPrimary"
            >
              Message <span className="text-crimson">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write your message here..."
              aria-invalid={Boolean(
                formik.touched.message && formik.errors.message
              )}
              aria-describedby={
                formik.touched.message && formik.errors.message
                  ? "contact-message-error"
                  : undefined
              }
              className={inputBaseClasses}
            />
            {formik.touched.message && formik.errors.message && (
              <p
                id="contact-message-error"
                role="alert"
                className="font-sans text-[13px] text-crimson-soft mt-1.5"
              >
                {formik.errors.message}
              </p>
            )}
          </div>

          {/* Submit / Copy Action */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button type="submit" variant="primary">
              Format &amp; Copy Message
            </Button>
            <Button
              href="https://www.linkedin.com/in/jpplazasanchez/"
              target="_blank"
              variant="secondary"
            >
              Open LinkedIn Profile ↗
            </Button>
          </div>

          {/* Honest Copy Feedback & Selectable Fallback Textarea */}
          {preparedMessage && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 p-5 rounded-xl bg-surface border border-borderSubtle"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span
                  className={`font-mono text-[12px] font-semibold uppercase tracking-wider ${
                    copyStatus === "copied"
                      ? "text-telemetry"
                      : "text-crimson-soft"
                  }`}
                >
                  {copyStatus === "copied"
                    ? "✓ Copied to Clipboard — Ready to Paste (Not Sent Yet)"
                    : "Automatic Clipboard Blocked — Select & Press Ctrl+C / Cmd+C Below (Not Sent Yet)"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectFallbackText}
                    className="font-mono text-[12px] px-3 py-1 rounded-md bg-surfaceElevated border border-borderSubtle text-textSecondary hover:text-textPrimary hover:border-borderAccent"
                  >
                    Select All Text
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyAgain}
                    className="font-mono text-[12px] px-3 py-1 rounded-md bg-surfaceElevated border border-borderSubtle text-textPrimary hover:border-borderAccent"
                  >
                    {copyStatus === "copied" ? "Copy Again" : "Retry Copy"}
                  </button>
                </div>
              </div>

              <p className={`${styles.paragraph3} mb-3`}>
                This formatted message has not been sent automatically. Paste it
                into a message on{" "}
                <a
                  href="https://www.linkedin.com/in/jpplazasanchez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crimson-soft underline hover:text-white"
                >
                  LinkedIn
                </a>{" "}
                to reach me directly.
              </p>

              <label htmlFor="prepared-message-output" className="sr-only">
                Formatted message ready to copy
              </label>
              <textarea
                id="prepared-message-output"
                ref={fallbackTextareaRef}
                readOnly
                rows="7"
                value={preparedMessage}
                onClick={handleSelectFallbackText}
                className="w-full font-mono text-[12px] text-textSecondary bg-canvas p-3.5 rounded-lg border border-borderSubtle focus:border-crimson focus:ring-1 focus:ring-crimson resize-y"
              />
            </div>
          )}
        </form>

        {/* Right Column: Verified Location & Direct Profiles */}
        <aside className="lg:col-span-5 flex flex-col gap-6 w-full">
          <div className={`${styles.surfaceCard} p-6`}>
            <h3 className="font-mono text-[12px] font-semibold uppercase tracking-wider text-crimson-soft mb-4">
              Verified Details &amp; Profiles
            </h3>

            <ul className="space-y-4 font-sans text-[15px]">
              <li className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted">
                  Location
                </span>
                <span className="text-textPrimary font-medium mt-0.5">
                  Manchester, United Kingdom
                </span>
              </li>

              <li className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted">
                  Availability
                </span>
                <span className="text-telemetry font-medium mt-0.5 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full bg-telemetry"
                    aria-hidden="true"
                  />
                  Open to remote opportunities
                </span>
              </li>

              <li className="flex flex-col pt-3 border-t border-borderSubtle">
                <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted mb-2">
                  Direct Profiles
                </span>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://www.linkedin.com/in/jpplazasanchez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-lg bg-surfaceElevated border border-borderSubtle hover:border-borderAccent text-textPrimary transition-colors"
                  >
                    <span className="inline-flex items-center gap-2.5 font-mono text-[13px]">
                      <img
                        src={linkedin}
                        alt=""
                        aria-hidden="true"
                        className="w-4 h-4 object-contain"
                      />
                      <span>linkedin.com/in/jpplazasanchez</span>
                    </span>
                    <span aria-hidden="true" className="text-textMuted">
                      ↗
                    </span>
                  </a>

                  <a
                    href="https://github.com/46lemonlime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-lg bg-surfaceElevated border border-borderSubtle hover:border-borderAccent text-textPrimary transition-colors"
                  >
                    <span className="inline-flex items-center gap-2.5 font-mono text-[13px]">
                      <img
                        src={github}
                        alt=""
                        aria-hidden="true"
                        className="w-4 h-4 object-contain"
                      />
                      <span>github.com/46lemonlime</span>
                    </span>
                    <span aria-hidden="true" className="text-textMuted">
                      ↗
                    </span>
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-6 overflow-hidden rounded-xl border border-borderSubtle">
              <img
                loading="lazy"
                src={location}
                alt="Map showing Manchester, United Kingdom"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactForm;
