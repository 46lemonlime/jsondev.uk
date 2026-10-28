/**
 * @file src/pages/home-page/components/GetInTouch.jsx
 * @description Banner component inviting recruiter and collaboration inquiries with action triggers.
 * @responsibility Provide clear call-to-action banner for reaching out and downloading CV.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../../style";
import { cv } from "../../../assets";
import { Button, Badge } from "../../../components";

const GetInTouch = () => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <section
      id="contact"
      className={`${styles.marginY} ${styles.padding} flex md:flex-row flex-col items-start md:items-center justify-between gap-8 bg-surface border border-borderSubtle rounded-2xl shadow-card`}
    >
      <div className="flex-1 flex flex-col">
        <Badge variant="telemetry" pulse className="mb-3 self-start">
          {t("badges.openRoles", { ns: "common" })}
        </Badge>
        <h2 className={styles.heading2}>{t("connect.title")}</h2>
        <p className={`${styles.paragraph} max-w-[540px] mt-3`}>
          {t("connect.description")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 shrink-0">
        <Button to="/contact" variant="primary">
          {t("buttons.contactMe", { ns: "common" })}
        </Button>
        <Button
          href={cv}
          download="Jeison_Sanchez_CV.pdf"
          variant="secondary"
        >
          {t("buttons.downloadCv", { ns: "common" })}
        </Button>
      </div>
    </section>
  );
};

export default GetInTouch;
