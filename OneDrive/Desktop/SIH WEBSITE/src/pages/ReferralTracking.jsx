import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Share2, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Stethoscope, 
  FileText, 
  RefreshCw, 
  MapPin,
  Sparkles
} from 'lucide-react';

export const ReferralTracking = () => {
  const { 
    patientData, 
    progressReferralStage, 
    navigateTo, 
    addToast 
  } = useApp();

  const ref = patientData.referral || {};
  const stages = ref.stages || [];

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

      <div className="card" style={{ padding: '2rem', borderTop: '5px solid var(--purple)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-purple">
                <Share2 size={12} />
                <span>Inter-Facility Digital Referral Grid</span>
              </span>
              <span className="badge badge-success">
                Status: {ref.status || 'Accepted'}
              </span>
            </div>

            <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>
              Referral Token: {ref.referralId || 'REF-MP-2026-8941'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Referred by <strong>Dr. Priya Sharma</strong> • Digital tracking across secondary & tertiary public hospitals
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={progressReferralStage}
          >
            <RefreshCw size={14} />
            <span>Simulate Status Advance</span>
          </button>
        </div>

        {/* Source & Destination Facilities Card */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '2rem',
          border: '1px solid var(--border-light)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              SOURCE FACILITY
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {ref.sourceFacility || 'PHC Kolar / District OPD'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Referring Officer: Dr. Priya Sharma (General OPD)
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="desktop-only">
            <span style={{ fontSize: '1.5rem', color: 'var(--purple)' }}>➔</span>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--purple-text)', textTransform: 'uppercase' }}>
              DESTINATION FACILITY
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {ref.destinationFacility || 'District Government Hospital (Internal Medicine Unit)'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Clinical Unit: Secondary Specialist OPD
            </div>
          </div>
        </div>

        {/* Reason for Referral */}
        <div style={{
          background: 'var(--purple-surface)',
          border: '1px solid var(--purple-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.1rem',
          marginBottom: '2rem',
          fontSize: '0.84rem'
        }}>
          <strong style={{ color: 'var(--purple-text)' }}>Clinical Referral Reason:</strong> {ref.reason || 'Diagnostic evaluation of 3-day pyrexia with baseline CBC workup and physician review'}
        </div>

        {/* Visual 5-Stage Step Timeline */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Referral Progression Milestones
          </h4>

          <div className="timeline">
            {stages.map((stg, idx) => {
              const isCompleted = stg.done;
              const isCurrent = idx === ref.currentStage;

              return (
                <div key={idx} className="timeline-item">
                  <div className={`timeline-node ${isCompleted ? 'completed' : isCurrent ? 'current' : ''}`}>
                    {isCompleted ? <CheckCircle2 size={12} /> : <span>{idx + 1}</span>}
                  </div>

                  <div style={{
                    background: isCurrent ? 'var(--primary-surface)' : 'var(--bg-card)',
                    border: `1px solid ${isCurrent ? 'var(--primary-border)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    boxShadow: isCurrent ? 'var(--shadow-sm)' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isCurrent ? 'var(--primary-text)' : 'var(--text-main)' }}>
                        {stg.title}
                      </div>
                      <span className={`badge ${isCompleted ? 'badge-success' : isCurrent ? 'badge-warning' : 'badge-neutral'}`} style={{ fontSize: '0.68rem' }}>
                        {isCompleted ? 'Done ✓' : isCurrent ? 'Active Stage' : 'Pending'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Timestamp / Target: {stg.date}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('care-plan')}
          >
            <span>View Updated Care Plan</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => navigateTo('follow-up')}
          >
            <Calendar size={16} />
            <span>Manage Follow-Up Review</span>
          </button>
        </div>

      </div>
    </div>
  );
};
