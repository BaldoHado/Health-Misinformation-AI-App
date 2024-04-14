import React, { useState } from "react";
import styles from "./IssueBox.module.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface IssueBoxProps {
  issues: Issues[];
}

interface Issues {
  summary: string;
  date: Date;
  region?: string[];
  demographic?: string[];
  popularity: number;
  severity: number;
  generatedText: string;
}

const IssueBox = ({ issues }: IssueBoxProps) => {
  const [votedUp, setVotedUp] = useState<boolean[]>(
    new Array(issues.length).fill(false)
  );
  const [votedDown, setVotedDown] = useState<boolean[]>(
    new Array(issues.length).fill(false)
  );

  const handleVoteUp = (index: number) => {
    const updatedVotedUp = [...votedUp];
    const updatedVotedDown = [...votedDown];

    updatedVotedUp[index] = !updatedVotedUp[index];
    updatedVotedDown[index] = false;

    setVotedUp(updatedVotedUp);
    setVotedDown(updatedVotedDown);
  };

  const handleVoteDown = (index: number) => {
    const updatedVotedDown = [...votedDown];
    const updatedVotedUp = [...votedUp];

    updatedVotedDown[index] = !updatedVotedDown[index];
    updatedVotedUp[index] = false;

    setVotedDown(updatedVotedDown);
    setVotedUp(updatedVotedUp);
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
                color: votedUp[index] ? "green" : "inherit",}}
                onClick={() => handleVoteUp(index)}
            />
            <ArrowDownwardIcon
              style={{
                color: votedDown[index] ? "red" : "inherit",}}
                onClick={() => handleVoteDown(index)}
            />
          </div>
          <div className={styles.lowerText}>
            <div className={styles.date}>{issue.date.toDateString()}</div>
            <div className={styles.severity}>Severity: {issue.severity}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueBox;
