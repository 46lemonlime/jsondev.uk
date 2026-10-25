/**
 * @file src/pages/project-PSD-page/index.jsx
 * @description Dedicated route wrapper for the Poker Strategy Display project detail view.
 * @responsibility Instantiate ProjectDetail for the 'poker-strategy-display' slug.
 */

import React from "react";
import ProjectDetail from "../project-detail-page";

const PokerDisplay = () => (
  <ProjectDetail projectSlug="poker-strategy-display" />
);

export default PokerDisplay;
