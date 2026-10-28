/**
 * @file src/pages/contact-page/components/ContactForm.jsx
 * @description Accessible, client-side message composer with Formik validation and honest clipboard handling.
 * Since this portfolio operates as a static site without an automated email API, submitted messages are
 * validated and prepared for easy clipboard copying, directing inquiries to verified LinkedIn channels.
 * @responsibility Handle form validation, user input, clipboard operations, and compose with ContactInfo.
 */

import React, { useState, useRef, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation, Trans } from "react-i18next";

import styles from "../../../style";
import { Button, Badge } from "../../../components";
import ContactInfo from "./ContactInfo";

/**
 * Formats validated form values into a structured text draft suitable for clipboard copying.
 * @param {Object} values - Form field values.
 * @param {Function} t - Translation function.
 * @returns {string} Formatted draft message.
 */
const formatDraftMessage = (values, t) => {
  const subjectText = values.subject
    ? t(`form.subjectOptions.${values.subject}`, {
        defaultValue: values.subject,
      })
    : t("form.subjectOptions.query");

  const lines = [
    `${t("form.draftHeaders.subject")}: ${subjectText}`,
    `${t("form.draftHeaders.from")}: ${
      values.name.trim() || t("form.draftHeaders.notProvided")
    }${values.email.trim() ? ` <${values.email.trim()}>` : ""}`,
  ];
  if (values.phone && values.phone.trim()) {
    lines.push(`${t("form.draftHeaders.phone")}: ${values.phone.trim()}`);
  }
  lines.push("", values.message.trim());
  return lines.join("\n");
};

