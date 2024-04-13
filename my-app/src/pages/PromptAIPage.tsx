import React from "react";
import Header from "../components/Header/Header";
import PromptAI from "../components/PromptAI/PromptAI";
import styles from "./PromptAIPage.module.scss";

const PromptAIPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <PromptAI />
    </div>
  );
};

export default PromptAIPage;
