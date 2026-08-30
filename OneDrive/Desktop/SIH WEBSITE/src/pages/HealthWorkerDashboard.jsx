import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  Calendar, 
  Share2, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  WifiOff, 
  MapPin,
  Check,
  Clock,
  Sparkles,
  Building2
} from 'lucide-react';

export const HealthWorkerDashboard = () => {
  const { 
    patientData, 
    navigateTo, 
    addToast, 
    networkStatus 
  } = useApp();

  const [activeTab, setActiveTab] = useState('assigned'); // 'assigned' | 'referrals' | 'missed' | 'tasks'

  const [patients, setPatients] = useState([
    {
      id: 'p-1',
      name: patientData.profile.fullName || 'Arun Kumar',
      age: 32,
      gender: 'Male',
      abha: patientData.profile.abhaId,
      priority: 'Normal',
      facility: 'District Govt Hospital',
      journeyStatus: 'OPD Consulted • CBC Normal • Rx Active',
      contact: patientData.profile.mobile,
      lastContacted: 'Today, 10:15 AM',
      hasMissed: false
    },
    {
      id: 'p-2',
      name: 'Meena Devi',
      age: 48,
      gender: 'Female',
      abha: '91-4821-3910-1123',
      priority: 'High Priority',
      facility: 'PHC Kolar',
      journeyStatus: 'Hypertension Review Missed',
      contact: '+91 94251 22345',
      lastContacted: '2 days ago',
      hasMissed: true
    },
    {
      id: 'p-3',
      name: 'Suresh Yadav',
      age: 58,
      gender: 'Male',
      abha: '91-7712-4091-8891',
      priority: 'Normal',
      facility: 'CHC Gandhi Nagar',
      journeyStatus: 'Diabetic Foot Follow-up Scheduled',
      contact: '+91 98260 44512',
      lastContacted: 'Yesterday',
      hasMissed: false
    },
    {
      id: 'p-4',
      name: 'Pooja Sharma',
      age: 26,
      gender: 'Female',
      abha: '91-3310-9182-4410',
      priority: 'Normal',
      facility: 'District Hospital Maternity',
      journeyStatus: 'ANC 2nd Trimester Check Done',
      contact: '+91 97551 09876',
      lastContacted: '3 days ago',
      hasMissed: false
    }
  ]);

  const handleMarkContacted = (id, name) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, lastContacted: 'Just now' } : p));
    addToast('Follow-up Logged', `Recorded contact with ${name}. Synced locally.`, 'success');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Role Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
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
              ASHA / Community Health Worker Portal
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
            Worker: Anita Verma (Civil Lines Ward 14)
          </h2>
          <p style={{ color: '#C7D2FE', fontSize: '0.85rem', margin: 0 }}>
            Active Community Cohort: <strong>48 Families</strong> • 4 Active Patients Needing Care Navigation
          </p>
        </div>

        {/* Offline sync status notice */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '0.5rem 0.9rem',
          fontSize: '0.78rem'
        }}>
          <div>Network Status: <strong>{networkStatus.toUpperCase()}</strong></div>
          <div style={{ color: '#E0E7FF', fontSize: '0.72rem' }}>Changes sync automatically when online.</div>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid-4">
        <div className="card" style={{ padding: '1.15rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ASSIGNED PATIENTS</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>4</div>
          <span className="badge badge-primary">Active Cohort</span>
        </div>

        <div className="card" style={{ padding: '1.15rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>HIGH PRIORITY</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--danger)', margin: '0.2rem 0' }}>1</div>
          <span className="badge badge-danger">Immediate Visit</span>
        </div>

        <div className="card" style={{ padding: '1.15rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>MISSED FOLLOW-UPS</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--warning-text)', margin: '0.2rem 0' }}>1</div>
          <span className="badge badge-warning">Meena Devi</span>
        </div>

        <div className="card" style={{ padding: '1.15rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>TODAY'S TASKS</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success-text)', margin: '0.2rem 0' }}>3</div>
          <span className="badge badge-success">2 Pending</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-header">
        <button className={`tab-btn ${activeTab === 'assigned' ? 'active' : ''}`} onClick={() => setActiveTab('assigned')}>
          👥 Assigned Community Patients (4)
        </button>
        <button className={`tab-btn ${activeTab === 'referrals' ? 'active' : ''}`} onClick={() => setActiveTab('referrals')}>
          🔗 Pending Inter-Facility Referrals (1)
        </button>
        <button className={`tab-btn ${activeTab === 'missed' ? 'active' : ''}`} onClick={() => setActiveTab('missed')}>
          ⚠️ Missed Follow-ups (1)
        </button>
        <button className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
          📋 Daily Outreach Tasks
        </button>
      </div>

      {/* Tab 1: Assigned Patients */}
      {activeTab === 'assigned' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {patients.map(p => (
            <div
              key={p.id}
              className="card"
              style={{
                padding: '1.25rem',
                borderLeft: p.name === 'Arun Kumar' ? '5px solid var(--primary)' : p.hasMissed ? '5px solid var(--danger)' : '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{p.name}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({p.age} Yrs / {p.gender})</span>
                    <span className={`badge ${p.priority === 'High Priority' ? 'badge-danger' : 'badge-primary'}`}>
                      {p.priority}
                    </span>
                    {p.name === 'Arun Kumar' && (
                      <span className="badge badge-success">Demo Patient Focus</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    ABHA: {p.abha} • Facility: <strong>{p.facility}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Last Contacted</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{p.lastContacted}</div>
                </div>
              </div>

              {/* Status */}
              <div style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '0.65rem 0.85rem',
                fontSize: '0.82rem',
                marginBottom: '0.85rem'
              }}>
                <strong>Clinical Status:</strong> {p.journeyStatus}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Phone: <strong>{p.contact}</strong>
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleMarkContacted(p.id, p.name)}
                  >
                    <Check size={14} />
                    <span>Mark Contacted</span>
                  </button>

                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      if (p.name === 'Arun Kumar') navigateTo('dashboard');
                      else addToast('Opening Patient File', `Loaded ABHA profile for ${p.name}.`, 'info');
                    }}
                  >
                    <span>View Journey Record</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Referrals */}
      {activeTab === 'referrals' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Active Referral Pipeline in Sector
          </h3>
          <div style={{
            background: 'var(--purple-surface)',
            border: '1.5px solid var(--purple-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--purple-text)' }}>
                Arun Kumar • Token: REF-MP-2026-8941
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                PHC Kolar ➔ District Government Hospital Internal Medicine
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => navigateTo('referrals')}>
              <span>Track Referral</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Missed Follow-ups */}
      {activeTab === 'missed' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--danger-text)', marginBottom: '0.75rem' }}>
            Missed Hospital Appointments
          </h3>
          <div style={{
            background: 'var(--danger-surface)',
            border: '1.5px solid var(--danger-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--danger-text)' }}>
                Meena Devi (48 F) — Hypertension Follow-up Overdue by 3 Days
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Location: Ward 14 House #42 • Phone: +91 94251 22345
              </div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => addToast('Task Added', 'Home visit scheduled for Meena Devi.', 'success')}>
              <span>Schedule Home Visit</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Daily Outreach Tasks */}
      {activeTab === 'tasks' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.85rem' }}>
            Today's ASHA Checklist
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { task: 'Verify Arun Kumar fever resolution & medicine compliance', done: true },
              { task: 'Follow up with Meena Devi for missed BP check at PHC Kolar', done: false },
              { task: 'Distribute ORS packets to Ward 14 Anganwadi Centre', done: false }
            ].map((t, i) => (
              <div key={i} style={{ background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--text-muted)' : 'var(--text-main)' }}>
                  {t.task}
                </span>
                <span className={`badge ${t.done ? 'badge-success' : 'badge-neutral'}`}>
                  {t.done ? 'Completed ✓' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
