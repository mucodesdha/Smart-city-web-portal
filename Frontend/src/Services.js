import React, { useState } from "react";
import { useLanguage } from "./i18n/LanguageContext";

// Phone numbers stay the same regardless of language
const phoneNumbers = {
  "Water Services": ["0251-2480400", "18002663535"],
  "Waste Management": ["0251-2480600", "0251-2480600"],
  "Electrical Services": ["1912", "0251-2480700"],
  "Civil Maintenance": ["0251-2480650", "0251-2480550"],
  "Health & Sanitation": ["0251-2480450", "0251-2480620"],
};

function Services() {
  const { t } = useLanguage();
  const s = t.services;

  const tabKeys = Object.keys(phoneNumbers);
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [search, setSearch] = useState("");

  // Build current service items from translations + phone numbers
  const currentItems = s.serviceItems[activeTab]?.map((item, i) => ({
    ...item,
    phone: phoneNumbers[activeTab][i],
  })) || [];

  const filteredServices = currentItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1>{s.title}</h1>
        <p>{s.subtitle}</p>
      </div>

      {/* Search */}
      <input
        style={styles.searchBox}
        placeholder={s.searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabKeys.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch(""); }}
            style={{
              ...styles.tabBtn,
              background: activeTab === tab ? "#00cec9" : "transparent"
            }}
          >
            {s.tabs[tab]}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={styles.grid}>
        {filteredServices.map((item, index) => (
          <div key={index} style={styles.card}>
            <h3>{item.name}</h3>
            <p style={{ opacity: 0.9 }}>{item.desc}</p>
            <p>📞 {item.phone}</p>
            <div style={styles.btnRow}>
              <a href={`tel:${item.phone}`} style={styles.callBtn}>{s.callNow}</a>
              <button style={styles.reqBtn}>{s.requestService}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", padding: "20px", background: "linear-gradient(135deg,#16222A,#3A6073)", color: "#fff", fontFamily: "Segoe UI" },
  header: { textAlign: "center", marginBottom: "15px" },
  searchBox: { width: "100%", padding: "12px", borderRadius: "10px", border: "none", marginBottom: "15px" },
  tabs: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  tabBtn: { padding: "10px 18px", borderRadius: "20px", border: "1px solid #00cec9", color: "#fff", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" },
  card: { background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "15px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" },
  btnRow: { display: "flex", justifyContent: "space-between", marginTop: "12px" },
  callBtn: { background: "#00cec9", padding: "8px 15px", borderRadius: "20px", textDecoration: "none", color: "#000", fontWeight: "bold" },
  reqBtn: { background: "#0984e3", padding: "8px 15px", borderRadius: "20px", border: "none", color: "#fff", cursor: "pointer" }
};

export default Services;