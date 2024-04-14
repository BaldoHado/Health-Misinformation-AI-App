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
      <div className={styles.promptGen}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          className={styles.inputField}
        />
      </div>
    </div>
  );
};

export default PromptAI;
