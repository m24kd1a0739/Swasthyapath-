import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Milestone, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Pill, 
  Stethoscope, 
  Users, 
  Cpu, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Download
} from 'lucide-react';

export const HealthJourneyTimeline = () => {
  const { 
    patientData, 
    navigateTo, 
    addToast, 
    t 
  } = useApp();

  const journeyEvents = patientData.healthJourney || [];

  const getIcon = (type) => {
    switch (type) {
      case 'followup': return Calendar;
      case 'report': return FileText;
      case 'prescription': return Pill;
      case 'consultation': return Stethoscope;
      case 'queue': return Users;
      case 'triage': return Cpu;
      case 'referral': return Share2;
      case 'transfer': return Share2;
      default: return Milestone;
    }
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

      <div className="card" style={{ padding: '2rem', borderTop: '5px solid var(--primary)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <Milestone size={12} />
                <span>Longitudinal Health Record</span>
              </span>
              <span className="badge badge-neutral">ABHA Sync Active</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {t.healthJourney}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Connected continuum for <strong>{patientData.profile.fullName || 'Citizen'} ({patientData.profile.age || 32} {patientData.profile.gender?.[0] || 'M'})</strong> • ABHA: {patientData.profile.abhaId}
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => addToast('Health Summary Exported', 'Full ABHA journey exported to secure PDF.', 'info')}
          >
            <Download size={15} />
            <span>Export Journey PDF</span>
          </button>
        </div>

        {/* Chronological Timeline */}
        <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
          {journeyEvents.map((evt, idx) => {
            const Icon = getIcon(evt.type);
            const isCompleted = evt.status === 'completed';
            const isUpcoming = evt.status === 'upcoming';

            return (
              <div key={evt.id || idx} className="timeline-item">
                <div className={`timeline-node ${isCompleted ? 'completed' : isUpcoming ? 'current' : ''}`} style={{ left: '-2.5rem' }}>
                  {isCompleted ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                </div>

                <div 
                  className="card-interactive"
                  onClick={() => {
                    if (evt.type === 'prescription') navigateTo('medicine-reminders');
                    else if (evt.type === 'report') navigateTo('tests');
                    else if (evt.type === 'consultation') navigateTo('consultation');
                    else if (evt.type === 'followup') navigateTo('follow-up');
                    else if (evt.type === 'triage') navigateTo('triage');
                    else if (evt.type === 'queue') navigateTo('live-queue');
                    else if (evt.type === 'transfer') navigateTo('care-transfer');
                  }}
                  style={{
                    background: isUpcoming ? 'linear-gradient(to right, var(--primary-surface), var(--bg-card))' : 'var(--bg-card)',
                    border: `1.5px solid ${isUpcoming ? 'var(--primary-border)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.15rem 1.35rem',
                    boxShadow: isUpcoming ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`badge ${isCompleted ? 'badge-success' : isUpcoming ? 'badge-primary' : 'badge-neutral'}`} style={{ fontSize: '0.68rem' }}>
                        {isCompleted ? 'Completed ✓' : isUpcoming ? 'Upcoming Target' : 'Logged'}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {evt.date} • {evt.time}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                      View details →
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0 0.35rem' }}>
                    {evt.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
                    {evt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
