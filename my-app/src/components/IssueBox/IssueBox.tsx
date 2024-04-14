import React, { useEffect, useState } from "react";
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
  votes: number;
}

const IssueBox = ({ issues }: IssueBoxProps) => {
  const [votedUp, setVotedUp] = useState<boolean[]>(
    new Array(issues.length).fill(false)
  );
  const [votedDown, setVotedDown] = useState<boolean[]>(
    new Array(issues.length).fill(false)
  );

  const [issueVotes, setIssueVotes] = useState<number[]>(
    issues.map((issue) => issue.votes)
  );

  useEffect(() => {
    setIssueVotes(issues.map((issue) => issue.votes));
  }, [issues]);

  const handleVoteUp = async (index: number, id: string, moveNum: boolean) => {
    const updatedVotedUp = [...votedUp];
    const updatedVotedDown = [...votedDown];

    updatedVotedUp[index] = !updatedVotedUp[index];
    updatedVotedDown[index] = false;

    try {
      if (moveNum) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/issues/${id}/vote?add=true`
        );
        console.log(response);
        setIssueVotes((prevVotes) =>
          prevVotes.map((votes, i) => (i === index ? votes + 1 : votes))
        );
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/issues/${id}/vote`
        );
        setIssueVotes((prevVotes) =>
          prevVotes.map((votes, i) => (i === index ? votes - 1 : votes))
        );
      }

      setVotedUp(updatedVotedUp);
      setVotedDown(updatedVotedDown);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleVoteDown = async (
    index: number,
    id: string,
    moveNum: boolean
  ) => {
    const updatedVotedDown = [...votedDown];
    const updatedVotedUp = [...votedUp];

    updatedVotedDown[index] = !updatedVotedDown[index];
    updatedVotedUp[index] = false;
    try {
      if (moveNum) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/issues/${id}/vote`
        );
        setIssueVotes((prevVotes) =>
          prevVotes.map((votes, i) => (i === index ? votes - 1 : votes))
        );
        console.log(response);
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/issues/${id}/vote?add=true`
        );
        setIssueVotes((prevVotes) =>
          prevVotes.map((votes, i) => (i === index ? votes + 1 : votes))
        );
      }

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
              onClick={
                votedUp[index]
                  ? () => handleVoteUp(index, issue._id, false)
                  : () => handleVoteUp(index, issue._id, true)
              }
            />
            <ArrowDownwardIcon
              style={{
                color: votedDown[index] ? "red" : "inherit",
              }}
              onClick={
                votedDown[index]
                  ? () => handleVoteDown(index, issue._id, false)
                  : () => handleVoteDown(index, issue._id, true)
              }
            />
          </div>
          <div className={styles.lowerText}>
            <div className={styles.date}>Current Vote Standing: {issueVotes[index]}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueBox;
