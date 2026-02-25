import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from './api';
import './App.css';
import { useLanguage } from './i18n/LanguageContext';

const Register = () => {
  const { t } = useLanguage();
  const r = t.register;

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', language: 'English'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post('/auth/register', formData);
      if (response.data.success) {
        alert(r.successMsg);
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      alert(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <h2>{r.title}</h2>

        <div style={styles.socialSection}>
          <p style={styles.socialText}>{r.signUpWith}</p>
          <button onClick={handleGoogleLogin} style={styles.googleBtn}>
            <span style={styles.googleIcon}>G</span>
            {r.googleBtn}
          </button>
          <div style={styles.divider}>
            <hr style={styles.dividerLine} />
            <span style={styles.dividerText}>{r.or}</span>
            <hr style={styles.dividerLine} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{r.fullName}</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={r.fullNamePlaceholder} required />
          </div>
          <div className="form-group">
            <label>{r.email}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={r.emailPlaceholder} required />
          </div>
          <div className="form-group">
            <label>{r.phone}</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={r.phonePlaceholder} pattern="[0-9]{10}" required />
          </div>
          <div className="form-group">
            <label>{r.password}</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={r.passwordPlaceholder} minLength="6" required />
          </div>
          <div className="form-group">
            <label>{r.language}</label>
            <select name="language" value={formData.language} onChange={handleChange}>
              <option value="English">English</option>
              <option value="Marathi">Marathi</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? r.registering : r.registerBtn}
          </button>
        </form>

        <p className="auth-footer">
          {r.alreadyHaveAccount} <Link to="/login">{r.loginLink}</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  socialSection: { marginBottom: '25px' },
  socialText: { textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '15px' },
  googleBtn: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.3s', gap: '10px' },
  googleIcon: { width: '24px', height: '24px', background: '#4285f4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px' },
  divider: { display: 'flex', alignItems: 'center', margin: '25px 0', gap: '10px' },
  dividerLine: { flex: 1, border: 'none', borderTop: '1px solid #e0e0e0' },
  dividerText: { color: '#999', fontSize: '13px', padding: '0 10px' }
};

export default Register;