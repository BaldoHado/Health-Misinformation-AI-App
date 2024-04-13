import React from "react";
import styles from "./Dashboard.module.scss";
import IssueBox from "../IssueBox/IssueBox";

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
}

const misinformationData: Issues[] = [
  {
    summary: "Drink Bleach to Cure COVID",
    date: new Date("2024-04-10"),
    region: ["Online"],
    demographic: ["General Public"],
    popularity: 90,
    severity: 9,
  },
  {
    summary: "Lemon / Garlic Face Masks Treat Acne",
    date: new Date("2024-04-11"),
    region: ["Social Media Platforms"],
    demographic: ["Young Adults"],
    popularity: 95,
    severity: 2,
  },
  {
    summary: "5G Networks Cause Autism",
    date: new Date("2024-04-12"),
    region: ["Online Communities"],
    demographic: ["Parents"],
    popularity: 98,
    severity: 6,
  },
  {
    summary: "Drink Bleach to Cure COVID",
    date: new Date("2024-04-10"),
    region: ["Online"],
    demographic: ["General Public"],
    popularity: 90,
    severity: 9,
  },
  {
    summary: "Lemon / Garlic Face Masks Treat Acne",
    date: new Date("2024-04-11"),
    region: ["Social Media Platforms"],
    demographic: ["Young Adults"],
    popularity: 95,
    severity: 2,
  },
  {
    summary: "5G Networks Cause Autism",
    date: new Date("2024-04-12"),
    region: ["Online Communities"],
    demographic: ["Parents"],
    popularity: 98,
    severity: 6,
  },
  {
    summary: "Drink Bleach to Cure COVID",
    date: new Date("2024-04-10"),
    region: ["Online"],
    demographic: ["General Public"],
    popularity: 90,
    severity: 9,
  },
  {
    summary: "Lemon / Garlic Face Masks Treat Acne",
    date: new Date("2024-04-11"),
    region: ["Social Media Platforms"],
    demographic: ["Young Adults"],
    popularity: 95,
    severity: 2,
  },
  {
    summary: "5G Networks Cause Autism",
    date: new Date("2024-04-12"),
    region: ["Online Communities"],
    demographic: ["Parents"],
    popularity: 98,
    severity: 6,
  },
  {
    summary: "Drink Bleach to Cure COVID",
    date: new Date("2024-04-10"),
    region: ["Online"],
    demographic: ["General Public"],
    popularity: 90,
    severity: 9,
  },
  {
    summary: "Lemon / Garlic Face Masks Treat Acne",
    date: new Date("2024-04-11"),
    region: ["Social Media Platforms"],
    demographic: ["Young Adults"],
    popularity: 95,
    severity: 2,
  },
  {
    summary: "5G Networks Cause Autism",
    date: new Date("2024-04-12"),
    region: ["Online Communities"],
    demographic: ["Parents"],
    popularity: 98,
    severity: 6,
  },
  {
    summary: "Drink Bleach to Cure COVID",
    date: new Date("2024-04-10"),
    region: ["Online"],
    demographic: ["General Public"],
    popularity: 90,
    severity: 9,
  },
  {
    summary: "Lemon / Garlic Face Masks Treat Acne",
    date: new Date("2024-04-11"),
    region: ["Social Media Platforms"],
    demographic: ["Young Adults"],
    popularity: 95,
    severity: 2,
  },
  {
    summary: "5G Networks Cause Autism",
    date: new Date("2024-04-12"),
    region: ["Online Communities"],
    demographic: ["Parents"],
    popularity: 98,
    severity: 6,
  },
  {
    summary: "Drink Bleach to Cure COVID",
    date: new Date("2024-04-10"),
    region: ["Online"],
    demographic: ["General Public"],
    popularity: 90,
    severity: 9,
  },
  {
    summary: "Lemon / Garlic Face Masks Treat Acne",
    date: new Date("2024-04-11"),
    region: ["Social Media Platforms"],
    demographic: ["Young Adults"],
    popularity: 95,
    severity: 2,
  },
  {
    summary: "5G Networks Cause Autism",
    date: new Date("2024-04-12"),
    region: ["Online Communities"],
    demographic: ["Parents"],
    popularity: 98,
    severity: 6,
  },
  {
    summary: "Drink Bleach to Cure COVID",
    date: new Date("2024-04-10"),
    region: ["Online"],
    demographic: ["General Public"],
    popularity: 90,
    severity: 9,
  },
  {
    summary: "Lemon / Garlic Face Masks Treat Acne",
    date: new Date("2024-04-11"),
    region: ["Social Media Platforms"],
    demographic: ["Young Adults"],
    popularity: 95,
    severity: 2,
  },
  {
    summary: "5G Networks Cause Autism",
    date: new Date("2024-04-12"),
    region: ["Online Communities"],
    demographic: ["Parents"],
    popularity: 98,
    severity: 6,
  },
];

const Dashboard = () => {
  return (
    <>
      <h1 className={styles.title}>Dashboard</h1>
      <IssueBox issues={misinformationData} />
    </>
  );
};

export default Dashboard;
