import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  User, 
  Settings, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Globe,
  Phone,
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProfileSetupPage = () => {
  const { 
    navigateTo, 
    pendingRegData, 
    patientData, 
    setPatientData, 
    setIsAuthenticated, 
    addToast,
    highContrast,
    setHighContrast 
  } = useApp();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: pendingRegData.fullName || 'Arun Kumar',
    dob: pendingRegData.dob || '1994-06-14',
    gender: pendingRegData.gender || 'Male',
    location: pendingRegData.location || 'Civil Lines, Bhopal',
    language: pendingRegData.language || 'en',
    emergencyName: 'Sunita Kumar',
    emergencyRel: 'Spouse',
    emergencyPhone: '+91 98765 43211',
    highContrastPref: highContrast
  });

  const handleNext = () => {
    if (step === 2) {
      // Complete profile and commit to patient state
      setPatientData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          fullName: form.name,
          dob: form.dob,
          gender: form.gender,
          location: form.location,
          preferredLanguage: form.language,
          emergencyContact: {
            name: form.emergencyName,
            phone: form.emergencyPhone,
            relationship: form.emergencyRel,
            permissions: {
              shareAppointments: true,
              shareEmergency: true,
              shareCareUpdates: true
            }
          }
        }
      }));

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    setIsAuthenticated(true);
    addToast('Profile Activated', `Welcome to SwasthyaPath, ${form.name}!`, 'success');
    navigateTo('/home');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '1.5rem auto', padding: '0 1rem' }}>
      
      <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Step Progress Bar */}
        <div style={{ background: 'var(--bg-surface)', padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--primary)' }}>
              Step {step} of 3
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {step === 1 && 'Personal Details'}
              {step === 2 && 'Preferences & Emergency Contact'}
              {step === 3 && 'Profile Setup Complete'}
            </span>
          </div>

          <div style={{ width: '100%', height: '6px', background: 'var(--border-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{
              width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%',
              height: '100%',
              background: 'var(--primary)',
              transition: 'width 0.35s ease'
            }} />
          </div>
        </div>

        {/* Wizard Body */}
        <div style={{ padding: '2rem 1.75rem' }}>
          
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Step 1: Personal Demographics
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Confirm your demographic information linked with your digital ABHA health record.
              </p>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={form.dob}
                    onChange={e => setForm({ ...form, dob: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select 
                    className="form-select"
                    value={form.gender}
                    onChange={e => setForm({ ...form, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Primary District / Location</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Step 2: Preferences & Emergency Contact
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Set your language, accessibility preferences, and emergency contact for SOS dispatch.
              </p>

              <div className="form-group">
                <label className="form-label">Preferred Application Language</label>
                <select 
                  className="form-select"
                  value={form.language}
                  onChange={e => setForm({ ...form, language: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Emergency Contact Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={form.emergencyName}
                    onChange={e => setForm({ ...form, emergencyName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Relationship</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={form.emergencyRel}
                    onChange={e => setForm({ ...form, emergencyRel: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Emergency Contact Mobile</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={form.emergencyPhone}
                  onChange={e => setForm({ ...form, emergencyPhone: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--success-surface)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                border: '2px solid var(--success-border)'
              }}>
                <CheckCircle2 size={40} />
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Your SwasthyaPath profile is ready.
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.55 }}>
                Your digital ABHA record is synchronized with the state healthcare navigation grid. You can now track your symptoms, hospital queues, lab tests, and prescriptions.
              </p>

              <div style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.25rem',
                display: 'inline-block',
                textAlign: 'left',
                border: '1px solid var(--border-light)',
                marginBottom: '0.5rem'
              }}>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)' }}>Patient: {form.name} (32 M)</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ABHA ID: 91-8472-9102-4821 • Location: {form.location}</div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer */}
        <div style={{ padding: '1rem 1.75rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: step > 1 && step < 3 ? 'space-between' : 'flex-end' }}>
          {step > 1 && step < 3 && (
            <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          )}

          {step < 3 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={handleComplete}>
              <span>Continue to Home Dashboard</span>
              <ArrowRight size={17} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
