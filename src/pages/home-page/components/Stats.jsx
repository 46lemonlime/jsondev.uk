import React from "react";
import styles from "../../../style";
import { stats } from "../../../constants";

const Stats = () => {
  return (
    <section
      aria-label="Key Technical Highlights"
      className="grid grid-cols-1 ss:grid-cols-2 md:grid-cols-4 gap-4 sm:mb-20 mb-10"
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`${styles.surfaceCard} p-5 flex flex-col justify-between`}
        >
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-crimson-soft">
            {stat.label}
          </span>
          <p className="font-display font-bold text-[24px] leading-[1.2] text-textPrimary mt-2">
            {stat.value}
          </p>
          {stat.detail && (
            <p className="font-sans text-[13px] text-textMuted mt-1">
              {stat.detail}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default Stats;
