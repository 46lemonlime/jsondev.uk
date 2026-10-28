/**
 * @file src/pages/home-page/components/Stats.jsx
 * @description Key highlights telemetry bar rendering core technical stack, languages, and availability.
 * @responsibility Present high-level technical qualifications and working preferences.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../../style";
import { stats } from "../../../constants";

const Stats = () => {
  const { t } = useTranslation("home");

  return (
    <section
      aria-label="Key Technical Highlights"
      className="grid grid-cols-1 ss:grid-cols-2 md:grid-cols-4 gap-4 sm:mb-20 mb-10"
    >
      {stats.map((stat, index) => {
        const label = t(`stats.${index}.label`, stat.label);
        const value = t(`stats.${index}.value`, stat.value);
        const detail = stat.detail ? t(`stats.${index}.detail`, stat.detail) : null;

        return (
          <div
            key={stat.id}
            className={`${styles.surfaceCard} p-5 flex flex-col justify-between`}
          >
            <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-accent">
              {label}
            </span>
            <p className="font-display font-bold text-[24px] leading-[1.2] text-textPrimary mt-2">
              {value}
            </p>
            {detail && (
              <p className="font-sans text-[13px] text-textMuted mt-1">
                {detail}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Stats;
