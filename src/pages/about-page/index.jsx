import React from "react";

// import styles
import styles from "../../style";

// import specific components
import AboutIntro from "./components/AboutIntro";
import { Testimonials } from "../../components";
import GetInTouch from "../home-page/components/GetInTouch";

const About = () => {
  return (
    <div className={`bg-canvas ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <AboutIntro />
        <Testimonials />
        <GetInTouch />
      </div>
    </div>
  );
};

export default About;
