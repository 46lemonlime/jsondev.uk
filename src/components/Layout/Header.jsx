import React from "react";

// import styles
import styles from "../../style";

// import components
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-canvas/85 border-b border-borderSubtle">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
