/**
 * @file src/pages/project-CPT-page/index.jsx
 * @description Dedicated route wrapper for the Call Progress Tracker project detail view.
 * @responsibility Instantiate ProjectDetail for the 'call-progress-tracker' slug.
 */

import React from "react";
import ProjectDetail from "../project-detail-page";

const CallTracker = () => (
  <ProjectDetail projectSlug="call-progress-tracker" />
);

export default CallTracker;
