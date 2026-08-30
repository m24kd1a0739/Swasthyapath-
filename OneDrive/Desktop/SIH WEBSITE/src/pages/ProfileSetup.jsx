import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, User, Settings, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProfileSetup = () => {
  const { 
    profileWizardOpen, 
    setProfileWizardOpen, 
    patientData, 
    setPatientData, 
    navigateTo, 
    addToast 
  } = useApp();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: patientData.profile.fullName || 'Arun Kumar',
    dob: patientData.profile.dob || '1994-06-14',
    gender: patientData.profile.gender || 'Male',
    location: patientData.profile.location || 'Civil Lines, Bhopal',
    language: patientData.profile.preferredLanguage || 'en',
    emergencyName: patientData.profile.emergencyContact?.name || 'Sunita Kumar',
    emergencyPhone: patientData.profile.emergencyContact?.phone || '+91 98765 43211',
    emergencyRel: patientData.profile.emergencyContact?.relationship || 'Spouse',
    highContrastPref: false,
    audioAssistance: false
  });

  if (!profileWizardOpen) return null;

  const handleNext = () => {
    if (step === 2) {
      // Complete profile
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

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const handleFinish = () => {
    setProfileWizardOpen(false);
    navigateTo('dashboard');
    addToast('Profile Configured', 'Your SwasthyaPath health profile is active and ready.', 'success');
  };

  return (
    <div className="modal-overlay">
      <div 
        className="modal-container" 
        style={{ maxWidth: '580px', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Step Progress Bar */}
        <div style={{ background: 'var(--bg-surface)', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
              Step {step} of 3
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {step === 1 && 'Personal Details'}
              {step === 2 && 'Preferences & Emergency'}
              {step === 3 && 'Profile Setup Complete'}
            </span>
          </div>

          <div style={{ width: '100%', height: '6px', background: 'var(--border-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{
              width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
              height: '100%',
              background: 'var(--primary)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Step 1: Personal Details
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Verify your basic demographic info linked with your National Health ID.
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Step 2: Preferences & Emergency Contact
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Configure language and safety emergency contact for SOS dispatch.
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
                <label className="form-label">Emergency Phone Number</label>
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
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--success-surface)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                border: '2px solid var(--success-border)'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Your SwasthyaPath profile is ready.
              </h2>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                Your digital ABHA record is synchronized. You can now use AI symptom navigation, find government health facilities, and track your complete care journey.
              </p>

              <div style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.2rem',
                display: 'inline-block',
                textAlign: 'left',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>Patient: {form.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ABHA ID: 91-8472-9102-4821 • Location: {form.location}</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
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
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleFinish}>
              <span>Continue to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
