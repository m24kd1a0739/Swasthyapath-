import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Stethoscope, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Info,
  Calendar,
  Milestone
} from 'lucide-react';

export const AiTriageResult = () => {
  const { 
    patientData, 
    navigateTo, 
    setEmergencyModalOpen, 
    t 
  } = useApp();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const triage = patientData.aiTriage;
  const symptoms = patientData.symptoms;

  if (isLoading) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '3rem auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3.5rem 2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-surface)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '2px solid var(--primary-border)'
          }}>
            <RefreshCw size={32} className="animate-spin" />
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Analyzing your health information...
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Comparing clinical pathways, symptom red flags, and public facility capabilities in Bhopal District.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '820px', margin: '0 auto' }}>
      
      {/* Navigation Back */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1rem', paddingLeft: 0 }}
        onClick={() => navigateTo('symptoms')}
      >
        <ArrowLeft size={16} />
        <span>Re-enter Symptoms</span>
      </button>

      <div className="card" style={{ padding: '2rem', borderTop: '5px solid var(--primary)' }}>
        
        {/* Recommendation Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary" style={{ gap: '0.35rem' }}>
                <Sparkles size={12} />
                <span>AI Clinical Triage Result</span>
              </span>
              <span className="badge badge-success">
                Priority: {triage.priority}
              </span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Doctor Consultation Recommended
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
              Based on reported symptoms: <em>"{symptoms.text}"</em>
            </p>
          </div>

          <div style={{
            background: 'var(--primary-surface)',
            border: '1.5px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.6rem 1rem',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-text)', textTransform: 'uppercase' }}>Recommended Care Level</div>
            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--dark-navy)' }}>Secondary Public Facility (District Hospital)</div>
          </div>
        </div>

        {/* Clinical Rationale Box */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-light)'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Info size={16} color="var(--primary)" />
            <span>Why this care level was selected:</span>
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55, margin: 0 }}>
            {triage.reason}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Required Service: </span>
              <strong>General Physician (MD/MBBS)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Required Diagnostic: </span>
              <strong>Complete Blood Count (CBC)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Expected Pharmacy: </span>
              <strong>Antipyretics & Hydration</strong>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div style={{
          background: 'var(--warning-surface)',
          border: '1px solid var(--warning-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.1rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <AlertTriangle size={18} color="var(--warning-text)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--warning-text)' }}>
              Public Health Disclaimer
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--warning-text)', margin: '0.15rem 0 0', lineHeight: 1.4 }}>
              {triage.disclaimer}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary btn-lg"
            style={{ flex: '1 1 240px', justifyContent: 'center' }}
            onClick={() => navigateTo('facilities')}
          >
            <Building2 size={18} />
            <span>Find Best Government Facility</span>
            <ArrowRight size={18} />
          </button>

          <button 
            className="btn btn-secondary btn-lg"
            style={{ flex: '1 1 180px', justifyContent: 'center' }}
            onClick={() => navigateTo('journey')}
          >
            <Milestone size={18} />
            <span>View My Journey</span>
          </button>

          <button 
            className="btn btn-danger-outline btn-lg"
            style={{ padding: '0.75rem 1.25rem' }}
            onClick={() => setEmergencyModalOpen(true)}
          >
            <ShieldAlert size={18} />
            <span>Emergency SOS</span>
          </button>
        </div>

      </div>
    </div>
  );
};
