import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useLanguage } from '../i18n/LanguageContext';

const ManageAdmins = () => {
  const { t } = useLanguage();
  const ma = t.manageAdmins;

  const [admins, setAdmins] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'Admin' });
  const navigate = useNavigate();

  useEffect(() => {
    checkSuperAdmin();
    fetchAdmins();
  }, []);

  const checkSuperAdmin = () => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) { alert(ma.loginRequired); navigate('/admin/login'); return; }
    const admin = JSON.parse(adminData);
    if (admin.role !== 'Super Admin') { alert(ma.accessDenied); navigate('/admin/dashboard'); }
  };

  const fetchAdmins = async () => {
    try {
      const response = await API.get('/admin/all-admins');
      if (response.data.success) setAdmins(response.data.admins);
    } catch (error) { console.error('Error fetching admins:', error); }
  };

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post('/admin/create-admin', formData);
      if (response.data.success) {
        alert(ma.createSuccess);
        setShowAddForm(false);
        setFormData({ name: '', email: '', password: '', phone: '', role: 'Admin' });
        fetchAdmins();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create admin');
    } finally { setLoading(false); }
  };

  const handleDeleteAdmin = async (adminId, adminEmail) => {
    if (!window.confirm(`${ma.deleteConfirm} ${adminEmail}?`)) return;
    try {
      const response = await API.delete(`/admin/delete-admin/${adminId}`);
      if (response.data.success) { alert(ma.deleteSuccess); fetchAdmins(); }
    } catch (error) { alert(error.response?.data?.message || 'Failed to delete admin'); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{ma.title}</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} style={styles.addButton}>
          {showAddForm ? ma.cancel : ma.addNewAdmin}
        </button>
      </div>

      {showAddForm && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>{ma.formTitle}</h2>
          <form onSubmit={handleAddAdmin}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>{ma.fullName}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} placeholder={ma.fullNamePlaceholder} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>{ma.email}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} placeholder={ma.emailPlaceholder} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>{ma.phone}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} placeholder={ma.phonePlaceholder} pattern="[0-9]{10}" required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>{ma.role}</label>
                <select name="role" value={formData.role} onChange={handleChange} style={styles.input} required>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>{ma.tempPassword}</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} placeholder={ma.tempPasswordPlaceholder} minLength="6" required />
                <small style={styles.helpText}>{ma.helpText}</small>
              </div>
            </div>
            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? ma.creating : ma.createBtn}
            </button>
          </form>
        </div>
      )}

      <div style={styles.listCard}>
        <h2 style={styles.listTitle}>{ma.allAdmins} ({admins.length})</h2>
        {admins.length === 0 ? (
          <p style={styles.emptyText}>{ma.noAdmins}</p>
        ) : (
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div style={{ flex: 2 }}>{ma.colName}</div>
              <div style={{ flex: 2 }}>{ma.colEmail}</div>
              <div style={{ flex: 1 }}>{ma.colPhone}</div>
              <div style={{ flex: 1 }}>{ma.colRole}</div>
              <div style={{ flex: 1 }}>{ma.colActions}</div>
            </div>
            {admins.map((admin) => (
              <div key={admin._id} style={styles.tableRow}>
                <div style={{ flex: 2, fontWeight: 'bold' }}>{admin.name}</div>
                <div style={{ flex: 2 }}>{admin.email}</div>
                <div style={{ flex: 1 }}>{admin.phone}</div>
                <div style={{ flex: 1 }}>
                  <span style={admin.role === 'Super Admin' ? styles.superAdminBadge : styles.adminBadge}>
                    {admin.role === 'Super Admin' ? '👑' : '🔑'} {admin.role}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  {admin.role !== 'Super Admin' ? (
                    <button onClick={() => handleDeleteAdmin(admin._id, admin.email)} style={styles.deleteButton}>{ma.deleteBtn}</button>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#999' }}>{ma.protected}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: 'calc(100vh - 61px)', background: 'linear-gradient(135deg, #434343 0%, #000000 100%)', padding: '40px 20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', maxWidth: '1200px', margin: '0 auto 30px' },
  title: { fontSize: '32px', fontWeight: 'bold', color: '#fff' },
  addButton: { padding: '12px 24px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  formCard: { background: 'white', borderRadius: '15px', padding: '30px', maxWidth: '1200px', margin: '0 auto 30px', boxShadow: '0 5px 20px rgba(0,0,0,0.3)' },
  formTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '25px', color: '#333' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '25px' },
  formGroup: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#555' },
  input: { padding: '12px', fontSize: '15px', border: '2px solid #e0e0e0', borderRadius: '8px', outline: 'none' },
  helpText: { fontSize: '12px', color: '#999', marginTop: '5px' },
  submitButton: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #434343 0%, #000000 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  listCard: { background: 'white', borderRadius: '15px', padding: '30px', maxWidth: '1200px', margin: '0 auto', boxShadow: '0 5px 20px rgba(0,0,0,0.3)' },
  listTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' },
  emptyText: { textAlign: 'center', color: '#999', fontSize: '16px', padding: '40px' },
  table: { display: 'flex', flexDirection: 'column', gap: '10px' },
  tableHeader: { display: 'flex', padding: '15px', background: '#f5f5f5', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', color: '#555' },
  tableRow: { display: 'flex', padding: '15px', background: '#fafafa', borderRadius: '8px', alignItems: 'center', fontSize: '14px' },
  superAdminBadge: { display: 'inline-block', padding: '4px 12px', background: '#ff9800', color: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  adminBadge: { display: 'inline-block', padding: '4px 12px', background: '#2196f3', color: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  deleteButton: { padding: '6px 12px', background: '#f44336', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }
};

export default ManageAdmins;