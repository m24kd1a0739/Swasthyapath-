import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Phone, User, Calendar, MapPin, Globe, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const { 
    authModalMode, 
    setAuthModalMode, 
    setOtpModalOpen, 
    setIsAuthenticated, 
    addToast,
    patientData,
    setPatientData
  } = useApp();

  const [isRegister, setIsRegister] = useState(authModalMode === 'register');
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'

  // Login form state
  const [loginInput, setLoginInput] = useState('9876543210');
  const [passwordInput, setPasswordInput] = useState('pass123');

  // Register form state
  const [regForm, setRegForm] = useState({
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

  if (!authModalMode) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginInput.trim()) {
      newErrors.login = "Mobile number or Email is required";
    } else if (loginInput.length < 10) {
      newErrors.login = "Enter a valid 10-digit mobile number";
    }

    if (loginMethod === 'password' && !passwordInput) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (loginMethod === 'otp') {
      setAuthModalMode(null);
      setOtpModalOpen(true);
      addToast('OTP Sent', 'A 6-digit verification code was sent to your registered mobile.', 'info');
    } else {
      setIsAuthenticated(true);
      setAuthModalMode(null);
      addToast('Login Successful', 'Welcome back to SwasthyaPath, Arun!', 'success');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!regForm.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!regForm.mobile || regForm.mobile.length !== 10) newErrors.mobile = "Enter valid 10-digit mobile number";
    if (!regForm.dob) newErrors.dob = "Date of birth is required";
    if (!regForm.password) newErrors.password = "Password is required";
    if (regForm.password !== regForm.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setPatientData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        fullName: regForm.fullName,
        mobile: `+91 ${regForm.mobile}`,
        dob: regForm.dob,
        gender: regForm.gender,
        location: regForm.location,
        preferredLanguage: regForm.language
      }
    }));

    setAuthModalMode(null);
    setOtpModalOpen(true);
    addToast('Account Registered', 'Please enter the 6-digit OTP to verify your account.', 'info');
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalMode(null)}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '520px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {isRegister ? 'Citizen Registration' : 'SwasthyaPath Login'}
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              {isRegister ? 'Create your national digital health account (ABHA)' : 'Access your connected healthcare portal'}
            </p>
          </div>
          <button className="btn-icon" onClick={() => setAuthModalMode(null)}>
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="tabs-header" style={{ padding: '0 1.5rem', marginBottom: '0.5rem' }}>
          <button 
            className={`tab-btn ${!isRegister ? 'active' : ''}`}
            onClick={() => { setIsRegister(false); setErrors({}); }}
          >
            Login
          </button>
          <button 
            className={`tab-btn ${isRegister ? 'active' : ''}`}
            onClick={() => { setIsRegister(true); setErrors({}); }}
          >
            New Registration
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {!isRegister ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Mobile Number or Email / ABHA ID</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className={`form-input ${errors.login ? 'error' : ''}`}
                    placeholder="e.g. 9876543210 or ABHA ID"
                    value={loginInput}
                    onChange={e => setLoginInput(e.target.value)}
                  />
                </div>
                {errors.login && <div className="form-error-text">{errors.login}</div>}
              </div>

              {loginMethod === 'password' && (
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                  />
                  {errors.password && <div className="form-error-text">{errors.password}</div>}
                </div>
              )}

              {/* Login Method Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.75rem 0 1.25rem' }}>
                <button 
                  type="button" 
                  className="btn-ghost btn-sm"
                  style={{ color: 'var(--primary)', fontWeight: 600, padding: 0 }}
                  onClick={() => setLoginMethod(loginMethod === 'otp' ? 'password' : 'otp')}
                >
                  {loginMethod === 'otp' ? 'Login with Password instead' : 'Login with 6-Digit OTP'}
                </button>

                <button 
                  type="button" 
                  className="btn-ghost btn-sm"
                  style={{ color: 'var(--text-muted)', padding: 0 }}
                  onClick={() => addToast('Password Reset', 'Password recovery link sent to registered phone.', 'info')}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Auto Demo Fill Helper */}
              <div style={{
                background: 'var(--primary-surface)',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.76rem',
                color: 'var(--primary-text)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Demo User: <strong>Arun Kumar (9876543210)</strong></span>
                <button 
                  type="button" 
                  className="badge badge-primary"
                  onClick={() => {
                    setLoginInput('9876543210');
                    setLoginMethod('otp');
                  }}
                >
                  Fill Demo
                </button>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <span>{loginMethod === 'otp' ? 'Get OTP & Verify' : 'Sign In'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    value={regForm.fullName}
                    onChange={e => setRegForm({ ...regForm, fullName: e.target.value })}
                  />
                  {errors.fullName && <div className="form-error-text">{errors.fullName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input 
                    type="text" 
                    className={`form-input ${errors.mobile ? 'error' : ''}`}
                    value={regForm.mobile}
                    onChange={e => setRegForm({ ...regForm, mobile: e.target.value })}
                  />
                  {errors.mobile && <div className="form-error-text">{errors.mobile}</div>}
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input 
                    type="date" 
                    className={`form-input ${errors.dob ? 'error' : ''}`}
                    value={regForm.dob}
                    onChange={e => setRegForm({ ...regForm, dob: e.target.value })}
                  />
                  {errors.dob && <div className="form-error-text">{errors.dob}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select 
                    className="form-select"
                    value={regForm.gender}
                    onChange={e => setRegForm({ ...regForm, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">District / Location</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={regForm.location}
                    onChange={e => setRegForm({ ...regForm, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Language</label>
                  <select 
                    className="form-select"
                    value={regForm.language}
                    onChange={e => setRegForm({ ...regForm, language: e.target.value })}
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
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    value={regForm.password}
                    onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                  />
                  {errors.password && <div className="form-error-text">{errors.password}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    value={regForm.confirmPassword}
                    onChange={e => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                  />
                  {errors.confirmPassword && <div className="form-error-text">{errors.confirmPassword}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                <span>Continue to OTP Verification</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
