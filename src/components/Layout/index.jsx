import React from "react";

// import components
import Header from "./Header";
import Footer from "./Footer";

// import scroll & title manager
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  return (
    <div className="bg-canvas text-textPrimary w-full min-h-screen flex flex-col overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-crimson focus:text-white focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>
      <Header />
      <ScrollToTop />
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
