import React, { useState } from "react";
import styles from "./PromptAI.module.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PromptAI: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [docType, setDocType] = useState<"tweet" | "pr" | "Document Type">(
    "Document Type"
  );

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  return (
    <>
      <h1 className={styles.title}>Prompt AI</h1>
      <div className={styles.inputs}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Known Misinformation Here..."
          className={styles.inputField}
        />
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
      </div>
    </>
  );
};

export default PromptAI;
/*
Tweet 
Press Release
*/
