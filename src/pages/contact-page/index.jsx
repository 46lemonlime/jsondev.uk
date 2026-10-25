/**
 * @file src/pages/contact-page/index.jsx
 * @description Primary Contact view pairing the validated Message Composer with verified LinkedIn
 * and GitHub direct contact channels.
 * @responsibility Present contact options, direct channels, and message drafting workspace.
 */

import React from "react";
import styles from "../../style";
import { chat, linkedin, github } from "../../assets";
import { Button, Badge } from "../../components";
import ContactForm from "./components/ContactForm";

const Contact = () => {
  return (
    <div className={`bg-canvas ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <section
          className={`flex md:flex-row flex-col ${styles.paddingY} items-center gap-12 relative`}
        >
          <div className="flex-1 flex flex-col items-start relative z-[2]">
            <div className="absolute z-[0] w-[40%] h-[40%] right-20 top-1/2 rounded-full red__gradient" />
            <Badge variant="telemetry" pulse className="mb-4">
              Manchester, UK // Open to Remote Opportunities
            </Badge>
            <h1 className={styles.heading1}>Contact Me</h1>
            <p className={`${styles.subheading} mt-3`}>
              Connect via LinkedIn, GitHub, or Message Builder
            </p>
            <p className={`${styles.paragraph} max-w-[560px] mt-5`}>
              Reach out for software development opportunities, technical
              collaborations, or questions about my work. Currently, the fastest
              and most direct way to reach me is via{" "}
              <span className="text-textPrimary font-medium">LinkedIn</span> or{" "}
              <span className="text-textPrimary font-medium">GitHub</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Button
                href="https://www.linkedin.com/in/jpplazasanchez/"
                target="_blank"
                variant="primary"
              >
                <img
                  src={linkedin}
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-4 object-contain brightness-200"
                />
                <span>Message on LinkedIn ↗</span>
              </Button>
              <Button
                href="https://github.com/46lemonlime"
                target="_blank"
                variant="secondary"
              >
                <img
                  src={github}
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-4 object-contain"
                />
                <span>GitHub (@46lemonlime) ↗</span>
              </Button>
            </div>
          </div>

          <div
            className={`flex-1 flex ${styles.flexCenter} ${styles.padding} relative`}
          >
            <img
              loading="lazy"
              src={chat}
              alt="Contact illustration"
              className="w-full max-w-[400px] h-auto relative z-[5]"
            />
          </div>
        </section>

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
