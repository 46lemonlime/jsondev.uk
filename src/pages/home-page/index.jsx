import React from "react";

// import styles
import styles from "../../style";

// import global & specific components
import { Testimonials } from "../../components";
import { Hero, Projects, Products, GetInTouch } from "./components";

const Home = () => {
  return (
    <div className={`bg-canvas ${styles.paddingX} ${styles.flexCenter}`}>
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
