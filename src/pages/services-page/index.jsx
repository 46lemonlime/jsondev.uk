import React from "react";

// import routing
import { Link } from "react-router-dom";

// impost styles
import styles, { layout } from "../../style";

// import images
import { service00 } from "../../assets";

// import specific components
import ServicesCard from "./components/ServicesCard";

// import constants
import { services } from "../../constants";

const Services = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <section
          className={`flex md:flex-row flex-col ${styles.paddingY} ${layout.sectionReverse} sm:mt-40`}
        >
          <div>
            <div className="absolute z-[0] w-[40%] h-[40%] right-20 top-1/2 rounded-full red__gradient" />
            <h1 className={`${styles.heading1} mt-10`}>Services</h1>
            <p className={` ${styles.subheading} my-5`}>
              welcome to my service page!
            </p>
            <h4 className={styles.heading4}>
              Here you'll find a collection of the products and services I
              provide.
            </h4>
            <p className={`${styles.paragraph} max-w-[470px] mb-10`}>
              Here, I offer a range of professional services that leverage my
              skills, creativity, and problem-solving abilities. Whether you're
              looking for assistance with web development, UI/UX design, or
              digital marketing strategies, I bring a wealth of expertise to
              help you achieve your goals.
            </p>
            <h4 className={styles.heading4}>
              Customer services and Poker 1 to 1 coaching.
            </h4>
            <p className={`${styles.paragraph} max-w-[470px] mb-10`}>
              With more than 3 years of experience as a customer service agent
              and playing poker semi-profesionaly since 2019 I offer my services
              as a multilingual customer service agent and poker coach.
            </p>
          </div>
          <div
            className={`flex-1 flex ${styles.flexCenter} ${styles.padding} md:my-0 my-10 relative`}
          >
            <img
              src={service00}
              alt="service00"
              className="w-[100%] h-[100%] relative z-[5]"
            />
          </div>
        </section>
        <section className={` ${styles.paddingY}`}>
          <div className="flex flex-wrap sm:justify-start justify-center relative z-[1]">
            {services.map((card) => (
              <ServicesCard key={card.id} {...card} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
