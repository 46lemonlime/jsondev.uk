import React from "react";

// import styles
import styles, { layout } from "../../../style";

// import images
import { aboutme, cv } from "../../../assets";

// import constants
import { features, workHistory } from "../../../constants";

// import global components
import { Button, Badge, SectionHeader } from "../../../components";
import GetRoadmap from "../../../components/GetRoadmap";
import FeatureCard from "./FeatureCard";

const AboutIntro = () => {
  return (
    <div className="w-full">
      {/* Section 1: About Header & Narrative (Text First on Mobile & Desktop) */}
      <section className={`${layout.section} items-center gap-12 relative`}>
        <div className={layout.sectionInfo}>
          <div className="absolute z-[0] w-[40%] h-[40%] right-20 top-1/3 rounded-full red__gradient" />
          <Badge variant="crimson" className="mb-4">
            PROFILE // BACKGROUND &amp; FOUNDATIONS
          </Badge>
          <h1 className={styles.heading1}>About Me</h1>
          <p className={`${styles.subheading} mt-3`}>
            Software Development &amp; Operations Background
          </p>
          <p className={`${styles.paragraph} max-w-[580px] mt-5`}>
            I&apos;m Jeison Plaza Sanchez (JsonDev), a self-motivated developer
            based in Manchester, United Kingdom, with a strong passion for
            software development, computer science, and practical problem
            solving.
          </p>
          <p className={`${styles.paragraph2} max-w-[580px] mt-4`}>
            My journey into software engineering grew directly out of my work in
            fast-paced customer service and estate care operations—where
            identifying opportunities for process improvement led me to build
            desktop workflow tools in VBA and pursue computer science
            fundamentals through Harvard&apos;s CS50x and modern web development
            with React, JavaScript, and Tailwind CSS.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Button to="/projects" variant="primary">
              View My Projects
            </Button>
            <Button
              href={cv}
              download="Jeison_Sanchez_CV.pdf"
              variant="secondary"
            >
              Download CV (PDF)
            </Button>
          </div>
        </div>

        <div className={layout.sectionImg}>
          <img
            src={aboutme}
            alt="Developer profile illustration"
            className="w-full max-w-[440px] h-auto relative z-[5]"
          />
        </div>
      </section>

      {/* Section 2: Technical Skills, Education & CS Roadmap */}
      <section className={`${styles.paddingY} relative`}>
        <div className="absolute z-[0] w-[40%] h-[40%] left-10 top-1/2 rounded-full blue__gradient opacity-60" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-[1]">
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionHeader
              eyebrow="01 // SKILLS & ROADMAP"
              title="Technical Stack & Continuous Learning"
              description="Please find a link to my Computer Science roadmap in Notion, where I document completed courses, tutorials, and ongoing technical study."
            />
            <div className="mt-8">
              <GetRoadmap />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5 w-full">
            {features.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Verified Operations & Customer Service Experience */}
      <section className={`${styles.paddingY} relative`}>
        <div className="mb-12 relative z-[1]">
          <SectionHeader
            eyebrow="02 // PROFESSIONAL EXPERIENCE"
            title="Operations & Customer Service History"
            description="Verified roles across regulated account management and bilingual customer operations, bringing strong communication, compliance discipline, and KPI focus to software teams."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[1]">
          {workHistory.map((job) => (
            <article
              key={job.id}
              className={`${styles.surfaceCard} p-7 flex flex-col justify-between h-full`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-borderSubtle">
                  <span className="font-mono text-[12px] font-semibold text-crimson-soft">
                    {job.period}
                  </span>
                  <span className="font-mono text-[11px] text-textMuted">
                    {job.location}
                  </span>
                </div>

                <h3 className={styles.heading4}>{job.role}</h3>
                <p className="font-sans font-medium text-[15px] text-textPrimary mt-1">
                  {job.company}
                </p>

                <p className={`${styles.paragraph2} mt-4`}>{job.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-borderSubtle">
                {job.skills.map((skill) => (
                  <span key={skill} className={styles.monoBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutIntro;
