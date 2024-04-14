import React from "react";
import Header from "../components/Header/Header";
import Profile from "../components/Profile/Profile";
import styles from "./PromptAIPage.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Profile />
    </div>
  );
};

export default ProfilePage;
