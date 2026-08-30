import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Stethoscope, 
  Building2, 
  Clock, 
  Milestone, 
  Share2, 
  FlaskConical, 
  Pill, 
  BellRing, 
  CheckSquare, 
  Calendar, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Activity,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const DashboardHome = () => {
  const { 
    t, 
    patientData, 
    navigateTo, 
    advanceQueue, 
    updateMedicineReminder,
    setEmergencyModalOpen 
  } = useApp();

  const activeRx = patientData.consultation?.prescriptions?.[0];
  const afternoonDose = activeRx?.reminders?.find(r => r.time === '02:00 PM') || { status: 'due' };
  const queuePos = patientData.appointment?.queuePosition || 8;
  const estWait = patientData.appointment?.estimatedWaitMins || 25;

  const quickActions = [
    { id: 'symptoms', label: 'My Health Problem', desc: 'AI Triage & Symptom input', icon: Stethoscope, color: '#0D9488', bg: '#F0FDFA' },
    { id: 'facilities', label: 'Find Govt Facility', desc: 'Ranked hospitals & PHCs', icon: Building2, color: '#0284C7', bg: '#F0F9FF' },
    { id: 'live-queue', label: 'Appointment & Queue', desc: 'Token & live OPD wait', icon: Clock, color: '#D97706', bg: '#FFFBEB' },
    { id: 'tests', label: 'Tests & Lab Reports', desc: 'CBC blood work & records', icon: FlaskConical, color: '#059669', bg: '#ECFDF5' },
    { id: 'medicines', label: 'Medicine Availability', desc: 'Govt pharmacy stock check', icon: Pill, color: '#7C3AED', bg: '#F5F3FF' },
    { id: 'medicine-reminders', label: 'Medicine Reminder', desc: 'Dose schedules & alerts', icon: BellRing, color: '#DC2626', bg: '#FEF2F2' },
    { id: 'care-plan', label: 'My Care Plan', desc: 'What should I do next?', icon: CheckSquare, color: '#2563EB', bg: '#EFF6FF' },
    { id: 'referrals', label: 'Referral Tracking', desc: 'PHC to District Hospital', icon: Share2, color: '#4F46E5', bg: '#EEF2FF' },
    { id: 'journey', label: 'My Health Journey', desc: 'Chronological timeline', icon: Milestone, color: '#0D9488', bg: '#F0FDFA' },
    { id: 'follow-up', label: 'Follow-up Review', desc: 'Sep 4 General Medicine', icon: Calendar, color: '#0891B2', bg: '#ECFEFF' },
    { id: 'emergency', label: 'Emergency Mode', desc: '108 Ambulance & Trauma', icon: ShieldAlert, color: '#DC2626', bg: '#FEF2F2', isEmergency: true }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner & AI Primary Prompt */}
      <div style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem 2rem',
        color: 'white',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ maxWidth: '560px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.greeting}</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>
              ABHA Active
            </span>
          </div>
          <p style={{ color: '#CCFBF1', fontSize: '0.95rem', lineHeight: 1.45, margin: 0 }}>
            Active case: <strong>“{patientData.symptoms?.text || 'Fever for 3 days with weakness'}”</strong>. SwasthyaPath keeps your hospital queue, lab tests, and medicines connected.
          </p>
        </div>

        {/* Primary CTA Button: "Where should I go?" */}
        <button
          className="btn btn-lg"
          style={{
            backgroundColor: '#FFFFFF',
            color: 'var(--primary-dark)',
            fontWeight: 800,
            padding: '0.9rem 1.6rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: 'none'
          }}
          onClick={() => navigateTo('symptoms')}
        >
          <Sparkles size={18} color="var(--primary)" />
          <span>{t.whereToGo}</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Main 4 Dashboard Cards Grid */}
      <div className="grid-4">
        
        {/* Card 1: Current Journey Stepper */}
        <div 
          className="card card-interactive"
          onClick={() => navigateTo('journey')}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                CURRENT JOURNEY
              </span>
              <span className="badge badge-primary">Active</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.5rem 0 0.8rem' }}>
              <span style={{ color: 'var(--success)' }}>OPD ✓</span>
              <span>→</span>
              <span style={{ color: 'var(--success)' }}>Test ✓</span>
              <span>→</span>
              <span style={{ color: 'var(--primary)' }}>Medicine</span>
              <span>→</span>
              <span style={{ color: 'var(--text-muted)' }}>Follow-up</span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              OPD consultation and CBC test completed. Prescription active.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.75rem' }}>
            <span>View timeline</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* Card 2: Live Queue Tracker */}
        <div 
          className="card card-interactive"
          onClick={() => navigateTo('live-queue')}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                LIVE OPD QUEUE
              </span>
              <span className="badge badge-warning">Token #A-08</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', margin: '0.25rem 0' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
                #{queuePos < 10 ? `0${queuePos}` : queuePos}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                (~{estWait} min wait)
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              {patientData.appointment?.facilityName || 'District Govt Hospital'} • Room 4
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
            <span style={{ color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700 }}>
              Track live queue →
            </span>
            <button 
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}
              onClick={(e) => {
                e.stopPropagation();
                advanceQueue();
              }}
            >
              Advance
            </button>
          </div>
        </div>

        {/* Card 3: Upcoming Follow-up */}
        <div 
          className="card card-interactive"
          onClick={() => navigateTo('follow-up')}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                UPCOMING REVIEW
              </span>
              <span className="badge badge-purple">In 5 Days</span>
            </div>

            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
              Sep 4, 2026
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              General Medicine Review with Dr. Priya Sharma at District Hospital.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.75rem' }}>
            <span>Manage follow-up</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* Card 4: Medicine Due Widget */}
        <div 
          className="card card-highlight"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                MEDICINE SCHEDULE
              </span>
              <span className={`badge ${afternoonDose.status === 'taken' ? 'badge-success' : 'badge-danger'}`}>
                {afternoonDose.status === 'taken' ? 'Taken ✓' : 'Due Now (2 PM)'}
              </span>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Paracetamol 650mg
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.5rem' }}>
              1 Tablet after food • 2:00 PM Dose
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
            {afternoonDose.status !== 'taken' ? (
              <>
                <button 
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                  onClick={() => updateMedicineReminder('rx-1', 1, 'taken')}
                >
                  <CheckCircle2 size={13} />
                  <span>Mark Taken</span>
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                  onClick={() => updateMedicineReminder('rx-1', 1, 'skipped')}
                >
                  Skip
                </button>
              </>
            ) : (
              <button 
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', fontSize: '0.75rem' }}
                onClick={() => navigateTo('medicine-reminders')}
              >
                <span>View 8:00 PM Night Dose →</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Quick Actions Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Public Healthcare Navigation Services</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>11 Connected Modules</span>
        </div>

        <div className="grid-4">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <div 
                key={action.id}
                className="card card-interactive"
                onClick={() => {
                  if (action.isEmergency) setEmergencyModalOpen(true);
                  else navigateTo(action.id);
                }}
                style={{
                  padding: '1.15rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  borderLeft: `4px solid ${action.color}`
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: action.bg,
                  color: action.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>
                    {action.label}
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.35, margin: 0 }}>
                    {action.desc}
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
