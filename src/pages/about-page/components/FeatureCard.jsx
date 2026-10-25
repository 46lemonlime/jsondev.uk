/**
 * @file src/pages/about-page/components/FeatureCard.jsx
 * @description Technical profile feature card rendering category icon, title, and descriptive content.
 * @responsibility Display individual technical competence or education milestone card.
 */

import React from "react";
import styles from "../../../style";

const FeatureCard = ({ icon, title, content }) => (
  <article className={`${styles.surfaceCard} flex flex-row items-start p-6 gap-4`}>
    <div
      className={`w-14 h-14 rounded-xl ${styles.flexCenter} bg-surfaceElevated border border-accent/30 shrink-0`}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        aria-hidden="true"
        className="w-7 h-7 object-contain"
      />
    </div>
    <div className="flex-1 flex flex-col">
      <h3 className="font-display font-semibold text-textPrimary text-[18px] leading-[24px] mb-1.5">
        {title}
      </h3>
      <p className={styles.paragraph2}>{content}</p>
    </div>
  </article>
);

export default FeatureCard;
