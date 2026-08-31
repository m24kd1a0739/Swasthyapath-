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
    setIsAuthenticated,
    addToast
  } = useApp();

  if (!demoTourActive) return null;

  const demoSteps = [
    { step: 1, title: '1. Welcome Landing', path: '/', role: 'patient', desc: 'Public healthcare platform overview & SIH entry' },
    { step: 2, title: '2. Citizen Login', path: '/login', role: 'patient', desc: 'Secure mobile / ABHA sign in' },
    { step: 3, title: '3. Registration', path: '/register', role: 'patient', desc: 'Patient onboarding & demographic registration' },
    { step: 4, title: '4. OTP Verification', path: '/otp', role: 'patient', desc: '6-digit mobile verification check' },
    { step: 5, title: '5. Profile Wizard', path: '/profile-setup', role: 'patient', desc: '3-step onboarding wizard & preferences' },
    { step: 6, title: '6. Patient Dashboard', path: '/home', role: 'patient', desc: 'Unified patient status, queue, and alerts' },
    { step: 7, title: '7. Symptom Input', path: '/health-problem', role: 'patient', desc: 'Text, voice, and chip-based symptom input' },
    { step: 8, title: '8. AI Care Navigation', path: '/care-navigation', role: 'patient', desc: 'Clinical triage, care level rationale & disclaimer' },
    { step: 9, title: '9. Facility Finder', path: '/facilities', role: 'patient', desc: 'Multi-factor smart ranking & interactive district map' },
    { step: 10, title: '10. Facility Details', path: '/facility-details', role: 'patient', desc: 'Doctors, tests, pharmacy stocks, and OPD timings' },
    { step: 11, title: '11. Book Appointment', path: '/appointments', role: 'patient', desc: 'Token generation (#A-08) & slot booking' },
    { step: 12, title: '12. Live Queue & Check-In', path: '/queue', role: 'patient', desc: 'Simulated QR check-in & live token advance (#08 -> Your Turn)' },
    { step: 13, title: '13. Doctor Consultation', path: '/consultation', role: 'patient', desc: 'OPD physician assessment & clinical notes' },
    { step: 14, title: '14. Lab Tests (CBC)', path: '/tests-reports', role: 'patient', desc: 'Diagnostic blood test request & report viewer' },
    { step: 15, title: '15. Pharmacy Stock', path: '/medicines', role: 'patient', desc: 'Government pharmacy stock & generic search' },
    { step: 16, title: '16. Medicine Reminder', path: '/medicine-reminder', role: 'patient', desc: 'Prescription-linked schedule with 2 PM dose due' },
    { step: 17, title: '17. My Care Plan', path: '/care-plan', role: 'patient', desc: 'Dynamic "What should I do next?" checklist' },
    { step: 18, title: '18. Care Transfer & Records', path: '/care-transfer', role: 'patient', desc: 'Patient-consented inter-facility care continuity & record sharing' },
    { step: 19, title: '19. Referral Tracking', path: '/referrals', role: 'patient', desc: 'End-to-end 5-stage referral lifecycle' },
    { step: 20, title: '20. Health Journey', path: '/health-journey', role: 'patient', desc: 'Complete longitudinal timeline with transfer milestones' },
    { step: 21, title: '21. Staff & Admin Roles', path: '/facility-staff', role: 'facility-staff', desc: 'OPD staff incoming care transfers, ASHA desk, and District Command' }
  ];

  const currentStepData = demoSteps.find(s => s.step === demoStep) || demoSteps[0];

  const goToStep = (stepNum) => {
    const target = demoSteps.find(s => s.step === stepNum);
    if (!target) return;
    setDemoStep(stepNum);
    if (stepNum >= 6) {
      setIsAuthenticated(true);
    }
    if (target.role) setUserRole(target.role);
    navigateTo(target.path);
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
