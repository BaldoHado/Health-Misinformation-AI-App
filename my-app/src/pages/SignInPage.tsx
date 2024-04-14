import React from "react";
import Header from "../components/Header/Header";
import SignIn from "../components/SignIn/SignIn";
import styles from "./PromptAIPage.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <SignIn />
    </div>
  );
};

export default ProfilePage;
