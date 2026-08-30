import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InteractiveMap } from '../components/InteractiveMap';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Users, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  List, 
  Map as MapIcon, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowRight, 
  Navigation,
  Sparkles
} from 'lucide-react';

export const FacilityFinder = () => {
  const { 
    facilities, 
    navigateTo, 
    setSelectedFacility, 
    t 
  } = useApp();

  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterOpenOnly, setFilterOpenOnly] = useState(false);
  const [filterLabAvailable, setFilterLabAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter facilities
  const filteredFacilities = facilities.filter(fac => {
    if (filterOpenOnly && !fac.isOpenNow) return false;
    if (filterLabAvailable && !fac.testsAvailable.some(t => t.name.includes('CBC') && t.status === 'Available')) return false;
    if (filterSpecialty !== 'all' && !fac.specialties.includes(filterSpecialty)) return false;
    if (searchQuery && !fac.name.toLowerCase().includes(searchQuery.toLowerCase()) && !fac.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSelectFacility = (fac) => {
    setSelectedFacility(fac);
    navigateTo('facility-details', fac);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Header & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <span className="badge badge-primary">
              <Sparkles size={12} />
              <span>Smart Public Health Matching Engine</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Government Healthcare Facilities
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Ranked for: <strong>Fever (3d) + Weakness</strong> (Matches: Doctor, CBC Lab & Pharmacy Stock)
          </p>
        </div>

        {/* View Switcher (List vs Map) */}
        <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <button
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '0.35rem 0.8rem' }}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
            <span>List View</span>
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'map' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '0.35rem 0.8rem' }}
            onClick={() => setViewMode('map')}
          >
            <MapIcon size={16} />
            <span>District Map</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.85rem 1.15rem',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        {/* Text Search */}
        <div style={{ flex: '1 1 200px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search facility name, road, locality..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ padding: '0.5rem 0.8rem', fontSize: '0.86rem' }}
          />
        </div>

        {/* Specialty Filter */}
        <select
          className="form-select"
          style={{ flex: '0 1 180px', padding: '0.5rem 0.8rem', fontSize: '0.86rem' }}
          value={filterSpecialty}
          onChange={e => setFilterSpecialty(e.target.value)}
        >
          <option value="all">All Specialties</option>
          <option value="General Medicine">General Medicine</option>
          <option value="Pathology / Lab">Pathology / Lab</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Emergency 24x7">Emergency 24x7</option>
        </select>

        {/* Checkbox: Open Now */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filterOpenOnly}
            onChange={e => setFilterOpenOnly(e.target.checked)}
          />
          <span>Open Now</span>
        </label>

        {/* Checkbox: CBC Lab Ready */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filterLabAvailable}
            onChange={e => setFilterLabAvailable(e.target.checked)}
          />
          <span>CBC Lab Available</span>
        </label>
      </div>

      {/* Main Content Area: Map View or List View */}
      {viewMode === 'map' ? (
        <div>
          <InteractiveMap
            facilities={filteredFacilities}
            onSelectFacility={handleSelectFacility}
          />
        </div>
      ) : (
        /* List View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFacilities.map(fac => {
            const isBestMatch = fac.badge === 'BEST MATCH';
            const isNotIdeal = fac.badge === 'Not ideal for this problem';

            return (
              <div
                key={fac.id}
                className={`card card-interactive ${isBestMatch ? 'card-highlight' : ''}`}
                onClick={() => handleSelectFacility(fac)}
                style={{
                  borderLeft: isBestMatch 
                    ? '5px solid var(--primary)' 
                    : isNotIdeal 
                    ? '5px solid var(--warning)' 
                    : '5px solid var(--border-medium)',
                  padding: '1.4rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span className={`badge ${isBestMatch ? 'badge-primary' : isNotIdeal ? 'badge-warning' : 'badge-neutral'}`}>
                        {fac.badge}
                      </span>
                      <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                        {fac.type}
                      </span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        📍 {fac.distanceKm} km away
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {fac.name}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>
                      {fac.address}
                    </p>
                  </div>

                  {/* Queue Wait Time Pill */}
                  <div style={{
                    background: isBestMatch ? 'var(--primary-surface)' : 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.5rem 0.9rem',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Current Live Queue
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {fac.queueCount} Patients <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-muted)' }}>(~{fac.estimatedWaitMins}m wait)</span>
                    </div>
                  </div>
                </div>

                {/* Match Reason Banner */}
                <div style={{
                  background: isBestMatch ? 'rgba(13, 148, 136, 0.08)' : 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.82rem',
                  color: isBestMatch ? 'var(--primary-text)' : 'var(--text-muted)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {isBestMatch ? <CheckCircle2 size={16} color="var(--primary)" /> : <AlertCircle size={16} color="var(--warning-text)" />}
                  <span><strong>Assessment:</strong> {fac.matchReason}</span>
                </div>

                {/* Capability Badges List */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.1rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}>
                    <Stethoscope size={15} color="var(--primary)" />
                    <span>Specialist Doctor: <strong>{fac.doctors[0]?.name || 'On Duty'}</strong></span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}>
                    <FlaskConical size={15} color={fac.testsAvailable.some(t => t.name.includes('CBC') && t.status === 'Available') ? 'var(--success)' : 'var(--danger)'} />
                    <span>CBC Test: <strong>{fac.testsAvailable.some(t => t.name.includes('CBC') && t.status === 'Available') ? 'Available Today' : 'Unavailable'}</strong></span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}>
                    <Pill size={15} color="var(--primary)" />
                    <span>Medicines: <strong>{fac.medicinesInStock[0]?.name} Ready</strong></span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}>
                    <Clock size={15} color="var(--text-muted)" />
                    <span>Status: <strong>{fac.openStatus}</strong></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Govt Facility ID: #{fac.id.toUpperCase()} • Free Under NHM
                  </span>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(fac.name)}`, '_blank');
                      }}
                    >
                      <Navigation size={14} />
                      <span>Directions</span>
                    </button>

                    <button
                      className={`btn btn-sm ${isBestMatch ? 'btn-primary' : 'btn-outline'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectFacility(fac);
                      }}
                    >
                      <span>{t.viewFacility} & Book</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
