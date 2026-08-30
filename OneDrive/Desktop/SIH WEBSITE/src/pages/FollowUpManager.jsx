import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Stethoscope, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  ArrowLeft, 
  ArrowRight, 
  BellRing, 
  UserCheck,
  Building2,
  Sparkles
} from 'lucide-react';

export const FollowUpManager = () => {
  const { 
    patientData, 
    triggerMissedFollowUp, 
    navigateTo, 
    addToast,
    playAudioChime 
  } = useApp();

  const [simulatedMissed, setSimulatedMissed] = useState(false);
  const [contactedWorker, setContactedWorker] = useState(false);

  const followUpDate = patientData.consultation?.followUpDate || "September 4, 2026";
  const doctorName = patientData.consultation?.doctorName || "Dr. Priya Sharma";

  const handleSimulateMissed = () => {
    setSimulatedMissed(true);
    triggerMissedFollowUp();
    playAudioChime('warning');
  };

  const handleContactWorker = () => {
    setContactedWorker(true);
    addToast('Health Worker Notified', 'ASHA Worker Anita Verma alerted for follow-up home visit / call assistance.', 'success');
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
                <Calendar size={12} />
                <span>Post-Consultation Continuum</span>
              </span>
              <span className={`badge ${simulatedMissed ? 'badge-danger' : 'badge-purple'}`}>
                {simulatedMissed ? 'Follow-Up Missed' : 'Upcoming Review'}
              </span>
            </div>

            <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>
              Follow-up Review Management
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Scheduled by <strong>{doctorName}</strong> for Pyrexia & Vital Stability Check
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleSimulateMissed}
          >
            <AlertTriangle size={14} color="var(--warning-text)" />
            <span>Simulate Missed Follow-Up</span>
          </button>
        </div>

        {/* Normal Upcoming State vs Missed Follow-up State */}
        {!simulatedMissed ? (
          <div>
            {/* Scheduled Date Card */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-surface) 0%, var(--bg-card) 100%)',
              border: '2px solid var(--primary-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--primary-text)', textTransform: 'uppercase' }}>
                  SCHEDULED REVIEW APPOINTMENT
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                  {followUpDate} (10:30 AM)
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  District Government Hospital • OPD Room 4 • With <strong>{doctorName}</strong>
                </p>
              </div>

              <div style={{
                background: 'white',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.15rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>DAYS REMAINING</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>5 Days</div>
              </div>
            </div>

            {/* Smart Reminder Triggers List */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                Automated SMS & App Notification Schedule
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { time: '7 Days Before (Aug 28)', desc: 'Initial scheduling confirmed & care plan created', status: 'Sent ✓' },
                  { time: '1 Day Before (Sep 03)', desc: 'Reminder to review fever log and bring CBC blood report', status: 'Scheduled' },
                  { time: 'Due Date Morning (Sep 04)', desc: 'Digital queue token reservation alert at 08:00 AM', status: 'Scheduled' }
                ].map((rem, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.84rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <BellRing size={16} color="var(--primary)" />
                      <div>
                        <strong>{rem.time}: </strong>
                        <span style={{ color: 'var(--text-muted)' }}>{rem.desc}</span>
                      </div>
                    </div>
                    <span className="badge badge-neutral">{rem.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Missed Follow-up Alert View */
          <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
            <div style={{
              background: 'var(--danger-surface)',
              border: '2px solid var(--danger-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--danger)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                animation: 'pulseGlow 1.2s infinite'
              }}>
                <AlertTriangle size={30} />
              </div>

              <div style={{ display: 'inline-block', background: 'var(--danger)', color: 'white', padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                FOLLOW-UP MISSED
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--danger-text)', marginBottom: '0.4rem' }}>
                Your scheduled follow-up was missed.
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--danger-text)', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                Pyrexia review is essential to confirm symptom resolution and prevent relapse. You can instantly request an ASHA health worker follow-up or re-book your OPD queue token.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleContactWorker}
                  disabled={contactedWorker}
                >
                  <UserCheck size={18} />
                  <span>{contactedWorker ? 'ASHA Worker Notified ✓' : 'Notify / Contact ASHA Health Worker'}</span>
                </button>

                <button 
                  className="btn btn-secondary btn-lg"
                  onClick={() => navigateTo('facilities')}
                >
                  <span>Re-book OPD Appointment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assigned Community Health Worker Profile */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.15rem',
          border: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-surface)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800
            }}>
              AV
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.94rem' }}>
                Assigned ASHA Health Worker: Anita Verma
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Sector: Civil Lines Ward 14 • Contact: +91 94250 88123
              </div>
            </div>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => addToast('Calling ASHA Worker', 'Simulating direct call to Anita Verma (+91 94250 88123)...', 'info')}
          >
            <PhoneCall size={14} color="var(--primary)" />
            <span>Call ASHA Worker</span>
          </button>
        </div>

      </div>
    </div>
  );
};
