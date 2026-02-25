import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './i18n/LanguageContext';

const Profile = () => {
  const { t } = useLanguage();
  const p = t.profile;

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ complaintsSubmitted: 0, emergencyReports: 0, feedbackGiven: 0, accountAge: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert(p.loginRequired);
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    const accountCreated = new Date(parsedUser.createdAt || Date.now());
    const daysSinceCreation = Math.floor((Date.now() - accountCreated) / (1000 * 60 * 60 * 24));
    setStats({ complaintsSubmitted: 0, emergencyReports: 0, feedbackGiven: 0, accountAge: daysSinceCreation || 0 });
  }, [navigate, p.loginRequired]);

  if (!user) return <div style={styles.loading}>{p.loading}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.avatarLarge}>{user.name?.charAt(0).toUpperCase()}</div>
          <div style={styles.headerInfo}>
            <h1 style={styles.name}>{user.name}</h1>
            <p style={styles.email}>{user.email}</p>
            <p style={styles.phone}>📱 {user.phone}</p>
            <p style={styles.language}>{p.preferredLanguage} {user.language || 'English'}</p>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsContainer}>
          <h2 style={styles.sectionTitle}>{p.activityOverview}</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}><div style={styles.statNumber}>{stats.complaintsSubmitted}</div><div style={styles.statLabel}>{p.complaintsSubmitted}</div></div>
            <div style={styles.statCard}><div style={styles.statNumber}>{stats.emergencyReports}</div><div style={styles.statLabel}>{p.emergencyReports}</div></div>
            <div style={styles.statCard}><div style={styles.statNumber}>{stats.feedbackGiven}</div><div style={styles.statLabel}>{p.feedbackGiven}</div></div>
            <div style={styles.statCard}><div style={styles.statNumber}>{stats.accountAge}</div><div style={styles.statLabel}>{p.daysActive}</div></div>
          </div>
        </div>

        {/* Account Info */}
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>{p.accountInfo}</h2>
          <div style={styles.infoGrid}>
            <div style={styles.infoRow}><span style={styles.infoLabel}>{p.userId}</span><span style={styles.infoValue}>{user._id || 'N/A'}</span></div>
            <div style={styles.infoRow}><span style={styles.infoLabel}>{p.accountType}</span><span style={styles.infoBadge}>{p.citizen}</span></div>
            <div style={styles.infoRow}><span style={styles.infoLabel}>{p.status}</span><span style={{ ...styles.infoBadge, background: '#4caf50' }}>{p.active}</span></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.actionsSection}>
          <h2 style={styles.sectionTitle}>{p.quickActions}</h2>
          <div style={styles.actionButtons}>
            <button style={styles.actionBtn} onClick={() => navigate('/')}>{p.goToDashboard}</button>
            <button style={styles.actionBtn} onClick={() => alert(p.featureComingSoon)}>{p.editProfile}</button>
            <button style={styles.actionBtn} onClick={() => alert(p.featureComingSoon)}>{p.changePassword}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: 'calc(100vh - 61px)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px', display: 'flex', justifyContent: 'center' },
  profileCard: { background: 'white', borderRadius: '15px', padding: '40px', maxWidth: '900px', width: '100%', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '30px', borderBottom: '2px solid #f0f0f0' },
  avatarLarge: { width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '48px', fontWeight: 'bold', marginRight: '30px', flexShrink: 0 },
  headerInfo: { flex: 1 },
  name: { fontSize: '32px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0' },
  email: { fontSize: '16px', color: '#666', margin: '5px 0' },
  phone: { fontSize: '16px', color: '#666', margin: '5px 0' },
  language: { fontSize: '14px', color: '#667eea', margin: '5px 0', fontWeight: '600' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '20px' },
  statsContainer: { marginBottom: '40px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  statCard: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '25px', borderRadius: '12px', textAlign: 'center', color: 'white' },
  statNumber: { fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' },
  statLabel: { fontSize: '14px', opacity: 0.9 },
  infoSection: { marginBottom: '40px' },
  infoGrid: { display: 'flex', flexDirection: 'column', gap: '15px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' },
  infoLabel: { fontWeight: '600', color: '#555' },
  infoValue: { color: '#333', fontFamily: 'monospace', fontSize: '14px' },
  infoBadge: { background: '#667eea', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' },
  actionsSection: { marginTop: '30px' },
  actionButtons: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  actionBtn: { padding: '12px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s', flex: '1 1 200px' },
  loading: { minHeight: 'calc(100vh - 61px)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', color: '#667eea' }
};

export default Profile;