const ContactForm = () => {
  const { t } = useTranslation(["contact", "common"]);
  const [preparedMessage, setPreparedMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle"); // "idle" | "copied" | "manual"
  const fallbackTextareaRef = useRef(null);

  /**
   * Attempts clipboard copy via standard Navigator Clipboard API, falling back
   * to selecting the draft textarea for manual Ctrl+C/Cmd+C copy on unsupported environments.
   * @param {string} textToCopy - Text content to copy.
   */
  const attemptCopyText = async (textToCopy) => {
    if (!textToCopy || !textToCopy.trim()) return;

    // 1. Try modern async Clipboard API
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
        // Fall through to manual selection if permission is denied or running in restricted iframe
      }
    }

    // 2. Fallback: focus and select text in the fallback textarea
    setCopyStatus("manual");
    setTimeout(() => {
      if (fallbackTextareaRef.current) {
        fallbackTextareaRef.current.focus();
        fallbackTextareaRef.current.select();
      }
    }, 50);
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .trim()
          .max(50, t("form.validation.nameMax"))
          .required(t("form.validation.nameRequired")),
        email: Yup.string()
          .trim()
          .email(t("form.validation.emailInvalid"))
          .required(t("form.validation.emailRequired")),
        phone: Yup.string()
          .trim()
          .min(7, t("form.validation.phoneMin"))
          .max(20, t("form.validation.phoneMax"))
          .notRequired(),
        subject: Yup.string().required(t("form.validation.subjectRequired")),
        message: Yup.string()
          .trim()
          .min(10, t("form.validation.messageMin"))
          .required(t("form.validation.messageRequired")),
      }),
    [t]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formatted = formatDraftMessage(values, t);
      setPreparedMessage(formatted);
      await attemptCopyText(formatted);
    },
  });

  const handleCopyAgain = async () => {
    const textToCopy =
      preparedMessage || formatDraftMessage(formik.values, t);
    await attemptCopyText(textToCopy);
  };

  const handleSelectFallbackText = () => {
    if (fallbackTextareaRef.current) {
      fallbackTextareaRef.current.focus();
      fallbackTextareaRef.current.select();
    }
  };

  const inputBaseClasses =
    "bg-canvas text-textPrimary placeholder:text-textMuted border border-borderSubtle rounded-lg w-full px-3.5 py-2.5 mt-1.5 font-sans text-[15px] focus:border-accent focus:ring-1 focus:ring-accent transition-colors";

  return (
    <section
      aria-labelledby="contact-form-heading"
      className={`${styles.marginY} ${styles.padding} bg-surface border border-borderSubtle rounded-2xl shadow-card`}
    >
      <div className="mb-8">
        <Badge variant="neutral" className="mb-3">
          {t("eyebrow")}
        </Badge>
        <h2 id="contact-form-heading" className={styles.heading2}>
          {t("form.heading")}
        </h2>

        {/* Transparent notice on lack of automated email transmission */}
        <div
          role="note"
          className="mt-4 p-4 rounded-xl bg-surface border border-accent/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <p className={`${styles.paragraph2} text-textPrimary`}>
            <strong className="font-mono text-[13px] uppercase tracking-wider text-accent block mb-1">
              {t("form.noticeHeader")}
            </strong>
            <Trans
              ns="contact"
              i18nKey="form.noticeBody"
              components={{
                bold: <strong className="text-textPrimary" />,
                link: (
                  <a
                    href="https://www.linkedin.com/in/jpplazasanchez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline hover:text-white"
                  />
                ),
              }}
            />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Validated Message Composer Form */}
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
              {t("form.nameLabel")} <span className="text-accent">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("form.namePlaceholder")}
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
                className="font-sans text-[13px] text-accent mt-1.5"
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
                {t("form.emailLabel")} <span className="text-accent">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("form.emailPlaceholder")}
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
                  className="font-sans text-[13px] text-accent mt-1.5"
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
                {t("form.phoneLabel")}{" "}
                <span className="text-textMuted">
                  {t("form.phoneOptional")}
                </span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("form.phonePlaceholder")}
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
                  className="font-sans text-[13px] text-accent mt-1.5"
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
              {t("form.subjectLabel")} <span className="text-accent">*</span>
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
                {t("form.subjectPlaceholder")}
              </option>
              <option value="role">
                {t("form.subjectOptions.role")}
              </option>
              <option value="collaboration">
                {t("form.subjectOptions.collaboration")}
              </option>
              <option value="project">
                {t("form.subjectOptions.project")}
              </option>
              <option value="query">
                {t("form.subjectOptions.query")}
              </option>
              <option value="feedback">
                {t("form.subjectOptions.feedback")}
              </option>
            </select>
            {formik.touched.subject && formik.errors.subject && (
              <p
                id="contact-subject-error"
                role="alert"
                className="font-sans text-[13px] text-accent mt-1.5"
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
              {t("form.messageLabel")} <span className="text-accent">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("form.messagePlaceholder")}
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
                className="font-sans text-[13px] text-accent mt-1.5"
              >
                {formik.errors.message}
              </p>
            )}
          </div>

          {/* Submit Action */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button type="submit" variant="primary">
              {t("form.formatAndCopy")}
            </Button>
            <Button
              href="https://www.linkedin.com/in/jpplazasanchez/"
              target="_blank"
              variant="secondary"
            >
              {t("form.openLinkedIn")}
            </Button>
          </div>

          {/* Status Feedback and Selectable Fallback Textarea */}
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
                      ? "text-accent"
                      : "text-accent-soft"
                  }`}
                >
                  {copyStatus === "copied"
                    ? t("form.feedback.copied")
                    : t("form.feedback.manual")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectFallbackText}
                    className="font-mono text-[12px] px-3 py-1 rounded-md bg-surfaceElevated border border-borderSubtle text-textSecondary hover:text-textPrimary hover:border-borderAccent"
                  >
                    {t("form.feedback.selectAll")}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyAgain}
                    className="font-mono text-[12px] px-3 py-1 rounded-md bg-surfaceElevated border border-borderSubtle text-textPrimary hover:border-borderAccent"
                  >
                    {copyStatus === "copied"
                      ? t("form.feedback.copyAgain")
                      : t("form.feedback.retryCopy")}
                  </button>
                </div>
              </div>

              <p className={`${styles.paragraph3} mb-3`}>
                <Trans
                  ns="contact"
                  i18nKey="form.feedback.pasteExplanation"
                  components={{
                    link: (
                      <a
                        href="https://www.linkedin.com/in/jpplazasanchez/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline hover:text-white"
                      />
                    ),
                  }}
                />
              </p>

              <label htmlFor="prepared-message-output" className="sr-only">
                {t("form.feedback.draftOutputLabel")}
              </label>
              <textarea
                id="prepared-message-output"
                ref={fallbackTextareaRef}
                readOnly
                rows="7"
                value={preparedMessage}
                onClick={handleSelectFallbackText}
                className="w-full font-mono text-[12px] text-textSecondary bg-canvas p-3.5 rounded-lg border border-borderSubtle focus:border-accent focus:ring-1 focus:ring-accent resize-y"
              />
            </div>
          )}
        </form>

        {/* Composed Verified Profiles & Location Column */}
        <ContactInfo />
      </div>
    </section>
  );
};

export default ContactForm;
