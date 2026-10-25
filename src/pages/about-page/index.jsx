/**
 * @file src/pages/about-page/index.jsx
 * @description Master view for the About page presenting technical foundations, verified
 * operations background, testimonials, and contact triggers.
 * @responsibility Orchestrate sections of the About view within standard layout boundaries.
 */

import React from "react";
import styles from "../../style";
import AboutIntro from "./components/AboutIntro";
import { Testimonials } from "../../components";
import GetInTouch from "../home-page/components/GetInTouch";

const About = () => {
  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <AboutIntro />
        <Testimonials />
        <GetInTouch />
      </div>
    </div>
  );
};

export default About;
