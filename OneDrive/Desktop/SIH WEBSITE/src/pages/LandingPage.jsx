import React from 'react';
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
  Play,
  Globe,
  Volume2,
  Lock,
  UserPlus
} from 'lucide-react';

export const LandingPage = () => {
  const { 
    navigateTo, 
    setEmergencyModalOpen, 
    startDemoJourney,
    language,
    setLanguage,
    speakText,
    t 
  } = useApp();

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0.5rem 0 3.5rem' }}>
      
      {/* Top Welcome Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '0.75rem 1.25rem',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary), #0284C7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <HeartHandshake size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                {t.brandName}
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Govt / SIH</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>National Public Health Gateway</p>
          </div>
        </div>

        {/* Top Controls: Language, Voice, Emergency, Login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-surface)', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <Globe size={14} color="var(--primary)" />
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{ background: 'transparent', border: 'none', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', outline: 'none', cursor: 'pointer' }}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>

          {/* Accessibility Voice Button */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => speakText("Welcome to SwasthyaPath. Right Care. Right Place. Right Time. An AI-powered public healthcare navigation platform.")}
            title="Listen to Welcome Overview"
          >
            <Volume2 size={14} />
            <span className="desktop-only">Listen</span>
          </button>

          {/* Emergency SOS Access */}
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => setEmergencyModalOpen(true)}
            style={{ fontWeight: 800 }}
          >
            <ShieldAlert size={14} />
            <span>{t.emergency}</span>
          </button>

          {/* Login Button */}
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => navigateTo('/login')}
          >
            <Lock size={14} />
            <span>Login</span>
          </button>

          {/* Register Button */}
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('/register')}
          >
            <UserPlus size={14} />
            <span>Create Account</span>
          </button>
        </div>
      </div>

      {/* Hero Presentation Card */}
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
        {/* Decorative backdrop glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.35) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(13, 148, 136, 0.25)', border: '1px solid rgba(13, 148, 136, 0.5)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <Sparkles size={16} color="#14B8A6" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#99F6E4', letterSpacing: '0.03em' }}>
              SMART INDIA HACKATHON • PUBLIC HEALTHCARE PLATFORM
            </span>
          </div>

          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.9rem' }}>
            {t.brandName}
          </h1>

          <p style={{ fontSize: '1.35rem', fontWeight: 600, color: '#5EEAD4', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
            “{t.tagline}”
          </p>

          <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '2rem' }}>
            SwasthyaPath is an AI-powered public healthcare navigation platform that helps citizens understand what care they need next, which government facility is appropriate, and seamlessly manages hospital queues, lab tests, medicines, referrals, and follow-ups.
          </p>

          {/* Primary Call to Actions */}
          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
            {/* Get Started -> Register */}
            <button 
              className="btn btn-primary btn-lg"
              style={{ padding: '0.85rem 1.6rem', fontSize: '1rem', fontWeight: 700 }}
              onClick={() => navigateTo('/register')}
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </button>

            {/* Login */}
            <button 
              className="btn btn-secondary btn-lg"
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.25)' }}
              onClick={() => navigateTo('/login')}
            >
              <span>Login to Account</span>
            </button>

            {/* Start Demo Journey -> Arun Kumar */}
            <button 
              className="btn btn-secondary btn-lg"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0284C7)', color: 'white', border: 'none', fontWeight: 700 }}
              onClick={startDemoJourney}
            >
              <Play size={16} fill="currentColor" />
              <span>Start Demo Journey (Arun Kumar)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        {[
          {
            icon: Stethoscope,
            title: "1. AI Care Triage",
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

      {/* SIH Presentation Demo Box */}
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
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>SIH Presentation Judge Mode: Arun Kumar (32 M)</span>
              <span className="badge badge-primary">Demo Ready</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Simulate patient case: <strong>“Fever for 3 days with weakness”</strong> across all 20 connected public healthcare touchpoints.
            </p>
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={startDemoJourney}
        >
          <Play size={16} fill="currentColor" />
          <span>Launch Demo Journey</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};
