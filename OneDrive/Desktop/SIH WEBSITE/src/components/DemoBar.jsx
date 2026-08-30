import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ChevronRight, ChevronLeft, Play, RotateCcw, X } from 'lucide-react';

export const DemoBar = () => {
  const { 
    demoTourActive, 
    setDemoTourActive, 
    demoStep, 
    setDemoStep, 
    navigateTo, 
    resetDemoData, 
    setUserRole,
    addToast
  } = useApp();

  if (!demoTourActive) return null;

  const demoSteps = [
    { step: 1, title: '1. Welcome Landing', screen: 'landing', role: 'patient', desc: 'Public healthcare platform overview & SIH entry' },
    { step: 2, title: '2. Register & Auth', screen: 'landing', modal: 'register', role: 'patient', desc: 'Patient onboarding & ABHA registration' },
    { step: 3, title: '3. OTP Verification', screen: 'landing', modal: 'otp', role: 'patient', desc: 'Secure 6-digit mobile OTP check' },
    { step: 4, title: '4. Profile Wizard', screen: 'landing', modal: 'wizard', role: 'patient', desc: '3-step onboarding wizard' },
    { step: 5, title: '5. Patient Dashboard', screen: 'dashboard', role: 'patient', desc: 'Unified patient status, queue, and alerts' },
    { step: 6, title: '6. Symptom Input', screen: 'symptoms', role: 'patient', desc: 'Text, voice, and chip-based symptom input' },
    { step: 7, title: '7. AI Care Navigation', screen: 'triage', role: 'patient', desc: 'Clinical triage, care level rationale & disclaimer' },
    { step: 8, title: '8. Facility Finder', screen: 'facilities', role: 'patient', desc: 'Multi-factor smart ranking & interactive district map' },
    { step: 9, title: '9. Facility Details', screen: 'facility-details', role: 'patient', desc: 'Doctors, tests, pharmacy stocks, and OPD timings' },
    { step: 10, title: '10. Book Appointment', screen: 'appointment', role: 'patient', desc: 'Token generation (#A-08) & slot booking' },
    { step: 11, title: '11. Check-In & Queue', screen: 'live-queue', role: 'patient', desc: 'Simulated QR check-in & OPD arrival' },
    { step: 12, title: '12. Live Queue Advance', screen: 'live-queue', role: 'patient', desc: 'Live position updates (#08 -> #07 -> Your Turn)' },
    { step: 13, title: '13. Doctor Consultation', screen: 'consultation', role: 'patient', desc: 'OPD physician assessment & clinical notes' },
    { step: 14, title: '14. Lab Tests (CBC)', screen: 'tests', role: 'patient', desc: 'Diagnostic blood test request & center details' },
    { step: 15, title: '15. Lab Report Viewer', screen: 'tests', role: 'patient', desc: 'Interactive blood report with normal range flags' },
    { step: 16, title: '16. Pharmacy Stock', screen: 'medicines', role: 'patient', desc: 'Government pharmacy stock & generic search' },
    { step: 17, title: '17. Medicine Reminder', screen: 'medicine-reminders', role: 'patient', desc: 'Prescription-linked schedule with 2 PM dose due' },
    { step: 18, title: '18. My Care Plan', screen: 'care-plan', role: 'patient', desc: 'Dynamic "What should I do next?" checklist' },
    { step: 19, title: '19. Referral Tracking', screen: 'referrals', role: 'patient', desc: 'End-to-end 5-stage referral lifecycle' },
    { step: 20, title: '20. Health Worker & Admin', screen: 'health-worker', role: 'health-worker', desc: 'ASHA worker, OPD staff, and District Admin views' }
  ];

  const currentStepData = demoSteps.find(s => s.step === demoStep) || demoSteps[0];

  const goToStep = (stepNum) => {
    const target = demoSteps.find(s => s.step === stepNum);
    if (!target) return;
    setDemoStep(stepNum);
    if (target.role) setUserRole(target.role);
    navigateTo(target.screen);
    addToast(`SIH Demo: Step ${stepNum}`, target.desc, 'info');
  };

  const handleNext = () => {
    if (demoStep < demoSteps.length) {
      goToStep(demoStep + 1);
    }
  };

  const handlePrev = () => {
    if (demoStep > 1) {
      goToStep(demoStep - 1);
    }
  };

  return (
    <div className="demo-bar-container">
      {/* Title & Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span className="badge badge-primary" style={{ background: 'var(--primary)', color: 'white', border: 'none', gap: '0.35rem' }}>
          <Sparkles size={13} />
          <span>SIH Presentation Mode</span>
        </span>
        <span style={{ fontWeight: 700, color: 'white' }}>
          Step {demoStep} of {demoSteps.length}: {currentStepData.title}
        </span>
        <span className="desktop-only" style={{ color: '#94A3B8', fontSize: '0.78rem' }}>
          — {currentStepData.desc}
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Step Dropdown */}
        <select 
          value={demoStep}
          onChange={(e) => goToStep(Number(e.target.value))}
          style={{
            background: 'var(--navy-light)',
            color: 'white',
            border: '1px solid #334155',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.78rem'
          }}
        >
          {demoSteps.map(s => (
            <option key={s.step} value={s.step}>
              {s.step}. {s.title}
            </option>
          ))}
        </select>

        <button 
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.25rem 0.55rem', background: '#334155', color: 'white', border: 'none' }}
          onClick={handlePrev}
          disabled={demoStep === 1}
        >
          <ChevronLeft size={15} />
          <span>Prev</span>
        </button>

        <button 
          className="btn btn-primary btn-sm"
          style={{ padding: '0.25rem 0.75rem' }}
          onClick={handleNext}
          disabled={demoStep === demoSteps.length}
        >
          <span>Next Step</span>
          <ChevronRight size={15} />
        </button>

        <button 
          className="btn btn-ghost btn-sm"
          style={{ color: '#94A3B8', padding: '0.25rem' }}
          onClick={() => setDemoTourActive(false)}
          title="Close Presentation Bar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
