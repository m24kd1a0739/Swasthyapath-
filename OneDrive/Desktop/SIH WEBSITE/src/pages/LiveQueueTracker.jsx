import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, 
  Users, 
  CheckCircle2, 
  QrCode, 
  RefreshCw, 
  Stethoscope, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Volume2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const LiveQueueTracker = () => {
  const { 
    patientData, 
    checkInPatient, 
    advanceQueue, 
    navigateTo, 
    playAudioChime, 
    addToast 
  } = useApp();

  const [checkInInput, setCheckInInput] = useState('91-8472-9102-4821');
  const [scanningQr, setScanningQr] = useState(false);

  const appt = patientData.appointment || {};
  const isCheckedIn = appt.checkedIn;
  const queuePos = appt.queuePosition;
  const isTurnNow = queuePos === 1 || appt.status === 'in_consultation';

  const handleSimulateScan = () => {
    setScanningQr(true);
    addToast('Scanning Kiosk QR...', 'Hospital entrance scanner detected.', 'info');
    setTimeout(() => {
      setScanningQr(false);
      checkInPatient();
    }, 1200);
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
        
        {/* Title & Facility Summary */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <Clock size={12} />
                <span>Live Government Hospital OPD Queue</span>
              </span>
              {isCheckedIn ? (
                <span className="badge badge-success">
                  <CheckCircle2 size={12} />
                  <span>Checked In ({appt.checkInTime || '10:05 AM'})</span>
                </span>
              ) : (
                <span className="badge badge-warning">Awaiting Check-in</span>
              )}
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {appt.facilityName || 'District Government Hospital, Central'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
              {appt.service || 'General Medicine'} • Assigned to: <strong>{appt.doctor || 'Dr. Priya Sharma'}</strong> • <strong>{appt.room || 'OPD Room 4'}</strong>
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Your Assigned Token</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
              {appt.tokenNumber || 'A-08'}
            </div>
          </div>
        </div>

        {/* Section 1: Check-in Simulator (If not yet checked in) */}
        {!isCheckedIn ? (
          <div style={{
            background: 'var(--warning-surface)',
            border: '1.5px solid var(--warning-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '1.75rem',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--warning-text)', marginBottom: '0.4rem' }}>
              Hospital OPD Arrival Check-in
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--warning-text)', maxWidth: '500px', margin: '0 auto 1.25rem', lineHeight: 1.45 }}>
              Please check in upon reaching the hospital to activate your place in the physical consultation queue.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleSimulateScan}
                disabled={scanningQr}
              >
                <QrCode size={18} />
                <span>{scanningQr ? 'Scanning Hospital QR...' : 'Scan Hospital Entrance QR Code'}</span>
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => checkInPatient()}
              >
                <span>Check-in with Patient ID</span>
              </button>
            </div>
          </div>
        ) : (
          /* Section 2: Live Queue Board & Visual Progress */
          <div>
            {/* Live Queue Circle Banner */}
            <div style={{
              background: isTurnNow ? 'var(--success-surface)' : 'var(--bg-surface)',
              border: `2px solid ${isTurnNow ? 'var(--success)' : 'var(--border-medium)'}`,
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              textAlign: 'center',
              marginBottom: '1.75rem',
              position: 'relative'
            }}>
              
              {!isTurnNow ? (
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Users size={16} />
                    <span>Patients Ahead: {appt.patientsAhead || 7}</span>
                  </div>

                  {/* Visual Stepper Node */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: '0.5rem 0 1.25rem' }}>
                    <div style={{ background: 'var(--primary-surface)', border: '2px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Now Serving</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                        A-0{Math.max(1, 8 - (appt.patientsAhead || 7))}
                      </div>
                    </div>

                    <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>→</span>

                    <div style={{ background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.25rem', boxShadow: '0 4px 10px rgba(13, 148, 136, 0.3)' }}>
                      <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>Your Turn Position</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>#{queuePos < 10 ? `0${queuePos}` : queuePos}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Estimated Wait: ~{appt.estimatedWaitMins} Minutes
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 1.25rem' }}>
                    Please wait in the Waiting Area outside <strong>OPD Room 4</strong>. You will be called shortly.
                  </p>

                  {/* Simulate Advance Queue Button */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                    <button 
                      className="btn btn-primary"
                      onClick={advanceQueue}
                    >
                      <RefreshCw size={16} />
                      <span>Update Queue / Simulate Next Token</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Turn Ready State */
                <div className="animate-fade-in">
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--success)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    animation: 'pulseGlow 1.2s infinite'
                  }}>
                    <Stethoscope size={34} />
                  </div>

                  <div style={{ display: 'inline-block', background: 'var(--success)', color: 'white', padding: '0.25rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    🔔 IT IS YOUR TURN NOW!
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--success-text)', marginBottom: '0.4rem' }}>
                    Please Proceed to OPD Room 4
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                    Dr. Priya Sharma is ready for your consultation. Token #{appt.tokenNumber} is now active.
                  </p>

                  <button 
                    className="btn btn-success btn-lg"
                    style={{ padding: '0.85rem 1.75rem', fontSize: '1.05rem', fontWeight: 800 }}
                    onClick={() => navigateTo('consultation')}
                  >
                    <Stethoscope size={20} />
                    <span>Enter Doctor Consultation Screen</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}

            </div>

            {/* OPD Room Directions & Support Info */}
            <div className="grid-2">
              <div style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.15rem',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <MapPin size={16} color="var(--primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>OPD Location Directions</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  Main Building, 1st Floor, Room 4 (Opposite Pathology Sample Counter). Water dispenser and seating available.
                </p>
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.15rem',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Volume2 size={16} color="var(--primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Audio OPD Call Bell</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  Audio chimes and loudspeaker announcement will sound when your token is called in Hindi and English.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
