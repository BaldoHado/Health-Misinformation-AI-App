import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.headerCenter}>
        <div className={styles.navBtn}>
          <Link to="/">Dashboard</Link>
        </div>
        <div className={styles.navBtn}>
          <Link to="/prompt-ai">Prompt AI</Link>
        </div>
        <div className={styles.navBtn}>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
