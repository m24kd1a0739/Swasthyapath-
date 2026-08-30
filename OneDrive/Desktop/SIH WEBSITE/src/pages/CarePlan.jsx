import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckSquare, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Pill, 
  Stethoscope, 
  FlaskConical, 
  Share2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  HelpCircle,
  Activity
} from 'lucide-react';

export const CarePlan = () => {
  const { 
    patientData, 
    navigateTo, 
    t 
  } = useApp();

  const items = patientData.carePlanItems || [];

  const completedItems = items.filter(i => i.status === 'completed');
  const currentItems = items.filter(i => i.status === 'current');
  const upcomingItems = items.filter(i => i.status === 'upcoming');
  const pendingItems = items.filter(i => i.status === 'pending');

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
                <CheckSquare size={12} />
                <span>Actionable Patient Care Protocol</span>
              </span>
              <span className="badge badge-success">
                {completedItems.length} of {items.length} Completed
              </span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {t.carePlan}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Core focus: <strong>“What should I do next?”</strong> • Dynamic clinical checklist for Arun Kumar
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('journey')}
          >
            <span>View Full Journey Timeline →</span>
          </button>
        </div>

        {/* SECTION 1: CURRENT ACTIVE ACTION ITEMS (What should I do next?) */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span className="badge badge-danger" style={{ fontWeight: 800, padding: '0.3rem 0.7rem' }}>
              DO THIS NOW (CURRENT)
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Immediate attention required</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentItems.map(item => (
              <div
                key={item.id}
                style={{
                  background: 'linear-gradient(135deg, #FEF2F2 0%, #FFFBEB 100%)',
                  border: '2px solid #FECACA',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--danger)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Pill size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-navy)' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => navigateTo(item.targetScreen)}
                >
                  <span>{item.actionText || 'Take Action'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: UPCOMING SCHEDULED ACTIONS */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span className="badge badge-purple" style={{ fontWeight: 800, padding: '0.3rem 0.7rem' }}>
              UPCOMING SCHEDULED
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Follow-ups and doctor reviews</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {upcomingItems.map(item => (
              <div
                key={item.id}
                className="card-interactive"
                onClick={() => navigateTo(item.targetScreen)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Calendar size={22} color="var(--primary)" />
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>{item.desc}</p>
                  </div>
                </div>

                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                  Manage →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: COMPLETED ITEMS */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span className="badge badge-success" style={{ fontWeight: 800, padding: '0.3rem 0.7rem' }}>
              COMPLETED MILESTONES
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Successfully fulfilled clinical steps</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {completedItems.map(item => (
              <div
                key={item.id}
                className="card-interactive"
                onClick={() => navigateTo(item.targetScreen)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.9rem 1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="var(--success)" />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.title}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </div>

                <span style={{ fontSize: '0.74rem', color: 'var(--text-subtle)' }}>
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
