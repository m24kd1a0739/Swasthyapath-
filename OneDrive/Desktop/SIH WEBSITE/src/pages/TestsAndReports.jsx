import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FlaskConical, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  Download, 
  Sparkles,
  AlertCircle,
  Share2,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TestsAndReports = () => {
  const { 
    patientData, 
    uploadLabReport, 
    navigateTo, 
    addToast, 
    playAudioChime 
  } = useApp();

  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [selectedReportModal, setSelectedReportModal] = useState(false);
  const [activeReportData, setActiveReportData] = useState(null);

  const testsList = patientData.consultation?.testsOrdered || [];

  const handleSimulateLabProcessing = (testId) => {
    setIsSimulatingUpload(true);
    addToast('Lab Sample Processing', 'Diagnostic Centre analyzing blood sample...', 'info');

    setTimeout(() => {
      setIsSimulatingUpload(false);
      uploadLabReport(testId || 'all');
      playAudioChime('success');
      try {
        confetti({
          particleCount: 60,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1200);
  };

  const handleAddSampleTest = () => {
    uploadLabReport('test-order-1');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto' }}>
      
      {/* Back link */}
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
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <FlaskConical size={12} />
                <span>Diagnostic Services & Digital Health Records</span>
              </span>
            </div>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>
              Diagnostic Tests & Lab Reports
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Connected to your ABHA Digital Health Record: <strong>{patientData.profile?.abhaId}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => handleSimulateLabProcessing('all')}
              disabled={isSimulatingUpload}
            >
              <Upload size={15} />
              <span>{isSimulatingUpload ? 'Processing...' : 'Upload / Process Lab Report'}</span>
            </button>
          </div>
        </div>

        {/* Tests List or Empty State */}
        {testsList.length === 0 ? (
          <div style={{
            background: 'var(--bg-surface)',
            border: '2px dashed var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-surface)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <FlaskConical size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              No Diagnostic Tests Currently Active
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.45 }}>
              Tests ordered during a doctor consultation or at a government diagnostic centre will automatically appear here.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => navigateTo('consultation')}
              >
                <span>Consult Doctor to Order Test</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleAddSampleTest}
              >
                <Plus size={16} />
                <span>Request Routine CBC Blood Test</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {testsList.map((testItem, idx) => {
              const isReady = testItem.status === 'ready';

              return (
                <div 
                  key={testItem.id || idx}
                  style={{
                    background: isReady ? 'var(--primary-surface)' : 'var(--bg-surface)',
                    border: `1.5px solid ${isReady ? 'var(--primary-border)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.4rem',
                    marginBottom: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-md)',
                        background: isReady ? 'var(--primary)' : 'var(--border-medium)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FlaskConical size={24} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                            {testItem.testName}
                          </h3>
                          <span className={`badge ${isReady ? 'badge-success' : 'badge-warning'}`}>
                            {isReady ? 'Report Ready ✓' : 'Sample Processing / Pending'}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.15rem 0 0' }}>
                          Facility: <strong>{testItem.facility || 'District Hospital Central Diagnostics'}</strong> • Cost: Free Under Govt Scheme
                        </p>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ordered on</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{testItem.orderedDate || 'Today'}</div>
                    </div>
                  </div>

                  <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem'
                  }}>
                    Processing Center: <strong>{testItem.facility || 'District Hospital Diagnostic Centre'}</strong> • Open (08:00 AM - 04:00 PM) • Estimated wait: ~15 minutes
                  </div>

                  {/* Action Row */}
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {isReady ? (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setActiveReportData(testItem);
                          setSelectedReportModal(true);
                        }}
                      >
                        <Eye size={15} />
                        <span>View Verified Digital Lab Report</span>
                      </button>
                    ) : (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleSimulateLabProcessing(testItem.id)}
                        disabled={isSimulatingUpload}
                      >
                        <Upload size={15} />
                        <span>{isSimulatingUpload ? 'Analyzing...' : 'Simulate Sample Analysis & Report'}</span>
                      </button>
                    )}

                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => addToast('PDF Downloaded', `${testItem.testName} report PDF saved to device.`, 'info')}
                    >
                      <Download size={15} />
                      <span>Download Lab Slip</span>
                    </button>

                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigateTo('medicines')}
                    >
                      <span>Check Medicine Stock →</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Lab Report Viewer Modal / Container */}
        {selectedReportModal && (
          <div className="modal-overlay" onClick={() => setSelectedReportModal(false)}>
            <div 
              className="modal-container" 
              style={{ maxWidth: '680px' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header" style={{ background: 'var(--primary-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={20} color="var(--primary)" />
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Complete Blood Count (CBC) Report</h3>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>District Hospital Central Pathology Lab • Lab ID: #LAB-89104</p>
                  </div>
                </div>
                <button className="btn-icon" onClick={() => setSelectedReportModal(false)}>✕</button>
              </div>

              <div className="modal-body">
                {/* Patient Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                  <div><strong>Patient:</strong> {patientData.profile.fullName || 'Citizen'} ({patientData.profile.age || 32}/{patientData.profile.gender?.[0] || 'M'})</div>
                  <div><strong>Ref Doctor:</strong> Dr. Priya Sharma</div>
                  <div><strong>Date:</strong> Aug 30, 2026</div>
                </div>

                {/* Results Table */}
                <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-surface)', borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                        <th style={{ padding: '0.6rem 0.8rem' }}>Parameter</th>
                        <th style={{ padding: '0.6rem 0.8rem' }}>Observed Value</th>
                        <th style={{ padding: '0.6rem 0.8rem' }}>Reference Range</th>
                        <th style={{ padding: '0.6rem 0.8rem' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 600 }}>Hemoglobin</td>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800 }}>14.2 g/dL</td>
                        <td style={{ padding: '0.6rem 0.8rem', color: 'var(--text-muted)' }}>13.0 - 17.0 g/dL</td>
                        <td style={{ padding: '0.6rem 0.8rem' }}><span className="badge badge-success">Normal</span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 600 }}>Total Leukocyte (WBC)</td>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800 }}>6,400 /µL</td>
                        <td style={{ padding: '0.6rem 0.8rem', color: 'var(--text-muted)' }}>4,000 - 11,000 /µL</td>
                        <td style={{ padding: '0.6rem 0.8rem' }}><span className="badge badge-success">Normal</span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 600 }}>Platelet Count</td>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800 }}>185,000 /µL</td>
                        <td style={{ padding: '0.6rem 0.8rem', color: 'var(--text-muted)' }}>150,000 - 450,000 /µL</td>
                        <td style={{ padding: '0.6rem 0.8rem' }}><span className="badge badge-success">Normal (Safe)</span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 600 }}>Neutrophils</td>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800 }}>62 %</td>
                        <td style={{ padding: '0.6rem 0.8rem', color: 'var(--text-muted)' }}>40 - 75 %</td>
                        <td style={{ padding: '0.6rem 0.8rem' }}><span className="badge badge-success">Normal</span></td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 600 }}>Lymphocytes</td>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800 }}>30 %</td>
                        <td style={{ padding: '0.6rem 0.8rem', color: 'var(--text-muted)' }}>20 - 45 %</td>
                        <td style={{ padding: '0.6rem 0.8rem' }}><span className="badge badge-success">Normal</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Pathologist Clinical Impression */}
                <div style={{
                  background: 'var(--success-surface)',
                  border: '1px solid var(--success-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  fontSize: '0.82rem',
                  color: 'var(--success-text)'
                }}>
                  <strong>Clinical Impression:</strong> Parameters within safe reference limits. Platelets stable at 185k (no severe thrombocytopenia). Consistent with acute uncomplicated febrile illness. Continue symptomatic hydration and Paracetamol.
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedReportModal(false)}>Close</button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setSelectedReportModal(false);
                    navigateTo('medicine-reminders');
                  }}
                >
                  <span>Proceed to Medicine Reminder</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
