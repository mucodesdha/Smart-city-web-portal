import React, { useState, useEffect } from "react";
import { useLanguage } from "./i18n/LanguageContext";

function Feedback() {
  const { t } = useLanguage();
  const f = t.feedback;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("smartCityFeedback")) || [];
    setFeedbackList(storedData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert(f.fillAllFields);
      return;
    }
    const newFeedback = { name, email, message, date: new Date().toLocaleString() };
    const updatedList = [newFeedback, ...feedbackList];
    localStorage.setItem("smartCityFeedback", JSON.stringify(updatedList));
    setFeedbackList(updatedList);
    setName(""); setEmail(""); setMessage("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>{f.title}</h2>
        <p>{f.subtitle}</p>
      </div>

      {success && <div style={styles.successBox}>{f.successMsg}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder={f.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} type="email" placeholder={f.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} />
        <textarea style={styles.textarea} placeholder={f.messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} />
        <button style={styles.submitBtn}>{f.submitBtn}</button>
      </form>

      {feedbackList.length > 0 && (
        <div style={styles.historySection}>
          <h3>{f.recentFeedbacks}</h3>
          {feedbackList.map((item, index) => (
            <div key={index} style={styles.card}>
              <h4>{item.name}</h4>
              <p>{item.message}</p>
              <span style={styles.date}>{item.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "25px", background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", minHeight: "100vh", color: "#fff", fontFamily: "Segoe UI" },
  header: { textAlign: "center", marginBottom: "20px" },
  successBox: { background: "#00cec9", color: "#000", padding: "12px", borderRadius: "10px", textAlign: "center", fontWeight: "bold", marginBottom: "15px" },
  form: { maxWidth: "600px", margin: "auto", background: "rgba(255,255,255,0.1)", padding: "25px", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" },
  input: { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "none", fontSize: "15px" },
  textarea: { width: "100%", padding: "12px", height: "110px", borderRadius: "8px", border: "none", fontSize: "15px", resize: "none", marginBottom: "15px" },
  submitBtn: { width: "100%", padding: "12px", background: "#ff6a00", border: "none", borderRadius: "8px", color: "#fff", fontWeight: "bold", fontSize: "16px", cursor: "pointer" },
  historySection: { maxWidth: "700px", margin: "30px auto" },
  card: { background: "rgba(255,255,255,0.1)", padding: "15px", borderRadius: "12px", marginBottom: "12px" },
  date: { fontSize: "12px", opacity: "0.7" }
};

export default Feedback;