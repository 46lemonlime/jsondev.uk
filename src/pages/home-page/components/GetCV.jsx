/**
 * @file src/pages/home-page/components/GetCV.jsx
 * @description Circular call-to-action button for initiating direct CV PDF download.
 * @responsibility Present interactive circular button linking to curriculum vitae asset.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../../style";
import { arrowUp, cv } from "../../../assets";

const GetCV = () => {
  const { t } = useTranslation("common");

  return (
    <a
      href={cv}
      title={t("buttons.downloadCvPdf")}
      download="Jeison_Sanchez_CV.pdf"
      aria-label={t("buttons.downloadCvPdf")}
      className="group inline-block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div
        className={`${styles.flexCenter} w-[132px] h-[132px] rounded-full bg-secondary-gradient p-[2px] cursor-pointer shadow-accent transition-transform duration-200 group-hover:scale-[1.03]`}
      >
        <div
          className={`${styles.flexCenter} flex-col bg-canvas w-full h-full rounded-full px-3 text-center`}
        >
          <div className={`${styles.flexCenter} flex-row gap-1.5`}>
            <span className="font-mono font-semibold text-[16px] leading-[22px] text-textPrimary">
              CV
            </span>
            <img
              src={arrowUp}
              alt=""
              aria-hidden="true"
              className="w-[18px] h-[18px] object-contain transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <span className="font-mono font-medium text-[13px] leading-[20px] text-accent mt-0.5">
            {t("buttons.downloadPdf")}
          </span>
        </div>
      </div>
    </a>
  );
};

export default GetCV;
