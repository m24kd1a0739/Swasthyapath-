import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Stethoscope, 
  Building2, 
  CalendarClock, 
  Milestone, 
  Share2, 
  FlaskConical, 
  Pill, 
  BellRing, 
  CheckSquare, 
  Calendar, 
  UserCircle,
  ShieldAlert,
  Activity,
  LogOut,
  Sparkles,
  Play
} from 'lucide-react';

export const Sidebar = () => {
  const { 
    currentPath, 
    navigateTo, 
    patientData, 
    isDemoMode,
    startDemoJourney,
    resetDemoData, 
    setDemoTourActive, 
    demoTourActive,
    setEmergencyModalOpen,
    userRole,
    setUserRole
  } = useApp();

  const fullName = patientData.profile?.fullName || 'Citizen';
  const abhaId = patientData.profile?.abhaId || '91-8472-9102-4821';
  
  // Compute initials
  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'SP';

  // Grouped Clean Patient Navigation (Requirements 18 & 19)
  const navSections = [
    {
      title: 'HOME',
      items: [
        { id: 'dashboard', path: '/home', label: 'Home', icon: Home }
      ]
    },
    {
      title: 'CARE',
      items: [
        { id: 'symptoms', path: '/health-problem', label: 'My Health Problem', icon: Stethoscope },
        { id: 'facilities', path: '/facilities', label: 'Find a Facility', icon: Building2 },
        { id: 'live-queue', path: '/queue', label: 'Appointments & Queue', icon: CalendarClock }
      ]
    },
    {
      title: 'MY HEALTH',
      items: [
        { id: 'journey', path: '/health-journey', label: 'Health Journey', icon: Milestone },
        { id: 'tests', path: '/tests-reports', label: 'Tests & Reports', icon: FlaskConical },
        { id: 'medicines', path: '/medicines', label: 'Medicines & Stock', icon: Pill },
        { id: 'medicine-reminders', path: '/medicine-reminder', label: 'Medicine Reminders', icon: BellRing },
        { id: 'care-plan', path: '/care-plan', label: 'My Care Plan', icon: CheckSquare },
        { id: 'follow-up', path: '/follow-up', label: 'Follow-up Review', icon: Calendar }
      ]
    },
    {
      title: 'CONTINUITY & SUPPORT',
      items: [
        { id: 'care-transfer', path: '/care-transfer', label: 'Care Transfer', icon: Share2, isNew: true },
        { id: 'alerts', path: '/notifications', label: 'Notifications', icon: BellRing },
        { id: 'account', path: '/account', label: 'Account & Family', icon: UserCircle }
      ]
    }
  ];

  return (
    <aside className="sidebar-container">
      
      {/* Patient Profile Card Header */}
      <div style={{ padding: '1.25rem 1.15rem 0.85rem', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-full)',
            background: isDemoMode ? 'linear-gradient(135deg, #0D9488, #0284C7)' : 'var(--primary-surface)',
            border: `2px solid ${isDemoMode ? '#0284C7' : 'var(--primary)'}`,
            color: isDemoMode ? 'white' : 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            flexShrink: 0
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {fullName}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              ABHA: {abhaId.slice(0, 10)}...
            </div>
          </div>
        </div>

        {/* Demo Mode or Account Status Pill */}
        <div style={{
          marginTop: '0.65rem',
          padding: '0.3rem 0.6rem',
          background: isDemoMode ? '#FEF08A' : 'var(--primary-surface)',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${isDemoMode ? '#FACC15' : 'var(--primary-border)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem'
        }}>
          <span style={{ color: isDemoMode ? '#854D0E' : 'var(--primary-text)', fontWeight: 700 }}>
            {isDemoMode ? 'Demo Journey Active' : 'National Health Grid'}
          </span>
          <span className={`badge ${isDemoMode ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>
            {isDemoMode ? 'Arun Kumar' : 'Verified ✓'}
          </span>
        </div>
      </div>

      {/* Navigation List (Streamlined for Patient) */}
      <div style={{ flex: 1, padding: '0.75rem 0.6rem', overflowY: 'auto' }}>
        {navSections.map(section => (
          <div key={section.title} style={{ marginBottom: '0.85rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', padding: '0 0.6rem 0.35rem', letterSpacing: '0.06em' }}>
              {section.title}
            </div>

            {section.items.map(item => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || 
                (item.id === 'dashboard' && currentPath === '/dashboard') || 
                (item.id === 'symptoms' && currentPath === '/symptoms') || 
                (item.id === 'live-queue' && (currentPath === '/live-queue' || currentPath === '/check-in')) || 
                (item.id === 'tests' && currentPath === '/tests') || 
                (item.id === 'alerts' && currentPath === '/alerts') ||
                (item.id === 'care-transfer' && currentPath === '/transfer-care');

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (userRole !== 'patient') setUserRole('patient');
                    navigateTo(item.path);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--primary-text)' : 'var(--text-main)',
                    backgroundColor: isActive ? 'var(--primary-surface)' : 'transparent',
                    border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                    marginBottom: '0.12rem',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left'
                  }}
                >
                  <Icon size={17} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.isNew && (
                    <span className="badge badge-primary" style={{ fontSize: '0.62rem', padding: '0.05rem 0.35rem' }}>
                      NEW
                    </span>
                  )}
                  {item.id === 'live-queue' && patientData.appointment?.tokenNumber && (
                    <span className="badge badge-warning" style={{ fontSize: '0.62rem', padding: '0.05rem 0.3rem' }}>
                      #{patientData.appointment.tokenNumber}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Persistent Bottom Controls: Emergency SOS & Staff Portal Access */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-light)', background: 'var(--bg-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        
        {/* Emergency SOS Button (Always separated & visible) */}
        <button 
          className="btn btn-danger"
          style={{ width: '100%', justifyContent: 'center', fontWeight: 800, padding: '0.55rem', boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)' }}
          onClick={() => setEmergencyModalOpen(true)}
        >
          <ShieldAlert size={16} />
          <span>Emergency SOS (108)</span>
        </button>

        {/* Discreet Staff Portal Switcher Link */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2rem 0.35rem', fontSize: '0.74rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Staff & Admin:</span>
          <button 
            type="button"
            className="btn-ghost btn-sm"
            style={{ color: 'var(--purple-text)', fontWeight: 700, padding: 0 }}
            onClick={() => {
              setUserRole('facility-staff');
              navigateTo('/facility-staff');
            }}
          >
            Open Staff Portal →
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
