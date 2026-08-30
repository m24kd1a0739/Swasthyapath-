import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Milestone, CalendarClock, Bell, User, ShieldAlert } from 'lucide-react';

export const BottomNav = () => {
  const { currentScreen, navigateTo, setEmergencyModalOpen, patientData } = useApp();
  const unreadCount = patientData.alerts?.filter(a => !a.read).length || 0;

  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'journey', label: 'Journey', icon: Milestone },
    { id: 'live-queue', label: 'Queue', icon: CalendarClock },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadCount },
    { id: 'account', label: 'Account', icon: User }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigateTo(item.id)}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} />
              {item.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -4,
                  right: -6,
                  background: 'var(--danger)',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  width: '14px',
                  height: '14px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}

      {/* Floating Mini SOS for Mobile */}
      <button 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.2rem',
          color: 'var(--danger)',
          fontSize: '0.72rem',
          fontWeight: 800,
          flex: 1
        }}
        onClick={() => setEmergencyModalOpen(true)}
      >
        <ShieldAlert size={20} />
        <span>SOS</span>
      </button>
    </nav>
  );
};
