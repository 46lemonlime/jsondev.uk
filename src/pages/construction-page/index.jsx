import React from "react";

// import routing
import { Link } from "react-router-dom";

// import styles
import styles, { layout } from "../../style";

//import images
import { WIP } from "../../assets";

// import components
import Button from "../../components/Button";

const Construction = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <section
          className={`flex md:flex-row flex-col ${styles.paddingY} ${layout.sectionReverse} sm:mt-40`}
        >
          <div>
            <div className="absolute z-[0] w-[40%] h-[40%] right-20 top-1/2 rounded-full red__gradient" />
            <h1 className={`${styles.heading1} mt-10`}>Coming Soon!</h1>
            <p className={`${styles.subheading} my-5`}>
              we are working hard to give you a better experience.
            </p>
            <h4 className={styles.heading4}>Get Ready for Something Big!</h4>
            <p className={`${styles.paragraph} max-w-[470px] `}>
              We're in the process of updating our website & the page will go
              live any time soon. To stay informed, sign up for our email
              updates or follow us on social media. Thank you for your patience
              and support!
            </p>
            <Link to="/">
              <Button styles={`mt-10`} children={"Back Home"} />
            </Link>
          </div>
          <div
            className={`flex-1 flex ${styles.flexCenter} ${styles.padding} md:my-0 my-10 relative`}
          >
            <img
              loading="lazy"
              src={WIP}
              alt="WIP"
              className="w-[100%] h-[100%] relative z-[5]"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Construction;
