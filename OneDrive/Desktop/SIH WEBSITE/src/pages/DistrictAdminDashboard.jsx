import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InteractiveMap } from '../components/InteractiveMap';
import { 
  Building2, 
  Users, 
  Share2, 
  AlertTriangle, 
  Pill, 
  Activity, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Download,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const DistrictAdminDashboard = () => {
  const { 
    facilities, 
    addToast 
  } = useApp();

  const [activeMetricTab, setActiveMetricTab] = useState('load'); // 'load' | 'shortages' | 'referrals'

  const districtMetrics = {
    totalPatientsToday: 2480,
    pendingReferrals: 38,
    missedFollowUps: 14,
    highLoadFacilities: 1, // AIIMS
    medicineShortages: 2,
    serviceDemandGrowth: '+18% (Monsoon Seasonal Surge)'
  };

  const facilityLoadTable = [
    { name: 'District Government Hospital Central', type: 'District Hospital', queue: 8, wait: '25 min', status: 'Normal Load', color: 'var(--success)' },
    { name: 'Primary Health Centre (PHC) Kolar', type: 'PHC', queue: 3, wait: '10 min', status: 'Normal Load', color: 'var(--success)' },
    { name: 'Community Health Centre (CHC) Gandhi Nagar', type: 'CHC', queue: 14, wait: '40 min', status: 'Moderate Load', color: 'var(--warning)' },
    { name: 'AIIMS Apex Government Medical College', type: 'Super Specialty', queue: 42, wait: '90 min', status: 'Critical / High Load', color: 'var(--danger)' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
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
              Ministry of Health & Family Welfare • State Health Grid
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
            Bhopal District Health Authority — Command Center
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>
            Real-time public health capacity, triage distribution, drug supplies, and referral tracking
          </p>
        </div>

        <button 
          className="btn btn-secondary btn-sm"
          style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
          onClick={() => addToast('District Health Report', 'District analytics summary exported to CSV/PDF.', 'info')}
        >
          <Download size={15} />
          <span>Export District Analytics</span>
        </button>
      </div>

      {/* 6 High-Level District Metric Cards */}
      <div className="grid-3">
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>TODAY'S DISTRICT PATIENTS</span>
            <Users size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.25rem 0' }}>
            {districtMetrics.totalPatientsToday.toLocaleString()}
          </div>
          <span className="badge badge-success">+8.4% from last week</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>INTER-FACILITY REFERRALS</span>
            <Share2 size={18} color="var(--purple)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--purple-text)', margin: '0.25rem 0' }}>
            {districtMetrics.pendingReferrals} Active
          </div>
          <span className="badge badge-purple">92% Acceptance Rate</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>MISSED FOLLOW-UPS</span>
            <AlertTriangle size={18} color="var(--warning)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--warning-text)', margin: '0.25rem 0' }}>
            {districtMetrics.missedFollowUps} Cases
          </div>
          <span className="badge badge-warning">ASHA Workers Assigned</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>HIGH QUEUE FACILITIES</span>
            <Building2 size={18} color="var(--danger)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--danger)', margin: '0.25rem 0' }}>
            {districtMetrics.highLoadFacilities} (AIIMS Apex)
          </div>
          <span className="badge badge-danger">Triage Redirect Active</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>DRUG SHORTAGE ALERTS</span>
            <Pill size={18} color="var(--warning)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--warning-text)', margin: '0.25rem 0' }}>
            {districtMetrics.medicineShortages} Items
          </div>
          <span className="badge badge-neutral">PHC Kolar Paracetamol</span>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SEASONAL SERVICE DEMAND</span>
            <TrendingUp size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary-dark)', margin: '0.25rem 0' }}>
            {districtMetrics.serviceDemandGrowth}
          </div>
          <span className="badge badge-primary">Fever / Pyrexia OPDs</span>
        </div>
      </div>

      {/* District Hospital Load Table */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.85rem' }}>
          District Public Healthcare Network Load Status
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                <th style={{ padding: '0.7rem 0.9rem' }}>Facility Name</th>
                <th style={{ padding: '0.7rem 0.9rem' }}>Level</th>
                <th style={{ padding: '0.7rem 0.9rem' }}>Live Queue</th>
                <th style={{ padding: '0.7rem 0.9rem' }}>Avg Wait Time</th>
                <th style={{ padding: '0.7rem 0.9rem' }}>Operational Status</th>
              </tr>
            </thead>
            <tbody>
              {facilityLoadTable.map((f, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.7rem 0.9rem', fontWeight: 700 }}>{f.name}</td>
                  <td style={{ padding: '0.7rem 0.9rem', color: 'var(--text-muted)' }}>{f.type}</td>
                  <td style={{ padding: '0.7rem 0.9rem', fontWeight: 800 }}>{f.queue} Patients</td>
                  <td style={{ padding: '0.7rem 0.9rem' }}>{f.wait}</td>
                  <td style={{ padding: '0.7rem 0.9rem' }}>
                    <span className="badge" style={{ background: `${f.color}15`, color: f.color, border: `1px solid ${f.color}40`, fontWeight: 700 }}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* District Facility Map Overview */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
            District Facility Spatial Distribution
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bhopal District Command Grid</span>
        </div>
        <InteractiveMap facilities={facilities} />
      </div>

    </div>
  );
};
