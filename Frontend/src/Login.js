import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from './api';
import { useLanguage } from './i18n/LanguageContext';

const Login = ({ onLoginSuccess }) => {
  const { t } = useLanguage();
  const l = t.login;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if (onLoginSuccess) onLoginSuccess(res.data.user);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>{l.title}</h2>
        <p style={subtitleStyle}>{l.subtitle}</p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>{l.emailLabel}</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              style={inputStyle}
              placeholder={l.emailPlaceholder}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>{l.passwordLabel}</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              style={inputStyle}
              placeholder={l.passwordPlaceholder}
              required
            />
          </div>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? l.loggingIn : l.loginBtn}
          </button>
        </form>

        <div style={footerStyle}>
          <p>{l.noAccount} <Link to="/register" style={linkStyle}>{l.registerLink}</Link></p>
          <hr style={dividerStyle} />
          <div style={googleSectionStyle}>
            <p style={{ fontSize: '14px', color: '#666' }}>{l.orLogin}</p>
            <button
              onClick={() => window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/google`}
              style={googleButtonStyle}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: '18px', marginRight: '10px' }}
              />
              {l.googleBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', background: '#f4f7f6', padding: '20px' };
const cardStyle = { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const titleStyle = { textAlign: 'center', color: '#333', marginBottom: '10px', fontSize: '28px' };
const subtitleStyle = { textAlign: 'center', color: '#777', marginBottom: '30px', fontSize: '14px' };
const inputGroupStyle = { marginBottom: '20px' };
const labelStyle = { display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s' };
const errorStyle = { background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', fontSize: '14px' };
const footerStyle = { marginTop: '25px', textAlign: 'center', fontSize: '14px', color: '#666' };
const linkStyle = { color: '#764ba2', textDecoration: 'none', fontWeight: 'bold' };
const dividerStyle = { margin: '20px 0', border: '0', borderTop: '1px solid #eee' };
const googleSectionStyle = { marginTop: '10px' };
const googleButtonStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px', background: 'white', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', fontWeight: '500', color: '#444' };

export default Login;