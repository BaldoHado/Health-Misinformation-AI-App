import React from "react";
import styles from "./Dashboard.module.scss";
import IssueBox from "../IssueBox/IssueBox";


interface Issues {
  summary: string;
  date: Date;
  region?: string[];
  demographic?: string[];
  popularity: number;
  severity: number;
  generatedText: string;
}

const misinformationData: Issues[] = [
  {
    summary: "COVID-19 vaccine causes infertility",
    date: new Date("2023-03-25"),
    region: ["North America", "Europe"],
    demographic: ["Adults"],
    popularity: 80,
    severity: 90,
    generatedText: "The COVID-19 vaccine has been thoroughly tested and is not linked to infertility. It is safe and effective in preventing severe illness."
  },
  {
    summary: "5G networks spread COVID-19",
    date: new Date("2023-04-10"),
    region: ["Asia", "Africa"],
    demographic: ["General Public"],
    popularity: 60,
    severity: 70,
    generatedText: "There is no scientific evidence to support the claim that 5G networks spread COVID-19. Misinformation like this can cause unnecessary fear and confusion."
  },
  {
    summary: "Herbal remedies cure COVID-19",
    date: new Date("2023-05-05"),
    region: ["South America"],
    demographic: ["Elderly"],
    popularity: 50,
    severity: 80,
    generatedText: "While herbal remedies may have some health benefits, they are not a cure for COVID-19. It's important to rely on scientifically proven treatments."
  }
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
