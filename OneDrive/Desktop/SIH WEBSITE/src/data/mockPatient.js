// ==========================================
// SWASTHYAPATH PATIENT DATA SCHEMAS
// 1. demoPatientData: Arun Kumar demo dataset for SIH presentation
// 2. createEmptyPatient: Clean empty state for new manual registrations
// ==========================================

export const demoPatientData = {
  profile: {
    fullName: "Arun Kumar",
    abhaId: "91-8472-9102-4821",
    mobile: "+91 98765 43210",
    dob: "1994-06-14",
    age: 32,
    gender: "Male",
    location: "District Central, Civil Lines, Bhopal",
    preferredLanguage: "en",
    emergencyContact: {
      name: "Sunita Kumar",
      relationship: "Spouse",
      phone: "+91 98765 43211",
      permissions: {
        shareAppointments: true,
        shareEmergency: true,
        shareCareUpdates: true
      }
    }
  },

  caregiver: {
    name: "Sunita Kumar",
    relation: "Wife",
    phone: "+91 98765 43211",
    activePermissions: ["Emergency Info", "Appointments", "Discharge Summaries"]
  },

  symptoms: {
    text: "Fever for 3 days with weakness and mild body ache.",
    selectedChips: ["Fever", "Weakness", "Body Pain"],
    duration: "3 days",
    severity: "Moderate",
    submittedAt: "2026-08-30T09:15:00Z"
  },

  aiTriage: {
    recommendedCareLevel: "District Hospital / Community Health Centre",
    priority: "Normal",
    facilityType: "Secondary Public Healthcare (District Hospital)",
    reason: "Fever lasting >= 3 days accompanied by generalized fatigue requires medical examination, vitals check, and basic diagnostic blood work (CBC) to check for infection.",
    disclaimer: "SwasthyaPath provides care navigation and triage support. It does not replace professional medical diagnosis or emergency care."
  },

  appointment: {
    facilityId: "fac-1",
    facilityName: "District Government Hospital, Central",
    service: "General Medicine OPD",
    doctor: "Dr. Priya Sharma (MD)",
    room: "OPD Room 4",
    date: "Today (Aug 30, 2026)",
    time: "10:30 AM",
    tokenNumber: "A-08",
    queuePosition: 8,
    estimatedWaitMins: 25,
    checkedIn: true,
    checkInTime: "10:05 AM",
    status: "waiting", // 'waiting' | 'in_consultation' | 'completed'
    patientsAhead: 7
  },

  consultation: {
    consulted: true,
    consultationTime: "Today, 10:45 AM",
    doctorName: "Dr. Priya Sharma",
    doctorRole: "Senior Medical Specialist (General Medicine)",
    room: "OPD Room 4",
    vitals: {
      bp: "118/78 mmHg",
      pulse: "84 bpm",
      temp: "100.8 °F",
      spo2: "98%"
    },
    clinicalNotes: "Patient presents with 3-day history of low-to-moderate grade pyrexia, associated with generalized myalgia and malaise. Chest clear, abdomen soft, no rash. Clinical impression: Acute Febrile Illness.",
    prescriptions: [
      {
        id: "rx-1",
        medicineName: "Paracetamol 650mg",
        type: "Tablet",
        dosage: "1 tablet after meals",
        frequency: "Thrice daily (8:00 AM, 2:00 PM, 8:00 PM)",
        duration: "5 days",
        instructions: "Take with a full glass of water. Do not exceed 4g in 24 hours.",
        status: "Active",
        availableAtFacility: "District Hospital Pharmacy (Counter 2)",
        reminders: [
          { time: "08:00 AM", status: "taken", label: "Morning Dose" },
          { time: "02:00 PM", status: "due", label: "Afternoon Dose" },
          { time: "08:00 PM", status: "upcoming", label: "Night Dose" }
        ]
      },
      {
        id: "rx-2",
        medicineName: "Oral Rehydration Salts (ORS)",
        type: "Powder / Sachet",
        dosage: "1 sachet in 1 Litre water",
        frequency: "Sip throughout the day",
        duration: "3 days",
        instructions: "Maintain adequate hydration. Keep prepared solution cool.",
        status: "Active",
        availableAtFacility: "Free Govt Jan Aushadhi Counter",
        reminders: [
          { time: "11:00 AM", status: "taken", label: "Morning Hydration" },
          { time: "04:00 PM", status: "upcoming", label: "Evening Hydration" }
        ]
      }
    ],
    testsOrdered: [
      {
        id: "test-order-1",
        testName: "Complete Blood Count (CBC) with Platelets",
        facility: "District Hospital Central Diagnostics",
        urgency: "Standard OPD Lab",
        status: "ready", // 'pending' | 'ready' | 'reviewed'
        orderedDate: "Today, 10:50 AM",
        reportUrl: "/reports/cbc-arunkumar.pdf",
        results: {
          hemoglobin: { value: "14.2", unit: "g/dL", range: "13.0 - 17.0", status: "Normal" },
          wbc: { value: "6,400", unit: "/µL", range: "4,000 - 11,000", status: "Normal" },
          platelets: { value: "185,000", unit: "/µL", range: "150,000 - 450,000", status: "Normal" },
          neutrophils: { value: "62", unit: "%", range: "40 - 75", status: "Normal" },
          lymphocytes: { value: "30", unit: "%", range: "20 - 45", status: "Normal" }
        },
        doctorNotes: "Lab parameters within safe reference limits. Platelets stable at 185k. Continue symptomatic management."
      }
    ],
    followUpDays: 7,
    followUpDate: "September 4, 2026",
    followUpReason: "General Medicine Pyrexia Review & Symptom Resolution"
  },

  referral: {
    hasReferral: true,
    referralId: "REF-MP-2026-8941",
    sourceFacility: "PHC Kolar / District OPD",
    destinationFacility: "District Government Hospital (Internal Medicine Unit)",
    referredBy: "Dr. Priya Sharma",
    reason: "Diagnostic evaluation of 3-day pyrexia with lab workup and physician review",
    date: "Aug 30, 2026",
    currentStage: 3, // 0: Created, 1: Notified, 2: Accepted, 3: Scheduled, 4: Completed
    stages: [
      { stage: 0, title: "PHC Initial Review", date: "Aug 29", done: true },
      { stage: 1, title: "Referral Created", date: "Aug 30, 09:30 AM", done: true },
      { stage: 2, title: "District Hospital Notified", date: "Aug 30, 09:45 AM", done: true },
      { stage: 3, title: "Referral Accepted & Scheduled", date: "Aug 30, 10:15 AM", done: true },
      { stage: 4, title: "Specialist Follow-up Done", date: "Pending Sep 4", done: false }
    ],
    status: "Accepted & Scheduled"
  },

  careTransfer: {
    hasTransfer: true,
    transferId: "TRF-MP-2026-9281",
    sourceFacilityId: "fac-2",
    sourceFacilityName: "Primary Health Centre (PHC) Kolar",
    destinationFacilityId: "fac-1",
    destinationFacilityName: "District Government Hospital, Central",
    reason: "Required diagnostic blood testing & specialist physician examination unavailable at current facility",
    requestedAt: "Today, 10:10 AM",
    currentStage: 3, // 0: Requested, 1: Records Prepared, 2: Records Sent, 3: Records Received, 4: Accepted & Token Issued
    stages: [
      { stage: 0, title: "Transfer Requested", timestamp: "Today, 10:10 AM", done: true },
      { stage: 1, title: "Records Selected & Encrypted", timestamp: "Today, 10:12 AM", done: true },
      { stage: 2, title: "Records Dispatched to Destination", timestamp: "Today, 10:14 AM", done: true },
      { stage: 3, title: "District Hospital Received Records", timestamp: "Today, 10:16 AM", done: true },
      { stage: 4, title: "Care Continuation Accepted & OPD Ready", timestamp: "Today, 10:18 AM", done: true }
    ],
    status: "Records Received",
    sharedRecords: [
      { id: "rec-consult", type: "consultation", label: "PHC Clinical Consultation Summary", count: 1, shared: true },
      { id: "rec-rx", type: "prescription", label: "Prescription & Active Dosage (Paracetamol + ORS)", count: 2, shared: true },
      { id: "rec-test", type: "test", label: "CBC Diagnostic Blood Test Order & Lab Parameters", count: 1, shared: true },
      { id: "rec-ref", type: "referral", label: "Inter-Facility Referral Token #REF-MP-2026-8941", count: 1, shared: true },
      { id: "rec-careplan", type: "careplan", label: "Active Care Plan Action Items", count: 4, shared: true }
    ],
    transferredToken: "A-08"
  },

  carePlanItems: [
    {
      id: "cp-1",
      title: "Doctor Consultation Completed",
      desc: "Consulted with Dr. Priya Sharma at District Government Hospital (OPD Room 4)",
      status: "completed",
      targetScreen: "consultation",
      date: "Aug 30, 10:45 AM"
    },
    {
      id: "cp-2",
      title: "CBC Diagnostic Blood Test Completed",
      desc: "Sample processed at District Hospital Diagnostic Centre — Results Normal",
      status: "completed",
      targetScreen: "tests",
      date: "Aug 30, 11:30 AM"
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
      title: "Follow-up Consultation on September 4",
      desc: "Scheduled review with General Medicine OPD. Reminders will notify 2 days prior.",
      status: "upcoming",
      targetScreen: "follow-up",
      date: "Sep 04, 2026"
    },
    {
      id: "cp-5",
      title: "Referral Hospital Standby",
      desc: "Referral REF-MP-2026-8941 registered in state digital health grid.",
      status: "pending",
      targetScreen: "referrals"
    }
  ],

  healthJourney: [
    {
      id: "hj-transfer-1",
      date: "Today, Aug 30",
      time: "10:18 AM",
      title: "Care Transferred to District Government Hospital",
      type: "transfer",
      desc: "Care transferred from PHC Kolar. 5 health records shared with clinical consent.",
      status: "completed",
      icon: "Share2"
    },
    {
      id: "hj-1",
      date: "Today, Aug 30",
      time: "11:45 AM",
      title: "Follow-up Scheduled for Sep 4",
      type: "followup",
      desc: "Review scheduled with Dr. Priya Sharma at District Hospital.",
      status: "upcoming",
      icon: "Calendar"
    },
    {
      id: "hj-2",
      date: "Today, Aug 30",
      time: "11:30 AM",
      title: "CBC Blood Report Generated",
      type: "report",
      desc: "Hemoglobin 14.2 g/dL, Platelets 185k (Normal). Doctor reviewed.",
      status: "completed",
      icon: "FileText"
    },
    {
      id: "hj-3",
      date: "Today, Aug 30",
      time: "10:50 AM",
      title: "Prescription & Lab Test Issued",
      type: "prescription",
      desc: "Paracetamol 650mg (TID x 5d), ORS sachets, and CBC blood investigation.",
      status: "completed",
      icon: "Pill"
    },
    {
      id: "hj-4",
      date: "Today, Aug 30",
      time: "10:45 AM",
      title: "Doctor Consultation",
      type: "consultation",
      desc: "Consulted Dr. Priya Sharma (OPD Room 4). Diagnosis: Acute Febrile Illness.",
      status: "completed",
      icon: "Stethoscope"
    },
    {
      id: "hj-5",
      date: "Today, Aug 30",
      time: "10:05 AM",
      title: "Hospital Check-in & Live Queue",
      type: "queue",
      desc: "Token #A-08 checked in at District Government Hospital OPD.",
      status: "completed",
      icon: "Users"
    },
    {
      id: "hj-6",
      date: "Today, Aug 30",
      time: "09:30 AM",
      title: "AI Care Navigation Triage",
      type: "triage",
      desc: "Symptom: Fever for 3 days with weakness. Best match facility: District Hospital.",
      status: "completed",
      icon: "Cpu"
    }
  ],

  alerts: [
    {
      id: "alt-transfer-1",
      title: "Care Transfer Accepted",
      message: "District Government Hospital has received your health records and reserved Token #A-08.",
      type: "transfer",
      severity: "success",
      targetScreen: "care-transfer",
      timestamp: "Just now",
      read: false
    },
    {
      id: "alt-1",
      title: "Medicine Due Now",
      message: "Your 2:00 PM Paracetamol 650mg dose is due now. Remember to take it after food.",
      type: "medicine",
      severity: "warning",
      targetScreen: "medicine-reminders",
      timestamp: "10 mins ago",
      read: false
    },
    {
      id: "alt-2",
      title: "CBC Lab Report Ready",
      message: "Your Complete Blood Count report has been generated and verified by the lab pathologist.",
      type: "test",
      severity: "info",
      targetScreen: "tests",
      timestamp: "25 mins ago",
      read: false
    },
    {
      id: "alt-3",
      title: "Referral Confirmed",
      message: "District Government Hospital has registered your digital OPD referral token #REF-MP-2026-8941.",
      type: "referral",
      severity: "success",
      targetScreen: "referrals",
      timestamp: "1 hour ago",
      read: true
    },
    {
      id: "alt-4",
      title: "Upcoming Follow-up",
      message: "General Medicine follow-up is scheduled for September 4, 2026.",
      type: "followup",
      severity: "info",
      targetScreen: "follow-up",
      timestamp: "2 hours ago",
      read: true
    }
  ]
};

