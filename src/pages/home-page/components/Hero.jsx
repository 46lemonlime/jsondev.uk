import React from "react";

// import style
import styles, { layout } from "../../../style";

// import animations
import { TypeAnimation } from "react-type-animation";

// import images & documents
import { me, cv, github, linkedin } from "../../../assets";

// import global components
import { Button, Badge } from "../../../components";

// import specific components
import Stats from "./Stats";
import GetCV from "./GetCV";

const Hero = () => {
  return (
    <div>
      <section
        id="hero"
        className={`${layout.section} items-center gap-10 relative`}
      >
        {/* Left Column: Introduction & Actions */}
        <div className={`flex-1 ${styles.flexStart} flex-col z-[2]`}>
          <Badge variant="telemetry" pulse className="mb-5">
            Currently Open for Full-Remote &amp; UK Opportunities
          </Badge>

          <div className="flex flex-row justify-between items-start w-full gap-4">
            <h1 className={styles.display}>
              Jeison{" "}
              <span className="text-gradient">Porfirio</span>
              <span className="block mt-1">Plaza Sanchez</span>
            </h1>

            <div className="ss:flex hidden shrink-0">
              <GetCV />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span
              className="font-mono text-crimson font-semibold text-[16px]"
              aria-hidden="true"
            >
              &gt;
            </span>
            <TypeAnimation
              sequence={[
                "Software Developer",
                2500,
                "React & JavaScript Developer",
                2500,
                "Workflow Automation Builder",
                2500,
              ]}
              speed={50}
              className="font-mono font-medium text-[16px] sm:text-[18px] leading-[28px] text-crimson-soft bg-surfaceElevated border border-borderSubtle rounded-lg px-3 py-1"
              wrapper="div"
              repeat={Infinity}
            />
          </div>

          <p className={`${styles.paragraph} max-w-[560px] mt-6`}>
            Hi, I&apos;m Jeison Sanchez ({"{"}
            <span className="font-mono text-textPrimary font-medium">
              JsonDev
            </span>
            {"}"}). Passionate about software development and computer science,
            I focus on optimising workflows, solving operational problems, and
            building clean web and desktop applications with{" "}
            <span className="text-textPrimary font-medium">
              JavaScript, React, Tailwind CSS, Python, C, SQL, and VBA
            </span>
            .
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Button to="/projects" variant="primary">
              Explore Projects
            </Button>
            <Button
              href={cv}
              download="Jeison_Sanchez_CV.pdf"
              variant="secondary"
            >
              Download CV (PDF)
            </Button>
            <Button to="/about" variant="ghost">
              About &amp; CS Roadmap →
            </Button>
          </div>

          {/* Direct Verified Profile Links */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-borderSubtle w-full max-w-[560px]">
            <span className="font-mono text-[12px] uppercase tracking-wider text-textMuted">
              Verified Profiles:
            </span>
            <a
              href="https://github.com/46lemonlime"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-textSecondary hover:text-textPrimary transition-colors"
            >
              <img
                src={github}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain"
              />
              <span>github.com/46lemonlime</span>
            </a>
            <span className="text-borderSubtle" aria-hidden="true">
              |
            </span>
            <a
              href="https://www.linkedin.com/in/jpplazasanchez/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-textSecondary hover:text-textPrimary transition-colors"
            >
              <img
                src={linkedin}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain"
              />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Portrait Card */}
        <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-8 relative`}
        >
          <div className="relative z-[5] p-3 rounded-3xl bg-surface border border-borderSubtle shadow-card max-w-[400px] w-full">
            <div className="overflow-hidden rounded-2xl aspect-square bg-surfaceElevated">
              <img
                src={me}
                alt="Portrait of Jeison Plaza Sanchez"
                width="400"
                height="400"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 px-2 py-1.5 flex items-center justify-between font-mono text-[12px] text-textMuted">
              <span>LOC // MANCHESTER, UK</span>
              <span className="text-telemetry flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-telemetry"
                  aria-hidden="true"
                />
                CS50x // DEV
              </span>
            </div>
          </div>

          {/* Restrained ambient glow */}
          <div className="absolute z-[0] w-[70%] h-[70%] top-1/4 pink__gradient" />
          <div className="absolute z-[0] w-[60%] h-[60%] bottom-10 red__gradient" />
        </div>

        <div className={`ss:hidden ${styles.flexCenter} w-full mt-2`}>
          <GetCV />
        </div>
      </section>

      <Stats />
    </div>
  );
};

export default Hero;
