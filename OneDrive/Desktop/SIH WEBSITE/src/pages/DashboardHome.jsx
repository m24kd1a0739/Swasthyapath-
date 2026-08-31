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
  Play,
  HeartHandshake
} from 'lucide-react';

export const DashboardHome = () => {
  const { 
    t, 
    patientData, 
    isDemoMode,
    startDemoJourney,
    navigateTo, 
    advanceQueue, 
    updateMedicineReminder,
    setEmergencyModalOpen 
  } = useApp();

  // Extract first name dynamically for greeting ("Ravi", "Sita", "Priya", "Arun", etc.)
  const fullName = patientData.profile?.fullName || 'Citizen';
  const firstName = fullName.split(' ')[0] || fullName;
  const abhaId = patientData.profile?.abhaId || '91-8472-9102-4821';
  const locationName = patientData.profile?.location || 'Bhopal';

  const hasSymptoms = !!patientData.symptoms?.text;
  const hasAppt = !!patientData.appointment?.tokenNumber;
  const hasConsulted = !!patientData.consultation?.consulted;
  const hasTransfer = !!patientData.careTransfer?.hasTransfer;
  
  const activeRx = patientData.consultation?.prescriptions?.[0];
  const afternoonDose = activeRx?.reminders?.find(r => r.time === '02:00 PM') || activeRx?.reminders?.[1] || { status: 'due' };
  const queuePos = patientData.appointment?.queuePosition || 8;
  const estWait = patientData.appointment?.estimatedWaitMins || 25;

  // Determine dynamic "What should I do next?" recommendation
  let nextAction = {
    title: "Start AI Care Navigation",
    desc: "Describe what symptoms you are experiencing to get clinical triage and find the right public healthcare facility.",
    cta: "Check Symptoms",
    target: "symptoms",
    icon: Sparkles
  };

  if (hasTransfer) {
    nextAction = {
      title: `Visit ${patientData.careTransfer.destinationFacilityName || 'District Hospital'} for Continued Treatment`,
      desc: `Your health records have been transferred. Proceed to OPD Room 4 with your digital token.`,
      cta: "View Care Transfer Details",
      target: "care-transfer",
      icon: Share2
    };
  } else if (hasConsulted && activeRx && afternoonDose.status !== 'taken') {
    nextAction = {
      title: "Take Afternoon Medicine Dose (2:00 PM)",
      desc: `Take 1 tablet of ${activeRx.medicineName} after food to manage fever as prescribed by Dr. Priya Sharma.`,
      cta: "Open Medicine Reminder",
      target: "medicine-reminders",
      icon: Pill
    };
  } else if (hasAppt && patientData.appointment.status !== 'completed') {
    nextAction = {
      title: `Proceed to ${patientData.appointment.facilityName || 'District Hospital'}`,
      desc: `Your OPD Token #${patientData.appointment.tokenNumber} is active. Check in at the entrance kiosk to hold your queue spot.`,
      cta: "Track Live OPD Queue",
      target: "live-queue",
      icon: Clock
    };
  } else if (hasSymptoms) {
    nextAction = {
      title: "Book Consultation at Recommended District Hospital",
      desc: "Based on your reported fever symptoms, a General Medicine consultation with baseline blood work (CBC) is recommended.",
      cta: "Find & Book Facility",
      target: "facilities",
      icon: Building2
    };
  }

  const PrimaryIcon = nextAction.icon;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Header Greeting & Health Status Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #0284C7 100%)',
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
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', margin: 0 }}>
              Hello, {firstName} 👋
            </h1>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', fontSize: '0.72rem' }}>
              ABHA: {abhaId.slice(0, 10)}...
            </span>
            {isDemoMode && (
              <span className="badge" style={{ background: '#FEF08A', color: '#854D0E', border: 'none', fontWeight: 800, fontSize: '0.7rem' }}>
                SIH Presentation Demo Mode
              </span>
            )}
          </div>

          <p style={{ color: '#CCFBF1', fontSize: '0.94rem', lineHeight: 1.5, margin: 0 }}>
            {hasSymptoms ? (
              <>Current Health Concern: <strong>“{patientData.symptoms.text}”</strong> (Duration: {patientData.symptoms.duration || '3 days'}). SwasthyaPath keeps your hospital queue, lab reports, prescriptions, and care transfers connected.</>
            ) : (
              <>Welcome to SwasthyaPath! Your public healthcare continuum is active in <strong>{locationName}</strong>. Navigate care, consult doctors, and track medicines effortlessly.</>
            )}
          </p>
        </div>

        {/* Primary Health Action Button */}
        <button
          className="btn btn-lg"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#0F766E',
            fontWeight: 800,
            padding: '0.85rem 1.6rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
            border: 'none'
          }}
          onClick={() => navigateTo(hasSymptoms ? 'facilities' : 'symptoms')}
        >
          <Sparkles size={18} color="#0D9488" />
          <span>{hasSymptoms ? t.whereToGo : "Check Health Problem"}</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* 2. Large Primary Card: WHAT SHOULD I DO NEXT? */}
      <div 
        className="card card-interactive"
        onClick={() => navigateTo(nextAction.target)}
        style={{
          background: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 100%)',
          border: '2px solid var(--primary)',
          padding: '1.5rem 1.75rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', maxWidth: '680px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 10px rgba(13, 148, 136, 0.25)'
          }}>
            <PrimaryIcon size={26} />
          </div>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-text)', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
              <span>RECOMMENDED NEXT STEP</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-navy)', marginBottom: '0.25rem' }}>
              {nextAction.title}
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
              {nextAction.desc}
            </p>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-lg"
          style={{ padding: '0.8rem 1.4rem' }}
          onClick={(e) => {
            e.stopPropagation();
            navigateTo(nextAction.target);
          }}
        >
          <span>{nextAction.cta}</span>
          <ArrowRight size={17} />
        </button>
      </div>

      {/* 3. CURRENT JOURNEY PROGRESS TRACKER */}
      <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            MY HEALTHCARE JOURNEY TRACKER
          </span>
          <button 
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--primary)', fontWeight: 700, padding: 0, fontSize: '0.78rem' }}
            onClick={() => navigateTo('journey')}
          >
            <span>View Full Timeline →</span>
          </button>
        </div>

        {/* Milestone Stepper */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflowX: 'auto',
          padding: '0.5rem 0'
        }}>
          {[
            { label: 'Symptom Triage', done: hasSymptoms, active: !hasSymptoms, screen: 'symptoms' },
            { label: 'OPD Consultation', done: hasConsulted, active: hasSymptoms && !hasConsulted, screen: 'consultation' },
            { label: 'Diagnostic CBC Lab', done: hasConsulted, active: false, screen: 'tests' },
            { label: 'Medicine Regimen', done: afternoonDose.status === 'taken', active: hasConsulted && afternoonDose.status !== 'taken', screen: 'medicine-reminders' },
            { label: 'Care Transfer / Follow-Up', done: hasTransfer, active: false, screen: hasTransfer ? 'care-transfer' : 'follow-up' }
          ].map((step, idx, arr) => (
            <React.Fragment key={idx}>
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  minWidth: '110px'
                }}
                onClick={() => navigateTo(step.screen)}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  background: step.done ? 'var(--success)' : step.active ? 'var(--primary)' : 'var(--bg-surface)',
                  color: step.done || step.active ? 'white' : 'var(--text-muted)',
                  border: step.active ? '2px solid var(--primary)' : step.done ? 'none' : '1px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem'
                }}>
                  {step.done ? <CheckCircle2 size={18} /> : <span>{idx + 1}</span>}
                </div>
                <span style={{ fontSize: '0.74rem', fontWeight: step.active ? 800 : 600, color: step.active ? 'var(--primary-text)' : step.done ? 'var(--text-main)' : 'var(--text-muted)', textAlign: 'center' }}>
                  {step.label}
                </span>
              </div>

              {idx < arr.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: step.done ? 'var(--success)' : 'var(--border-light)',
                  margin: '0 0.5rem 1.25rem'
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 4. UPCOMING & ACTIVE PRIORITIES (3 Clean, Balanced Cards) */}
      <div className="grid-3">
        
        {/* Card A: Live Queue & Appointments */}
        <div 
          className="card card-interactive"
          onClick={() => navigateTo(hasAppt ? 'live-queue' : 'facilities')}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                LIVE OPD QUEUE
              </span>
              <span className={`badge ${hasAppt ? 'badge-warning' : 'badge-neutral'}`}>
                {hasAppt ? `Token #${patientData.appointment.tokenNumber}` : 'No Active Token'}
              </span>
            </div>

            {hasAppt ? (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', margin: '0.2rem 0' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>
                    #{queuePos < 10 ? `0${queuePos}` : queuePos}
                  </span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    (~{estWait} min wait)
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  {patientData.appointment?.facilityName || 'District Govt Hospital'} • {patientData.appointment?.room || 'Room 4'}
                </p>
              </>
            ) : (
              <>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                  No Active Queue Token
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  Find a government facility and book an OPD appointment to join live queue.
                </p>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.65rem' }}>
            <span style={{ color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700 }}>
              {hasAppt ? 'Track live queue →' : 'Book OPD appointment →'}
            </span>
            {hasAppt && (
              <button 
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  advanceQueue();
                }}
              >
                Advance Token
              </button>
            )}
          </div>
        </div>

        {/* Card B: Medicine Schedule Due */}
        <div 
          className="card card-interactive"
          onClick={() => navigateTo(activeRx ? 'medicine-reminders' : 'medicines')}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                MEDICINE SCHEDULE
              </span>
              <span className={`badge ${!activeRx ? 'badge-neutral' : afternoonDose.status === 'taken' ? 'badge-success' : 'badge-danger'}`}>
                {!activeRx ? 'No Active Rx' : afternoonDose.status === 'taken' ? 'Taken ✓' : 'Due Now (2 PM)'}
              </span>
            </div>

            {activeRx ? (
              <>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                  {activeRx.medicineName}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  {activeRx.dosage || '1 Tablet after food'} • {activeRx.frequency || 'Afternoon dose'}
                </p>
              </>
            ) : (
              <>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                  No Prescriptions Active
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  Prescribed medicines and adherence reminders from consultations will appear here.
                </p>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.65rem' }}>
            {activeRx ? (
              afternoonDose.status !== 'taken' ? (
                <>
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, padding: '0.35rem 0.6rem', fontSize: '0.76rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateMedicineReminder(activeRx.id || 'rx-1', 1, 'taken');
                    }}
                  >
                    <CheckCircle2 size={13} />
                    <span>Mark Taken</span>
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.5rem', fontSize: '0.76rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateMedicineReminder(activeRx.id || 'rx-1', 1, 'skipped');
                    }}
                  >
                    Skip
                  </button>
                </>
              ) : (
                <span style={{ color: 'var(--success-text)', fontSize: '0.78rem', fontWeight: 700 }}>
                  Next Dose Scheduled →
                </span>
              )
            ) : (
              <span style={{ color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700 }}>
                Check Govt Pharmacy Stocks →
              </span>
            )}
          </div>
        </div>

        {/* Card C: Care Continuity & Follow-Up */}
        <div 
          className="card card-interactive"
          onClick={() => navigateTo(hasTransfer ? 'care-transfer' : patientData.consultation?.followUpDate ? 'follow-up' : 'care-transfer')}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {hasTransfer ? 'CARE TRANSFER' : patientData.consultation?.followUpDate ? 'UPCOMING REVIEW' : 'CARE CONTINUITY'}
              </span>
              <span className={`badge ${hasTransfer ? 'badge-primary' : patientData.consultation?.followUpDate ? 'badge-purple' : 'badge-neutral'}`}>
                {hasTransfer ? 'Transfer Active' : patientData.consultation?.followUpDate || 'Ready'}
              </span>
            </div>

            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
              {hasTransfer 
                ? (patientData.careTransfer.destinationFacilityName || 'District Hospital') 
                : patientData.consultation?.followUpDate 
                ? 'General Medicine Review' 
                : 'Inter-Facility Transfer Ready'}
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              {hasTransfer 
                ? 'Health records shared with clinical consent' 
                : patientData.consultation?.followUpDate 
                ? `Follow-up with ${patientData.consultation.doctorName || 'Doctor'} in ${patientData.consultation.followUpDays || 7} days`
                : 'Transfer medical history and active care between government hospitals'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.65rem' }}>
            <span>{hasTransfer ? 'View transfer status' : patientData.consultation?.followUpDate ? 'Manage review' : 'Continue care at another facility'}</span>
            <ChevronRight size={14} />
          </div>
        </div>

      </div>

      {/* 5. CATEGORIZED HEALTHCARE SERVICES */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Public Healthcare Navigation Modules</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Connected Continuum</span>
        </div>

        <div className="grid-3">
          {[
            { id: 'symptoms', label: 'My Health Problem', desc: 'AI Triage & symptom assessment', icon: Stethoscope, color: '#0D9488', bg: '#F0FDFA' },
            { id: 'facilities', label: 'Find Government Facility', desc: 'Ranked hospitals & PHCs with real-time queue', icon: Building2, color: '#0284C7', bg: '#F0F9FF' },
            { id: 'care-transfer', label: 'Care Transfer & Continuity', desc: 'Transfer care to another facility with records', icon: Share2, color: '#0D9488', bg: '#F0FDFA', isNew: true },
            { id: 'tests', label: 'Diagnostic Tests & Lab Reports', desc: 'CBC blood work & digital lab report viewer', icon: FlaskConical, color: '#059669', bg: '#ECFDF5' },
            { id: 'medicines', label: 'Medicine Availability', desc: 'Jan Aushadhi & Govt pharmacy stock check', icon: Pill, color: '#7C3AED', bg: '#F5F3FF' },
            { id: 'referrals', label: 'Referral Tracking', desc: 'PHC to District Hospital 5-stage pipeline', icon: Share2, color: '#4F46E5', bg: '#EEF2FF' }
          ].map(mod => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="card card-interactive"
                onClick={() => navigateTo(mod.id)}
                style={{
                  padding: '1.15rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  borderLeft: `4px solid ${mod.color}`
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: mod.bg,
                  color: mod.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      {mod.label}
                    </span>
                    {mod.isNew && (
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>NEW</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                    {mod.desc}
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

export default DashboardHome;
