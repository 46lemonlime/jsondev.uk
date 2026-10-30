/**
 * @file src/pages/about-page/components/DevelopmentApproach.jsx
 * @description Development philosophy and responsible use of AI-assisted engineering tools.
 * @responsibility Present hands-on development mindset, technical accountability, and modern workflow.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../../style";
import { SectionHeader } from "../../../components";

const DevelopmentApproach = () => {
  const { t } = useTranslation(["about"]);

  return (
    <section className={`${styles.paddingY} relative`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-[1]">
        <div className="lg:col-span-5 flex flex-col items-start">
          <SectionHeader
            eyebrow={t("approach.eyebrow")}
            title={t("approach.title")}
            description={t("approach.description")}
          />
        </div>

        <div className="lg:col-span-7 w-full">
          <div className={`${styles.surfaceCard} p-7 sm:p-9 space-y-5`}>
            <p className={styles.paragraph}>{t("approach.paragraph1")}</p>
            <p className={styles.paragraph2}>{t("approach.paragraph2")}</p>
            <p className={styles.paragraph2}>{t("approach.paragraph3")}</p>
            <p
              className={`${styles.paragraph2} pt-4 border-t border-borderSubtle text-textPrimary font-medium`}
            >
              {t("approach.paragraph4")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentApproach;
