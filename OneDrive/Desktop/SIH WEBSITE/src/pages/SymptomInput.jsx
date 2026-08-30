import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, MicOff, Sparkles, ArrowRight, ArrowLeft, Volume2, AlertTriangle, CheckCircle } from 'lucide-react';

export const SymptomInput = () => {
  const { t, navigateTo, submitSymptoms, addToast, playAudioChime } = useApp();

  const [symptomText, setSymptomText] = useState('Fever for 3 days with weakness.');
  const [selectedChips, setSelectedChips] = useState(['Fever', 'Weakness']);
  const [duration, setDuration] = useState('3 days');
  const [isListening, setIsListening] = useState(false);

  const availableChips = [
    'Fever',
    'Weakness',
    'Headache',
    'Cough',
    'Cold',
    'Body Pain',
    'Stomach Pain',
    'Skin Problem',
    'Breathing Difficulty',
    'Other'
  ];

  const handleToggleChip = (chip) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter(c => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
      // If symptom text is empty or default, append chip
      if (!symptomText.includes(chip)) {
        setSymptomText(prev => prev ? `${prev}, ${chip}` : chip);
      }
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    playAudioChime('info');
    addToast('Voice Input Activated', 'Listening to your speech... (Simulating Indian voice input)', 'info');

    setTimeout(() => {
      setSymptomText("Fever for 3 days with weakness and mild headache.");
      setSelectedChips(['Fever', 'Weakness', 'Headache']);
      setIsListening(false);
      playAudioChime('success');
      addToast('Voice Transcribed', 'Simulated voice input transcribed accurately.', 'success');
    }, 2800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptomText.trim() && selectedChips.length === 0) {
      addToast('Input Required', 'Please enter your symptoms or select symptom chips.', 'warning');
      return;
    }

    submitSymptoms(symptomText, selectedChips, duration);
    navigateTo('triage');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Back Button */}
      <button 
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1rem', paddingLeft: 0 }}
        onClick={() => navigateTo('dashboard')}
      >
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </button>

      <div className="card" style={{ padding: '2rem' }}>
        
        {/* Title */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--primary-surface)', color: 'var(--primary-text)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.76rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Sparkles size={14} />
            <span>AI Clinical Care Navigation • Step 1</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {t.symptomQuestion}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Describe what you are experiencing in your own words, select common symptoms, or speak.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Mode 1: Natural Text Input */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">
              1. Type your symptoms in plain language:
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder={t.symptomPlaceholder}
              value={symptomText}
              onChange={e => setSymptomText(e.target.value)}
              style={{ fontSize: '0.96rem', lineHeight: 1.5 }}
            />
          </div>

          {/* Mode 2: Symptom Chips */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
              2. Or select from quick symptom chips:
            </label>
            <div className="chip-group">
              {availableChips.map(chip => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    className={`chip ${isSelected ? 'active' : ''}`}
                    onClick={() => handleToggleChip(chip)}
                  >
                    {isSelected && <CheckCircle size={14} />}
                    <span>{chip}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode 3: Voice Input Simulation */}
          <div style={{
            background: isListening ? 'var(--primary-surface)' : 'var(--bg-surface)',
            border: isListening ? '2px solid var(--primary)' : '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <button
                type="button"
                className="btn-icon"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-full)',
                  background: isListening ? 'var(--danger)' : 'var(--primary)',
                  color: 'white',
                  animation: isListening ? 'pulseGlow 1s infinite' : 'none'
                }}
                onClick={handleVoiceInput}
              >
                {isListening ? <MicOff size={22} /> : <Mic size={22} />}
              </button>

              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                  {isListening ? 'Listening... Speak in Hindi, English, Telugu, Tamil, or Kannada' : '3. Speak Symptoms (Voice Input)'}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  {isListening ? 'Transcribing your voice into the health problem field...' : 'Tap the microphone to dictate your condition.'}
                </p>
              </div>
            </div>

            {isListening && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '4px', height: '14px', background: 'var(--primary)', animation: 'waveBar 0.8s infinite 0.1s' }}></span>
                <span style={{ width: '4px', height: '22px', background: 'var(--primary)', animation: 'waveBar 0.8s infinite 0.3s' }}></span>
                <span style={{ width: '4px', height: '16px', background: 'var(--primary)', animation: 'waveBar 0.8s infinite 0.2s' }}></span>
                <span style={{ width: '4px', height: '26px', background: 'var(--primary)', animation: 'waveBar 0.8s infinite 0.4s' }}></span>
              </div>
            )}
          </div>

          {/* Duration Selector */}
          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label">How long have you had these symptoms?</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Less than 24 hours', '1 - 2 days', '3 days (Arun Case)', '4 - 7 days', 'More than a week'].map(dur => (
                <button
                  key={dur}
                  type="button"
                  className={`btn btn-sm ${duration === dur ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setDuration(dur)}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            <Sparkles size={18} />
            <span>Analyze & Navigate Care Options</span>
            <ArrowRight size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};
