/**
 * @file src/pages/home-page/index.jsx
 * @description Developer-first homepage assembling Hero, Projects showcase, Capabilities,
 * Testimonials, and Connect calls-to-action.
 * @responsibility Orchestrate homepage view sections within the standard container.
 */

import React from "react";
import styles from "../../style";
import { Testimonials } from "../../components";
import { Hero, Projects, Products, GetInTouch } from "./components";

const Home = () => {
  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
        <Projects />
        <Products />
        <Testimonials />
        <GetInTouch />
      </div>
    </div>
  );
};

export default Home;
