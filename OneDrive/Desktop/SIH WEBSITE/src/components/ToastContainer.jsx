import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast, navigateTo } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        let Icon = Info;
        let typeClass = 'toast-info';
        let iconColor = 'var(--primary)';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          typeClass = 'toast-success';
          iconColor = 'var(--success)';
        } else if (toast.type === 'error' || toast.type === 'emergency') {
          Icon = AlertCircle;
          typeClass = 'toast-error';
          iconColor = 'var(--danger)';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          typeClass = 'toast-warning';
          iconColor = 'var(--warning)';
        }

        return (
          <div key={toast.id} className={`toast ${typeClass}`}>
            <Icon size={20} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem', lineHeight: 1.35 }}>
                {toast.message}
              </div>
              {toast.action && (
                <button
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '0.4rem', padding: '0.2rem 0.6rem', fontSize: '0.74rem' }}
                  onClick={() => {
                    toast.action.handler();
                    removeToast(toast.id);
                  }}
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            <button 
              className="btn-icon" 
              style={{ width: '24px', height: '24px', padding: 0 }}
              onClick={() => removeToast(toast.id)}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
