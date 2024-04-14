import React, { useEffect, useState } from "react";
import styles from "./PromptAI.module.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
          <ArrowForwardIosIcon
            className={styles.submitIcon}
            onClick={fetchData}
          />
          {/* onClick={fetchData} */}
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
        <p>{data}</p>
      </div>
    </div>
  );
};

export default PromptAI;
/*
Tweet 
Press Release
*/
