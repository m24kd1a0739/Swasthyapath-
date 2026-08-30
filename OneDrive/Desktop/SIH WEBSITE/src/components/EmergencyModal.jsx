import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, PhoneCall, MapPin, Navigation, X, AlertTriangle, CheckCircle, Radio } from 'lucide-react';

export const EmergencyModal = () => {
  const { emergencyModalOpen, setEmergencyModalOpen, patientData, addToast, playAudioChime } = useApp();
  const [sosSent, setSosSent] = useState(false);
  const [callingNumber, setCallingNumber] = useState(null);

  if (!emergencyModalOpen) return null;

  const handleSendSOS = () => {
    setSosSent(true);
    playAudioChime('warning');
    addToast('Emergency SOS Broadcasted', `Alert sent to ${patientData.profile.emergencyContact.name} (${patientData.profile.emergencyContact.phone}) with live GPS coordinates.`, 'emergency');
  };

  const handleSimulateCall = (num) => {
    setCallingNumber(num);
    addToast('Connecting Emergency Call', `Simulating emergency dispatch call to ${num}...`, 'emergency');
    setTimeout(() => {
      setCallingNumber(null);
    }, 4000);
  };

  return (
    <div className="modal-overlay" onClick={() => setEmergencyModalOpen(false)}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '560px', borderTop: '6px solid var(--danger)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={{ background: 'var(--danger-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--danger)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulseGlow 1.2s infinite'
            }}>
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3 style={{ color: 'var(--danger-text)', fontSize: '1.2rem', fontWeight: 800 }}>EMERGENCY ASSISTANCE</h3>
              <p style={{ color: 'var(--danger-text)', fontSize: '0.75rem', margin: 0 }}>24x7 Critical Medical Response</p>
            </div>
          </div>
          <button className="btn-icon" onClick={() => setEmergencyModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Critical Disclaimer */}
          <div style={{
            background: 'var(--danger-surface)',
            border: '1.5px solid var(--danger-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem 1.1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <AlertTriangle size={20} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--danger-text)' }}>
                Immediate Medical Emergency Notice
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--danger-text)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                If this is a severe medical emergency (such as chest pain, severe breathlessness, unconsciousness, heavy bleeding), seek professional emergency care immediately or call 108. SwasthyaPath is a triage navigation tool and does not replace emergency medical care.
              </p>
            </div>
          </div>

          {/* Quick Call Emergency Numbers */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              One-Touch Emergency Helplines
            </div>
            <div className="grid-2">
              <button 
                className="btn btn-danger btn-lg"
                style={{ justifyContent: 'space-between', padding: '0.9rem 1.2rem' }}
                onClick={() => handleSimulateCall('108')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <PhoneCall size={20} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>Govt Free Ambulance</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>Dial 108</div>
                  </div>
                </div>
                {callingNumber === '108' && <span className="badge badge-warning">Calling...</span>}
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                style={{ justifyContent: 'space-between', padding: '0.9rem 1.2rem', borderColor: 'var(--border-strong)' }}
                onClick={() => handleSimulateCall('112')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <PhoneCall size={20} color="var(--primary)" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>National Emergency</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>Dial 112</div>
                  </div>
                </div>
                {callingNumber === '112' && <span className="badge badge-warning">Calling...</span>}
              </button>
            </div>
          </div>

          {/* Nearest Emergency Hospital */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.1rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span className="badge badge-danger">NEAREST EMERGENCY FACILITY</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--success-text)' }}>● Open 24/7 (Trauma Active)</span>
            </div>

            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
              District Government Hospital Trauma Centre
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.75rem' }}>
              Civil Lines, Collectorate Road, Bhopal • <strong>7.2 km away</strong> (~12 min drive)
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => {
                  window.open("https://maps.google.com/?q=District+Hospital+Bhopal", "_blank");
                  addToast('Navigation Launched', 'Routing to District Hospital Emergency Trauma Unit...', 'info');
                }}
              >
                <Navigation size={15} />
                <span>Get GPS Directions</span>
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleSimulateCall('0755-2540108')}
              >
                <PhoneCall size={15} />
                <span>Call Trauma OPD (0755-2540108)</span>
              </button>
            </div>
          </div>

          {/* Emergency Contact Broadcast */}
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Emergency Contact: {patientData.profile.emergencyContact.name} ({patientData.profile.emergencyContact.relationship})
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Phone: {patientData.profile.emergencyContact.phone}
              </div>
            </div>

            {sosSent ? (
              <span className="badge badge-success" style={{ gap: '0.35rem' }}>
                <CheckCircle size={13} />
                <span>SOS Alert Sent</span>
              </span>
            ) : (
              <button 
                className="btn btn-danger-outline btn-sm"
                onClick={handleSendSOS}
              >
                <Radio size={14} />
                <span>Broadcast SOS</span>
              </button>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setEmergencyModalOpen(false)}>
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
