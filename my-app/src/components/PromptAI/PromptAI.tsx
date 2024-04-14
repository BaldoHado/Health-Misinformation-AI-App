import React, { useEffect, useState } from "react";
import styles from "./PromptAI.module.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PromptAI: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [docType, setDocType] = useState<"tweet" | "pr" | "Document Type">(
    "Document Type"
  );
  const [data, setData] = useState<string>("");

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const fetchData = async () => {
    if (inputText && docType) {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/generate?text=${inputText}&docType=${docType}`
        );
        setData(response.data.output.text);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [inputText, docType]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Prompt AI</h1>
      <div className={styles.inputs}>
        <div className={styles.promptInput}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Known Misinformation Here..."
            className={styles.inputField}
          />
          <ArrowForwardIosIcon className={styles.submitIcon} />
        </div>

        <FormControl sx={{ minWidth: 200 }}>
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
        </FormControl>
        <h1>{data}</h1>
      </div>
    </div>
  );
};

export default PromptAI;
/*
Tweet 
Press Release
*/
