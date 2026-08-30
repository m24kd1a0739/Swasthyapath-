import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CalendarClock, 
  Building2, 
  Stethoscope, 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Users, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

export const AppointmentBooking = () => {
  const { 
    selectedFacility, 
    facilities, 
    patientData, 
    bookAppointment, 
    navigateTo, 
    addToast 
  } = useApp();

  const fac = selectedFacility || facilities[0];
  const [selectedService, setSelectedService] = useState('General Medicine');
  const [selectedDoctor, setSelectedDoctor] = useState(fac.doctors?.[0]?.name || 'Dr. Priya Sharma');
  const [selectedDate, setSelectedDate] = useState('Today (Aug 30)');
  const [selectedTime, setSelectedTime] = useState('10:30 AM (Immediate Queue)');
  const [bookingMode, setBookingMode] = useState('queue'); // 'queue' | 'slot'
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    bookAppointment(fac.id, fac.doctors?.[0]?.id, selectedDate, selectedTime);
    setConfirmed(true);
    addToast('Booking Confirmed', `Queue token #A-08 generated for ${fac.name}`, 'success');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Back button */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1rem', paddingLeft: 0 }}
        onClick={() => navigateTo('facilities')}
      >
        <ArrowLeft size={16} />
        <span>Back to Facilities</span>
      </button>

      <div className="card" style={{ padding: '2rem' }}>
        
        {!confirmed ? (
          /* Booking Form */
          <div>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-primary">
                  <CalendarClock size={13} />
                  <span>Public Hospital OPD Booking</span>
                </span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                Book Appointment & Join OPD Queue
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Target: <strong>{fac.name}</strong> • Civil Lines, Bhopal
              </p>
            </div>

            <form onSubmit={handleConfirmBooking}>
              
              {/* Select Service */}
              <div className="form-group">
                <label className="form-label">1. Select Required OPD Department</label>
                <select 
                  className="form-select"
                  value={selectedService}
                  onChange={e => setSelectedService(e.target.value)}
                >
                  <option value="General Medicine">General Medicine (Fever & Pyrexia Clinic)</option>
                  <option value="Pathology / Diagnostics">Pathology / Blood Investigation</option>
                  <option value="Pediatrics">Pediatrics OPD</option>
                  <option value="Emergency Care">Emergency / Trauma</option>
                </select>
              </div>

              {/* Select Doctor */}
              <div className="form-group">
                <label className="form-label">2. Select Doctor</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {fac.doctors?.map(doc => (
                    <label 
                      key={doc.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.1rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${selectedDoctor === doc.name ? 'var(--primary)' : 'var(--border-light)'}`,
                        background: selectedDoctor === doc.name ? 'var(--primary-surface)' : 'var(--bg-surface)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input 
                          type="radio" 
                          name="doctor" 
                          checked={selectedDoctor === doc.name} 
                          onChange={() => setSelectedDoctor(doc.name)} 
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>{doc.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{doc.role} • {doc.room}</div>
                        </div>
                      </div>
                      <span className="badge badge-success">Available Today ({doc.timing})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date & Slot selection */}
              <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">3. Select Date</label>
                  <select 
                    className="form-select"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                  >
                    <option value="Today (Aug 30)">Today (Aug 30, 2026)</option>
                    <option value="Tomorrow (Aug 31)">Tomorrow (Aug 31, 2026)</option>
                    <option value="Sep 01, 2026">Sep 01, 2026</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">4. Time Window / Queue Mode</label>
                  <select 
                    className="form-select"
                    value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                  >
                    <option value="10:30 AM (Immediate Queue)">Immediate Live Queue (~25m wait)</option>
                    <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM (OPD Slot)</option>
                    <option value="12:00 PM - 12:30 PM">12:00 PM - 12:30 PM (OPD Slot)</option>
                  </select>
                </div>
              </div>

              {/* Patient Identity confirmation card */}
              <div style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.15rem',
                border: '1px solid var(--border-light)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>Patient: {patientData.profile.fullName} (32 M)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ABHA ID: {patientData.profile.abhaId} • {patientData.profile.mobile}</div>
                </div>
                <span className="badge badge-primary">Free Govt Booking</span>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <span>Confirm Booking & Generate OPD Token</span>
                <ArrowRight size={18} />
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation Slip Card */
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
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

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--success-surface)', color: 'var(--success-text)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <span>APPOINTMENT CONFIRMED</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Digital OPD Queue Token: #A-08
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Your appointment is registered in the state digital health system.
            </p>

            {/* Printable Digital Slip */}
            <div style={{
              background: 'var(--bg-card)',
              border: '2px dashed var(--primary-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              maxWidth: '520px',
              margin: '0 auto 1.75rem',
              textAlign: 'left',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hospital Facility</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800 }}>{fac.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Room / Counter</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>OPD Room 4</div>
                </div>
              </div>

              <div className="grid-2" style={{ fontSize: '0.84rem', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Patient Name: </span>
                  <strong>{patientData.profile.fullName}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>ABHA ID: </span>
                  <strong>{patientData.profile.abhaId}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Doctor: </span>
                  <strong>{selectedDoctor}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Wait: </span>
                  <strong style={{ color: 'var(--primary-dark)' }}>~25 Minutes</strong>
                </div>
              </div>

              {/* QR Code Graphic for Check-in */}
              <div style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <QrCode size={36} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>Hospital Check-in QR</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Scan at OPD Entrance Kiosk</div>
                  </div>
                </div>
                <span className="badge badge-warning">Queue: #08</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigateTo('live-queue')}
              >
                <Clock size={18} />
                <span>Go to Live Queue Tracker & Check-in</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => addToast('Slip Downloaded', 'Digital OPD Token Slip saved to your device.', 'info')}
              >
                <Download size={18} />
                <span>Download Slip</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
