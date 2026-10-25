/**
 * @file src/pages/home-page/components/Products.jsx
 * @description Technical capabilities section detailing frontend engineering, systems scripting,
 * and computer science foundations.
 * @responsibility Display capability pillars and skills badges on the homepage.
 */

import React from "react";
import styles from "../../../style";
import { technicalCapabilities } from "../../../constants";
import { Button, SectionHeader, GetRoadmap } from "../../../components";

const Products = () => {
  return (
    <section id="capabilities" className={`${styles.paddingY} relative`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-[1]">
        <SectionHeader
          eyebrow="02 // TECHNICAL PROFILE"
          title="Skills, Foundations & Engineering Focus"
          description="Grounded in Harvard CS50x computer science fundamentals, modern frontend web development, and hands-on workflow automation."
        />
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <GetRoadmap />
          <Button to="/about" variant="secondary">
            Full Background
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[1]">
        {technicalCapabilities.map((item) => (
          <div
            key={item.id}
            className={`${styles.surfaceCard} p-7 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="font-mono text-[12px] font-medium text-accent">
                  {item.code}
                </span>
                <div className="w-11 h-11 rounded-lg bg-surfaceElevated border border-borderSubtle flex items-center justify-center p-2">
                  <img
                    loading="lazy"
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>

              <h3 className={styles.heading4}>{item.title}</h3>
              <p className={`${styles.paragraph2} mt-3`}>{item.content}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-borderSubtle">
              {item.stack.map((skill) => (
                <span key={skill} className={styles.monoBadge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
