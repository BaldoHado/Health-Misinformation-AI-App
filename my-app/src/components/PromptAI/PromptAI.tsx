import React, { useEffect, useState } from "react";
import styles from "./PromptAI.module.scss";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PendingIcon from "@mui/icons-material/Pending";
import EditIcon from "@mui/icons-material/Edit";
import LinearProgress from "@mui/material/LinearProgress";

interface submitSchema {
  summary: string;
  date?: Date;
  region?: string;
  demographic?: string;
  popularity?: number;
  severity?: number;
  generatedText: string;
  status?: string;
  votes?: number;
}

const PromptAI = () => {
  const [inputText, setInputText] = useState("");
  const [docType, setDocType] = useState<"tweet" | "pr">("tweet");
  const [data, setData] = useState<string>("");
  var [citations, setCitations] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [misSummary, setMisSummary] = useState<string>("");

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const fetchData = async () => {
    if (inputText && docType) {
      try {
        setIsSubmitted(false);
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/generate?text=${inputText}&docType=${docType}`
        );
        const response2 = await axios.get(
          `${process.env.REACT_APP_API_URL}/summarize?misinformation=${inputText}`
        );
        setData(response.data.output.text);
        const references = response.data["citations"][0]["retrievedReferences"];
        var allCitations = "";
        references.forEach(function (reference: { [x: string]: { [x: string]: any; }; }) {
          allCitations += reference["content"]["text"];
        });
        setCitations(allCitations)

        setMisSummary(response2.data.summary);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchData();
    }
  };

  const submitData = async (e: any) => {
    e.preventDefault();
    try {
      const toSub: submitSchema = {
        summary: misSummary,
        generatedText: data,
        votes: 0,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/issues`,
        toSub
      );
      console.log(response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error creating issue:", error);
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
            onKeyDown={handleKeyDown}
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
          {isLoading && <LinearProgress color="error" />}
          {!isLoading && data && !isSubmitted && (
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
              
              <div className={styles.genContainer}>
                <h3>Sources</h3>
                <div className={styles.genResponse}>
                  {citations}
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
              <button className={styles.reviewBtn} onClick={submitData}>
                Submit For Review
              </button>
            </div>
          )}
          {isSubmitted && (
            <>
              <h3>Submitted!</h3>
            </>
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
