/**
 * @file src/pages/contact-page/components/ContactInfo.jsx
 * @description Renders verified physical and availability information alongside verified
 * profile links and location representation for the Contact page.
 * @responsibility Present static verified contact details, location, and platform links (Separation of Concerns).
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../../style";
import { location, linkedin, github } from "../../../assets";

const ContactInfo = () => {
  const { t } = useTranslation(["contact", "common"]);

  return (
    <aside
      aria-label="Verified Contact Information"
      className="lg:col-span-5 flex flex-col gap-6 w-full"
    >
      <div className={`${styles.surfaceCard} p-6`}>
        <h3 className="font-mono text-[12px] font-semibold uppercase tracking-wider text-accent mb-4">
          {t("info.title")}
        </h3>

        <ul className="space-y-4 font-sans text-[15px]">
          <li className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted">
              {t("info.locationLabel")}
            </span>
            <span className="text-textPrimary font-medium mt-0.5">
              {t("info.locationValue")}
            </span>
          </li>

          <li className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted">
              {t("info.availabilityLabel")}
            </span>
            <span className="text-telemetry font-medium mt-0.5 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-telemetry"
                aria-hidden="true"
              />
              {t("info.availabilityValue")}
            </span>
          </li>

          <li className="flex flex-col pt-3 border-t border-borderSubtle">
            <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted mb-2">
              {t("info.directProfiles")}
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
            alt={t("info.mapAlt")}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </aside>
  );
};

export default ContactInfo;
