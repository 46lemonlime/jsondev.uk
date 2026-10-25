import React from "react";

// import styles
import styles from "../../../style";

// import constants
import { feedback } from "../../../constants";

// import global components
import FeedbackCard from "../../../components/FeedbackCard";
import SectionHeader from "../../../components/SectionHeader";

const Testimonials = () => {
  return (
    <section id="testimonials" className={`${styles.paddingY} relative`}>
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/4 top-1/4 rounded-full red__gradient" />

      <div className="mb-12 relative z-[1]">
        <SectionHeader
          eyebrow="03 // ENDORSEMENTS"
          title="Professional Recommendations"
          description="Feedback from managers and directors I have worked with across operations, customer contact, and compliance-focused teams."
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
