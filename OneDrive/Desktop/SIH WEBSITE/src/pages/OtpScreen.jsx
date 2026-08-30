import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, RotateCcw, X, AlertCircle } from 'lucide-react';

export const OtpScreen = () => {
  const { 
    otpModalOpen, 
    setOtpModalOpen, 
    setProfileWizardOpen, 
    setIsAuthenticated, 
    patientData, 
    addToast,
    playAudioChime 
  } = useApp();

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']); // Pre-filled for demo convenience
  const [countdown, setCountdown] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let timer;
    if (otpModalOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpModalOpen, countdown]);

  if (!otpModalOpen) return null;

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste of 6 digits
      const digits = value.slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => { if (i < 6) newOtp[i] = d; });
      setOtp(newOtp);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
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
      return;
    }

    // Demo OTP validation: Accept 123456 or any 6 digits
    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      if (fullOtp === '000000') {
        setErrorMsg('Invalid OTP. Please enter the correct code.');
        playAudioChime('warning');
      } else {
        playAudioChime('success');
        addToast('Mobile Verified', '6-digit OTP verification successful.', 'success');
        setIsAuthenticated(true);
        setOtpModalOpen(false);
        setProfileWizardOpen(true);
      }
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={() => setOtpModalOpen(false)}>
      <div 
        className="modal-container" 
        style={{ maxWidth: '440px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-surface)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>OTP Verification</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0 }}>Security Check</p>
            </div>
          </div>
          <button className="btn-icon" onClick={() => setOtpModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Enter the 6-digit OTP sent to <strong>{patientData.profile.mobile}</strong>
          </p>

          {/* 6 Digit Input Boxes */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-digit-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                style={{
                  width: '46px',
                  height: '52px',
                  textAlign: 'center',
                  fontSize: '1.4rem',
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
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Resend & Demo Button */}
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
                addToast('OTP Resent', 'A fresh 6-digit code has been dispatched.', 'info');
              }}
              style={{ color: countdown === 0 ? 'var(--primary)' : 'var(--text-subtle)', fontWeight: 600 }}
            >
              Resend OTP
            </button>
          </div>

          <button 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%' }}
            onClick={handleVerify}
            disabled={isVerifying}
          >
            <span>{isVerifying ? 'Verifying OTP...' : 'Verify & Continue'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
