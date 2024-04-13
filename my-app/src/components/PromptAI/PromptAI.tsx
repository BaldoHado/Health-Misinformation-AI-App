import React, { useState } from "react";
import styles from "./PromptAI.module.scss";

const PromptAI: React.FC = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Prompt AI</h1>
      <div className={styles.imageGroups}>
        <img
          src="/images/Carousel1.jpg"
          alt="Image 1"
          className={styles.image}
        />
        <img
          src="/images/Carousel2.jpg"
          alt="Image 2"
          className={styles.image}
        />
        <img
          src="/images/Carousel3.jpg"
          alt="Image 3"
          className={styles.image}
        />
      </div>
      <div className={styles.promptGen}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Add text..."
          className={styles.inputField}
        />
      </div>
    </div>
  );
};

export default PromptAI;
