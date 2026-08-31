import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Pill, 
  Search, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Info
} from 'lucide-react';

export const MedicineAvailability = () => {
  const { 
    patientData,
    facilities, 
    navigateTo, 
    addToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacilityFilter, setSelectedFacilityFilter] = useState('all');

  const prescribedMedNames = (patientData.consultation?.prescriptions || []).map(p => p.medicineName.toLowerCase());

  // Simulated medicine inventory database across government pharmacies
  const inventory = [
    {
      id: 'med-1',
      name: 'Paracetamol 650mg',
      type: 'Tablet (Antipyretic / Analgesic)',
      facility: 'District Government Hospital Central Pharmacy (Counter 2)',
      facilityId: 'fac-1',
      stockStatus: 'AVAILABLE (3,400 Tabs)',
      isAvailable: true,
      price: 'Free (Jan Aushadhi Scheme)',
      lastUpdated: '10 mins ago',
      prescriptionLinked: prescribedMedNames.some(n => n.includes('paracetamol'))
    },
    {
      id: 'med-2',
      name: 'Oral Rehydration Salts (ORS) Sachet',
      type: 'Electrolyte Powder',
      facility: 'District Government Hospital Central Pharmacy',
      facilityId: 'fac-1',
      stockStatus: 'AVAILABLE (1,200 Packets)',
      isAvailable: true,
      price: 'Free (Govt Supply)',
      lastUpdated: '25 mins ago',
      prescriptionLinked: prescribedMedNames.some(n => n.includes('ors') || n.includes('rehydration'))
    },
    {
      id: 'med-3',
      name: 'Paracetamol 500mg',
      type: 'Tablet',
      facility: 'Primary Health Centre (PHC) Kolar Counter 1',
      facilityId: 'fac-2',
      stockStatus: 'LOW STOCK (45 Tabs remaining)',
      isAvailable: true,
      price: 'Free',
      lastUpdated: '1 hour ago',
      prescriptionLinked: false
    },
    {
      id: 'med-4',
      name: 'Azithromycin 500mg',
      type: 'Antibiotic Tablet',
      facility: 'District Government Hospital Pharmacy',
      facilityId: 'fac-1',
      stockStatus: 'AVAILABLE (850 Tabs)',
      isAvailable: true,
      price: 'Free under Prescription',
      lastUpdated: '40 mins ago',
      prescriptionLinked: false
    },
    {
      id: 'med-5',
      name: 'Pantoprazole 40mg',
      type: 'Antacid Tablet',
      facility: 'Community Health Centre (CHC) Gandhi Nagar',
      facilityId: 'fac-3',
      stockStatus: 'OUT OF STOCK (Re-supply tomorrow)',
      isAvailable: false,
      price: 'Govt Supply',
      lastUpdated: '2 hours ago',
      prescriptionLinked: false
    }
  ];

  const filteredInventory = inventory.filter(item => {
    if (selectedFacilityFilter !== 'all' && item.facilityId !== selectedFacilityFilter) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.facility.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: '880px', margin: '0 auto' }}>
      
      {/* Back button */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1rem', paddingLeft: 0 }}
        onClick={() => navigateTo('dashboard')}
      >
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </button>

      <div className="card" style={{ padding: '2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <Pill size={12} />
                <span>State Public Health Drug Inventory</span>
              </span>
              <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                Demo / Simulated Real-Time Data
              </span>
            </div>

            <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>
              Government Pharmacy Medicine Availability
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Live stock verification for Jan Aushadhi & District Hospital Pharmacies
            </p>
          </div>

          <button 
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('medicine-reminders')}
          >
            <Clock size={15} />
            <span>Open Medicine Reminders</span>
          </button>
        </div>

        {/* Prescription Link Notification */}
        <div style={{
          background: 'var(--primary-surface)',
          border: '1.5px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={20} color="var(--primary)" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--primary-text)' }}>
                Prescription Verified for Arun Kumar
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Tab. Paracetamol 650mg & ORS are ready for free pickup at District Hospital Pharmacy (Counter 2).
              </div>
            </div>
          </div>
          <span className="badge badge-success">Ready for Dispensing</span>
        </div>

        {/* Search & Facility Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search medicine name (e.g. Paracetamol, ORS)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.2rem' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>

          <select
            className="form-select"
            style={{ flex: '0 1 220px' }}
            value={selectedFacilityFilter}
            onChange={e => setSelectedFacilityFilter(e.target.value)}
          >
            <option value="all">All Government Pharmacies</option>
            <option value="fac-1">District Govt Hospital Central</option>
            <option value="fac-2">PHC Kolar Pharmacy</option>
            <option value="fac-3">CHC Gandhi Nagar Pharmacy</option>
          </select>
        </div>

        {/* Medicine Inventory Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredInventory.map(item => (
            <div
              key={item.id}
              style={{
                background: item.prescriptionLinked ? 'linear-gradient(to right, var(--primary-surface), var(--bg-card))' : 'var(--bg-surface)',
                border: `1.5px solid ${item.prescriptionLinked ? 'var(--primary-border)' : 'var(--border-light)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {item.name}
                  </h4>
                  {item.prescriptionLinked && (
                    <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>
                      In Arun's Prescription
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {item.type} • <strong>{item.facility}</strong>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
                  Price: <strong>{item.price}</strong> • Stock Updated: {item.lastUpdated}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${item.isAvailable ? 'badge-success' : 'badge-danger'}`} style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: 700 }}>
                  {item.stockStatus}
                </span>

                <div style={{ marginTop: '0.4rem' }}>
                  <button 
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.75rem', color: 'var(--primary)' }}
                    onClick={() => addToast('Pharmacy Counter Directions', `${item.facility} is located on Ground Floor, OPD Wing.`, 'info')}
                  >
                    View Pharmacy Location →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
