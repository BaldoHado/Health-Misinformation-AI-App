import React, { useState } from "react";
import styles from "./IssueBox.module.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";

interface IssueBoxProps {
  issues: Issues[];
}

interface Issues {
  _id: string;
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

const IssueBox = ({ issues }: IssueBoxProps) => {
  const [votedUp, setVotedUp] = useState<boolean[]>(
    new Array(issues.length).fill(false)
  );
  const [votedDown, setVotedDown] = useState<boolean[]>(
    new Array(issues.length).fill(false)
  );
  const handleVoteUp = async (index: number, id: string) => {
    const updatedVotedUp = [...votedUp];
    const updatedVotedDown = [...votedDown];

    updatedVotedUp[index] = !updatedVotedUp[index];
    updatedVotedDown[index] = false;

    try {
      const response = await axios.post(
        `http://localhost:8000/v1/issues/${id}/vote`,
        true
      );
      console.log(response);
      setVotedUp(updatedVotedUp);
      setVotedDown(updatedVotedDown);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleVoteDown = async (index: number, id: string) => {
    const updatedVotedDown = [...votedDown];
    const updatedVotedUp = [...votedUp];

    updatedVotedDown[index] = !updatedVotedDown[index];
    updatedVotedUp[index] = false;
    try {
      const response = await axios.post(
        `http://localhost:8000/v1/issues/${id}/vote`,
        false
      );
      console.log(response);
      setVotedDown(updatedVotedDown);
      setVotedUp(updatedVotedUp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.gridContainer}>
      {issues.map((issue, index) => (
        <div key={index} className={styles.box}>
          <div className={styles.summary}>{issue.summary}</div>
          <div className={styles.genText}>"{issue.generatedText}"</div>
          <div className={styles.voteIcons}>
            <ArrowUpwardIcon
              style={{
                color: votedUp[index] ? "green" : "inherit",
              }}
              onClick={() => handleVoteUp(index, issue._id)}
            />
            <ArrowDownwardIcon
              style={{
                color: votedDown[index] ? "red" : "inherit",
              }}
              onClick={() => handleVoteDown(index, issue._id)}
            />
          </div>
          <div className={styles.lowerText}>
            <div className={styles.date}>{issue.votes}</div>
            <div className={styles.severity}>Severity: {issue.severity}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueBox;
