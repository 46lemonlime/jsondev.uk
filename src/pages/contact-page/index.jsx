/**
 * @file src/pages/contact-page/index.jsx
 * @description Primary Contact view pairing the validated Message Composer with verified LinkedIn
 * and GitHub direct contact channels.
 * @responsibility Present contact options, direct channels, and message drafting workspace.
 */

import React from "react";
import { useTranslation, Trans } from "react-i18next";
import styles from "../../style";
import { contactIllustration, linkedin, github } from "../../assets";
import { Button, Badge } from "../../components";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

const Contact = () => {
  const { t } = useTranslation(["contact", "common"]);

  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {/* Contact Hero Section */}
        <section
          className={`flex md:flex-row flex-col ${styles.paddingY} items-center gap-12 relative`}
        >
          <div className="flex-1 flex flex-col items-start relative z-[2]">
            <Badge variant="telemetry" pulse className="mb-4">
              {t("badge")}
            </Badge>
            <h1 className={styles.heading1}>{t("title")}</h1>
            <p className={`${styles.subheading} mt-3`}>
              {t("subheading")}
            </p>
            <p className={`${styles.paragraph} max-w-[560px] mt-5`}>
              <Trans
                ns="contact"
                i18nKey="description"
                components={{
                  tech: <span className="text-textPrimary font-medium" />,
                }}
              />
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Button
                href="https://www.linkedin.com/in/jpplazasanchez/"
                target="_blank"
                variant="primary"
              >
                <img
                  src={linkedin}
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-4 object-contain brightness-200"
                />
                <span>{t("messageLinkedIn")}</span>
              </Button>
              <Button
                href="https://github.com/46lemonlime"
                target="_blank"
                variant="secondary"
              >
                <img
                  src={github}
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-4 object-contain"
                />
                <span>{t("gitHubProfile")}</span>
              </Button>
            </div>
          </div>

          <div
            className={`flex-1 flex ${styles.flexCenter} ${styles.padding} relative`}
          >
            <img
              loading="lazy"
              src={contactIllustration}
              alt={t("illustrationAlt")}
              className="w-full max-w-[400px] h-auto relative z-[5]"
            />
          </div>
        </section>

        {/* Message Composer & Verified Profiles Section */}
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
            <ContactForm />
            <ContactInfo />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
