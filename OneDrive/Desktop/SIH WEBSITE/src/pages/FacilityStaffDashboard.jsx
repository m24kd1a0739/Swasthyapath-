import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Users, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  Share2, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const FacilityStaffDashboard = () => {
  const { 
    facilities, 
    setFacilities, 
    patientData, 
    advanceQueue, 
    addToast,
    navigateTo 
  } = useApp();

  const currentHospital = facilities[0]; // District Govt Hospital

  const [activeQueueCount, setActiveQueueCount] = useState(currentHospital.queueCount || 8);
  const [docAvailable, setDocAvailable] = useState(true);
  const [cbcTestAvailable, setCbcTestAvailable] = useState(true);
  const [paracetamolStock, setParacetamolStock] = useState('In Stock (3,400 tabs)');
  const [incomingReferralAccepted, setIncomingReferralAccepted] = useState(true);

  const handleUpdateQueue = (delta) => {
    const newCount = Math.max(1, activeQueueCount + delta);
    setActiveQueueCount(newCount);
    
    // Update central facilities state
    setFacilities(prev => prev.map(f => f.id === 'fac-1' ? { ...f, queueCount: newCount, estimatedWaitMins: newCount * 3 } : f));
    
    addToast('OPD Queue Updated', `District Hospital General OPD queue updated to ${newCount} patients.`, 'success');
  };

  const toggleDoctorStatus = () => {
    setDocAvailable(!docAvailable);
    addToast('Doctor Roster Updated', `Dr. Priya Sharma marked as ${!docAvailable ? 'Available on Duty' : 'On Leave'}.`, 'info');
  };

  const toggleTestStatus = () => {
    setCbcTestAvailable(!cbcTestAvailable);
    addToast('Diagnostic Lab Status', `CBC Test marked as ${!cbcTestAvailable ? 'Operational' : 'Machine Under Maintenance'}.`, 'info');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Staff Role Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem 2rem',
        color: 'white',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>
              Hospital OPD & Diagnostic Desk
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
            District Government Hospital Central
          </h2>
          <p style={{ color: '#CCFBF1', fontSize: '0.85rem', margin: 0 }}>
            OPD Supervisor Desk • Civil Lines, Bhopal • Live Capacity & Resource Controller
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', color: '#99F6E4', fontWeight: 700 }}>TODAY'S TOTAL OPD FOOTFALL</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>142 Patients</div>
        </div>
      </div>

      {/* Control Panels Grid */}
      <div className="grid-2">
        
        {/* Module 1: Live Queue Manager */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>OPD Live Queue Controller</h3>
            </div>
            <span className="badge badge-warning">Active Queue</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Adjust live patient queue length to simulate real-time hospital flow. Changes instantly reflect on patient screens.
          </p>

          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
          }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>CURRENT WAITING PATIENTS</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
                {activeQueueCount} Patients
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleUpdateQueue(-1)}
              >
                - 1 Patient
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => handleUpdateQueue(1)}
              >
                + 1 Patient
              </button>
            </div>
          </div>

          <button 
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              advanceQueue();
              addToast('Next Token Called', 'Now serving next OPD patient.', 'info');
            }}
          >
            <RefreshCw size={15} />
            <span>Call Next OPD Token (Advance Arun Queue)</span>
          </button>
        </div>

        {/* Module 2: Doctor Roster & Lab Status */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stethoscope size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Duty Roster & Lab Readiness</h3>
            </div>
            <span className="badge badge-success">Live Toggles</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
            {/* Doctor Toggle */}
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Dr. Priya Sharma (General Medicine)</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Room 4 • Status: {docAvailable ? 'On Duty' : 'Off Duty'}</div>
              </div>
              <button 
                className={`btn btn-sm ${docAvailable ? 'btn-success' : 'btn-secondary'}`}
                onClick={toggleDoctorStatus}
              >
                {docAvailable ? 'Available ✓' : 'On Leave'}
              </button>
            </div>

            {/* Lab Test Toggle */}
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Complete Blood Count (CBC) Analyzer</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Central Diagnostics • {cbcTestAvailable ? 'Ready' : 'Maintenance'}</div>
              </div>
              <button 
                className={`btn btn-sm ${cbcTestAvailable ? 'btn-success' : 'btn-danger'}`}
                onClick={toggleTestStatus}
              >
                {cbcTestAvailable ? 'Operational ✓' : 'Down'}
              </button>
            </div>
          </div>
        </div>

        {/* Module 3: Pharmacy Stock Controller */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Pill size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Govt Pharmacy Stock Updates</h3>
            </div>
            <span className="badge badge-primary">Jan Aushadhi</span>
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Paracetamol 650mg Tabs</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Counter 2 • Current: <strong>{paracetamolStock}</strong></div>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setParacetamolStock(prev => prev.includes('In Stock') ? 'Low Stock (120 tabs)' : 'In Stock (3,400 tabs)');
                addToast('Stock Updated', 'Paracetamol inventory updated across patient app.', 'info');
              }}
            >
              Toggle Stock
            </button>
          </div>
        </div>

        {/* Module 4: Incoming Referral Intake */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Share2 size={20} color="var(--purple)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Inter-Facility Referral Intake</h3>
            </div>
            <span className="badge badge-purple">1 Incoming</span>
          </div>

          <div style={{
            background: 'var(--purple-surface)',
            border: '1.5px solid var(--purple-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--purple-text)' }}>
                Arun Kumar (32 M) — Token #REF-MP-2026-8941
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                From: PHC Kolar • Reason: Pyrexia & CBC Evaluation
              </div>
            </div>

            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                setIncomingReferralAccepted(true);
                addToast('Referral Accepted', 'Arun Kumar registered in District Hospital OPD intake queue.', 'success');
              }}
            >
              <span>{incomingReferralAccepted ? 'Accepted ✓' : 'Accept Referral'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
