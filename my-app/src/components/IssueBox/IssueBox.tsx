import React from "react";
import styles from "./IssueBox.module.scss";

interface IssueBoxProps {
  issues: Issues[];
}

interface Issues {
  summary: string;
  date: Date;
  region: string[];
  demographic: string[];
  popularity: number;
  severity: number;
}

const IssueBox = ({ issues }: IssueBoxProps) => {
  return (
    <div className={styles.gridContainer}>
      {issues.map((issue, index) => (
        <div key={index} className={styles.box}>
          <div className={styles.summary}>{issue.summary}</div>
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
