import React, { useState } from "react";
import { useLanguage } from "./i18n/LanguageContext";

// Static data (names/addresses/phones stay the same; only UI labels translate)
const emergencyData = {
  "KDMC Departments": [
    { name: "KDMC Main Office West Ward", phone: "0251-2480000", address: "Manpada Road, Dombivli West" },
    { name: "Water Supply Department", phone: "0251-2480400", address: "Gandhi Nagar, Dombivli West" },
    { name: "Solid Waste Management Dept", phone: "0251-2480600", address: "Mhatre Nagar, Dombivli West" },
    { name: "Health Department", phone: "0251-2480450", address: "Shastri Nagar, Dombivli West" }
  ],
  Police: [
    { name: "Vishnunagar Police Station", phone: "0251-2480102", address: "Vishnunagar, Dombivli West" },
    { name: "Manpada Police Station", phone: "0251-2870800", address: "Manpada Road, Dombivli West" },
    { name: "Police Control Room", phone: "112", address: "India Emergency Service" }
  ],
  Hospitals: [
    { name: "KDMC Hospital", phone: "0251-2480445", address: "Shastri Nagar, Dombivli West" },
    { name: "Shastri Nagar General Hospital", phone: "0251-2481073", address: "Kopar Road, Dombivli West" },
    { name: "Apex Hospital", phone: "0251-2485000", address: "Gandhi Nagar, Dombivli West" }
  ],
  Ambulance: [
    { name: "Government Ambulance", phone: "108", address: "Dombivli West" },
    { name: "KDMC Ambulance Service", phone: "102", address: "KDMC Emergency Unit" }
  ],
  FireBrigade: [
    { name: "Dombivli Fire Station West", phone: "0251-2470357", address: "Gandhi Nagar, Dombivli West" }
  ],
  BloodBanks: [
    { name: "KDMC Blood Bank", phone: "0251-2480445", address: "Shastri Nagar, Dombivli West" },
    { name: "Shastri Nagar Blood Center", phone: "0251-2481073", address: "Kopar Road, Dombivli West" }
  ]
};

function Emergency() {
  const { t } = useLanguage();
  const e = t.emergency;

  const tabs = Object.keys(emergencyData);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [search, setSearch] = useState("");

  const filteredData = emergencyData[activeTab].filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const openMap = (place) => {
    const query = encodeURIComponent(place);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>{e.title}</h1>
        <p>{e.subtitle}</p>
      </div>

      <input
        style={styles.searchBox}
        placeholder={e.searchPlaceholder}
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />

      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch(""); }}
            style={{ ...styles.tabBtn, background: activeTab === tab ? "#ff6a00" : "transparent" }}
          >
            {e.tabs[tab] || tab}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredData.map((item, index) => (
          <div key={index} style={styles.card}>
            <h3>{item.name}</h3>
            <p>📞 {item.phone}</p>
            <p>📍 {item.address}</p>
            <div style={styles.btnGroup}>
              <a href={`tel:${item.phone}`} style={styles.callBtn}>{e.call}</a>
              <button onClick={() => openMap(item.name + " " + item.address)} style={styles.mapBtn}>{e.viewMap}</button>
            </div>
          </div>
        ))}
      </div>

      <a href="tel:112" style={styles.sosBtn}>{e.sos}</a>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", padding: "20px", background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", color: "#fff", fontFamily: "Segoe UI" },
  header: { textAlign: "center", marginBottom: "15px" },
  searchBox: { width: "100%", padding: "12px", borderRadius: "10px", border: "none", marginBottom: "15px" },
  tabs: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  tabBtn: { padding: "10px 18px", borderRadius: "20px", border: "1px solid #ff6a00", color: "#fff", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" },
  card: { background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "15px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" },
  btnGroup: { display: "flex", justifyContent: "space-between", marginTop: "12px" },
  callBtn: { padding: "8px 15px", background: "#ff6a00", color: "#fff", borderRadius: "20px", textDecoration: "none" },
  mapBtn: { padding: "8px 15px", background: "#1abc9c", color: "#fff", border: "none", borderRadius: "20px", cursor: "pointer" },
  sosBtn: { position: "fixed", bottom: "25px", right: "25px", background: "red", padding: "18px 22px", borderRadius: "50%", color: "#fff", fontWeight: "bold", boxShadow: "0 0 20px red", textDecoration: "none" }
};

export default Emergency;