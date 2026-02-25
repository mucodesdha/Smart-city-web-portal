import React, { useEffect } from "react";
import { useLanguage } from "./i18n/LanguageContext";

function About() {
  const { t } = useLanguage();
  const a = t.about;

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const handleScroll = () => {
      for (let el of revealElements) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}></div>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>{a.heroTitle}</h1>
        <p style={styles.heroSubtitle}>{a.heroSubtitle}</p>
      </section>

      {/* Mission Section */}
      <section className="reveal" style={{ ...styles.section, backgroundColor: "#111827" }}>
        <h2 style={styles.sectionHeading}>{a.mission.heading}</h2>
        <p style={styles.sectionText}>{a.mission.text}</p>
      </section>

      {/* Services Section */}
      <section className="reveal" style={{ ...styles.section, backgroundColor: "#1f2937" }}>
        <h2 style={styles.sectionHeading}>{a.services.heading}</h2>
        <div style={styles.cardContainer}>
          {a.services.items.map((service, index) => (
            <div key={index} style={styles.card} className="tilt">
              <h3 style={styles.cardTitle}>{service.title}</h3>
              <p style={styles.cardText}>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="reveal" style={{ ...styles.section, backgroundColor: "#111827" }}>
        <h2 style={styles.sectionHeading}>{a.benefits.heading}</h2>
        <ul style={styles.benefitsList}>
          {a.benefits.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Vision Section */}
      <section className="reveal" style={{ ...styles.section, backgroundColor: "#1f2937" }}>
        <h2 style={styles.sectionHeading}>{a.vision.heading}</h2>
        <p style={styles.sectionText}>{a.vision.text}</p>
      </section>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
    position: "relative",
    overflowX: "hidden",
    backgroundImage: "url('/images/city-light.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 0,
  },
  hero: {
    position: "relative",
    zIndex: 1,
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 20px",
    background: "linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #1c1c2e)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 15s ease infinite",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
    background: "linear-gradient(90deg, #ff6a00, #ee0979)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: { fontSize: "1.3rem", maxWidth: "800px", lineHeight: "1.6" },
  section: {
    position: "relative",
    zIndex: 1,
    padding: "60px 20px",
    textAlign: "center",
    opacity: 0,
    transform: "translateY(50px)",
    transition: "all 0.8s ease",
  },
  sectionHeading: {
    fontSize: "2rem",
    marginBottom: "30px",
    fontWeight: "700",
    background: "linear-gradient(90deg, #ff6a00, #ffdd59)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  sectionText: { fontSize: "1.1rem", maxWidth: "900px", margin: "0 auto", lineHeight: "1.6" },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
    marginTop: "40px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "25px",
    width: "250px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    perspective: "1000px",
  },
  cardTitle: { fontSize: "1.4rem", marginBottom: "10px", fontWeight: "600", color: "#ffdd59" },
  cardText: { fontSize: "1rem", lineHeight: "1.4" },
  benefitsList: {
    listStyle: "none",
    maxWidth: "700px",
    margin: "0 auto",
    padding: "0",
    fontSize: "1.1rem",
    lineHeight: "1.8",
    textAlign: "left",
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes gradientBG {
  0% {background-position:0% 50%;}
  50% {background-position:100% 50%;}
  100% {background-position:0% 50%;}
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
.tilt:hover {
  transform: perspective(600px) rotateX(5deg) rotateY(5deg) scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.7);
}`, styleSheet.cssRules.length);

export default About;