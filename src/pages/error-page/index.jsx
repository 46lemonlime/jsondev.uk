/**
 * @file src/pages/error-page/index.jsx
 * @description Accessible HTTP 404 Not Found view offering recovery routes and quick navigation.
 * @responsibility Inform visitors of invalid URLs and offer direct recovery links back to active sections.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../style";
import { error_img } from "../../assets";
import { Button, Badge } from "../../components";

const Error = () => {
  const { t } = useTranslation(["errors", "common"]);

  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <section
          className={`flex md:flex-row flex-col ${styles.paddingY} items-center gap-12`}
        >
          <div className="flex-1 flex flex-col items-start relative">
            <Badge variant="accent" className="mb-4">
              {t("badge")}
            </Badge>
            <h1 className={styles.heading1}>{t("title")}</h1>
            <p className={`${styles.paragraph} max-w-[520px] mt-4 mb-6`}>
              {t("description")}
            </p>

            <div className={`${styles.surfaceCard} p-6 w-full max-w-[520px] mb-8`}>
              <h2 className="font-mono font-semibold text-[14px] uppercase tracking-wider text-textPrimary mb-3">
                {t("quickNav")}
              </h2>
              <ul className={`${styles.paragraph2} space-y-2 list-disc list-inside`}>
                <li>{t("bullet1")}</li>
                <li>{t("bullet2")}</li>
                <li>{t("bullet3")}</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button to="/" variant="primary">
                {t("backHome")}
              </Button>
              <Button to="/projects" variant="secondary">
                {t("viewProjects")}
              </Button>
            </div>
          </div>

          <div
            className={`flex-1 flex ${styles.flexCenter} ${styles.padding} relative`}
          >
            <img
              loading="lazy"
              src={error_img}
              alt={t("illustrationAlt")}
              className="w-full max-w-[460px] h-auto relative z-[5]"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Error;
