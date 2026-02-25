import React from "react";
import { useLanguage } from "./i18n/LanguageContext";

function MigrantSpecification() {
  const { t } = useLanguage();
  const m = t.migrant;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{m.heading}</h2>
      <p style={styles.subtitle}>{m.subtitle}</p>
      <div style={styles.grid}>
        {m.services.map((item, index) => (
          <div key={index} style={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "10px" },
  heading: { textAlign: "center", marginBottom: "10px", color: "#ffb347" },
  subtitle: { textAlign: "center", maxWidth: "800px", margin: "0 auto 25px", lineHeight: "1.6" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" },
  card: { background: "rgba(255,255,255,0.08)", padding: "18px", borderRadius: "15px", backdropFilter: "blur(10px)", boxShadow: "0 8px 20px rgba(0,0,0,0.4)", transition: "0.3s", cursor: "pointer" }
};

export default MigrantSpecification;