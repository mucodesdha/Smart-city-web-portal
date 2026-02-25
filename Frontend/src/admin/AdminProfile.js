import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolvedComplaints: 0,
    pendingComplaints: 0,
    totalUsers: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Get admin data from localStorage
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      alert('Please login as admin to view this page');
      navigate('/admin/login');
      return;
    }
    
    const parsedAdmin = JSON.parse(adminData);
    setAdmin(parsedAdmin);

    // Mock stats - you can replace this with actual API calls
    setStats({
      totalComplaints: 0,
      resolvedComplaints: 0,
      pendingComplaints: 0,
      totalUsers: 0
    });
  }, [navigate]);

  if (!admin) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.avatarLarge}>
            {admin.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div style={styles.headerInfo}>
            <div style={styles.adminBadge}>👑 KDMC Administrator</div>
            <h1 style={styles.name}>{admin.name || 'Admin'}</h1>
            <p style={styles.email}>{admin.email || 'admin@kdmc.gov'}</p>
            <p style={styles.role}>🛡️ Role: {admin.role || 'Super Admin'}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.statsContainer}>
          <h2 style={styles.sectionTitle}>📊 System Overview</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.totalComplaints}</div>
              <div style={styles.statLabel}>Total Complaints</div>
            </div>
            <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)' }}>
              <div style={styles.statNumber}>{stats.resolvedComplaints}</div>
              <div style={styles.statLabel}>Resolved</div>
            </div>
            <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)' }}>
              <div style={styles.statNumber}>{stats.pendingComplaints}</div>
              <div style={styles.statLabel}>Pending</div>
            </div>
            <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)' }}>
              <div style={styles.statNumber}>{stats.totalUsers}</div>
              <div style={styles.statLabel}>Registered Users</div>
            </div>
          </div>
        </div>

        {/* Account Info Section */}
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>🔐 Admin Account Information</h2>
          <div style={styles.infoGrid}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Admin ID:</span>
              <span style={styles.infoValue}>{admin._id || 'N/A'}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Access Level:</span>
              <span style={{ ...styles.infoBadge, background: '#ff9800' }}>👑 Administrator</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Status:</span>
              <span style={{ ...styles.infoBadge, background: '#4caf50' }}>✓ Active</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Department:</span>
              <span style={styles.infoValue}>KDMC - Kalyan Dombivli Municipal Corporation</span>
            </div>
          </div>
        </div>

        {/* Admin Permissions */}
        <div style={styles.permissionsSection}>
          <h2 style={styles.sectionTitle}>✅ Admin Permissions</h2>
          <div style={styles.permissionsGrid}>
            <div style={styles.permissionItem}>✓ Manage Complaints</div>
            <div style={styles.permissionItem}>✓ View User Data</div>
            <div style={styles.permissionItem}>✓ Send Notifications</div>
            <div style={styles.permissionItem}>✓ Generate Reports</div>
            <div style={styles.permissionItem}>✓ Emergency Response</div>
            <div style={styles.permissionItem}>✓ System Configuration</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.actionsSection}>
          <h2 style={styles.sectionTitle}>⚡ Quick Actions</h2>
          <div style={styles.actionButtons}>
            <button style={styles.actionBtn} onClick={() => navigate('/admin/dashboard')}>
              🏠 Go to Dashboard
            </button>
            <button style={styles.actionBtn} onClick={() => alert('Feature coming soon!')}>
              👥 Manage Users
            </button>
            <button style={styles.actionBtn} onClick={() => alert('Feature coming soon!')}>
              📊 View Reports
            </button>
            <button style={styles.actionBtn} onClick={() => alert('Feature coming soon!')}>
              🔒 Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 61px)',
    background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center'
  },
  profileCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '40px',
    maxWidth: '900px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '30px',
    borderBottom: '2px solid #f0f0f0'
  },
  avatarLarge: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '48px',
    fontWeight: 'bold',
    marginRight: '30px',
    flexShrink: 0,
    border: '4px solid #ff9800'
  },
  headerInfo: {
    flex: 1
  },
  adminBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    color: 'white',
    padding: '6px 15px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  name: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0 10px 0'
  },
  email: {
    fontSize: '16px',
    color: '#666',
    margin: '5px 0'
  },
  role: {
    fontSize: '14px',
    color: '#ff9800',
    margin: '5px 0',
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px'
  },
  statsContainer: {
    marginBottom: '40px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  statCard: {
    background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    padding: '25px',
    borderRadius: '12px',
    textAlign: 'center',
    color: 'white'
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.9
  },
  infoSection: {
    marginBottom: '40px'
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  infoLabel: {
    fontWeight: '600',
    color: '#555'
  },
  infoValue: {
    color: '#333',
    fontSize: '14px'
  },
  infoBadge: {
    background: '#434343',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold'
  },
  permissionsSection: {
    marginBottom: '40px'
  },
  permissionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  permissionItem: {
    background: '#e8f5e9',
    padding: '12px 15px',
    borderRadius: '8px',
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: '14px'
  },
  actionsSection: {
    marginTop: '30px'
  },
  actionButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  actionBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  loading: {
    minHeight: 'calc(100vh - 61px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    color: '#ff9800'
  }
};

export default AdminProfile;