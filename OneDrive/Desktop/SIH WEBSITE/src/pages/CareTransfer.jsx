import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Share2, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Pill, 
  FlaskConical, 
  Calendar, 
  CheckSquare, 
  Clock, 
  Eye, 
  Sparkles, 
  Users, 
  RefreshCw,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CareTransfer = () => {
  const { 
    patientData, 
    facilities, 
    initiateCareTransfer, 
    advanceTransferStage, 
    navigateTo, 
    addToast,
    playAudioChime 
  } = useApp();

  const currentTransfer = patientData.careTransfer;
  const currentFacility = facilities.find(f => f.id === 'fac-2') || facilities[1] || facilities[0]; // PHC Kolar default source
  const defaultDestination = facilities.find(f => f.id === 'fac-1') || facilities[0]; // District Govt Hospital

  const [step, setStep] = useState(currentTransfer ? 3 : 1); // 1: Reason & Facility, 2: Select Records, 3: Status
  const [selectedDestFacility, setSelectedDestFacility] = useState(defaultDestination);
  const [transferReason, setTransferReason] = useState("Required diagnostic blood testing & specialist physician examination unavailable at current facility");
  
  // Granular Patient-Controlled Record Selection (Medical Privacy Principle)
  const [selectedRecords, setSelectedRecords] = useState({
    consultation: true,
    prescriptions: true,
    labReports: true,
    referral: true,
    carePlan: true,
    appointments: false
  });

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const availableRecordsList = [
    {
      id: 'consultation',
      title: 'Doctor Consultation Summary & Clinical Notes',
      desc: 'Diagnosis: Acute Febrile Illness • Examining Doctor: Dr. Priya Sharma',
      icon: FileText,
      badge: 'Clinical Notes',
      category: 'consultation'
    },
    {
      id: 'prescriptions',
      title: 'Previous Prescriptions & Active Medication',
      desc: 'Tab. Paracetamol 650mg TID + ORS Sachets with adherence history',
      icon: Pill,
      badge: 'Pharmacy Rx',
      category: 'prescription'
    },
    {
      id: 'labReports',
      title: 'Diagnostic Test Results & Lab Reports',
      desc: 'CBC Blood Count: Hemoglobin 14.2 g/dL, Platelets 185k (Normal)',
      icon: FlaskConical,
      badge: 'Pathology Lab',
      category: 'test'
    },
    {
      id: 'referral',
      title: 'Inter-Facility Referral Information',
      desc: 'Digital Referral Token #REF-MP-2026-8941 registered in state health grid',
      icon: Share2,
      badge: 'Referral Token',
      category: 'referral'
    },
    {
      id: 'carePlan',
      title: 'Current Active Care Plan & Checklists',
      desc: 'Completed consultation, scheduled follow-up for Sep 4, hydration regimen',
      icon: CheckSquare,
      badge: 'Care Protocol',
      category: 'careplan'
    },
    {
      id: 'appointments',
      title: 'Relevant Past Appointment & Queue History',
      desc: 'Previous token #A-08 at Primary Health Centre Kolar',
      icon: Clock,
      badge: 'OPD Queue History',
      category: 'queue'
    }
  ];

  const selectedCount = Object.values(selectedRecords).filter(Boolean).length;

  const handleToggleRecord = (id) => {
    setSelectedRecords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleConfirmTransfer = () => {
    setConfirmModalOpen(false);

    const recordsToTransfer = availableRecordsList
      .filter(r => selectedRecords[r.id])
      .map(r => ({
        id: r.id,
        type: r.category,
        label: r.title,
        desc: r.desc,
        shared: true
      }));

    initiateCareTransfer(
      currentFacility.name,
      selectedDestFacility.name,
      transferReason,
      recordsToTransfer,
      selectedDestFacility.id
    );

    playAudioChime('success');
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setStep(3);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Back button */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ paddingLeft: 0, width: 'fit-content' }}
        onClick={() => navigateTo('dashboard')}
      >
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </button>

      {/* Main Card */}
      <div className="card" style={{ padding: '2rem', borderTop: '5px solid var(--primary)' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <Share2 size={13} />
                <span>Care Continuity & Treatment Transfer</span>
              </span>
              <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                ABHA Consent Protocol
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              Continue Care at Another Facility
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>
              Patient: <strong>{patientData.profile.fullName || 'Citizen'}</strong> (ABHA: {patientData.profile.abhaId}) • Seamless healthcare transitions without lost history
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-neutral" style={{ padding: '0.35rem 0.65rem' }}>
              Prototype / Simulated Transfer Status
            </span>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div style={{ background: 'var(--bg-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.75rem', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary)' }}>
              Step {step} of 3: {step === 1 ? 'Select Facility & Transfer Reason' : step === 2 ? 'Select Records to Share (Privacy)' : 'Care Transfer Status & Hospital Reception'}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {step === 1 && 'Facility Selection'}
              {step === 2 && `${selectedCount} of ${availableRecordsList.length} Records Selected`}
              {step === 3 && 'Active Transfer'}
            </span>
          </div>

          <div style={{ width: '100%', height: '6px', background: 'var(--border-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{
              width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%',
              height: '100%',
              background: 'var(--primary)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* STEP 1: Current Facility Limitation & Destination Selection */}
        {step === 1 && (
          <div className="animate-fade-in">
            
            {/* Warning / Scenario Banner */}
            <div style={{
              background: 'var(--warning-surface)',
              border: '1.5px solid var(--warning-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.15rem 1.35rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              marginBottom: '1.5rem'
            }}>
              <AlertTriangle size={22} color="var(--warning-text)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--warning-text)', marginBottom: '0.2rem' }}>
                  Your current facility may not provide the required service.
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--warning-text)', lineHeight: 1.45, margin: 0 }}>
                  Current Facility: <strong>{currentFacility.name}</strong>. The medical team has determined that specialized diagnostics (CBC Analyzer) or Senior Medical Specialists are required for your fever evaluation.
                </p>
              </div>
            </div>

            {/* Current vs New Facility Comparison Card */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem'
            }}>
              {/* Current Facility Box */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  CURRENT LOCATION / SOURCE FACILITY
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                  {currentFacility.name}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.15rem 0 0.5rem' }}>
                  {currentFacility.address}
                </p>
                <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                  Service Unavailable: Advanced Blood Lab
                </span>
              </div>

              {/* Destination Facility Selector Box */}
              <div style={{
                background: 'var(--primary-surface)',
                border: '1.5px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-text)', textTransform: 'uppercase' }}>
                  RECOMMENDED DESTINATION FACILITY
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-navy)', marginTop: '0.25rem' }}>
                  {selectedDestFacility.name}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.15rem 0 0.5rem' }}>
                  {selectedDestFacility.address} • 📍 {selectedDestFacility.distanceKm} km away
                </p>
                <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                  Full Capabilities: CBC Lab + MD Specialists Ready
                </span>
              </div>
            </div>

            {/* Select Transfer Reason */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ fontWeight: 700 }}>
                1. Reason for Treatment Transfer:
              </label>
              <select 
                className="form-select"
                value={transferReason}
                onChange={e => setTransferReason(e.target.value)}
                style={{ fontSize: '0.92rem' }}
              >
                <option value="Required diagnostic blood testing & specialist physician examination unavailable at current facility">
                  Required diagnostic blood testing & specialist physician examination unavailable at current facility
                </option>
                <option value="Advanced imaging (X-Ray / Ultrasound) & diagnostic laboratory required">
                  Advanced imaging (X-Ray / Ultrasound) & diagnostic laboratory required
                </option>
                <option value="Specialist Internal Medicine / Cardiology physician consultation needed">
                  Specialist Internal Medicine / Cardiology physician consultation needed
                </option>
                <option value="Medication / Injectable treatment stock unavailable at current PHC">
                  Medication / Injectable treatment stock unavailable at current PHC
                </option>
                <option value="Patient relocated / closer public healthcare facility preference">
                  Patient relocated / closer public healthcare facility preference
                </option>
              </select>
            </div>

            {/* Facility Ranking Options */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ fontWeight: 700, marginBottom: '0.6rem', display: 'block' }}>
                2. Choose Destination Government Facility (Ranked by Match):
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {facilities.map(fac => {
                  const isSelected = selectedDestFacility.id === fac.id;
                  return (
                    <div 
                      key={fac.id}
                      onClick={() => setSelectedDestFacility(fac)}
                      style={{
                        background: isSelected ? 'var(--primary-surface)' : 'var(--bg-card)',
                        border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-light)'}`,
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <input 
                          type="radio" 
                          name="destFacility" 
                          checked={isSelected}
                          onChange={() => setSelectedDestFacility(fac)}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)' }}>
                              {fac.name}
                            </span>
                            <span className={`badge ${fac.badge === 'BEST MATCH' ? 'badge-primary' : 'badge-neutral'}`} style={{ fontSize: '0.68rem' }}>
                              {fac.badge}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            {fac.type} • 📍 {fac.distanceKm} km away • {fac.address}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          Queue: {fac.queueCount} Waiting (~{fac.estimatedWaitMins}m wait)
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 600 }}>
                          Doctor On Duty: {fac.doctors[0]?.name || 'Available'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => setStep(2)}
              >
                <span>Continue to Health Record Selection</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: Select Records to Share (Medical Privacy & ABHA Consent) */}
        {step === 2 && (
          <div className="animate-fade-in">
            
            <div style={{
              background: 'var(--primary-surface)',
              border: '1.5px solid var(--primary-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.4rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Lock size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-text)' }}>
                  Patient-Controlled Record Privacy
                </h3>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                Your existing healthcare information can be shared with <strong>{selectedDestFacility.name}</strong> so the incoming medical team can understand your previous symptoms, prescriptions, and test results.
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary-text)', fontWeight: 700, marginTop: '0.5rem' }}>
                🔒 Only records you explicitly select will be transferred. You retain full control.
              </div>
            </div>

            {/* Record Checkboxes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 800 }}>
                  Select Health Records to Transfer ({selectedCount} of {availableRecordsList.length} Selected):
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.78rem', color: 'var(--primary)', padding: 0 }}
                    onClick={() => setSelectedRecords({
                      consultation: true,
                      prescriptions: true,
                      labReports: true,
                      referral: true,
                      carePlan: true,
                      appointments: true
                    })}
                  >
                    Select All
                  </button>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <button 
                    type="button" 
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.78rem', color: 'var(--text-muted)', padding: 0 }}
                    onClick={() => setSelectedRecords({
                      consultation: false,
                      prescriptions: false,
                      labReports: false,
                      referral: false,
                      carePlan: false,
                      appointments: false
                    })}
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {availableRecordsList.map(rec => {
                  const Icon = rec.icon;
                  const isChecked = selectedRecords[rec.id];

                  return (
                    <label 
                      key={rec.id}
                      style={{
                        background: isChecked ? 'var(--bg-card)' : 'var(--bg-surface)',
                        border: `1.5px solid ${isChecked ? 'var(--primary)' : 'var(--border-light)'}`,
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem 1.15rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isChecked ? 'var(--shadow-xs)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleToggleRecord(rec.id)}
                          style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                        />
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: 'var(--radius-md)',
                          background: isChecked ? 'var(--primary-surface)' : 'var(--border-light)',
                          color: isChecked ? 'var(--primary)' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.94rem', color: isChecked ? 'var(--text-main)' : 'var(--text-muted)' }}>
                            {rec.title}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            {rec.desc}
                          </div>
                        </div>
                      </div>

                      <span className={`badge ${isChecked ? 'badge-primary' : 'badge-neutral'}`} style={{ fontSize: '0.7rem' }}>
                        {rec.badge}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setReviewModalOpen(true)}
                  disabled={selectedCount === 0}
                >
                  <Eye size={16} />
                  <span>Review Records ({selectedCount})</span>
                </button>

                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => setConfirmModalOpen(true)}
                  disabled={selectedCount === 0}
                >
                  <span>Share with {selectedDestFacility.name}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: Transfer Status Timeline & Simulation */}
        {step === 3 && (
          <div className="animate-fade-in">
            
            {/* Status Header Badge */}
            <div style={{
              background: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem 1.75rem',
              color: 'white',
              marginBottom: '1.75rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    <CheckCircle2 size={13} />
                    <span>CARE TRANSFER INITIATED</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>
                    Transfer ID: {currentTransfer?.transferId || 'TRF-MP-2026-9281'}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#CCFBF1', margin: '0.2rem 0 0' }}>
                    From <strong>{currentTransfer?.sourceFacilityName || currentFacility.name}</strong> ➔ <strong>{currentTransfer?.destinationFacilityName || selectedDestFacility.name}</strong>
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: '#99F6E4', fontWeight: 700 }}>STATUS</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white' }}>
                    {currentTransfer?.status || 'Records Received'}
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Progression Stepper */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                  Care Transfer Timeline & Status
                </h4>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={advanceTransferStage}
                >
                  <RefreshCw size={14} />
                  <span>Simulate Next Transfer Stage</span>
                </button>
              </div>

              <div className="timeline">
                {(currentTransfer?.stages || [
                  { stage: 0, title: "Transfer Requested", timestamp: "Today, 10:10 AM", done: true },
                  { stage: 1, title: "Records Selected & Encrypted", timestamp: "Today, 10:12 AM", done: true },
                  { stage: 2, title: "Records Dispatched to Destination", timestamp: "Today, 10:14 AM", done: true },
                  { stage: 3, title: "District Hospital Received Records", timestamp: "Today, 10:16 AM", done: true },
                  { stage: 4, title: "Care Continuation Accepted & OPD Ready", timestamp: "Today, 10:18 AM", done: false }
                ]).map((stg, idx) => {
                  const isDone = stg.done;
                  const isCurrent = idx === (currentTransfer?.currentStage || 3);

                  return (
                    <div key={idx} className="timeline-item">
                      <div className={`timeline-node ${isDone ? 'completed' : isCurrent ? 'current' : ''}`}>
                        {isDone ? <CheckCircle2 size={13} /> : <span>{idx + 1}</span>}
                      </div>

                      <div style={{
                        background: isCurrent ? 'var(--primary-surface)' : 'var(--bg-card)',
                        border: `1.5px solid ${isCurrent ? 'var(--primary-border)' : 'var(--border-light)'}`,
                        borderRadius: 'var(--radius-md)',
                        padding: '0.85rem 1.15rem',
                        boxShadow: isCurrent ? 'var(--shadow-xs)' : 'none'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ fontWeight: 800, fontSize: '0.94rem', color: isCurrent ? 'var(--primary-text)' : 'var(--text-main)' }}>
                            {stg.title}
                          </div>
                          <span className={`badge ${isDone ? 'badge-success' : isCurrent ? 'badge-warning' : 'badge-neutral'}`} style={{ fontSize: '0.68rem' }}>
                            {isDone ? 'Completed ✓' : isCurrent ? 'Active Stage' : 'Pending'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          {stg.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary of Shared Information */}
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              marginBottom: '1.75rem',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                  Transferred Medical Records (Accessible by Destination Care Team):
                </span>
                <span className="badge badge-primary">
                  {(currentTransfer?.sharedRecords || []).length} Records Shared
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(currentTransfer?.sharedRecords || availableRecordsList.slice(0, 4)).map((r, i) => (
                  <div key={i} style={{ background: 'var(--bg-card)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      ✓ {r.label || r.title}
                    </div>
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Verified Transferred</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions to Care Plan & Journey */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigateTo('care-plan')}
              >
                <span>View Updated Care Plan</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigateTo('journey')}
              >
                <span>View in My Health Journey</span>
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigateTo('live-queue')}
              >
                <span>Go to Destination OPD Queue</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Review Records Preview Modal */}
      {reviewModalOpen && (
        <div className="modal-overlay" onClick={() => setReviewModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Review Selected Health Records</h3>
              <button className="btn-icon" onClick={() => setReviewModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                These records will be transmitted with end-to-end cryptographic integrity to <strong>{selectedDestFacility.name}</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {availableRecordsList.filter(r => selectedRecords[r.id]).map(r => (
                  <div key={r.id} style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>{r.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setReviewModalOpen(false)}>Close Review</button>
              <button className="btn btn-primary" onClick={() => { setReviewModalOpen(false); setConfirmModalOpen(true); }}>
                <span>Proceed to Transfer</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explicit Transfer Confirmation Modal */}
      {confirmModalOpen && (
        <div className="modal-overlay" onClick={() => setConfirmModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '480px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div className="modal-body" style={{ padding: '2rem 1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-surface)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                border: '2px solid var(--primary-border)'
              }}>
                <Share2 size={30} />
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Confirm Care Transfer
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Are you sure you want to share <strong>{selectedCount} selected health records</strong> with <strong>{selectedDestFacility.name}</strong>?
              </p>

              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <div><strong>Source:</strong> {currentFacility.name}</div>
                <div><strong>Destination:</strong> {selectedDestFacility.name}</div>
                <div><strong>Records:</strong> {selectedCount} items selected with patient consent</div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setConfirmModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleConfirmTransfer}>
                  Confirm & Transfer Care
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CareTransfer;
