/**
 * @file src/components/GetRoadmap.jsx
 * @description Interactive action link pointing directly to the verified Notion Computer Science roadmap.
 * @responsibility Render external call-to-action anchor leading to educational documentation.
 */

import React from "react";
import { notionBlack } from "../assets";

const GetRoadmap = ({ styles = "" }) => (
  <a
    href="https://juicy-resolution-f28.notion.site/My-CS-Journey-56da4e6378854b02a0dda599d55d633d"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex flex-row items-center py-3.5 px-6 font-sans font-semibold text-[16px] text-white bg-secondary-gradient rounded-[10px] border border-crimson-hover/40 shadow-crimson hover:brightness-110 transition-all duration-200 ${styles}`}
  >
    <span>Get CS Roadmap</span>
    <img
      src={notionBlack}
      alt=""
      aria-hidden="true"
      className="w-[24px] h-[24px] object-contain ml-2.5 invert"
    />
  </a>
);

export default GetRoadmap;
