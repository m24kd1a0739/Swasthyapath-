import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  Lock, 
  Phone, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle,
  KeyRound,
  Sparkles
} from 'lucide-react';

export const LoginPage = () => {
  const { 
    navigateTo, 
    loginUser, 
    addToast,
    setPendingRegData,
    playAudioChime 
  } = useApp();

  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'
  const [loginInput, setLoginInput] = useState('9876543210');
  const [passwordInput, setPasswordInput] = useState('password123');
  const [errors, setErrors] = useState({});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const cleanInput = loginInput.trim();
    if (!cleanInput) {
      newErrors.login = "Mobile Number or Email / ABHA ID is required";
    } else if (cleanInput.length < 10) {
      newErrors.login = "Enter a valid 10-digit mobile number or ABHA ID";
    }

    if (loginMethod === 'password') {
      if (!passwordInput.trim()) {
        newErrors.password = "Password is required";
      } else if (passwordInput.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      playAudioChime('warning');
      return;
    }

    setErrors({});

    if (loginMethod === 'otp') {
      setPendingRegData(prev => ({ ...prev, mobile: cleanInput }));
      addToast('OTP Generated', `6-digit verification code sent to ${cleanInput}.`, 'info');
      navigateTo('/otp');
    } else {
      loginUser(cleanInput);
    }
  };

  const handleFillDemo = () => {
    setLoginInput('9876543210');
    setPasswordInput('password123');
    setErrors({});
    addToast('Demo Credentials Filled', 'Arun Kumar (+91 98765 43210)', 'info');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '480px', margin: '2rem auto', padding: '0 1rem' }}>
      
      {/* Back to Welcome */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1.25rem', paddingLeft: 0 }}
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
            margin: '0 auto 0.9rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <HeartHandshake size={28} />
          </div>

          <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Citizen Login
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Sign in to access your public healthcare continuum & live OPD queues
          </p>
        </div>

        {/* Demo Helper Pill */}
        <div style={{
          background: 'var(--primary-surface)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 0.85rem',
          fontSize: '0.78rem',
          color: 'var(--primary-text)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <strong>Demo User:</strong> Arun Kumar (9876543210)
          </div>
          <button 
            type="button" 
            className="badge badge-primary"
            style={{ cursor: 'pointer', border: '1px solid var(--primary)' }}
            onClick={handleFillDemo}
          >
            Auto-fill
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit}>
          
          {/* Mobile / Email Field */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">
              Mobile Number or ABHA / National Health ID
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className={`form-input ${errors.login ? 'error' : ''}`}
                placeholder="e.g. 9876543210 or 91-8472-9102-4821"
                value={loginInput}
                onChange={e => setLoginInput(e.target.value)}
                style={{ paddingLeft: '2.4rem' }}
              />
              <Phone size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
            {errors.login && (
              <div className="form-error-text" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <AlertCircle size={13} />
                <span>{errors.login}</span>
              </div>
            )}
          </div>

          {/* Password Field (When password mode is selected) */}
          {loginMethod === 'password' && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your account password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
                <Lock size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.password && (
                <div className="form-error-text" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertCircle size={13} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>
          )}

          {/* Login Mode Toggle & Forgot Password */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
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
              onClick={() => addToast('Password Reset', 'Password recovery link sent to registered mobile number.', 'info')}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '1.25rem' }}>
            <span>{loginMethod === 'otp' ? 'Send OTP & Verify' : 'Sign In'}</span>
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Create Account Link */}
        <div style={{ textAlign: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)', fontSize: '0.86rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account yet? </span>
          <button 
            type="button"
            className="btn-ghost"
            style={{ color: 'var(--primary)', fontWeight: 700, padding: 0 }}
            onClick={() => navigateTo('/register')}
          >
            Create New Account
          </button>
        </div>

      </div>
    </div>
  );
};