// ==========================================
// Helper to generate dynamic ABHA ID
// ==========================================
export const generateAbhaId = (phone = '') => {
  const digits = (phone.replace(/\D/g, '') + '847291024821').slice(0, 10);
  const part1 = '91';
  const part2 = digits.slice(0, 4) || '8472';
  const part3 = digits.slice(4, 8) || '9102';
  const part4 = (digits.slice(8, 10) || '48') + '21';
  return `${part1}-${part2}-${part3}-${part4}`;
};

// ==========================================
// Factory to create a clean empty patient profile
// for real users (Ravi, Sita, Priya, etc.)
// ==========================================
export const createEmptyPatient = (profileData = {}) => {
  const name = profileData.fullName || profileData.name || '';
  const mobile = profileData.mobile || '';
  const dob = profileData.dob || '';
  const gender = profileData.gender || 'Male';
  const location = profileData.location || '';
  const language = profileData.language || 'en';
  const abha = generateAbhaId(mobile);

  return {
    profile: {
      fullName: name,
      abhaId: abha,
      mobile: mobile ? (mobile.startsWith('+91') ? mobile : `+91 ${mobile}`) : '',
      dob: dob,
      age: dob ? Math.max(1, new Date().getFullYear() - new Date(dob).getFullYear()) : 28,
      gender: gender,
      location: location,
      preferredLanguage: language,
      emergencyContact: {
        name: profileData.emergencyName || '',
        relationship: profileData.emergencyRel || 'Family',
        phone: profileData.emergencyPhone || '',
        permissions: {
          shareAppointments: true,
          shareEmergency: true,
          shareCareUpdates: true
        }
      }
    },

    caregiver: {
      name: profileData.emergencyName || '',
      relation: profileData.emergencyRel || 'Family',
      phone: profileData.emergencyPhone || '',
      activePermissions: ["Emergency Info", "Appointments"]
    },

    symptoms: null,
    aiTriage: null,
    appointment: null,

    consultation: {
      consulted: false,
      consultationTime: null,
      doctorName: null,
      doctorRole: null,
      room: null,
      vitals: {
        bp: "120/80 mmHg",
        pulse: "76 bpm",
        temp: "98.6 °F",
        spo2: "99%"
      },
      clinicalNotes: "",
      prescriptions: [],
      testsOrdered: [],
      followUpDays: null,
      followUpDate: null,
      followUpReason: null
    },

    referral: null,
    careTransfer: null,
    carePlanItems: [],
    
    healthJourney: [
      {
        id: `hj-init-${Date.now()}`,
        date: "Today",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: "National Health Account (ABHA) Registered",
        type: "account",
        desc: `ABHA ID ${abha} registered in SwasthyaPath National Public Healthcare Gateway.`,
        status: "completed",
        icon: "ShieldCheck"
      }
    ],

    alerts: [
      {
        id: `alt-welcome-${Date.now()}`,
        title: `Welcome to SwasthyaPath, ${name || 'Citizen'}!`,
        message: "You can now enter your health symptoms, get AI care navigation, book OPD tokens, and manage care continuity.",
        type: "facility",
        severity: "info",
        targetScreen: "symptoms",
        timestamp: "Just now",
        read: false
      }
    ]
  };
};

export const initialPatientData = demoPatientData;
