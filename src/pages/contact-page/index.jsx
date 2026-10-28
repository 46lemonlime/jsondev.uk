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

const Contact = () => {
  const { t } = useTranslation(["contact", "common"]);

  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
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

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
