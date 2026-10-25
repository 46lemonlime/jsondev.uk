/**
 * @file src/pages/error-page/index.jsx
 * @description Accessible HTTP 404 Not Found view offering recovery routes and quick navigation.
 * @responsibility Inform visitors of invalid URLs and offer direct recovery links back to active sections.
 */

import React from "react";
import styles from "../../style";
import { error_img } from "../../assets";
import { Button, Badge } from "../../components";

const Error = () => {
  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <section
          className={`flex md:flex-row flex-col ${styles.paddingY} items-center gap-12`}
        >
          <div className="flex-1 flex flex-col items-start relative">
            <Badge variant="accent" className="mb-4">
              HTTP 404 // ROUTE NOT FOUND
            </Badge>
            <h1 className={styles.heading1}>Page Not Found</h1>
            <p className={`${styles.paragraph} max-w-[520px] mt-4 mb-6`}>
              The URL you requested does not match an active route on this
              portfolio, or the page has been consolidated into a newer section.
            </p>

            <div className={`${styles.surfaceCard} p-6 w-full max-w-[520px] mb-8`}>
              <h2 className="font-mono font-semibold text-[14px] uppercase tracking-wider text-textPrimary mb-3">
                Quick Navigation
              </h2>
              <ul className={`${styles.paragraph2} space-y-2 list-disc list-inside`}>
                <li>Explore completed software projects.</li>
                <li>Read about my technical background and CS roadmap.</li>
                <li>Return to the homepage or reach out via the contact page.</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button to="/" variant="primary">
                Back to Homepage
              </Button>
              <Button to="/projects" variant="secondary">
                View Projects
              </Button>
            </div>
          </div>

          <div
            className={`flex-1 flex ${styles.flexCenter} ${styles.padding} relative`}
          >
            <img
              loading="lazy"
              src={error_img}
              alt="404 Page Not Found Illustration"
              className="w-full max-w-[460px] h-auto relative z-[5]"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Error;
