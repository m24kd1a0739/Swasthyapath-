import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  Stethoscope, 
  Building2, 
  Clock, 
  Milestone, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Pill, 
  Play
} from 'lucide-react';

export const LandingPage = () => {
  const { 
    navigateTo, 
    setAuthModalMode, 
    setEmergencyModalOpen, 
    setDemoTourActive, 
    setDemoStep, 
    t 
  } = useApp();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 0 3rem' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: 'white',
        borderRadius: 'var(--radius-xl)',
        padding: '3rem 2.5rem',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.35) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(13, 148, 136, 0.25)', border: '1px solid rgba(13, 148, 136, 0.5)', padding: '0.35rem 0.8rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <Sparkles size={16} color="#14B8A6" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#99F6E4', letterSpacing: '0.03em' }}>
              SMART INDIA HACKATHON • PUBLIC HEALTHCARE PLATFORM
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.9rem' }}>
            {t.brandName}
          </h1>

          <p style={{ fontSize: '1.35rem', fontWeight: 600, color: '#5EEAD4', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
            “{t.tagline}”
          </p>

          <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '2rem' }}>
            An AI-powered public healthcare navigation platform that seamlessly guides citizens through symptoms, optimal government facility selection, live OPD queues, lab investigations, medicines, and digital follow-ups.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary btn-lg"
              style={{ padding: '0.85rem 1.6rem', fontSize: '1rem', fontWeight: 700 }}
              onClick={() => {
                setDemoTourActive(true);
                setDemoStep(1);
                navigateTo('symptoms');
              }}
            >
              <Play size={18} fill="currentColor" />
              <span>Start Interactive Demo Journey</span>
            </button>

            <button 
              className="btn btn-secondary btn-lg"
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.25)' }}
              onClick={() => setAuthModalMode('login')}
            >
              <span>Citizen Login / Sign Up</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        {[
          {
            icon: Stethoscope,
            title: "1. AI Triage Navigation",
            desc: "Understand symptoms, recommended care level (PHC vs District Hospital), and clinical urgency."
          },
          {
            icon: Building2,
            title: "2. Smart Facility Match",
            desc: "Ranks facilities based on doctor availability, diagnostic tests, pharmacy stocks, and real-time wait times."
          },
          {
            icon: Clock,
            title: "3. Live OPD Queue",
            desc: "Digital token booking, hospital QR check-in, and simulated live queue advancement (#08 -> Your Turn)."
          },
          {
            icon: Milestone,
            title: "4. Connected Journey",
            desc: "Prescription-synced medicine reminders, CBC lab reports, referrals, and care checklists in one continuum."
          }
        ].map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={idx} className="card" style={{ padding: '1.25rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-surface)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.9rem'
              }}>
                <Icon size={22} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{feat.title}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{feat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Demo Patient Focus Box */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--primary-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 800
          }}>
            AK
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>Demo Patient: Arun Kumar (32 M)</span>
              <span className="badge badge-primary">Active Case</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Reported Case: <strong>“Fever for 3 days with weakness”</strong> • Follow the full 21-step continuum.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('dashboard')}
          >
            <span>Open Patient Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
