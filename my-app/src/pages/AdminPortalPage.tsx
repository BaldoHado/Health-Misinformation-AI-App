import React from "react";
import AdminPortal from "../components/Admin/AdminPortal";
import Header from "../components/Header/Header";
import styles from "./PromptAIPage.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <AdminPortal />
    </div>
  );
};

export default ProfilePage;
