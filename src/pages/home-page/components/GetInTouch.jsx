/**
 * @file src/pages/home-page/components/GetInTouch.jsx
 * @description Banner component inviting recruiter and collaboration inquiries with action triggers.
 * @responsibility Provide clear call-to-action banner for reaching out and downloading CV.
 */

import React from "react";
import styles from "../../../style";
import { cv } from "../../../assets";
import { Button, Badge } from "../../../components";

const GetInTouch = () => {
  return (
    <section
      id="contact"
      className={`${styles.marginY} ${styles.padding} flex md:flex-row flex-col items-start md:items-center justify-between gap-8 bg-surface border border-borderSubtle rounded-2xl shadow-card`}
    >
      <div className="flex-1 flex flex-col">
        <Badge variant="telemetry" pulse className="mb-3 self-start">
          Open to Software Developer Roles
        </Badge>
        <h2 className={styles.heading2}>Let&apos;s Connect</h2>
        <p className={`${styles.paragraph} max-w-[540px] mt-3`}>
          Looking for a dedicated developer with strong problem-solving
          fundamentals and real-world operational experience? Feel free to reach
          out via the contact page or connect on LinkedIn and GitHub.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 shrink-0">
        <Button to="/contact" variant="primary">
          Contact Me
        </Button>
        <Button
          href={cv}
          download="Jeison_Sanchez_CV.pdf"
          variant="secondary"
        >
          Download CV
        </Button>
      </div>
    </section>
  );
};

export default GetInTouch;
