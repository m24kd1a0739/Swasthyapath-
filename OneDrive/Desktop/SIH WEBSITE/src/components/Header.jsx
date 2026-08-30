import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  MapPin, 
  Bell, 
  Globe, 
  AlertTriangle, 
  User, 
  Sun, 
  Moon, 
  Type, 
  Volume2, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

export const Header = () => {
  const { 
    t, 
    language, 
    setLanguage, 
    userRole, 
    setUserRole, 
    highContrast, 
    setHighContrast, 
    fontSize, 
    setFontSize, 
    networkStatus, 
    setNetworkStatus, 
    setEmergencyModalOpen, 
    patientData, 
    navigateTo, 
    currentScreen,
    speakText,
    addToast
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const unreadAlertsCount = patientData.alerts?.filter(a => !a.read).length || 0;

  const cycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  const toggleNetwork = () => {
    if (networkStatus === 'online') {
      setNetworkStatus('offline');
      addToast('Offline Mode Active', 'You are working offline. Changes will sync locally.', 'warning');
    } else if (networkStatus === 'offline') {
      setNetworkStatus('syncing');
      addToast('Syncing Changes...', 'Uploading offline records to the state health grid.', 'info');
      setTimeout(() => {
        setNetworkStatus('online');
        addToast('Synced Successfully', 'All local health records are now synchronized.', 'success');
      }, 1500);
    }
  };

  return (
    <header className="header-container">
      {/* Brand / Logo */}
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        onClick={() => navigateTo('dashboard')}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, var(--primary), #0284C7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <HeartHandshake size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {t.brandName}
            </span>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>Govt / SIH</span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1 }}>{t.tagline}</p>
        </div>
      </div>

      {/* Location Badge (Desktop) */}
      <div className="desktop-only" style={{ alignItems: 'center', gap: '0.4rem', background: 'var(--bg-surface)', padding: '0.35rem 0.8rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
        <MapPin size={15} color="var(--primary)" />
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>{t.locationDefault}</span>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        
        {/* Network Status Toggle (Offline Simulation) */}
        <button 
          className="btn btn-ghost btn-sm"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.35rem', 
            fontSize: '0.78rem',
            padding: '0.35rem 0.65rem',
            background: networkStatus === 'offline' ? 'var(--warning-surface)' : 'transparent',
            border: networkStatus === 'offline' ? '1px solid var(--warning-border)' : '1px solid transparent',
            color: networkStatus === 'offline' ? 'var(--warning-text)' : 'var(--text-muted)'
          }}
          onClick={toggleNetwork}
          title="Toggle Online / Offline Network Simulation"
        >
          {networkStatus === 'online' && <><Wifi size={15} color="var(--success)" /> <span className="desktop-only">Online</span></>}
          {networkStatus === 'syncing' && <><RefreshCw size={15} className="animate-spin" color="var(--primary)" /> <span className="desktop-only">Syncing...</span></>}
          {networkStatus === 'offline' && <><WifiOff size={15} color="var(--warning)" /> <span>Offline Mode</span></>}
        </button>

        {/* Accessibility: High Contrast */}
        <button 
          className="btn-icon" 
          onClick={() => setHighContrast(!highContrast)} 
          title={highContrast ? "Normal Contrast" : "High Contrast Mode"}
          style={{ background: highContrast ? 'var(--dark-navy)' : 'var(--bg-surface)', color: highContrast ? 'white' : 'var(--text-main)' }}
        >
          {highContrast ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Accessibility: Font Size */}
        <button 
          className="btn-icon" 
          onClick={cycleFontSize} 
          title={`Font Size: ${fontSize}`}
          style={{ background: 'var(--bg-surface)' }}
        >
          <Type size={18} />
        </button>

        {/* Accessibility: Read Aloud */}
        <button 
          className="btn-icon desktop-only" 
          onClick={() => speakText("SwasthyaPath public healthcare navigation. Hello Arun. Your next recommended step is taking Paracetamol at 2 PM, followed by review on September 4.")} 
          title="Read Aloud Screen Summary"
          style={{ background: 'var(--bg-surface)' }}
        >
          <Volume2 size={18} />
        </button>

        {/* Language Selector */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem 0.75rem', gap: '0.35rem' }}
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            <Globe size={15} />
            <span style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.75rem' }}>{language}</span>
            <ChevronDown size={13} />
          </button>

          {langDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              minWidth: '130px',
              zIndex: 200,
              overflow: 'hidden'
            }}>
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी (Hindi)' },
                { code: 'te', label: 'తెలుగు (Telugu)' },
                { code: 'ta', label: 'தமிழ் (Tamil)' },
                { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
              ].map(lang => (
                <div 
                  key={lang.code}
                  style={{
                    padding: '0.55rem 0.9rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    background: language === lang.code ? 'var(--primary-surface)' : 'transparent',
                    color: language === lang.code ? 'var(--primary-text)' : 'var(--text-main)',
                    fontWeight: language === lang.code ? 700 : 500
                  }}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangDropdownOpen(false);
                    addToast('Language Updated', `SwasthyaPath is now displayed in ${lang.label}`, 'info');
                  }}
                >
                  {lang.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Role Switcher */}
        <div style={{ position: 'relative' }} className="desktop-only">
          <button 
            className="btn btn-secondary btn-sm"
            style={{ 
              padding: '0.4rem 0.75rem', 
              gap: '0.35rem',
              borderColor: userRole !== 'patient' ? 'var(--purple-border)' : 'var(--border-light)',
              background: userRole !== 'patient' ? 'var(--purple-surface)' : 'var(--bg-card)',
              color: userRole !== 'patient' ? 'var(--purple-text)' : 'var(--text-main)'
            }}
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
          >
            <User size={15} />
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>
              {userRole === 'patient' && 'Patient: Arun'}
              {userRole === 'health-worker' && 'ASHA Worker'}
              {userRole === 'facility-staff' && 'OPD Staff'}
              {userRole === 'admin' && 'District Admin'}
            </span>
            <ChevronDown size={13} />
          </button>

          {roleDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              minWidth: '200px',
              zIndex: 200,
              overflow: 'hidden'
            }}>
              <div style={{ padding: '0.5rem 0.8rem', background: 'var(--bg-surface)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Select System Role
              </div>
              {[
                { role: 'patient', label: 'Patient (Arun Kumar)', target: 'dashboard' },
                { role: 'health-worker', label: 'ASHA / Health Worker', target: 'health-worker' },
                { role: 'facility-staff', label: 'Hospital / OPD Staff', target: 'facility-staff' },
                { role: 'admin', label: 'District Admin Officer', target: 'admin' }
              ].map(r => (
                <div 
                  key={r.role}
                  style={{
                    padding: '0.65rem 0.9rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    background: userRole === r.role ? 'var(--primary-surface)' : 'transparent',
                    color: userRole === r.role ? 'var(--primary-text)' : 'var(--text-main)',
                    fontWeight: userRole === r.role ? 700 : 500
                  }}
                  onClick={() => {
                    setUserRole(r.role);
                    setRoleDropdownOpen(false);
                    navigateTo(r.target);
                    addToast('Role Switched', `Switched view to ${r.label}`, 'info');
                  }}
                >
                  {r.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <button 
          className="btn-icon" 
          style={{ position: 'relative', background: 'var(--bg-surface)' }}
          onClick={() => navigateTo('alerts')}
          title="Smart Health Alerts"
        >
          <Bell size={18} />
          {unreadAlertsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '18px',
              height: '18px',
              background: 'var(--danger)',
              color: 'white',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.68rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-card)'
            }}>
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Persistent Emergency SOS Button */}
        <button 
          className="btn btn-danger btn-sm"
          style={{ 
            fontWeight: 800, 
            letterSpacing: '0.02em',
            padding: '0.45rem 0.9rem',
            boxShadow: '0 2px 6px rgba(239, 68, 68, 0.35)'
          }}
          onClick={() => setEmergencyModalOpen(true)}
        >
          <ShieldAlert size={16} />
          <span>{t.emergency}</span>
        </button>
      </div>
    </header>
  );
};
