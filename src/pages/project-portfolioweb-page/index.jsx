/**
 * @file src/pages/project-portfolioweb-page/index.jsx
 * @description Dedicated route wrapper for the Portfolio Website project detail view.
 * @responsibility Instantiate ProjectDetail for the 'portfolio-website' slug.
 */

import React from "react";
import ProjectDetail from "../project-detail-page";

const PortfolioWeb = () => (
  <ProjectDetail projectSlug="portfolio-website" />
);

export default PortfolioWeb;
