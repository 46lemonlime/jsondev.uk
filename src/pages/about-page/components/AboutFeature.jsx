// import styles
import styles, { layout } from "../../../style";

// import constants
import { features } from "../../../constants";

// import specific components
import GetRoadmap from "../../../components/GetRoadmap";

import FeatureCard from "./FeatureCard";

const AboutFeature = () => {
  return (
    <section className={layout.sectionReverse}>
      <div className="absolute z-[0] w-[40%] h-[40%] left-20 top-2/2 rounded-full blue__gradient opacity-60" />
      <div className={`${layout.sectionImgReverse} flex-col `}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          My journey, <br className="sm:block hidden" /> progress and
          documentation.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Please find a link to my roadmap in Computer Science. Here you will
          find a notion document with courses, tutorials and certifications I
          have completed, as well as my current work in progress.
        </p>
        <GetRoadmap styles={`mt-10`} />
      </div>
    </section>
  );
};

export default AboutFeature;
