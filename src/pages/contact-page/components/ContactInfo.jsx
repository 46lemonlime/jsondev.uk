import React from "react";

// import routing
import { Link } from "react-router-dom";

// import styles
import styles, { layout } from "../../../style";

// import images
import { location } from "../../../assets";

// import global components
import Button from "../../../components/Button";

const ContactInfo = () => {
  return (
    <section id="portfolio" className={layout.sectionReverse}>
      <div className={`rounded-[50px] ${layout.sectionImgReverse}`}>
        <img
          src={location}
          alt="location"
          className={`w-[100%] h-[100%] relative z-[5] ${styles.flexCenter}`}
        />
      </div>
      <div className={`flex-1 flex justify-start items-start flex-col`}>
        <h2 className={styles.heading2}>Contact Info</h2>
        <ul className={`${styles.paragraph} max-w-[470px] `}>
          <li>
            <span className="text-secondary">Phone</span> +78 789456123
          </li>
          <li>
            <span className="text-secondary">Email</span> example@example.com
          </li>
          <li>
            <span className="text-secondary">Location</span> Manchester, United
            Kingdom
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContactInfo;
