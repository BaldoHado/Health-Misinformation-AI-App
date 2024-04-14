import React, { useEffect, useState } from "react";
import styles from "./PromptAI.module.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PendingIcon from '@mui/icons-material/Pending';

const PromptAI: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [docType, setDocType] = useState<"tweet" | "pr">("tweet");
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const fetchData = async () => {
    if (inputText) {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/v1/generate?text=${inputText}&docType=${docType}`
        );
        setData(response.data.output.text);
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
          {!isLoading ? <ArrowForwardIosIcon
            className={styles.submitIcon}
            onClick={fetchData}
          /> : <PendingIcon className={styles.submitIcon}/>}
        </div>

        {/* <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="selectDocLabel">Select Document Type</InputLabel>
          <Select
            value={docType}
            label="Select Document Type"
            labelId="selectDocLabel"
            id="selectDoc"
            onChange={(event: any) => setDocType(event.target.value)}
            placeholder="Select Document Type"
            className={styles.docType}
          >
            <MenuItem value="tweet">Tweet</MenuItem>
            <MenuItem value="pr">Press Release</MenuItem>
          </Select>
        </FormControl> */}
        <div className={styles.generatedText}>
          {isLoading && <p> Loading</p>}
          {!isLoading && data && (
            <>
              <h3>Optimal AI-Generated Response</h3>
              <p>{data}</p>
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
