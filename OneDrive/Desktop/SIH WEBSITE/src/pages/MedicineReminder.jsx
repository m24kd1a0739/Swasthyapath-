import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BellRing, 
  Pill, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Calendar, 
  Sparkles,
  Check,
  XCircle,
  Settings
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MedicineReminder = () => {
  const { 
    patientData, 
    setPatientData,
    updateMedicineReminder, 
    navigateTo, 
    addToast, 
    playAudioChime 
  } = useApp();

  const [addReminderModal, setAddReminderModal] = useState(false);
  const [newMedName, setNewMedName] = useState('Vitamin C 500mg');
  const [newMedTime, setNewMedTime] = useState('09:00 PM');

  const rx = patientData.consultation?.prescriptions?.[0] || {
    id: 'rx-1',
    medicineName: 'Paracetamol 650mg',
    dosage: '1 tablet after meals',
    frequency: 'Thrice daily (8 AM, 2 PM, 8 PM)',
    reminders: [
      { time: '08:00 AM', status: 'taken', label: 'Morning Dose' },
      { time: '02:00 PM', status: 'due', label: 'Afternoon Dose' },
      { time: '08:00 PM', status: 'upcoming', label: 'Night Dose' }
    ]
  };

  const reminders = rx.reminders || [];
  const takenCount = reminders.filter(r => r.status === 'taken').length;
  const adherencePercent = Math.round((takenCount / reminders.length) * 100);

  const handleMarkTaken = (idx) => {
    updateMedicineReminder(rx.id, idx, 'taken');
    playAudioChime('success');
    try {
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleSkip = (idx) => {
    updateMedicineReminder(rx.id, idx, 'skipped');
    playAudioChime('warning');
  };

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

      <div className="card" style={{ padding: '2rem', borderTop: '5px solid var(--primary)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <BellRing size={12} />
                <span>Prescription-Connected Adherence Tracker</span>
              </span>
              <span className="badge badge-success">
                Adherence: {adherencePercent}% Today
              </span>
            </div>

            <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>
              Smart Medicine Reminder
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Auto-synced from <strong>Dr. Priya Sharma's OPD Prescription</strong> for {patientData.profile?.fullName || 'Citizen'}
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setAddReminderModal(true)}
          >
            <Plus size={15} />
            <span>Add Custom Reminder</span>
          </button>
        </div>

        {/* Due Now Alert Banner */}
        <div style={{
          background: 'var(--danger-surface)',
          border: '1.5px solid var(--danger-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--danger)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulseGlow 1.2s infinite'
            }}>
              <BellRing size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--danger-text)' }}>
                Medicine Reminder: Paracetamol 650mg is Due Now (2:00 PM)
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--danger-text)', opacity: 0.9 }}>
                Take 1 tablet with water after your afternoon meal to manage fever.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleMarkTaken(1)}
            >
              <CheckCircle2 size={15} />
              <span>Mark Taken</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => handleSkip(1)}
            >
              <span>Skip Dose</span>
            </button>
          </div>
        </div>

        {/* Today's Medicine Timeline Schedule */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              Today's Prescribed Dosage Schedule
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Paracetamol 650mg • 5 Days Course
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {reminders.map((rem, idx) => {
              const isTaken = rem.status === 'taken';
              const isDue = rem.status === 'due';
              const isUpcoming = rem.status === 'upcoming';
              const isSkipped = rem.status === 'skipped';

              return (
                <div
                  key={idx}
                  style={{
                    background: isDue ? 'var(--primary-surface)' : 'var(--bg-surface)',
                    border: `1.5px solid ${isDue ? 'var(--primary)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      background: isTaken ? 'var(--success)' : isDue ? 'var(--primary)' : 'var(--border-medium)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800
                    }}>
                      <Clock size={20} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          {rem.time}
                        </span>
                        <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                          {rem.label}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-text)', marginTop: '0.1rem' }}>
                        {rx.medicineName} (1 Tablet)
                      </div>

                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Instructions: {rx.instructions || 'Take after meals'}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status Pill */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {isTaken && (
                      <span className="badge badge-success" style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem', gap: '0.35rem' }}>
                        <Check size={14} />
                        <span>Taken ✓</span>
                      </span>
                    )}

                    {isSkipped && (
                      <span className="badge badge-warning" style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem', gap: '0.35rem' }}>
                        <XCircle size={14} />
                        <span>Skipped</span>
                      </span>
                    )}

                    {isUpcoming && (
                      <span className="badge badge-neutral" style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}>
                        Upcoming (8:00 PM)
                      </span>
                    )}

                    {isDue && (
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleMarkTaken(idx)}
                        >
                          <Check size={14} />
                          <span>Mark as Taken</span>
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleSkip(idx)}
                        >
                          <span>Skip</span>
                        </button>
                      </div>
                    )}
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
            <span>Go to My Care Plan</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => navigateTo('medicines')}
          >
            <Pill size={16} />
            <span>Check Government Pharmacy Stocks</span>
          </button>
        </div>

      </div>

      {/* Add Custom Reminder Modal */}
      {addReminderModal && (
        <div className="modal-overlay" onClick={() => setAddReminderModal(false)}>
          <div className="modal-container" style={{ maxWidth: '460px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Add Custom Medicine Reminder</h3>
              <button className="btn-icon" onClick={() => setAddReminderModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Medicine Name & Strength</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={newMedName}
                  onChange={e => setNewMedName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Scheduled Time</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={newMedTime}
                  onChange={e => setNewMedTime(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setAddReminderModal(false)}>Cancel</button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  if (!newMedName.trim()) return;
                  const newMedObj = {
                    id: `rx-custom-${Date.now()}`,
                    medicineName: newMedName.trim(),
                    dosage: '1 dose as prescribed',
                    frequency: 'Daily',
                    duration: '5 days',
                    instructions: 'Take as directed.',
                    status: 'Active',
                    availableAtFacility: 'Jan Aushadhi Pharmacy',
                    reminders: [
                      { time: newMedTime || '09:00 PM', status: 'upcoming', label: 'Custom Dose' }
                    ]
                  };

                  setPatientData(prev => ({
                    ...prev,
                    consultation: {
                      ...prev.consultation,
                      prescriptions: [...(prev.consultation?.prescriptions || []), newMedObj]
                    }
                  }));

                  setAddReminderModal(false);
                  addToast('Reminder Configured', `${newMedName} scheduled for ${newMedTime}.`, 'success');
                }}
              >
                Save Reminder
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
