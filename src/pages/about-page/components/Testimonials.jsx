/**
 * @file src/pages/about-page/components/Testimonials.jsx
 * @description Verified professional recommendations section rendered across the About page and Homepage.
 * @responsibility Present authentic manager endorsements and recommendations grid.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../../style";
import { feedback } from "../../../constants";
import FeedbackCard from "../../../components/FeedbackCard";
import SectionHeader from "../../../components/SectionHeader";

const Testimonials = () => {
  const { t } = useTranslation("about");

  return (
    <section id="testimonials" className={`${styles.paddingY} relative`}>
      <div className="mb-12 relative z-[1]">
        <SectionHeader
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[1]">
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
