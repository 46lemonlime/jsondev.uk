/**
 * @file src/components/Layout/index.jsx
 * @description Master application layout enclosing header, footer, scroll manager, and skip-to-content accessibility link.
 * @responsibility Structure landmark elements (header, main, footer) and persistent global navigation.
 */

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  return (
    <div className="bg-canvas text-textPrimary w-full min-h-screen flex flex-col overflow-x-hidden relative">
      {/* Global atmospheric technical grid & dot matrix layer: fixed to viewport, behind all content */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-tech-grid [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,black_35%,transparent_90%)]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-tech-dots [mask-image:radial-gradient(ellipse_75%_75%_at_50%_35%,black_40%,transparent_90%)]"
        aria-hidden="true"
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-canvas focus:font-mono focus:text-sm font-semibold"
      >
        Skip to main content
      </a>
      <Header />
      <ScrollToTop />
      <main id="main-content" className="flex-1 w-full relative z-[1]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
