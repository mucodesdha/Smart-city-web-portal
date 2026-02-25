import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import '../App.css';
import { useLanguage } from '../i18n/LanguageContext';

const AdminLogin = ({ onAdminLogin }) => {
  const { t } = useLanguage();
  const al = t.adminLogin;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post('/auth/admin/login', formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
        if (onAdminLogin) onAdminLogin(response.data.admin);
        alert(al.loginSuccess);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Admin login error:', error.response?.data);
      alert(error.response?.data?.message || 'Admin login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ background: 'linear-gradient(135deg, #434343 0%, #000000 100%)' }}>
      <div className="login-container">
        <div style={styles.adminBadge}>
          <span style={styles.crownIcon}>👑</span> {al.badge}
        </div>
        <h2>{al.title}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{al.emailLabel}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={al.emailPlaceholder} required />
          </div>
          <div className="form-group">
            <label>{al.passwordLabel}</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={al.passwordPlaceholder} required />
          </div>
          <button type="submit" className="login-btn" disabled={loading} style={{ background: 'linear-gradient(135deg, #434343 0%, #000000 100%)' }}>
            {loading ? al.loggingIn : al.loginBtn}
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/login">{al.backToCitizen}</Link>
        </p>

        <div style={styles.securityFooter}>
          <p style={styles.securityText}>{al.securityNote}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  adminBadge: { background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', color: 'white', padding: '10px 20px', borderRadius: '25px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  crownIcon: { fontSize: '18px' },
  securityFooter: { marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #f0f0f0' },
  securityText: { color: '#999', fontSize: '11px', textAlign: 'center', lineHeight: '1.5' }
};

export default AdminLogin;