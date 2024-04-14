import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import IssueBox from "../IssueBox/IssueBox";
import axios from "axios";

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
const Dashboard = () => {
  const [data, setData] = useState<Issues[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/v1/issues`);
      const mappedData: Issues[] = response.data.map((item: any) => ({
        _id: item._id,
        summary: item.summary,
        generatedText: item.generatedText,
        votes: item.votes,
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <IssueBox issues={data} />
    </div>
  );
};

export default Dashboard;
