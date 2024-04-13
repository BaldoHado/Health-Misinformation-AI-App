import React from "react";
import styles from "./Header.module.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.headerCenter}>
        <Button className={styles.navBtn}>
          <Link to="/">Dashboard</Link>
        </Button>
        <Button className={styles.navBtn}>
          <Link to="/prompt-ai">Prompt AI</Link>
        </Button>
        <Button className={styles.navBtn}>
          <Link to="/profile">Profile</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Header;
