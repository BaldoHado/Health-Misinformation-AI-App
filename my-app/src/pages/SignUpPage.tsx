import React from "react";
import Header from "../components/Header/Header";
import SignUp from "../components/Authentication/SignUp";
import styles from "./PromptAIPage.module.scss";

const PromptAIPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <SignUp />
    </div>
  );
};

export default PromptAIPage;
