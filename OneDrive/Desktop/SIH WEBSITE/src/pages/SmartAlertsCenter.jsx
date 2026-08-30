import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BellRing, 
  Pill, 
  FlaskConical, 
  Share2, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles,
  Clock
} from 'lucide-react';

export const SmartAlertsCenter = () => {
  const { 
    patientData, 
    setPatientData, 
    navigateTo, 
    addToast 
  } = useApp();

  const [filterType, setFilterType] = useState('all');

  const alerts = patientData.alerts || [];

  const filteredAlerts = alerts.filter(a => {
    if (filterType === 'all') return true;
    return a.type === filterType;
  });

  const handleAlertClick = (alert) => {
    // Mark as read
    setPatientData(prev => ({
      ...prev,
      alerts: prev.alerts.map(a => a.id === alert.id ? { ...a, read: true } : a)
    }));

    if (alert.targetScreen) {
      navigateTo(alert.targetScreen);
    }
  };

  const handleMarkAllRead = () => {
    setPatientData(prev => ({
      ...prev,
      alerts: prev.alerts.map(a => ({ ...a, read: true }))
    }));
    addToast('Alerts Updated', 'All notifications marked as read.', 'info');
  };

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
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <BellRing size={12} />
                <span>Unified Clinical & Public Health Alerts</span>
              </span>
            </div>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>
              Smart Health Alerts
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Deep-linked intelligent notifications across appointments, lab tests, medicines, and referrals
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleMarkAllRead}
          >
            <Check size={14} />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'medicine', label: '💊 Medicines' },
            { id: 'test', label: '🧪 Lab Tests' },
            { id: 'referral', label: '🔗 Referrals' },
            { id: 'followup', label: '📅 Follow-up' },
            { id: 'facility', label: '🏥 Facility Stock' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`btn btn-sm ${filterType === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterType(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => {
              let Icon = BellRing;
              let iconColor = 'var(--primary)';
              let bgPill = 'var(--primary-surface)';

              if (alert.type === 'medicine') {
                Icon = Pill;
                iconColor = '#DC2626';
                bgPill = '#FEF2F2';
              } else if (alert.type === 'test') {
                Icon = FlaskConical;
                iconColor = '#059669';
                bgPill = '#ECFDF5';
              } else if (alert.type === 'referral') {
                Icon = Share2;
                iconColor = '#7C3AED';
                bgPill = '#F5F3FF';
              } else if (alert.type === 'followup') {
                Icon = Calendar;
                iconColor = '#0284C7';
                bgPill = '#F0F9FF';
              } else if (alert.type === 'facility') {
                Icon = Building2;
                iconColor = '#D97706';
                bgPill = '#FFFBEB';
              }

              return (
                <div
                  key={alert.id}
                  className="card-interactive"
                  onClick={() => handleAlertClick(alert)}
                  style={{
                    background: !alert.read ? 'linear-gradient(to right, var(--primary-surface), var(--bg-card))' : 'var(--bg-surface)',
                    border: `1.5px solid ${!alert.read ? 'var(--primary-border)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1.1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    boxShadow: !alert.read ? 'var(--shadow-xs)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: bgPill,
                      color: iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          {alert.title}
                        </h4>
                        {!alert.read && (
                          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>New</span>
                        )}
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-subtle)' }}>
                          • {alert.timestamp}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                        {alert.message}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap', alignSelf: 'center' }}>
                    <span>Open screen</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <BellRing size={36} className="empty-state-icon" />
              <h3>No alerts in this category</h3>
              <p>You have reviewed all relevant notifications.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
