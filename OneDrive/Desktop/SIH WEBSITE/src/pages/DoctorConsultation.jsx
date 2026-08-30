import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Stethoscope, 
  User, 
  FileText, 
  Pill, 
  FlaskConical, 
  Calendar, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Sparkles,
  Activity,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DoctorConsultation = () => {
  const { 
    patientData, 
    saveConsultation, 
    navigateTo, 
    addToast,
    playAudioChime 
  } = useApp();

  const [assessmentNotes, setAssessmentNotes] = useState(
    patientData.consultation?.clinicalNotes || 
    "Patient presents with 3-day history of moderate pyrexia, associated with generalized fatigue and body ache. Chest clear, vitals stable. Clinical assessment: Acute Febrile Illness (likely viral syndrome). Order baseline CBC and start antipyretics."
  );

  const [prescribedMed, setPrescribedMed] = useState('Paracetamol 650mg');
  const [dosageFrequency, setDosageFrequency] = useState('1 tab tid (8 AM, 2 PM, 8 PM) x 5 days');
  const [testOrder, setTestOrder] = useState('Complete Blood Count (CBC) with Platelets');
  const [followUpDays, setFollowUpDays] = useState(7);
  const [createReferralStandby, setCreateReferralStandby] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    saveConsultation(assessmentNotes, null, null, followUpDays, createReferralStandby);
    
    setSavedSuccess(true);
    playAudioChime('success');
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    
    addToast('Consultation Saved', 'Prescription, CBC lab order, care plan, and reminders updated.', 'success');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Back link */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1rem', paddingLeft: 0 }}
        onClick={() => navigateTo('dashboard')}
      >
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </button>

      <div className="card" style={{ padding: '2rem', borderTop: '5px solid var(--primary)' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <Stethoscope size={13} />
                <span>Doctor OPD Consultation Simulator</span>
              </span>
              <span className="badge badge-success">Live Session</span>
            </div>

            <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>
              OPD Consultation Record
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>
              Attending Physician: <strong>Dr. Priya Sharma (MD, Senior Specialist)</strong> • OPD Room 4
            </p>
          </div>

          {/* Patient Quick Vitals Card */}
          <div style={{
            background: 'var(--primary-surface)',
            border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.6rem 1rem',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-text)' }}>PATIENT VITALS</div>
            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--dark-navy)', marginTop: '0.2rem' }}>
              BP: 118/78 • Pulse: 84 • Temp: 100.8°F • SpO2: 98%
            </div>
          </div>
        </div>

        {/* Patient Case Overview */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          border: '1px solid var(--border-light)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Patient: {patientData.profile.fullName} (32 Yrs / Male) • ABHA: {patientData.profile.abhaId}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Chief Complaint: <strong>“{patientData.symptoms?.text || 'Fever for 3 days with weakness'}”</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <span className="badge badge-neutral">Triage: Normal Priority</span>
            <span className="badge badge-primary">District OPD</span>
          </div>
        </div>

        {!savedSuccess ? (
          <form onSubmit={handleSave}>
            
            {/* Section 1: Clinical Assessment & Notes */}
            <div className="form-group" style={{ marginBottom: '1.35rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} color="var(--primary)" />
                <span>1. Clinical Assessment & Doctor Notes:</span>
              </label>
              <textarea
                className="form-textarea"
                rows={3}
                value={assessmentNotes}
                onChange={e => setAssessmentNotes(e.target.value)}
                style={{ fontSize: '0.92rem', lineHeight: 1.5 }}
              />
            </div>

            {/* Section 2: Prescriptions */}
            <div style={{ marginBottom: '1.35rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <Pill size={16} color="var(--primary)" />
                <span>2. Prescribed Medicines (Auto-synced with Medicine Reminders & Pharmacy):</span>
              </label>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '0.5rem'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    Tab. Paracetamol 650mg
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Dosage: 1 Tab TID (8:00 AM, 2:00 PM, 8:00 PM) after food x 5 days • Available at Govt Pharmacy Counter 2
                  </div>
                </div>
                <span className="badge badge-success">In Stock at Facility</span>
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    Oral Rehydration Salts (ORS) Sachets
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Dosage: 1 sachet in 1 Litre boiled water daily x 3 days • Hydration Support
                  </div>
                </div>
                <span className="badge badge-success">Free Jan Aushadhi</span>
              </div>
            </div>

            {/* Section 3: Diagnostic Tests Order */}
            <div style={{ marginBottom: '1.35rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <FlaskConical size={16} color="var(--primary)" />
                <span>3. Diagnostic Laboratory Investigation Order:</span>
              </label>

              <div style={{
                background: 'var(--primary-surface)',
                border: '1.5px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary-text)' }}>
                    Complete Blood Count (CBC) with Platelet Count
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Facility: District Hospital Diagnostic Center • Processing Time: ~15 mins • Free under Govt Scheme
                  </div>
                </div>
                <span className="badge badge-primary">Standard OPD Lab</span>
              </div>
            </div>

            {/* Section 4: Follow-up & Standby Referral */}
            <div className="grid-2" style={{ marginBottom: '1.75rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={15} color="var(--primary)" />
                  <span>4. Schedule Follow-up Review</span>
                </label>
                <select 
                  className="form-select"
                  value={followUpDays}
                  onChange={e => setFollowUpDays(Number(e.target.value))}
                >
                  <option value={3}>3 Days (Sep 2, 2026)</option>
                  <option value={7}>7 Days (Sep 4, 2026 - Recommended)</option>
                  <option value={14}>14 Days (Sep 11, 2026)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Share2 size={15} color="var(--primary)" />
                  <span>5. Referral Standby</span>
                </label>
                <select 
                  className="form-select"
                  value={createReferralStandby ? 'yes' : 'no'}
                  onChange={e => setCreateReferralStandby(e.target.value === 'yes')}
                >
                  <option value="no">Routine Secondary OPD (No referral required)</option>
                  <option value="yes">Tertiary Specialist Standby (AIIMS / Medical College)</option>
                </select>
              </div>
            </div>

            {/* Save CTA */}
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              <CheckCircle2 size={18} />
              <span>Save Consultation & Update Patient Journey</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          /* Consultation Saved Confirmation */
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '1rem 0' }}>
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

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Consultation added to your health journey.
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 1.75rem', lineHeight: 1.5 }}>
              The prescription has been synced to your <strong>Medicine Reminder</strong>, the <strong>CBC blood test</strong> is ready for sample collection, and your <strong>Care Plan</strong> is updated.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigateTo('tests')}
              >
                <FlaskConical size={18} />
                <span>Next: View Lab Tests & Generate CBC Report</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigateTo('medicine-reminders')}
              >
                <Pill size={18} />
                <span>Check Medicine Reminders (2 PM Due)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
