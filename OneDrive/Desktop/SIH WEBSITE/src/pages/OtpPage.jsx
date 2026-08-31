import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Phone,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const OtpPage = () => {
  const { 
    navigateTo, 
    pendingRegData, 
    addToast, 
    playAudioChime 
  } = useApp();

  // Clean empty OTP input array by default
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '');

    if (cleanVal.length > 1) {
      const digits = cleanVal.slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => { if (i < 6) newOtp[i] = d; });
      setOtp(newOtp);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanVal;
    setOtp(newOtp);

    if (cleanVal && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    const fullOtp = otp.join('');

    if (fullOtp.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      playAudioChime('warning');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      if (fullOtp === '000000') {
        setErrorMsg('Invalid OTP. Please enter the correct code (e.g. 123456).');
        playAudioChime('warning');
      } else {
        playAudioChime('success');
        addToast('Mobile Verified', '6-digit OTP verification successful.', 'success');
        navigateTo('/profile-setup');
      }
    }, 600);
  };

  const handleFillDemoOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setErrorMsg('');
    addToast('Demo OTP Filled', '123456', 'info');
  };

  const displayPhone = pendingRegData.mobile 
    ? `+91 ${pendingRegData.mobile}` 
    : '+91 98765 43210';

  return (
    <div className="animate-fade-in" style={{ maxWidth: '480px', margin: '2rem auto', padding: '0 1rem' }}>
      
      {/* Back link */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1.25rem', paddingLeft: 0 }}
        onClick={() => navigateTo('/register')}
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <div className="card" style={{ padding: '2.25rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Icon Header */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--primary-surface)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          border: '2px solid var(--primary-border)'
        }}>
          <ShieldCheck size={30} />
        </div>

        <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          OTP Verification
        </h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Enter the 6-digit verification code sent to <strong>{displayPhone}</strong>
        </p>

        {/* Demo Helper Box */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '0.6rem 0.85rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid var(--border-light)'
        }}>
          <span>Simulated Demo OTP: <strong>123456</strong></span>
          <button 
            type="button" 
            className="badge badge-primary"
            onClick={handleFillDemoOtp}
          >
            Auto-fill
          </button>
        </div>

        {/* 6 Digit Input Boxes */}
        <form onSubmit={handleVerify}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-digit-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                style={{
                  width: '46px',
                  height: '52px',
                  textAlign: 'center',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  border: '2px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-medium)'}
              />
            ))}
          </div>

          {errorMsg && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--danger)', fontSize: '0.82rem', marginBottom: '1rem' }}>
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Resend OTP */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              {countdown > 0 ? `Resend code in ${countdown}s` : 'Did not receive OTP?'}
            </span>

            <button 
              type="button" 
              className="btn btn-ghost btn-sm"
              disabled={countdown > 0}
              onClick={() => {
                setCountdown(30);
                addToast('OTP Resent', `A fresh 6-digit code has been sent to ${displayPhone}.`, 'info');
              }}
              style={{ color: countdown === 0 ? 'var(--primary)' : 'var(--text-subtle)', fontWeight: 600 }}
            >
              Resend OTP
            </button>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%' }}
            disabled={isVerifying}
          >
            <span>{isVerifying ? 'Verifying Code...' : 'Verify & Continue'}</span>
            <ArrowRight size={17} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default OtpPage;
