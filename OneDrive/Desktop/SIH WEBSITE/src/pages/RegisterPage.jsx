import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
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
  Lock
} from 'lucide-react';

export const RegisterPage = () => {
  const { 
    navigateTo, 
    setPendingRegData, 
    addToast,
    playAudioChime 
  } = useApp();

  const [form, setForm] = useState({
    fullName: 'Arun Kumar',
    mobile: '9876543210',
    dob: '1994-06-14',
    gender: 'Male',
    location: 'Civil Lines, Bhopal',
    language: 'en',
    password: 'password123',
    confirmPassword: 'password123'
  });

  const [errors, setErrors] = useState({});

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.mobile.trim() || form.mobile.trim().length !== 10) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.location.trim()) newErrors.location = "Location / District is required";
    if (!form.password || form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      playAudioChime('warning');
      return;
    }

    setErrors({});
    setPendingRegData(form);
    addToast('Details Saved', 'Verification OTP sent to your registered mobile number.', 'info');
    navigateTo('/otp');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '620px', margin: '1.5rem auto', padding: '0 1rem' }}>
      
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
            width: '50px',
            height: '50px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--primary), #0284C7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            margin: '0 auto 0.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <UserPlus size={26} />
          </div>

          <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Citizen Registration
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Create your national digital health account (ABHA) on SwasthyaPath
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegisterSubmit}>
          
          <div className="grid-2">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="e.g. Arun Kumar"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  style={{ paddingLeft: '2.4rem' }}
                />
                <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.fullName && <div className="form-error-text">{errors.fullName}</div>}
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className={`form-input ${errors.mobile ? 'error' : ''}`}
                  placeholder="10-digit mobile"
                  value={form.mobile}
                  onChange={e => setForm({ ...form, mobile: e.target.value })}
                  style={{ paddingLeft: '2.4rem' }}
                />
                <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.mobile && <div className="form-error-text">{errors.mobile}</div>}
            </div>
          </div>

          <div className="grid-2">
            {/* Date of Birth */}
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
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
              <label className="form-label">Gender</label>
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
              <label className="form-label">District / City Location</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder="e.g. Civil Lines, Bhopal"
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
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Min 6 chars"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ paddingLeft: '2.4rem' }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.password && <div className="form-error-text">{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  style={{ paddingLeft: '2.4rem' }}
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
