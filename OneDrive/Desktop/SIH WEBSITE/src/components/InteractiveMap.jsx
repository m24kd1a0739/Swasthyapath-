import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, Clock, CheckCircle, AlertCircle, Building2, Eye } from 'lucide-react';

export const InteractiveMap = ({ facilities, onSelectFacility }) => {
  const { navigateTo } = useApp();
  const [activePin, setActivePin] = useState(facilities[0]?.id || 'fac-1');

  // Map coordinates projection for Bhopal district schematic
  const activeFacility = facilities.find(f => f.id === activePin) || facilities[0];

  const pins = [
    { id: 'fac-1', x: 50, y: 38, name: 'District Govt Hospital', type: 'District Hospital', wait: '25 min', rec: true },
    { id: 'fac-2', x: 32, y: 68, name: 'PHC Kolar', type: 'PHC', wait: '10 min', rec: false },
    { id: 'fac-3', x: 22, y: 25, name: 'CHC Gandhi Nagar', type: 'CHC', wait: '40 min', rec: false },
    { id: 'fac-4', x: 75, y: 60, name: 'AIIMS Apex Hospital', type: 'Super Specialty', wait: '90 min', rec: false }
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '420px',
      background: 'linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 100%)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1.5px solid var(--border-medium)',
      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)'
    }}>
      {/* Schematic Map Grid & Roads SVG */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, opacity: 0.85 }}>
        {/* District Boundary & River Lake */}
        <path d="M 40,0 Q 150,120 200,420" fill="none" stroke="#93c5fd" strokeWidth="22" strokeLinecap="round" />
        <path d="M 120,180 Q 280,240 380,210" fill="none" stroke="#60a5fa" strokeWidth="16" strokeLinecap="round" />
        
        {/* Arterial Public Roads */}
        <line x1="0" y1="200" x2="1000" y2="200" stroke="#f8fafc" strokeWidth="10" strokeDasharray="12 4" />
        <line x1="450" y1="0" x2="450" y2="500" stroke="#f8fafc" strokeWidth="10" strokeDasharray="12 4" />
        <line x1="100" y1="50" x2="850" y2="380" stroke="#f1f5f9" strokeWidth="8" />
        <line x1="750" y1="20" x2="200" y2="400" stroke="#f1f5f9" strokeWidth="8" />

        {/* Route Line from Patient to Recommended District Hospital */}
        <path 
          d="M 280,270 L 480,165" 
          fill="none" 
          stroke="var(--primary)" 
          strokeWidth="4" 
          strokeDasharray="6 4"
        />
      </svg>

      {/* Patient Location Marker */}
      <div style={{
        position: 'absolute',
        left: '32%',
        top: '64%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          background: 'var(--dark-navy)',
          color: 'white',
          padding: '0.2rem 0.5rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.7rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          marginBottom: '2px',
          boxShadow: 'var(--shadow-md)'
        }}>
          📍 You (Arun)
        </div>
        <div style={{
          width: '14px',
          height: '14px',
          borderRadius: 'var(--radius-full)',
          background: '#3B82F6',
          border: '3px solid white',
          boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.4)'
        }} />
      </div>

      {/* Facility Pins */}
      {pins.map(pin => {
        const isSelected = activePin === pin.id;
        const facData = facilities.find(f => f.id === pin.id) || {};
        return (
          <div
            key={pin.id}
            onClick={() => {
              setActivePin(pin.id);
              if (onSelectFacility) onSelectFacility(facData);
            }}
            style={{
              position: 'absolute',
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: 'translate(-50%, -100%)',
              zIndex: isSelected ? 20 : 12,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.2s ease'
            }}
          >
            {/* Label */}
            <div style={{
              background: pin.rec ? 'var(--primary)' : 'var(--bg-card)',
              color: pin.rec ? 'white' : 'var(--text-main)',
              border: `1.5px solid ${pin.rec ? 'var(--primary-hover)' : 'var(--border-medium)'}`,
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.72rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginBottom: '2px'
            }}>
              <Building2 size={12} />
              <span>{pin.name}</span>
              {pin.rec && <span style={{ background: '#f59e0b', color: 'white', padding: '0 0.3rem', borderRadius: '3px', fontSize: '0.62rem' }}>BEST</span>}
            </div>

            {/* Pin Icon */}
            <div style={{
              width: isSelected ? '34px' : '28px',
              height: isSelected ? '34px' : '28px',
              borderRadius: 'var(--radius-full)',
              background: pin.rec ? 'var(--primary)' : '#0284C7',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isSelected ? '0 0 0 6px rgba(13, 148, 136, 0.35)' : 'var(--shadow-md)',
              border: '2px solid white'
            }}>
              <MapPin size={isSelected ? 18 : 15} />
            </div>
          </div>
        );
      })}

      {/* Floating Selected Facility Summary Overlay */}
      {activeFacility && (
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          maxWidth: '460px',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.9rem 1.1rem',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 30
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <span className={`badge ${activeFacility.isRecommended ? 'badge-primary' : 'badge-neutral'}`} style={{ fontSize: '0.68rem' }}>
                  {activeFacility.badge}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{activeFacility.distanceKm} km away</span>
              </div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {activeFacility.name}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.5rem' }}>
                Queue: <strong>{activeFacility.queueCount} patients</strong> • Wait: <strong>~{activeFacility.estimatedWaitMins} mins</strong>
              </p>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                if (onSelectFacility) onSelectFacility(activeFacility);
                navigateTo('facility-details', activeFacility);
              }}
            >
              <Eye size={14} />
              <span>Details</span>
            </button>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div style={{
        position: 'absolute',
        top: '0.75rem',
        right: '0.75rem',
        background: 'rgba(255, 255, 255, 0.92)',
        padding: '0.4rem 0.75rem',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.72rem',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span>
          <span>Best Matched Hospital</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }}></span>
          <span>Your Location</span>
        </div>
      </div>
    </div>
  );
};
