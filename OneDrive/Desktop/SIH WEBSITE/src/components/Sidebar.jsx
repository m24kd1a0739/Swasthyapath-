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
  RotateCcw,
  Sparkles,
  Users,
  ShieldAlert,
  Activity
} from 'lucide-react';

export const Sidebar = () => {
  const { 
    currentScreen, 
    navigateTo, 
    patientData, 
    resetDemoData, 
    setDemoTourActive, 
    demoTourActive,
    setEmergencyModalOpen,
    userRole,
    setUserRole
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: Home },
    { id: 'symptoms', label: 'Health Problem / Triage', icon: Stethoscope },
    { id: 'facilities', label: 'Government Facilities', icon: Building2 },
    { id: 'live-queue', label: 'Appointment & Queue', icon: CalendarClock },
    { id: 'consultation', label: 'Doctor Consultation', icon: Activity },
    { id: 'tests', label: 'Tests & Lab Reports', icon: FlaskConical },
    { id: 'medicines', label: 'Medicine Availability', icon: Pill },
    { id: 'medicine-reminders', label: 'Medicine Reminder', icon: BellRing },
    { id: 'care-plan', label: 'My Care Plan', icon: CheckSquare },
    { id: 'referrals', label: 'Referral Tracking', icon: Share2 },
    { id: 'follow-up', label: 'Follow-up Management', icon: Calendar },
    { id: 'journey', label: 'My Health Journey', icon: Milestone },
    { id: 'alerts', label: 'Smart Health Alerts', icon: BellRing },
    { id: 'account', label: 'Account & Caregiver', icon: UserCircle }
  ];

  return (
    <aside className="sidebar-container">
      {/* Patient Profile Card Header */}
      <div style={{ padding: '1.25rem 1.25rem 0.75rem', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-surface)',
            border: '2px solid var(--primary)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.05rem'
          }}>
            AK
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {patientData.profile.fullName}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              ABHA: {patientData.profile.abhaId.slice(0, 10)}...
            </div>
          </div>
        </div>

        {/* Current Active Status Pill */}
        <div style={{
          marginTop: '0.75rem',
          padding: '0.35rem 0.65rem',
          background: 'var(--primary-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--primary-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem'
        }}>
          <span style={{ color: 'var(--primary-text)', fontWeight: 600 }}>Active Care:</span>
          <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>OPD / Lab Stage</span>
        </div>
      </div>

      {/* Navigation List */}
      <div style={{ flex: 1, padding: '0.75rem 0.6rem', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', padding: '0 0.6rem 0.4rem', letterSpacing: '0.05em' }}>
          Patient Navigation
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (userRole !== 'patient') setUserRole('patient');
                navigateTo(item.id);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.86rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--primary-text)' : 'var(--text-main)',
                backgroundColor: isActive ? 'var(--primary-surface)' : 'transparent',
                border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                marginBottom: '0.15rem',
                transition: 'all var(--transition-fast)',
                textAlign: 'left'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.id === 'live-queue' && (
                <span className="badge badge-warning" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
                  #{patientData.appointment?.tokenNumber || '08'}
                </span>
              )}
              {item.id === 'medicine-reminders' && (
                <span className="badge badge-danger" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
                  Due 2PM
                </span>
              )}
            </button>
          );
        })}

        {/* Administration / Staff Quick Links */}
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', padding: '0.8rem 0.6rem 0.4rem', letterSpacing: '0.05em' }}>
          Healthcare Staff Roles
        </div>

        {[
          { id: 'health-worker', label: 'ASHA Health Worker', role: 'health-worker', icon: Users },
          { id: 'facility-staff', label: 'Hospital OPD & Lab Staff', role: 'facility-staff', icon: Building2 },
          { id: 'admin', label: 'District Admin Officer', role: 'admin', icon: Activity }
        ].map(roleItem => {
          const Icon = roleItem.icon;
          const isActive = currentScreen === roleItem.id;
          return (
            <button
              key={roleItem.id}
              onClick={() => {
                setUserRole(roleItem.role);
                navigateTo(roleItem.id);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--purple-text)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--purple-surface)' : 'transparent',
                border: isActive ? '1px solid var(--purple-border)' : '1px solid transparent',
                marginBottom: '0.15rem'
              }}
            >
              <Icon size={16} />
              <span>{roleItem.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer Controls */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-light)', background: 'var(--bg-subtle)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <button 
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
          onClick={() => {
            setDemoTourActive(!demoTourActive);
          }}
        >
          <Sparkles size={14} color="var(--primary)" />
          <span>{demoTourActive ? 'Hide SIH Tour' : 'SIH Demo Presentation'}</span>
        </button>

        <button 
          className="btn btn-ghost btn-sm"
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)' }}
          onClick={resetDemoData}
          title="Reset Arun Kumar demo journey to start"
        >
          <RotateCcw size={13} />
          <span>Reset Arun Demo State</span>
        </button>
      </div>
    </aside>
  );
};
