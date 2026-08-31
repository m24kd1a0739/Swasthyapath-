import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { demoPatientData, createEmptyPatient, initialPatientData } from '../data/mockPatient';
import { mockFacilities } from '../data/mockFacilities';
import { translations } from '../data/translations';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('swasthya_auth') === 'true';
  });

  // Demo Mode Flag ('true' | 'false')
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('swasthya_is_demo') === 'true';
  });

  // User Role: 'patient' | 'health-worker' | 'facility-staff' | 'admin'
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('swasthya_role') || 'patient';
  });

  // Clean empty pending registration form data (NO hardcoded Arun Kumar!)
  const [pendingRegData, setPendingRegData] = useState(() => {
    return {
      fullName: '',
      mobile: '',
      dob: '',
      gender: 'Male',
      location: '',
      language: 'en',
      password: '',
      confirmPassword: '',
      emergencyName: '',
      emergencyPhone: '',
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

  // Active Patient State
  const [patientData, setPatientData] = useState(() => {
    const saved = localStorage.getItem('swasthya_patient_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return demoPatientData;
      }
    }
    const isDemo = localStorage.getItem('swasthya_is_demo') === 'true';
    return isDemo ? demoPatientData : createEmptyPatient();
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

  // SIH Presentation Tour Step (1 - 22)
  const [demoStep, setDemoStep] = useState(1);
  const [demoTourActive, setDemoTourActive] = useState(false);

  // Save auth & state to LocalStorage
  useEffect(() => {
    localStorage.setItem('swasthya_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('swasthya_is_demo', isDemoMode ? 'true' : 'false');
  }, [isDemoMode]);

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
      'care-transfer': '/care-transfer',
      'transfer-care': '/care-transfer',
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

  // 1. Action: Start Demo Journey (Explicitly loads Arun Kumar dataset)
  const startDemoJourney = () => {
    setIsDemoMode(true);
    setPatientData(demoPatientData);
    setFacilities(mockFacilities);
    setSelectedFacility(mockFacilities[0]);
    setIsAuthenticated(true);
    setUserRole('patient');
    setDemoTourActive(true);
    setDemoStep(1);
    localStorage.setItem('swasthya_patient_state', JSON.stringify(demoPatientData));
    localStorage.setItem('swasthya_is_demo', 'true');
    navigateTo('/home');
    addToast('Demo Mode Activated', 'Preloaded Arun Kumar presentation journey.', 'success');
  };

  // 2. Action: Register New User (Starts clean without Arun Kumar)
  const registerUser = (formData) => {
    const newPatient = createEmptyPatient(formData);
    setPatientData(newPatient);
    setIsDemoMode(false);
    setIsAuthenticated(true);
    setUserRole('patient');
    setDemoTourActive(false);

    // Save to user database
    try {
      const usersDb = JSON.parse(localStorage.getItem('swasthya_users_db') || '{}');
      const cleanPhone = formData.mobile.replace(/\D/g, '');
      usersDb[cleanPhone] = {
        formData,
        patientData: newPatient,
        registeredAt: new Date().toISOString()
      };
      localStorage.setItem('swasthya_users_db', JSON.stringify(usersDb));
    } catch (e) {}

    localStorage.setItem('swasthya_patient_state', JSON.stringify(newPatient));
    localStorage.setItem('swasthya_is_demo', 'false');
    addToast('Registration Successful', `Welcome to SwasthyaPath, ${formData.fullName}!`, 'success');
    navigateTo('/home');
  };

  // 3. Action: Login User
  const loginUser = (mobileOrAbha, password = '') => {
    const cleanInput = mobileOrAbha.replace(/\D/g, '');
    
    // Check if demo user
    if (cleanInput === '9876543210' || mobileOrAbha.toLowerCase().includes('arun')) {
      startDemoJourney();
      return true;
    }

    // Check user database
    try {
      const usersDb = JSON.parse(localStorage.getItem('swasthya_users_db') || '{}');
      if (usersDb[cleanInput]) {
        const savedAccount = usersDb[cleanInput];
        setPatientData(savedAccount.patientData || createEmptyPatient(savedAccount.formData));
        setIsDemoMode(false);
        setIsAuthenticated(true);
        setUserRole('patient');
        addToast('Welcome Back', `Logged in as ${savedAccount.formData.fullName}`, 'success');
        navigateTo('/home');
        return true;
      }
    } catch (e) {}

    // If new mobile number provided, generate clean account for user
    if (cleanInput.length === 10) {
      const newPatient = createEmptyPatient({
        fullName: pendingRegData.fullName || `Citizen (+91 ${cleanInput.slice(0, 5)}...)`,
        mobile: cleanInput,
        location: 'District Central, Bhopal'
      });
      setPatientData(newPatient);
      setIsDemoMode(false);
      setIsAuthenticated(true);
      setUserRole('patient');
      addToast('Login Successful', `Signed in with +91 ${cleanInput}`, 'success');
      navigateTo('/home');
      return true;
    }

    return false;
  };

  // 4. Action: Logout
  const logoutUser = () => {
    setIsAuthenticated(false);
    setIsDemoMode(false);
    localStorage.removeItem('swasthya_auth');
    localStorage.removeItem('swasthya_is_demo');
    setDemoTourActive(false);
    navigateTo('/');
    addToast('Logged Out', 'You have been safely signed out.', 'info');
  };

  // 5. Feature: Submit Symptoms (AI Triage)
  const submitSymptoms = (text, selectedChips = [], duration = "3 days") => {
    const isEmergencySymptom = text.toLowerCase().includes('chest pain') || 
                              text.toLowerCase().includes('breathing') || 
                              selectedChips.includes('Breathing Difficulty');

    let triageLevel = "District Hospital / Community Health Centre";
    let priority = "Normal Priority";
    let reason = `Assessment for "${text || selectedChips.join(', ')}": lasting ${duration} requires clinical examination, vitals evaluation, and baseline diagnostic workup (e.g. CBC) to rule out complications.`;

    if (isEmergencySymptom) {
      triageLevel = "Emergency Trauma Centre (District Hospital)";
      priority = "High Priority";
      reason = "Symptoms suggest acute respiratory or cardiovascular distress. Immediate triage stabilization advised.";
    }

    const patientName = patientData.profile.fullName || 'Patient';

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
      },
      healthJourney: [
        {
          id: `hj-symp-${Date.now()}`,
          date: "Today",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: "AI Care Navigation Triage Completed",
          type: "triage",
          desc: `Reported: "${text || selectedChips.join(', ')}". Recommended care level: ${triageLevel}.`,
          status: "completed",
          icon: "Cpu"
        },
        ...prev.healthJourney
      ],
      carePlanItems: [
        {
          id: 'cp-find-fac',
          title: `Visit Recommended Facility: District Hospital`,
          desc: `Triage priority: ${priority}. General Medicine OPD examination recommended.`,
          status: 'current',
          targetScreen: 'facilities',
          actionText: 'Find Facility'
        },
        ...prev.carePlanItems.filter(i => i.id !== 'cp-find-fac')
      ]
    }));

    addToast('Care Navigation Complete', 'Triage recommendation generated based on clinical protocols.', 'success');
  };

  // 6. Feature: Book Appointment / Join Live Queue
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
        {
          id: 'cp-booking',
          title: `OPD Appointment at ${facility.name}`,
          desc: `Token ${tokenNum} for ${doctor.name} (${date}, ${time})`,
          status: 'current',
          targetScreen: 'live-queue',
          actionText: 'View Queue'
        },
        ...prev.carePlanItems.filter(item => item.id !== 'cp-booking' && item.id !== 'cp-find-fac')
      ],
      healthJourney: [
        {
          id: `hj-appt-${Date.now()}`,
          date: "Today",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: `OPD Queue Token #${tokenNum} Issued`,
          type: "queue",
          desc: `Booked General Medicine consultation at ${facility.name} with ${doctor.name}.`,
          status: "completed",
          icon: "Users"
        },
        ...prev.healthJourney
      ]
    }));

    addToast('Appointment Confirmed', `Token #${tokenNum} issued for ${facility.name}`, 'success');
  };

  // 7. Feature: Check-in Simulation
  const checkInPatient = () => {
    setPatientData(prev => ({
      ...prev,
      appointment: {
        ...prev.appointment,
        checkedIn: true,
        checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'waiting'
      },
      healthJourney: [
        {
          id: `hj-checkin-${Date.now()}`,
          date: "Today",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: "Hospital OPD Kiosk Check-In",
          type: "queue",
          desc: `Token #${prev.appointment?.tokenNumber || 'A-08'} checked in at ${prev.appointment?.facilityName || 'District Hospital'}.`,
          status: "completed",
          icon: "Users"
        },
        ...prev.healthJourney
      ]
    }));
    addToast('Check-in Successful', 'You are now checked in at the hospital OPD.', 'success');
  };

  // 8. Feature: Advance Live Queue
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

  // 9. Feature: Doctor Consultation Save
  const saveConsultation = (updatedNotes, customPrescriptions = null, customTests = null, followUpDays = 7, referralInfo = null) => {
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + (followUpDays || 7));
    const dateStr = followUpDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setPatientData(prev => {
      // Formulate prescriptions with reminders
      const prescriptionsToSave = customPrescriptions && customPrescriptions.length > 0 
        ? customPrescriptions.map((med, idx) => ({
            id: med.id || `rx-${Date.now()}-${idx}`,
            medicineName: med.medicineName || med.name || 'Paracetamol 650mg',
            type: med.type || 'Tablet',
            dosage: med.dosage || '1 tablet after meals',
            frequency: med.frequency || 'Thrice daily (8:00 AM, 2:00 PM, 8:00 PM)',
            duration: med.duration || '5 days',
            instructions: med.instructions || 'Take with water after meals.',
            status: 'Active',
            availableAtFacility: med.availableAtFacility || 'District Hospital Pharmacy (Counter 2)',
            reminders: med.reminders || [
              { time: '08:00 AM', status: 'taken', label: 'Morning Dose' },
              { time: '02:00 PM', status: 'due', label: 'Afternoon Dose' },
              { time: '08:00 PM', status: 'upcoming', label: 'Night Dose' }
            ]
          }))
        : (prev.consultation?.prescriptions?.length ? prev.consultation.prescriptions : [
            {
              id: "rx-1",
              medicineName: "Paracetamol 650mg",
              type: "Tablet",
              dosage: "1 tablet after meals",
              frequency: "Thrice daily (8:00 AM, 2:00 PM, 8:00 PM)",
              duration: "5 days",
              instructions: "Take with water. Do not exceed 4g in 24 hours.",
              status: "Active",
              availableAtFacility: "District Hospital Pharmacy (Counter 2)",
              reminders: [
                { time: "08:00 AM", status: "taken", label: "Morning Dose" },
                { time: "02:00 PM", status: "due", label: "Afternoon Dose" },
                { time: "08:00 PM", status: "upcoming", label: "Night Dose" }
              ]
            }
          ]);

      // Formulate diagnostic tests
      const testsToSave = customTests && customTests.length > 0
        ? customTests.map((t, idx) => ({
            id: t.id || `test-order-${Date.now()}-${idx}`,
            testName: t.testName || t.name || 'Complete Blood Count (CBC) with Platelets',
            facility: t.facility || 'District Hospital Central Diagnostics',
            urgency: t.urgency || 'Standard OPD Lab',
            status: t.status || 'pending',
            orderedDate: 'Today, Just now',
            results: t.results || {
              hemoglobin: { value: '14.2', unit: 'g/dL', range: '13.0 - 17.0', status: 'Normal' },
              wbc: { value: '6,400', unit: '/µL', range: '4,000 - 11,000', status: 'Normal' },
              platelets: { value: '185,000', unit: '/µL', range: '150,000 - 450,000', status: 'Normal' }
            },
            doctorNotes: t.doctorNotes || 'Parameters within normal limits. Platelets safe at 185k.'
          }))
        : (prev.consultation?.testsOrdered?.length ? prev.consultation.testsOrdered : [
            {
              id: "test-order-1",
              testName: "Complete Blood Count (CBC) with Platelets",
              facility: "District Hospital Central Diagnostics",
              urgency: "Standard OPD Lab",
              status: "ready",
              orderedDate: "Today, Processed",
              results: {
                hemoglobin: { value: "14.2", unit: "g/dL", range: "13.0 - 17.0", status: "Normal" },
                wbc: { value: "6,400", unit: "/µL", range: "4,000 - 11,000", status: "Normal" },
                platelets: { value: "185,000", unit: "/µL", range: "150,000 - 450,000", status: "Normal" }
              },
              doctorNotes: "Parameters within normal limits. Platelets safe at 185k. Continue symptomatic management."
            }
          ]);

      // Formulate Referral if requested
      let referralToSave = prev.referral;
      if (referralInfo === true || (referralInfo && typeof referralInfo === 'object')) {
        const refId = typeof referralInfo === 'object' && referralInfo.referralId ? referralInfo.referralId : `REF-MP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const destFac = typeof referralInfo === 'object' && referralInfo.destinationFacility ? referralInfo.destinationFacility : 'District Government Hospital (Internal Medicine Unit)';
        referralToSave = {
          hasReferral: true,
          referralId: refId,
          sourceFacility: prev.appointment?.facilityName || 'PHC Kolar / District OPD',
          destinationFacility: destFac,
          referredBy: 'Dr. Priya Sharma',
          reason: typeof referralInfo === 'object' && referralInfo.reason ? referralInfo.reason : 'Diagnostic evaluation with specialist physician review',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          currentStage: 1,
          stages: [
            { stage: 0, title: 'PHC Initial Review', date: 'Today', done: true },
            { stage: 1, title: 'Referral Created', date: 'Today, Just now', done: true },
            { stage: 2, title: 'Specialist Hospital Notified', date: 'Pending Confirmation', done: false },
            { stage: 3, title: 'Referral Accepted & Scheduled', date: 'Pending', done: false },
            { stage: 4, title: 'Specialist Follow-up Done', date: 'Pending', done: false }
          ],
          status: 'Created & Notified'
        };
      }

      // Build dynamic Care Plan based on actual items
      const dynamicCarePlan = [
        {
          id: "cp-1",
          title: "Doctor Consultation Completed",
          desc: `Consulted with Dr. Priya Sharma at ${prev.appointment?.facilityName || 'District Government Hospital'}`,
          status: "completed",
          targetScreen: "consultation",
          date: "Today, Just now"
        }
      ];

      if (testsToSave.length > 0) {
        dynamicCarePlan.push({
          id: "cp-2",
          title: `${testsToSave[0].testName} Ordered`,
          desc: `Sample processing at ${testsToSave[0].facility}`,
          status: testsToSave[0].status === 'ready' ? 'completed' : 'current',
          targetScreen: "tests",
          actionText: "View Test"
        });
      }

      if (prescriptionsToSave.length > 0) {
        dynamicCarePlan.push({
          id: "cp-3",
          title: `Take Prescribed Medicine: ${prescriptionsToSave[0].medicineName}`,
          desc: `${prescriptionsToSave[0].dosage} • ${prescriptionsToSave[0].frequency}`,
          status: "current",
          targetScreen: "medicine-reminders",
          actionText: "Take Medicine"
        });
      }

      if (followUpDays) {
        dynamicCarePlan.push({
          id: "cp-4",
          title: `Follow-up Consultation on ${dateStr}`,
          desc: `Scheduled review with General Medicine OPD (${followUpDays} days).`,
          status: "upcoming",
          targetScreen: "follow-up",
          date: dateStr
        });
      }

      if (referralToSave?.hasReferral) {
        dynamicCarePlan.push({
          id: "cp-5",
          title: `Referral to ${referralToSave.destinationFacility}`,
          desc: `Referral Token #${referralToSave.referralId} registered.`,
          status: "pending",
          targetScreen: "referrals",
          actionText: "Track Referral"
        });
      }

      const medNames = prescriptionsToSave.map(m => m.medicineName).join(', ');
      const testNames = testsToSave.map(t => t.testName).join(', ');

      return {
        ...prev,
        appointment: prev.appointment ? { ...prev.appointment, status: 'completed' } : null,
        consultation: {
          consulted: true,
          consultationTime: "Today, Just now",
          doctorName: "Dr. Priya Sharma",
          doctorRole: "Senior Medical Specialist",
          room: prev.appointment?.room || "OPD Room 4",
          vitals: prev.consultation?.vitals || { bp: "118/78 mmHg", pulse: "84 bpm", temp: "100.8 °F", spo2: "98%" },
          clinicalNotes: updatedNotes || "Patient examined. Vitals reviewed. Prescribed treatment plan and diagnostic investigation.",
          prescriptions: prescriptionsToSave,
          testsOrdered: testsToSave,
          followUpDays: followUpDays || 7,
          followUpDate: dateStr,
          followUpReason: "General Medicine Review & Symptom Resolution"
        },
        referral: referralToSave,
        carePlanItems: dynamicCarePlan,
        healthJourney: [
          {
            id: `hj-cons-${Date.now()}`,
            date: "Today",
            time: "Just now",
            title: "Doctor Consultation Completed & Rx Issued",
            type: "consultation",
            desc: `Consulted Dr. Priya Sharma. ${prescriptionsToSave.length ? `Prescribed ${medNames}.` : ''} ${testsToSave.length ? `Ordered ${testNames}.` : ''}`,
            status: "completed",
            icon: "Stethoscope"
          },
          ...prev.healthJourney
        ],
        alerts: [
          {
            id: `alt-rx-${Date.now()}`,
            title: "Prescription & Care Plan Updated",
            message: `Dr. Priya Sharma issued medicines and scheduled a follow-up for ${dateStr}.`,
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

  // 10. Feature: Upload / Generate Lab Report
  const uploadLabReport = (testId) => {
    setPatientData(prev => {
      const tests = prev.consultation?.testsOrdered?.length ? prev.consultation.testsOrdered : [
        {
          id: "test-order-1",
          testName: "Complete Blood Count (CBC) with Platelets",
          facility: "District Hospital Central Diagnostics",
          status: "ready",
          orderedDate: "Today, Processed"
        }
      ];

      const updatedTests = tests.map(t => {
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
              desc: "Results: Normal (Platelets 185k). Verified by lab pathologist.",
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
            desc: "Hemoglobin 14.2 g/dL, Platelets 185k (Normal). Verified by pathologist.",
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

    addToast('Report Attached', 'CBC diagnostic report attached to your health journey.', 'success');
  };

  // 11. Feature: Update Medicine Reminder
  const updateMedicineReminder = (prescriptionId, reminderIndex, newStatus) => {
    setPatientData(prev => {
      const rxList = prev.consultation?.prescriptions || [];
      const updatedRx = rxList.map(rx => {
        if (rx.id === prescriptionId || prescriptionId === 'rx-1') {
          const updatedReminders = rx.reminders?.map((rem, idx) => {
            if (idx === reminderIndex) {
              return { ...rem, status: newStatus };
            }
            return rem;
          }) || [];
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
      addToast('Medicine Taken', 'Dose recorded successfully in your care adherence log.', 'success');
    } else {
      addToast('Dose Skipped', 'Reminder marked as skipped.', 'warning');
    }
  };

  // 12. Feature: NEW CARE TRANSFER / TREATMENT CONTINUITY WORKFLOW
  const initiateCareTransfer = (sourceFacilityName, destinationFacilityName, reason, selectedRecordsList = [], destinationFacId = 'fac-1') => {
    const transferId = `TRF-MP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTransferRecord = {
      hasTransfer: true,
      transferId,
      sourceFacilityName: sourceFacilityName || "Primary Health Centre (PHC) Kolar",
      destinationFacilityId: destinationFacId,
      destinationFacilityName: destinationFacilityName || "District Government Hospital, Central",
      reason: reason || "Required diagnostic testing & specialist physician unavailable at current facility",
      requestedAt: `Today, ${currentTimeStr}`,
      currentStage: 3, // Records Received at Destination
      stages: [
        { stage: 0, title: "Transfer Requested", timestamp: `Today, ${currentTimeStr}`, done: true },
        { stage: 1, title: "Records Selected & Encrypted", timestamp: `Today, ${currentTimeStr}`, done: true },
        { stage: 2, title: "Records Dispatched to Destination", timestamp: `Today, ${currentTimeStr}`, done: true },
        { stage: 3, title: `${destinationFacilityName} Received Records`, timestamp: `Today, ${currentTimeStr}`, done: true },
        { stage: 4, title: "Care Continuation Accepted & OPD Ready", timestamp: "Pending Confirmation", done: false }
      ],
      status: "Records Received",
      sharedRecords: selectedRecordsList,
      transferredToken: "A-08"
    };

    setPatientData(prev => {
      // Dynamic Care Plan updates reflecting Care Transfer
      const updatedCarePlan = [
        {
          id: "cp-trf-1",
          title: "Previous Consultation Completed",
          desc: `Examined at ${sourceFacilityName || 'Previous Facility'}. Service unavailable for full treatment.`,
          status: "completed",
          targetScreen: "care-transfer",
          date: "Completed"
        },
        {
          id: "cp-trf-2",
          title: `Health Records Transferred to ${destinationFacilityName}`,
          desc: `${selectedRecordsList.length} clinical records shared with patient consent.`,
          status: "completed",
          targetScreen: "care-transfer",
          date: "Transferred"
        },
        {
          id: "cp-trf-3",
          title: `Visit ${destinationFacilityName} for Continuing Care`,
          desc: `Assigned OPD Room 4 with digital token #A-08. Transferred records ready for doctor.`,
          status: "current",
          targetScreen: "live-queue",
          actionText: "View Queue Token"
        },
        {
          id: "cp-trf-4",
          title: "Continue Prescribed Medication & Follow-up",
          desc: "Adhere to ongoing antipyretic schedule and hydration therapy.",
          status: "upcoming",
          targetScreen: "medicine-reminders",
          date: "In 5 Days"
        }
      ];

      return {
        ...prev,
        careTransfer: newTransferRecord,
        carePlanItems: updatedCarePlan,
        healthJourney: [
          {
            id: `hj-trf-${Date.now()}`,
            date: "Today",
            time: currentTimeStr,
            title: `Care Transferred to ${destinationFacilityName}`,
            type: "transfer",
            desc: `Reason: ${reason || 'Service unavailable at previous clinic'}. ${selectedRecordsList.length} records shared with patient consent.`,
            status: "completed",
            icon: "Share2"
          },
          ...prev.healthJourney
        ],
        alerts: [
          {
            id: `alt-trf-${Date.now()}`,
            title: "Care Transfer Initiated",
            message: `Your records have been safely transmitted to ${destinationFacilityName}.`,
            type: "transfer",
            severity: "success",
            targetScreen: "care-transfer",
            timestamp: "Just now",
            read: false
          },
          ...prev.alerts
        ]
      };
    });

    addToast('Care Transfer Initiated', `Records dispatched to ${destinationFacilityName}.`, 'success');
  };

  // 13. Feature: Advance Care Transfer Stage
  const advanceTransferStage = () => {
    setPatientData(prev => {
      if (!prev.careTransfer) return prev;
      const current = prev.careTransfer.currentStage;
      const nextStage = Math.min(4, current + 1);
      const stageTitles = ["Transfer Requested", "Records Prepared", "Records Sent", "Records Received", "Care Continuation Accepted"];
      const newStatus = stageTitles[nextStage];

      const updatedStages = prev.careTransfer.stages?.map((s, idx) => ({
        ...s,
        done: idx <= nextStage,
        timestamp: idx === nextStage ? "Just now" : s.timestamp
      })) || [];

      addToast('Transfer Status Updated', `Care transfer advanced to "${newStatus}"`, 'success');

      return {
        ...prev,
        careTransfer: {
          ...prev.careTransfer,
          currentStage: nextStage,
          status: newStatus,
          stages: updatedStages
        }
      };
    });
  };

  // 14. Feature: Hospital Staff Accepts Care Transfer
  const acceptCareTransfer = (transferId) => {
    setPatientData(prev => {
      if (!prev.careTransfer) return prev;
      const updatedStages = prev.careTransfer.stages?.map(s => ({ ...s, done: true })) || [];

      return {
        ...prev,
        careTransfer: {
          ...prev.careTransfer,
          currentStage: 4,
          status: "Care Continuation Accepted",
          stages: updatedStages
        },
        alerts: [
          {
            id: `alt-trf-acc-${Date.now()}`,
            title: "Care Transfer Accepted by Hospital",
            message: `${prev.careTransfer.destinationFacilityName} has accepted your transfer. Your OPD Token is active.`,
            type: "transfer",
            severity: "success",
            targetScreen: "live-queue",
            timestamp: "Just now",
            read: false
          },
          ...prev.alerts
        ]
      };
    });

    addToast('Transfer Accepted', 'Patient admitted to incoming OPD intake queue.', 'success');
  };

  // 15. Feature: Progress Referral Lifecycle
  const progressReferralStage = () => {
    setPatientData(prev => {
      const nextStage = Math.min(4, (prev.referral?.currentStage || 0) + 1);
      const stageTitles = ["Created", "Notified", "Accepted", "Scheduled", "Completed"];
      const newStatus = stageTitles[nextStage];

      const updatedStages = prev.referral?.stages?.map((s, idx) => ({
        ...s,
        done: idx <= nextStage
      })) || [];

      addToast('Referral Updated', `Referral advanced to "${newStatus}"`, 'success');

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

  // 16. Feature: Trigger Missed Follow-up
  const triggerMissedFollowUp = () => {
    setPatientData(prev => ({
      ...prev,
      alerts: [
        {
          id: `alt-missed-${Date.now()}`,
          title: "FOLLOW-UP MISSED",
          message: "Your scheduled follow-up was missed. Contact your ASHA health worker or re-book your appointment.",
          type: "followup",
          severity: "warning",
          targetScreen: "follow-up",
          timestamp: "Just now",
          read: false
        },
        ...prev.alerts
      ]
    }));
    addToast('Missed Follow-up Alert Triggered', 'Alert dispatched to patient and assigned ASHA worker.', 'warning');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setPatientData(demoPatientData);
    setFacilities(mockFacilities);
    setSelectedFacility(mockFacilities[0]);
    setIsDemoMode(true);
    localStorage.setItem('swasthya_patient_state', JSON.stringify(demoPatientData));
    localStorage.setItem('swasthya_facilities_state', JSON.stringify(mockFacilities));
    localStorage.setItem('swasthya_is_demo', 'true');
    addToast('Demo State Reset', 'Arun Kumar presentation state restored.', 'info');
  };

  const t = translations[language] || translations.en;

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isDemoMode,
    setIsDemoMode,
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
    registerUser,
    loginUser,
    logoutUser,
    submitSymptoms,
    bookAppointment,
    checkInPatient,
    advanceQueue,
    saveConsultation,
    uploadLabReport,
    updateMedicineReminder,
    initiateCareTransfer,
    advanceTransferStage,
    acceptCareTransfer,
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

export default AppContext;
