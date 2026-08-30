import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initialPatientData } from '../data/mockPatient';
import { mockFacilities } from '../data/mockFacilities';
import { translations } from '../data/translations';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication: Default FALSE for clean initial Welcome/Landing page experience
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('swasthya_auth') === 'true';
  });

  // User Role: 'patient' | 'health-worker' | 'facility-staff' | 'admin'
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('swasthya_role') || 'patient';
  });

  // Pending Auth Data for Registration / OTP flow
  const [pendingRegData, setPendingRegData] = useState(() => {
    return {
      fullName: 'Arun Kumar',
      mobile: '9876543210',
      dob: '1994-06-14',
      gender: 'Male',
      location: 'Civil Lines, Bhopal',
      language: 'en',
      emergencyName: 'Sunita Kumar',
      emergencyPhone: '+91 98765 43211',
      emergencyRel: 'Spouse'
    };
  });

  // Language & Accessibility
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('swasthya_lang') || 'en';
  });
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [screenReaderActive, setScreenReaderActive] = useState(false);

  // Network Connectivity State (Online / Syncing / Offline)
  const [networkStatus, setNetworkStatus] = useState('online');

  // Shared Reactive Patient & Medical State (Arun Kumar demo dataset)
  const [patientData, setPatientData] = useState(() => {
    const saved = localStorage.getItem('swasthya_patient_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialPatientData;
      }
    }
    return initialPatientData;
  });

  // Facilities dataset
  const [facilities, setFacilities] = useState(() => {
    const saved = localStorage.getItem('swasthya_facilities_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return mockFacilities;
      }
    }
    return mockFacilities;
  });

  const [selectedFacility, setSelectedFacility] = useState(mockFacilities[0]);

  // Overlays
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // SIH Presentation Tour Step (1 - 20)
  const [demoStep, setDemoStep] = useState(1);
  const [demoTourActive, setDemoTourActive] = useState(false);

  // Save auth & state to LocalStorage
  useEffect(() => {
    localStorage.setItem('swasthya_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('swasthya_patient_state', JSON.stringify(patientData));
  }, [patientData]);

  useEffect(() => {
    localStorage.setItem('swasthya_facilities_state', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('swasthya_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('swasthya_role', userRole);
  }, [userRole]);

  // Apply Accessibility Classes to Body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    document.body.classList.remove('text-large', 'text-xlarge');
    if (fontSize === 'large') document.body.classList.add('text-large');
    if (fontSize === 'xlarge') document.body.classList.add('text-xlarge');
  }, [highContrast, fontSize]);

  // Unified Navigation Route Helper
  const navigateTo = (pathOrScreen, paramFacility = null) => {
    if (paramFacility) {
      setSelectedFacility(paramFacility);
    }

    // Map screen aliases to proper URL paths
    const routeMap = {
      'landing': '/',
      'welcome': '/',
      'login': '/login',
      'register': '/register',
      'otp': '/otp',
      'profile-setup': '/profile-setup',
      'dashboard': '/home',
      'home': '/home',
      'symptoms': '/health-problem',
      'health-problem': '/health-problem',
      'triage': '/care-navigation',
      'care-navigation': '/care-navigation',
      'facilities': '/facilities',
      'facility-details': '/facility-details',
      'appointment': '/appointments',
      'appointments': '/appointments',
      'live-queue': '/queue',
      'queue': '/queue',
      'check-in': '/check-in',
      'consultation': '/consultation',
      'tests': '/tests-reports',
      'tests-reports': '/tests-reports',
      'referrals': '/referrals',
      'medicines': '/medicines',
      'medicine-reminders': '/medicine-reminder',
      'medicine-reminder': '/medicine-reminder',
      'care-plan': '/care-plan',
      'journey': '/health-journey',
      'health-journey': '/health-journey',
      'follow-up': '/follow-up',
      'alerts': '/notifications',
      'notifications': '/notifications',
      'account': '/account',
      'emergency': '/emergency',
      'health-worker': '/health-worker',
      'facility-staff': '/facility-staff',
      'admin': '/admin'
    };

    const targetUrl = routeMap[pathOrScreen] || (pathOrScreen.startsWith('/') ? pathOrScreen : `/${pathOrScreen}`);
    navigate(targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    navigate(-1);
  };

  // Toast System
  const addToast = (title, message, type = 'info', action = null) => {
    const id = Date.now() + Math.random();
    const newToast = { id, title, message, type, action };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);

    playAudioChime(type);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Web Audio Chimes
  const playAudioChime = (type = 'info') => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'warning' || type === 'emergency') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(349.23, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {}
  };

  // Text-To-Speech Reader
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'ta') utterance.lang = 'ta-IN';
      else if (language === 'te') utterance.lang = 'te-IN';
      else if (language === 'kn') utterance.lang = 'kn-IN';
      else utterance.lang = 'en-IN';
      
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
      addToast('Screen Reader', 'Reading content aloud...', 'info');
    }
  };

  // Start Demo Journey with Arun Kumar
  const startDemoJourney = () => {
    setPatientData(initialPatientData);
    setFacilities(mockFacilities);
    setSelectedFacility(mockFacilities[0]);
    setIsAuthenticated(true);
    setUserRole('patient');
    setDemoTourActive(true);
    setDemoStep(1);
    navigateTo('/home');
    addToast('Demo Journey Started', 'Preloaded Arun Kumar (Fever for 3 days).', 'success');
  };

  // Login action
  const loginUser = (mobileOrEmail) => {
    setIsAuthenticated(true);
    addToast('Login Successful', 'Welcome back to SwasthyaPath!', 'success');
    navigateTo('/home');
  };

  // Logout action
  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('swasthya_auth');
    setDemoTourActive(false);
    navigateTo('/');
    addToast('Logged Out Successfully', 'You have been safely logged out.', 'info');
  };

  // 1. Feature: Submit Health Symptoms
  const submitSymptoms = (text, selectedChips = [], duration = "3 days") => {
    const isEmergencySymptom = text.toLowerCase().includes('chest pain') || 
                              text.toLowerCase().includes('breathing') || 
                              selectedChips.includes('Breathing Difficulty');

    let triageLevel = "District Hospital / Community Health Centre";
    let priority = "Normal";
    let reason = "Fever lasting >= 3 days accompanied by generalized fatigue requires medical examination, vitals check, and baseline diagnostic blood work (CBC) to check for infection.";

    if (isEmergencySymptom) {
      triageLevel = "Emergency Trauma Centre (District Hospital)";
      priority = "High Priority";
      reason = "Symptoms suggest acute respiratory or cardiovascular distress. Immediate triage stabilization advised.";
    }

    setPatientData(prev => ({
      ...prev,
      symptoms: {
        text,
        selectedChips,
        duration,
        severity: isEmergencySymptom ? "Severe" : "Moderate",
        submittedAt: new Date().toISOString()
      },
      aiTriage: {
        recommendedCareLevel: triageLevel,
        priority,
        facilityType: "Secondary Public Healthcare (District Hospital)",
        reason,
        disclaimer: "SwasthyaPath provides care navigation and triage support. It does not replace professional medical diagnosis or emergency care."
      }
    }));

    addToast('AI Triage Completed', 'Health recommendation generated based on clinical protocols.', 'success');
  };

  // 2. Feature: Book Appointment / Join Queue
  const bookAppointment = (facilityId, doctorId, date = "Today", time = "10:30 AM") => {
    const facility = facilities.find(f => f.id === facilityId) || facilities[0];
    const doctor = facility.doctors?.find(d => d.id === doctorId) || facility.doctors?.[0] || { name: "Dr. Priya Sharma" };

    const tokenNum = `A-0${(facility.queueCount || 7) + 1}`;
    const newPos = (facility.queueCount || 7) + 1;
    const estWait = (newPos * 3) + 5;

    setPatientData(prev => ({
      ...prev,
      appointment: {
        facilityId: facility.id,
        facilityName: facility.name,
        service: "General Medicine OPD",
        doctor: doctor.name,
        room: doctor.room || "OPD Room 4",
        date,
        time,
        tokenNumber: tokenNum,
        queuePosition: newPos,
        estimatedWaitMins: estWait,
        checkedIn: false,
        checkInTime: null,
        status: "waiting",
        patientsAhead: newPos - 1
      },
      carePlanItems: [
        ...prev.carePlanItems.filter(item => item.id !== 'cp-booking'),
        {
          id: 'cp-booking',
          title: `OPD Appointment at ${facility.name}`,
          desc: `Token ${tokenNum} for ${doctor.name} (${date}, ${time})`,
          status: 'current',
          targetScreen: 'live-queue',
          actionText: 'View Queue'
        }
      ]
    }));

    addToast('Appointment Confirmed', `Token #${tokenNum} issued for ${facility.name}`, 'success');
  };

  // 3. Feature: Check-in Simulation
  const checkInPatient = () => {
    setPatientData(prev => ({
      ...prev,
      appointment: {
        ...prev.appointment,
        checkedIn: true,
        checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'waiting'
      }
    }));
    addToast('Check-in Successful', 'You are now checked in at the hospital OPD.', 'success');
  };

  // 4. Feature: Advance Live Queue
  const advanceQueue = () => {
    setPatientData(prev => {
      const currentPos = prev.appointment?.queuePosition || 8;
      if (currentPos <= 1) {
        playAudioChime('success');
        addToast('Your Turn!', 'Please proceed to OPD Room 4 for your consultation.', 'success');
        return {
          ...prev,
          appointment: {
            ...prev.appointment,
            queuePosition: 1,
            patientsAhead: 0,
            estimatedWaitMins: 0,
            status: 'in_consultation'
          }
        };
      }

      const nextPos = currentPos - 1;
      const nextWait = Math.max(0, (nextPos - 1) * 3);
      const nextToken = `A-0${nextPos}`;

      addToast('Queue Updated', `Now serving Token #${nextToken}. ${nextPos - 1} patients ahead.`, 'info');

      return {
        ...prev,
        appointment: {
          ...prev.appointment,
          queuePosition: nextPos,
          patientsAhead: Math.max(0, nextPos - 1),
          estimatedWaitMins: nextWait,
          status: nextPos === 1 ? 'in_consultation' : 'waiting'
        }
      };
    });
  };

  // 5. Feature: Doctor Consultation Save
  const saveConsultation = (updatedNotes, newPrescription, orderedTests, followUpDays = 7, createReferral = false) => {
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + followUpDays);
    const dateStr = followUpDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setPatientData(prev => {
      const updatedPrescriptions = newPrescription ? [...prev.consultation.prescriptions, newPrescription] : prev.consultation.prescriptions;
      const updatedTests = orderedTests || prev.consultation.testsOrdered;

      const updatedCarePlan = [
        {
          id: "cp-1",
          title: "Doctor Consultation Completed",
          desc: "Consulted with Dr. Priya Sharma at District Government Hospital (OPD Room 4)",
          status: "completed",
          targetScreen: "consultation",
          date: "Just now"
        },
        {
          id: "cp-2",
          title: "CBC Diagnostic Blood Test Ordered",
          desc: "Sample processing at District Hospital Diagnostic Centre",
          status: "current",
          targetScreen: "tests",
          actionText: "View Test"
        },
        {
          id: "cp-3",
          title: "Take Prescribed Medicine: Paracetamol 650mg",
          desc: "2:00 PM Afternoon dose is due now. Take after light snack.",
          status: "current",
          targetScreen: "medicine-reminders",
          actionText: "Take Medicine"
        },
        {
          id: "cp-4",
          title: `Follow-up Consultation on ${dateStr}`,
          desc: `Scheduled review with General Medicine OPD (${followUpDays} days).`,
          status: "upcoming",
          targetScreen: "follow-up",
          date: dateStr
        }
      ];

      return {
        ...prev,
        consultation: {
          ...prev.consultation,
          consulted: true,
          consultationTime: "Today, Just now",
          clinicalNotes: updatedNotes || prev.consultation.clinicalNotes,
          prescriptions: updatedPrescriptions,
          testsOrdered: updatedTests,
          followUpDays,
          followUpDate: dateStr
        },
        carePlanItems: updatedCarePlan,
        healthJourney: [
          {
            id: `hj-${Date.now()}`,
            date: "Today",
            time: "Just now",
            title: "Doctor Consultation Completed & Rx Issued",
            type: "consultation",
            desc: "Consulted Dr. Priya Sharma. Prescribed Paracetamol 650mg & ordered CBC Test.",
            status: "completed",
            icon: "Stethoscope"
          },
          ...prev.healthJourney
        ],
        alerts: [
          {
            id: `alt-${Date.now()}`,
            title: "Prescription & Care Plan Updated",
            message: `Dr. Priya Sharma added medicines and scheduled a follow-up for ${dateStr}.`,
            type: "medicine",
            severity: "info",
            targetScreen: "care-plan",
            timestamp: "Just now",
            read: false
          },
          ...prev.alerts
        ]
      };
    });

    addToast('Consultation Saved', 'Prescription, diagnostic tests, care plan, and reminders updated.', 'success');
  };

  // 6. Feature: Upload / Generate Lab Report
  const uploadLabReport = (testId) => {
    setPatientData(prev => {
      const updatedTests = prev.consultation.testsOrdered.map(t => {
        if (t.id === testId || testId === 'all') {
          return {
            ...t,
            status: 'ready',
            orderedDate: 'Today, Processed'
          };
        }
        return t;
      });

      return {
        ...prev,
        consultation: {
          ...prev.consultation,
          testsOrdered: updatedTests
        },
        carePlanItems: prev.carePlanItems.map(cp => {
          if (cp.id === 'cp-2') {
            return {
              ...cp,
              title: "CBC Diagnostic Blood Test Completed",
              desc: "Results: Normal (Platelets 185k). Doctor reviewed.",
              status: "completed",
              actionText: undefined
            };
          }
          return cp;
        }),
        healthJourney: [
          {
            id: `hj-rep-${Date.now()}`,
            date: "Today",
            time: "Just now",
            title: "CBC Blood Report Generated",
            type: "report",
            desc: "Hemoglobin 14.2 g/dL, Platelets 185k (Normal). Doctor reviewed.",
            status: "completed",
            icon: "FileText"
          },
          ...prev.healthJourney
        ],
        alerts: [
          {
            id: `alt-rep-${Date.now()}`,
            title: "CBC Report Ready",
            message: "Your Complete Blood Count report has been generated and verified by the lab.",
            type: "test",
            severity: "info",
            targetScreen: "tests",
            timestamp: "Just now",
            read: false
          },
          ...prev.alerts
        ]
      };
    });

    addToast('Report Added Successfully', 'CBC report has been attached to your health journey.', 'success');
  };

  // 7. Feature: Medicine Reminder Action
  const updateMedicineReminder = (prescriptionId, reminderIndex, newStatus) => {
    setPatientData(prev => {
      const updatedRx = prev.consultation.prescriptions.map(rx => {
        if (rx.id === prescriptionId) {
          const updatedReminders = rx.reminders.map((rem, idx) => {
            if (idx === reminderIndex) {
              return { ...rem, status: newStatus };
            }
            return rem;
          });
          return { ...rx, reminders: updatedReminders };
        }
        return rx;
      });

      return {
        ...prev,
        consultation: {
          ...prev.consultation,
          prescriptions: updatedRx
        }
      };
    });

    if (newStatus === 'taken') {
      addToast('Medicine Marked Taken', 'Great job adhering to your prescribed care plan!', 'success');
    } else {
      addToast('Dose Skipped', 'Reminder marked as skipped.', 'warning');
    }
  };

  // 8. Feature: Progress Referral Lifecycle
  const progressReferralStage = () => {
    setPatientData(prev => {
      const nextStage = Math.min(4, (prev.referral?.currentStage || 0) + 1);
      const stageTitles = ["Created", "Notified", "Accepted", "Scheduled", "Completed"];
      const newStatus = stageTitles[nextStage];

      const updatedStages = prev.referral?.stages?.map((s, idx) => ({
        ...s,
        done: idx <= nextStage
      })) || [];

      addToast('Referral Updated', `Referral status advanced to "${newStatus}"`, 'success');

      return {
        ...prev,
        referral: {
          ...prev.referral,
          currentStage: nextStage,
          status: newStatus,
          stages: updatedStages
        }
      };
    });
  };

  // 9. Feature: Follow-Up & Missed Follow-Up Trigger
  const triggerMissedFollowUp = () => {
    setPatientData(prev => ({
      ...prev,
      alerts: [
        {
          id: `alt-missed-${Date.now()}`,
          title: "FOLLOW-UP MISSED",
          message: "Your scheduled follow-up was missed. Contact your ASHA health worker or reschedule your appointment.",
          type: "followup",
          severity: "warning",
          targetScreen: "follow-up",
          timestamp: "Just now",
          read: false
        },
        ...prev.alerts
      ]
    }));
    addToast('Follow-up Missed Alert Generated', 'Alert sent to patient and assigned ASHA worker.', 'warning');
  };

  // Reset demo data
  const resetDemoData = () => {
    setPatientData(initialPatientData);
    setFacilities(mockFacilities);
    setSelectedFacility(mockFacilities[0]);
    localStorage.removeItem('swasthya_patient_state');
    localStorage.removeItem('swasthya_facilities_state');
    addToast('Demo Data Reset', 'Prototype restored to default Arun Kumar state.', 'info');
  };

  const t = translations[language] || translations.en;

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    userRole,
    setUserRole,
    currentPath: location.pathname,
    navigateTo,
    goBack,
    language,
    setLanguage,
    t,
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    screenReaderActive,
    setScreenReaderActive,
    networkStatus,
    setNetworkStatus,
    patientData,
    setPatientData,
    pendingRegData,
    setPendingRegData,
    facilities,
    setFacilities,
    selectedFacility,
    setSelectedFacility,
    emergencyModalOpen,
    setEmergencyModalOpen,
    toasts,
    addToast,
    removeToast,
    demoStep,
    setDemoStep,
    demoTourActive,
    setDemoTourActive,
    playAudioChime,
    speakText,
    startDemoJourney,
    loginUser,
    logoutUser,
    submitSymptoms,
    bookAppointment,
    checkInPatient,
    advanceQueue,
    saveConsultation,
    uploadLabReport,
    updateMedicineReminder,
    progressReferralStage,
    triggerMissedFollowUp,
    resetDemoData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
