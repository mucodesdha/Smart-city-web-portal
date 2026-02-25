import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AdminLogin = ({ onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/admin/login', { email, password });
      if (res.data.success) {
        // Save to localStorage
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data.admin));
        
        // Update App State immediately
        onAdminLogin(res.data.admin);
        
        // Redirect
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Admin Login Failed');
    }
  };

  return (
    <div style={adminContainer}>
      <div style={adminCard}>
        <div style={headerSection}>
          <h1 style={{ margin: 0 }}>KDMC</h1>
          <p style={{ color: '#888', fontSize: '14px' }}>Administrative Portal</p>
        </div>
        
        <h2 style={{ color: '#fff', marginBottom: '20px', fontWeight: '300' }}>Staff Secure Login</h2>
        
        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroup}>
            <label style={labelStyle}>Staff Email</label>
            <input 
              type="email" 
              style={inputStyle} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              style={inputStyle} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" style={adminBtn}>Verify & Enter</button>
        </form>
        
        <p style={{ color: '#555', fontSize: '12px', marginTop: '20px' }}>
          Authorized personnel only. All login attempts are logged.
        </p>
      </div>
    </div>
  );
};

// DISTINCT ADMIN STYLES
const adminContainer = {
  height: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#0f0f0f' // Dark Professional background
};

const adminCard = {
  background: '#1a1a1a',
  padding: '40px',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  border: '1px solid #333',
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
};

const headerSection = { marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' };
const inputGroup = { textAlign: 'left', marginBottom: '15px' };
const labelStyle = { display: 'block', color: '#aaa', fontSize: '12px', marginBottom: '5px', textTransform: 'uppercase' };
const inputStyle = { width: '100%', padding: '12px', background: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff', boxSizing: 'border-box' };
const adminBtn = { width: '100%', padding: '12px', background: '#fff', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const errorBox = { background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' };

export default AdminLogin;