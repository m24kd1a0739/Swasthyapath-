import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCircle, 
  Users, 
  Globe, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Type, 
  Volume2, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  LogOut, 
  ArrowLeft, 
  Plus, 
  Check, 
  HelpCircle, 
  Info,
  Lock
} from 'lucide-react';

export const AccountPage = () => {
  const { 
    patientData, 
    setPatientData, 
    language, 
    setLanguage, 
    highContrast, 
    setHighContrast, 
    fontSize, 
    setFontSize, 
    networkStatus, 
    setNetworkStatus, 
    logoutUser, 
    navigateTo, 
    addToast 
  } = useApp();

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [addCaregiverModal, setAddCaregiverModal] = useState(false);

  const [caregiverForm, setCaregiverForm] = useState({
    name: 'Sunita Kumar',
    relation: 'Spouse',
    phone: '+91 98765 43211',
    shareAppt: true,
    shareEmergency: true,
    shareUpdates: true
  });

  const handleLogout = () => {
    setLogoutModalOpen(false);
    logoutUser();
  };

  const handleSaveCaregiver = (e) => {
    e.preventDefault();
    setPatientData(prev => ({
      ...prev,
      caregiver: {
        name: caregiverForm.name,
        relation: caregiverForm.relation,
        phone: caregiverForm.phone,
        activePermissions: [
          caregiverForm.shareEmergency ? 'Emergency SOS' : null,
          caregiverForm.shareAppt ? 'Appointments' : null,
          caregiverForm.shareUpdates ? 'Care Updates' : null
        ].filter(Boolean)
      }
    }));
    setAddCaregiverModal(false);
    addToast('Caregiver Configured', `${caregiverForm.name} added with selective permissions.`, 'success');
  };

  const fullName = patientData.profile?.fullName || 'Citizen';
  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'SP';

  return (
    <div className="animate-fade-in" style={{ maxWidth: '850px', margin: '0 auto' }}>
      
      {/* Back button */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1rem', paddingLeft: 0 }}
        onClick={() => navigateTo('dashboard')}
      >
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </button>

      <div className="card" style={{ padding: '2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.4rem'
          }}>
            {initials}
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {fullName}
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ABHA ID: <strong>{patientData.profile.abhaId}</strong> • Mobile: <strong>{patientData.profile.mobile || '+91 98765 43210'}</strong>
            </p>
          </div>
        </div>

        {/* Section 1: Personal Details */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.85rem' }}>
            1. Personal Demographics & ABHA Identity
          </h3>

          <div className="grid-2" style={{ fontSize: '0.88rem' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Date of Birth: </span>
              <strong>{patientData.profile.dob || '1994-06-14'} (Age {patientData.profile.age || 32})</strong>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Gender: </span>
              <strong>{patientData.profile.gender || 'Male'}</strong>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Registered Location: </span>
              <strong>{patientData.profile.location}</strong>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
              <span style={{ color: 'var(--text-muted)' }}>National Health Grid Status: </span>
              <strong style={{ color: 'var(--success)' }}>Verified Active ✓</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Family & Caregiver Support */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                2. Family / Caregiver Support & Permissions
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Granular sharing: Medical records are private by default unless explicitly permitted.
              </p>
            </div>

            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setAddCaregiverModal(true)}
            >
              <Plus size={14} />
              <span>Edit Caregiver</span>
            </button>
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem' }}>
                  {patientData.caregiver?.name || 'Sunita Kumar'} ({patientData.caregiver?.relation || 'Spouse'})
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Phone: {patientData.caregiver?.phone || '+91 98765 43211'}
                </div>
              </div>
              <span className="badge badge-success">Active Contact</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.6rem', marginTop: '0.6rem' }}>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                Active Sharing Permissions:
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {patientData.caregiver?.activePermissions?.map((perm, idx) => (
                  <span key={idx} className="badge badge-primary">
                    <Check size={11} />
                    <span>{perm}</span>
                  </span>
                )) || <span className="badge badge-neutral">Emergency Info Only</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Language & Accessibility Settings */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.85rem' }}>
            3. Language & Accessibility Preferences
          </h3>

          <div className="grid-2">
            {/* Language Picker */}
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <label className="form-label">Application Language</label>
              <select 
                className="form-select"
                value={language}
                onChange={e => {
                  setLanguage(e.target.value);
                  addToast('Language Updated', 'SwasthyaPath language changed.', 'info');
                }}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>

            {/* Accessibility Quick Toggles */}
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="form-label">Accessibility Enhancements</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className={`btn btn-sm ${highContrast ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setHighContrast(!highContrast)}
                >
                  <Moon size={14} />
                  <span>High Contrast: {highContrast ? 'ON' : 'OFF'}</span>
                </button>

                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    if (fontSize === 'normal') setFontSize('large');
                    else if (fontSize === 'large') setFontSize('xlarge');
                    else setFontSize('normal');
                  }}
                >
                  <Type size={14} />
                  <span>Font: {fontSize}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Logout Button */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>Sign Out of SwasthyaPath</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Safely clear active session on this device.</div>
          </div>

          <button 
            className="btn btn-danger-outline btn-lg"
            onClick={() => setLogoutModalOpen(true)}
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>

      </div>

      {/* Logout Confirmation Modal */}
      {logoutModalOpen && (
        <div className="modal-overlay" onClick={() => setLogoutModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '420px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div className="modal-body" style={{ padding: '2rem 1.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--danger-surface)',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <LogOut size={28} />
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Are you sure you want to log out?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Your journey and digital records remain safely encrypted under your ABHA account.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setLogoutModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Caregiver Modal */}
      {addCaregiverModal && (
        <div className="modal-overlay" onClick={() => setAddCaregiverModal(false)}>
          <div className="modal-container" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Configure Caregiver Permissions</h3>
              <button className="btn-icon" onClick={() => setAddCaregiverModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveCaregiver}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Caregiver Full Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={caregiverForm.name}
                    onChange={e => setCaregiverForm({ ...caregiverForm, name: e.target.value })}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Relationship</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={caregiverForm.relation}
                      onChange={e => setCaregiverForm({ ...caregiverForm, relation: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Phone</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={caregiverForm.phone}
                      onChange={e => setCaregiverForm({ ...caregiverForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }}>
                  <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Granular Information Permissions</label>
                  
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', marginBottom: '0.4rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={caregiverForm.shareAppt}
                      onChange={e => setCaregiverForm({ ...caregiverForm, shareAppt: e.target.checked })}
                    />
                    <span>Share OPD Appointments & Queue Position</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', marginBottom: '0.4rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={caregiverForm.shareEmergency}
                      onChange={e => setCaregiverForm({ ...caregiverForm, shareEmergency: e.target.checked })}
                    />
                    <span>Share Emergency SOS & GPS Broadcasts</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={caregiverForm.shareUpdates}
                      onChange={e => setCaregiverForm({ ...caregiverForm, shareUpdates: e.target.checked })}
                    />
                    <span>Share Care Plan & Follow-up Reminders</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddCaregiverModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Permissions</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
