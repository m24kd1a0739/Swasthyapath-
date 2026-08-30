import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Users, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  Phone, 
  CalendarClock, 
  Navigation, 
  CheckCircle2, 
  AlertCircle, 
  X,
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const FacilityDetailsModal = () => {
  const { 
    selectedFacility, 
    facilities, 
    navigateTo, 
    bookAppointment, 
    addToast 
  } = useApp();

  const fac = selectedFacility || facilities[0];
  const [selectedDoctorId, setSelectedDoctorId] = useState(fac.doctors?.[0]?.id || 'doc-1');
  const [selectedService, setSelectedService] = useState('General Medicine');
  const [activeTab, setActiveTab] = useState('doctors'); // 'doctors' | 'tests' | 'medicines' | 'services'

  const isBestMatch = fac.badge === 'BEST MATCH';

  const handleJoinQueueNow = () => {
    bookAppointment(fac.id, selectedDoctorId, "Today", "Immediate OPD Queue");
    navigateTo('live-queue');
  };

  const handleBookSlot = () => {
    navigateTo('appointment');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Back link */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1rem', paddingLeft: 0 }}
        onClick={() => navigateTo('facilities')}
      >
        <ArrowLeft size={16} />
        <span>Back to Facility Finder</span>
      </button>

      <div className="card" style={{ padding: '2rem', borderTop: isBestMatch ? '5px solid var(--primary)' : '1px solid var(--border-light)' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className={`badge ${isBestMatch ? 'badge-primary' : 'badge-neutral'}`}>
                {fac.badge}
              </span>
              <span className="badge badge-success" style={{ gap: '0.3rem' }}>
                <ShieldCheck size={12} />
                <span>Verified Public Facility</span>
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                📍 {fac.distanceKm} km from you
              </span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {fac.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
              {fac.address} • Helpline: <strong>{fac.contactPhone}</strong>
            </p>
          </div>

          {/* Quick Live Queue Status Banner */}
          <div style={{
            background: 'var(--primary-surface)',
            border: '1.5px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.15rem',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-text)', textTransform: 'uppercase' }}>
              OPD Wait Time
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              ~{fac.estimatedWaitMins} Minutes
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {fac.queueCount} patients currently in queue
            </div>
          </div>
        </div>

        {/* Action CTAs Row */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button 
            className="btn btn-primary btn-lg"
            style={{ flex: '1 1 200px' }}
            onClick={handleJoinQueueNow}
          >
            <Clock size={18} />
            <span>Join Live Queue (Token #A-08)</span>
          </button>

          <button 
            className="btn btn-secondary btn-lg"
            style={{ flex: '1 1 180px' }}
            onClick={handleBookSlot}
          >
            <CalendarClock size={18} color="var(--primary)" />
            <span>Book Scheduled Appointment</span>
          </button>

          <button 
            className="btn btn-secondary btn-lg"
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(fac.name)}`, '_blank')}
          >
            <Navigation size={18} />
            <span>Get Directions</span>
          </button>
        </div>

        {/* Tab Navigation for Details */}
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            👨‍⚕️ Doctors on Duty ({fac.doctors?.length || 0})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            🧪 Diagnostic Tests ({fac.testsAvailable?.length || 0})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'medicines' ? 'active' : ''}`}
            onClick={() => setActiveTab('medicines')}
          >
            💊 Medicine Stock ({fac.medicinesInStock?.length || 0})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            🏥 Campus Services
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '220px' }}>
          
          {/* TAB 1: Doctors */}
          {activeTab === 'doctors' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {fac.doctors?.map(doc => (
                <div 
                  key={doc.id}
                  style={{
                    background: selectedDoctorId === doc.id ? 'var(--primary-surface)' : 'var(--bg-surface)',
                    border: `1.5px solid ${selectedDoctorId === doc.id ? 'var(--primary)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedDoctorId(doc.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700
                    }}>
                      Dr
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {doc.role} • <strong>{doc.room}</strong>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--primary-text)', fontWeight: 600, marginTop: '0.15rem' }}>
                        Timing: {doc.timing} • Current Serving: {doc.currentToken}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-success">Available Today</span>
                    <button 
                      className={`btn btn-sm ${selectedDoctorId === doc.id ? 'btn-primary' : 'btn-outline'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDoctorId(doc.id);
                        handleJoinQueueNow();
                      }}
                    >
                      <span>Select & Join Queue</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Tests */}
          {activeTab === 'tests' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {fac.testsAvailable?.map((t, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1.15rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <FlaskConical size={18} color="var(--primary)" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{t.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cost: {t.cost} • Turnaround: ~{t.waitTimeMins} mins</div>
                    </div>
                  </div>

                  <span className={`badge ${t.status === 'Available' ? 'badge-success' : 'badge-danger'}`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Medicines */}
          {activeTab === 'medicines' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {fac.medicinesInStock?.map((m, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1.15rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Pill size={18} color="var(--primary)" />
                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{m.name}</span>
                  </div>

                  <span className={`badge ${m.available ? 'badge-success' : 'badge-danger'}`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Campus Services */}
          {activeTab === 'services' && (
            <div className="animate-fade-in grid-2">
              {fac.facilitiesAvailable?.map((serv, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{serv}</span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
