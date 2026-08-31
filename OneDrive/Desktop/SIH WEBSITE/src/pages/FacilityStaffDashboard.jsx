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
  Eye,
  FileText,
  Lock,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const FacilityStaffDashboard = () => {
  const { 
    facilities, 
    setFacilities, 
    patientData, 
    advanceQueue, 
    acceptCareTransfer,
    addToast,
    navigateTo 
  } = useApp();

  const currentHospital = facilities[0]; // District Govt Hospital

  const [activeQueueCount, setActiveQueueCount] = useState(currentHospital.queueCount || 8);
  const [docAvailable, setDocAvailable] = useState(true);
  const [cbcTestAvailable, setCbcTestAvailable] = useState(true);
  const [paracetamolStock, setParacetamolStock] = useState('In Stock (3,400 tabs)');
  
  // Care Transfer State
  const [transferTab, setTransferTab] = useState('incoming'); // 'incoming' | 'outgoing'
  const [viewRecordsModalOpen, setViewRecordsModalOpen] = useState(false);

  const transferData = patientData.careTransfer;
  const patientName = patientData.profile?.fullName || 'Citizen';
  const abhaId = patientData.profile?.abhaId || '91-8472-9102-4821';

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

  const handleAcceptTransfer = () => {
    acceptCareTransfer(transferData?.transferId);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
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
              Hospital OPD, Diagnostic & Care Transfer Desk
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
            District Government Hospital Central
          </h2>
          <p style={{ color: '#CCFBF1', fontSize: '0.85rem', margin: 0 }}>
            OPD Supervisor Desk • Civil Lines, Bhopal • Live Capacity, Care Transfers & Resource Controller
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', color: '#99F6E4', fontWeight: 700 }}>TODAY'S TOTAL OPD FOOTFALL</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>142 Patients</div>
        </div>
      </div>

      {/* FEATURE: CARE TRANSFERS (Incoming / Outgoing Transfer Manager) */}
      <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Share2 size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Inter-Facility Care Transfers
              </h3>
              <span className="badge badge-primary">
                {transferData?.hasTransfer ? '1 Incoming' : 'Active Channel'}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
              Continuity of care protocol: Review incoming patient transfers and inspect permitted medical records.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button 
              className={`btn btn-sm ${transferTab === 'incoming' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTransferTab('incoming')}
            >
              Incoming Transfers ({transferData?.hasTransfer ? 1 : 0})
            </button>
            <button 
              className={`btn btn-sm ${transferTab === 'outgoing' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTransferTab('outgoing')}
            >
              Outgoing Transfers (0)
            </button>
          </div>
        </div>

        {transferTab === 'incoming' ? (
          transferData?.hasTransfer ? (
            <div style={{
              background: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 100%)',
              border: '1.5px solid var(--primary-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span className="badge badge-primary" style={{ fontWeight: 800 }}>NEW CARE TRANSFER</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ID: {transferData.transferId}</span>
                  <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{transferData.status}</span>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Patient: {patientName} (ABHA: {abhaId})
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  <strong>From:</strong> {transferData.sourceFacilityName || 'PHC Kolar'} ➔ <strong>To:</strong> {transferData.destinationFacilityName || 'District Govt Hospital'}
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--primary-text)', marginTop: '0.25rem' }}>
                  Reason: <em>“{transferData.reason}”</em> • <strong>{(transferData.sharedRecords || []).length} Records Shared with Consent</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setViewRecordsModalOpen(true)}
                >
                  <Eye size={15} />
                  <span>View Shared Records ({(transferData.sharedRecords || []).length})</span>
                </button>

                <button 
                  className={`btn btn-sm ${transferData.currentStage >= 4 ? 'btn-success' : 'btn-primary'}`}
                  onClick={handleAcceptTransfer}
                  disabled={transferData.currentStage >= 4}
                >
                  <CheckCircle2 size={15} />
                  <span>{transferData.currentStage >= 4 ? 'Accepted (Token #A-08 Active)' : 'Accept Care Transfer'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
              No pending incoming care transfers at this time.
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            No outgoing care transfers active.
          </div>
        )}
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
              addToast('Next Token Called', `Now serving next OPD patient.`, 'info');
            }}
          >
            <RefreshCw size={15} />
            <span>Call Next OPD Token (Advance Live Queue)</span>
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

        {/* Module 4: Inter-Facility Referral Intake */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Share2 size={20} color="var(--purple)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Inter-Facility Referral Intake</h3>
            </div>
            <span className="badge badge-purple">1 Active</span>
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
                {patientName} — Token #REF-MP-2026-8941
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                From: PHC Kolar • Reason: Pyrexia & CBC Evaluation
              </div>
            </div>

            <button 
              className="btn btn-primary btn-sm"
              onClick={() => addToast('Referral Verified', `${patientName} registered in District Hospital OPD intake queue.`, 'success')}
            >
              <span>Verified ✓</span>
            </button>
          </div>
        </div>

      </div>

      {/* Staff View Shared Records Modal (Privacy-Compliant Inspection) */}
      {viewRecordsModalOpen && (
        <div className="modal-overlay" onClick={() => setViewRecordsModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Shared Health Records for {patientName}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  Transfer ID: {transferData?.transferId} • ABHA Consent Verified
                </p>
              </div>
              <button className="btn-icon" onClick={() => setViewRecordsModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div style={{
                background: 'var(--primary-surface)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                fontSize: '0.82rem',
                color: 'var(--primary-text)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Lock size={16} />
                <span>Hospital staff can view <strong>strictly only the records</strong> the patient explicitly authorized.</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(transferData?.sharedRecords || []).map((rec, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.9rem 1.15rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                        ✓ {rec.label || rec.title}
                      </span>
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Patient Authorized</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                      {rec.desc || 'Complete clinical parameters transferred into hospital EMR.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setViewRecordsModalOpen(false)}>
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setViewRecordsModalOpen(false);
                  handleAcceptTransfer();
                }}
              >
                <CheckCircle2 size={16} />
                <span>Accept Care Transfer & Issue OPD Token</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacilityStaffDashboard;
