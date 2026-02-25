import React, { useState } from "react";
import Emergency from "./Emergency";
import Services from "./Services";
import Feedback from "./Feedback";
import MigrantSpecification from "./MigrantSpecification";
import { useLanguage } from "./i18n/LanguageContext";

function Home() {
  const { t } = useLanguage();

  const tabKeys = [
    "Emergency",
    "Complaints",
    "Notifications",
    "Services",
    "Chatbot",
    "Feedback",
    "MigrantSpecification"
  ];

  const [activeTab, setActiveTab] = useState("Emergency");

  return (
    <div style={styles.container}>
      {/* Title */}
      <div style={styles.header}>
        <h1>{t.home.title}</h1>
        <p>{t.home.subtitle}</p>
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {tabKeys.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tabBtn,
              background: activeTab === tab ? "#00cec9" : "transparent",
              color: activeTab === tab ? "#000" : "#fff"
            }}
          >
            {t.home.tabs[tab]}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={styles.contentBox}>
        {activeTab === "Emergency" && <Emergency />}
        {activeTab === "Complaints" && (
          <h2 style={styles.placeholder}>{t.home.comingSoon.complaints}</h2>
        )}
        {activeTab === "Notifications" && (
          <h2 style={styles.placeholder}>{t.home.comingSoon.notifications}</h2>
        )}
        {activeTab === "Services" && <Services />}
        {activeTab === "Chatbot" && (
          <h2 style={styles.placeholder}>{t.home.comingSoon.chatbot}</h2>
        )}
        {activeTab === "Feedback" && <Feedback />}
        {activeTab === "MigrantSpecification" && <MigrantSpecification />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "#fff",
    padding: "15px"
  },
  header: {
    textAlign: "center",
    marginBottom: "15px"
  },
  tabBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "15px"
  },
  tabBtn: {
    padding: "10px 18px",
    borderRadius: "20px",
    border: "1px solid #00cec9",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s"
  },
  contentBox: {
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "15px",
    minHeight: "400px",
    backdropFilter: "blur(10px)"
  },
  placeholder: {
    textAlign: "center",
    marginTop: "100px",
    opacity: 0.8
  }
};

export default Home;