import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserPlus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle,
  Phone,
  User,
  Calendar,
  MapPin,
  Globe,
  Lock,
  Play,
  Sparkles
} from 'lucide-react';

export const RegisterPage = () => {
  const { 
    navigateTo, 
    setPendingRegData, 
    startDemoJourney,
    addToast,
    playAudioChime 
  } = useApp();

  // Form starts completely EMPTY (NO hardcoded Arun Kumar!)
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    dob: '',
    gender: 'Male',
    location: '',
    language: 'en',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const cleanName = form.fullName.trim();
    const cleanMobile = form.mobile.replace(/\D/g, '');

    if (!cleanName || cleanName.length < 2) {
      newErrors.fullName = "Please enter your full name (at least 2 characters)";
    }

    if (!cleanMobile || cleanMobile.length !== 10) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!form.dob) {
      newErrors.dob = "Please select your date of birth";
    }

    if (!form.location.trim()) {
      newErrors.location = "Please enter your district or city";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      playAudioChime('warning');
      return;
    }

    setErrors({});
    setPendingRegData({
      ...form,
      fullName: cleanName,
      mobile: cleanMobile
    });

    addToast('Details Saved', `Verification OTP sent to +91 ${cleanMobile}.`, 'info');
    navigateTo('/otp');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '1.5rem auto', padding: '0 1rem' }}>
      
      {/* Back to Welcome */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1rem', paddingLeft: 0 }}
        onClick={() => navigateTo('/')}
      >
        <ArrowLeft size={16} />
        <span>Back to Welcome Page</span>
      </button>

      <div className="card" style={{ padding: '2.25rem 2rem', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--primary), #0284C7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            margin: '0 auto 0.85rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <UserPlus size={26} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Citizen Registration
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Create your national digital health account (ABHA) on SwasthyaPath
          </p>
        </div>

        {/* Demo Mode Separation Banner */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.6rem'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Looking for SIH Judge Demo?
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Pre-loaded Arun Kumar presentation journey
            </div>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.76rem', padding: '0.35rem 0.75rem' }}
            onClick={startDemoJourney}
          >
            <Play size={13} fill="currentColor" />
            <span>Start Demo Journey</span>
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegisterSubmit}>
          
          <div className="grid-2">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  style={{ paddingLeft: '2.4rem' }}
                  autoComplete="name"
                />
                <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.fullName && <div className="form-error-text">{errors.fullName}</div>}
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="tel" 
                  maxLength={10}
                  className={`form-input ${errors.mobile ? 'error' : ''}`}
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={e => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '') })}
                  style={{ paddingLeft: '2.4rem' }}
                  autoComplete="tel"
                />
                <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.mobile && <div className="form-error-text">{errors.mobile}</div>}
            </div>
          </div>

          <div className="grid-2">
            {/* Date of Birth */}
            <div className="form-group">
              <label className="form-label">Date of Birth *</label>
              <input 
                type="date" 
                className={`form-input ${errors.dob ? 'error' : ''}`}
                value={form.dob}
                onChange={e => setForm({ ...form, dob: e.target.value })}
              />
              {errors.dob && <div className="form-error-text">{errors.dob}</div>}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label className="form-label">Gender *</label>
              <select 
                className="form-select"
                value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            {/* District Location */}
            <div className="form-group">
              <label className="form-label">District / City *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder="e.g. Bhopal, Indore, Delhi"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  style={{ paddingLeft: '2.4rem' }}
                />
                <MapPin size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.location && <div className="form-error-text">{errors.location}</div>}
            </div>

            {/* Preferred Language */}
            <div className="form-group">
              <label className="form-label">Preferred Language</label>
              <select 
                className="form-select"
                value={form.language}
                onChange={e => setForm({ ...form, language: e.target.value })}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ paddingLeft: '2.4rem' }}
                  autoComplete="new-password"
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.password && <div className="form-error-text">{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  style={{ paddingLeft: '2.4rem' }}
                  autoComplete="new-password"
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.confirmPassword && <div className="form-error-text">{errors.confirmPassword}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
            <span>Continue to OTP Verification</span>
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Link to Login */}
        <div style={{ textAlign: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)', fontSize: '0.86rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already registered with ABHA? </span>
          <button 
            type="button" 
            className="btn-ghost"
            style={{ color: 'var(--primary)', fontWeight: 700, padding: 0 }}
            onClick={() => navigateTo('/login')}
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
