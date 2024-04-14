import React, { useEffect, useState } from "react";
import styles from "./PromptAI.module.scss";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PendingIcon from "@mui/icons-material/Pending";
import EditIcon from "@mui/icons-material/Edit";
import LinearProgress from "@mui/material/LinearProgress";

const PromptAI: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [docType, setDocType] = useState<"tweet" | "pr">("tweet");
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const fetchData = async () => {
    if (inputText && docType) {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/v1/generate?text=${inputText}&docType=${docType}`
        );
        setData(response.data.output.text);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Prompt AI</h1>
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Known Misinformation Here..."
            className={styles.inputField}
          />
          <span className={styles.dropdown}>
            <select
              value={docType}
              onChange={(event) =>
                setDocType(event.target.value as "tweet" | "pr")
              }
            >
              <option value="tweet">Tweet</option>
              <option value="pr">Press Release</option>
            </select>
          </span>
          {!isLoading ? (
            <button onClick={fetchData} className={styles.submitButton}>
              <ArrowForwardIosIcon className={styles.submitIcon} />
            </button>
          ) : (
            <button onClick={fetchData} className={styles.submitButton}>
              <PendingIcon className={styles.submitIcon} />
            </button>
          )}
        </div>
        <div className={styles.generatedText}>
          {isLoading && <LinearProgress color="error"/>}
          {!isLoading && data && (
            <div className={styles.genContainer}>
              <h3>Optimal AI-Generated Response</h3>
              <div className={styles.genResponse}>
                <div
                  onBlur={(event) =>
                    event.currentTarget.textContent
                      ? setData(event.currentTarget.textContent)
                      : ""
                  }
                  contentEditable={isEditing}
                >
                  {data}
                </div>
              </div>
              <div className={styles.editIcon}>
                {isEditing && <p>Editing</p>}
                <EditIcon
                  className={`${styles.editIcon} ${
                    isEditing && styles.isEditing
                  }`}
                  onClick={() => setIsEditing(!isEditing)}
                />
              </div>
              <button className={styles.reviewBtn}>Submit For Review</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptAI;
/*
Tweet 
Press Release
*/
