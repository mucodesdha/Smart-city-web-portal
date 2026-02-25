import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from './Register';
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Profile from "./Profile";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProfile from "./admin/AdminProfile";
import ManageAdmins from "./admin/ManageAdmins";
import ProtectedRoute from "./admin/ProtectedRoute";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";

// Navbar component extracted to access language context
function Navbar({ user, admin, handleLogout }) {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <nav style={navStyle}>
      <div style={navContainer}>
        {/* CENTERED LINKS */}
        <div style={centerMenu}>
          <Link to="/" style={linkStyle}>{t.nav.home}</Link>
          <Link to="/about" style={linkStyle}>{t.nav.about}</Link>
          {!user && !admin && (
            <>
              <Link to="/login" style={linkStyle}>{t.nav.citizenLogin}</Link>
              <Link to="/admin/login" style={adminLinkBtn}>{t.nav.adminAccess}</Link>
            </>
          )}
        </div>

        {/* RIGHT SIDE: LANGUAGE SWITCHER + PROFILE */}
        <div style={rightSection}>
          {/* Language Switcher */}
          <div style={langSwitcher}>
            {['English', 'Hindi', 'Marathi'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                style={{
                  ...langBtn,
                  background: language === lang ? '#667eea' : 'transparent',
                  color: language === lang ? '#fff' : '#aaa',
                  borderColor: language === lang ? '#667eea' : '#444',
                }}
              >
                {lang === 'English' ? 'EN' : lang === 'Hindi' ? 'हि' : 'म'}
              </button>
            ))}
          </div>

          {/* Profile + Logout */}
          {(user || admin) && (
            <>
              {admin?.role === "Super Admin" && (
                <Link to="/admin/manage-admins" style={superAdminBadge}>{t.nav.manage}</Link>
              )}
              <div style={profileWrapper}>
                <Link to={admin ? "/admin/profile" : "/profile"} style={avatarStyle}>
                  {(admin?.name || user?.name || "U").charAt(0).toUpperCase()}
                </Link>
                <button onClick={handleLogout} style={logoutBtn}>{t.nav.logout}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setAdmin(null);
    window.location.href = "/";
  };

  return (
    <LanguageProvider>
      <Router>
        <Navbar user={user} admin={admin} handleLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLoginSuccess={(u) => setUser(u)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/login" element={<AdminLogin onAdminLogin={(a) => setAdmin(a)} />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
          <Route path="/admin/manage-admins" element={<ProtectedRoute><ManageAdmins /></ProtectedRoute>} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

// --- CSS STYLES ---
const navStyle = {
  background: "#1a1a1a",
  padding: "10px 0",
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
};

const navContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
  position: "relative"
};

const centerMenu = {
  display: "flex",
  gap: "30px",
  alignItems: "center"
};

const rightSection = {
  position: "absolute",
  right: "20px",
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const profileWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const langSwitcher = {
  display: "flex",
  gap: "4px",
  alignItems: "center"
};

const langBtn = {
  padding: "4px 8px",
  borderRadius: "12px",
  border: "1px solid #444",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold",
  transition: "all 0.2s"
};

const linkStyle = { color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "15px" };

const adminLinkBtn = {
  color: "#aaa",
  textDecoration: "none",
  fontSize: "13px",
  border: "1px solid #444",
  padding: "5px 12px",
  borderRadius: "20px"
};

const avatarStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "18px",
  boxShadow: "0 0 10px rgba(118, 75, 162, 0.5)"
};

const logoutBtn = {
  background: "transparent",
  color: "#ff4d4d",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "bold"
};

const superAdminBadge = {
  color: "#ffcc00",
  fontSize: "12px",
  border: "1px solid #ffcc00",
  padding: "2px 8px",
  borderRadius: "10px",
  textDecoration: "none"
};

export default App;