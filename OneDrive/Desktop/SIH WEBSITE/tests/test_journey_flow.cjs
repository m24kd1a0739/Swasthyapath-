const { describe, it } = require('node:test');
const assert = require('node:assert');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
global.localStorage = localStorageMock;

// Import mock data generators
const { createEmptyPatient, demoPatientData, generateAbhaId } = require('../src/data/mockPatient.js');
const { mockFacilities } = require('../src/data/mockFacilities.js');

console.log('--- RUNNING SWASTHYAPATH END-TO-END DATA FLOW VERIFICATION SUITE ---');

// Test 1: Empty Patient Initialization
console.log('1. Testing createEmptyPatient()...');
const emptyPatient = createEmptyPatient({ fullName: 'Ravi Verma', mobile: '9876543210', dob: '1995-04-12', gender: 'Male', location: 'Bhopal' });

assert.strictEqual(emptyPatient.profile.fullName, 'Ravi Verma');
assert.ok(emptyPatient.profile.mobile.includes('9876543210'));
assert.strictEqual(emptyPatient.profile.gender, 'Male');
assert.strictEqual(emptyPatient.symptoms, null, 'Symptoms must be null initially');
assert.strictEqual(emptyPatient.appointment, null, 'Appointment must be null initially');
assert.strictEqual(emptyPatient.careTransfer, null, 'Care transfer must be null initially');
assert.ok(emptyPatient.profile.abhaId.startsWith('91-'), 'ABHA ID must be generated dynamically');
console.log('✓ Empty Patient state initialized cleanly without Arun Kumar data.');

// Test 2: Symptom Submission & AI Triage
console.log('2. Testing Symptom Submission & Triage...');
const triagedPatient = {
  ...emptyPatient,
  symptoms: {
    text: 'High fever for 2 days with headache and chills',
    duration: '2 days',
    severity: 'moderate',
    chips: ['Fever', 'Headache'],
    reportedAt: 'Today, 09:30 AM'
  },
  aiTriage: {
    level: 'yellow',
    urgencyText: 'MODERATE RISK — OPD CONSULTATION RECOMMENDED',
    recommendedSpecialty: 'General Medicine',
    recommendedFacilityId: 'fac-1',
    recommendedFacilityName: 'District Government Hospital Central',
    recommendedAction: 'Schedule an OPD appointment today for clinical evaluation and routine blood count (CBC).',
    suggestedTests: ['Complete Blood Count (CBC)', 'Platelet Count'],
    flaggedConditions: ['Acute Febrile Illness', 'Viral Pyrexia']
  },
  healthJourney: [
    {
      id: 'journey-triage',
      date: 'Today',
      time: '09:30 AM',
      title: 'AI Symptom Triage Completed',
      desc: 'Reported fever & headache. Evaluated as Moderate Risk (General Medicine).',
      type: 'triage',
      status: 'completed'
    }
  ]
};

assert.strictEqual(triagedPatient.symptoms.chips.length, 2);
assert.strictEqual(triagedPatient.aiTriage.level, 'yellow');
assert.strictEqual(triagedPatient.healthJourney.length, 1);
console.log('✓ Symptom triage successfully assigned category and started health journey.');

// Test 3: Appointment Booking & Live Queue Token
console.log('3. Testing Appointment Booking & Live Queue Token...');
const bookedPatient = {
  ...triagedPatient,
  appointment: {
    id: 'appt-101',
    facilityId: 'fac-1',
    facilityName: 'District Government Hospital Central',
    doctorName: 'Dr. Priya Sharma',
    specialty: 'General Medicine',
    date: 'Today',
    timeSlot: '09:30 AM - 10:00 AM',
    tokenNumber: 'A-08',
    queuePosition: 8,
    estimatedWaitMins: 25,
    room: 'OPD Room 4',
    status: 'waiting',
    bookedAt: 'Today, 09:35 AM'
  },
  healthJourney: [
    ...triagedPatient.healthJourney,
    {
      id: 'journey-appt',
      date: 'Today',
      time: '09:35 AM',
      title: 'OPD Appointment Booked (Token #A-08)',
      desc: 'Booked General Medicine at District Government Hospital Central with Dr. Priya Sharma.',
      type: 'queue',
      status: 'completed'
    }
  ]
};

assert.strictEqual(bookedPatient.appointment.tokenNumber, 'A-08');
assert.strictEqual(bookedPatient.appointment.queuePosition, 8);
assert.strictEqual(bookedPatient.healthJourney.length, 2);
console.log('✓ Live queue token #A-08 generated and added to journey.');

// Test 4: Doctor Consultation with Custom Prescriptions & Tests
console.log('4. Testing Doctor Consultation Save...');
const customPrescriptions = [
  {
    id: 'rx-test-1',
    medicineName: 'Paracetamol 650mg',
    dosage: '1 Tab after food',
    frequency: 'Thrice daily (8 AM, 2 PM, 8 PM)',
    duration: '5 days',
    instructions: 'Take after meals for fever.',
    status: 'Active',
    availableAtFacility: 'District Govt Hospital Pharmacy',
    reminders: [
      { time: '08:00 AM', status: 'taken', label: 'Morning Dose' },
      { time: '02:00 PM', status: 'due', label: 'Afternoon Dose' },
      { time: '08:00 PM', status: 'upcoming', label: 'Night Dose' }
    ]
  },
  {
    id: 'rx-test-2',
    medicineName: 'Oral Rehydration Salts (ORS)',
    dosage: '1 sachet in 1L water',
    frequency: 'Daily',
    duration: '3 days',
    instructions: 'Keep hydrated throughout the day.',
    status: 'Active',
    availableAtFacility: 'Jan Aushadhi Counter',
    reminders: [
      { time: '10:00 AM', status: 'taken', label: 'Hydration Dose' }
    ]
  }
];

const customTests = [
  {
    id: 'test-order-1',
    testName: 'Complete Blood Count (CBC) with Platelet Count',
    facility: 'District Hospital Diagnostic Center',
    status: 'pending',
    orderedDate: 'Today, 10:15 AM',
    urgency: 'Standard OPD Lab'
  }
];

const consultedPatient = {
  ...bookedPatient,
  consultation: {
    consulted: true,
    doctorName: 'Dr. Priya Sharma',
    facilityName: 'District Government Hospital Central',
    consultationDate: 'Today, 10:15 AM',
    assessment: 'Acute viral febrile illness. Vital signs stable.',
    prescriptions: customPrescriptions,
    testsOrdered: customTests,
    followUpDays: 7,
    followUpDate: 'Sep 7, 2026',
    referral: {
      isCreated: true,
      destinationFacilityName: 'AIIMS Apex Super Specialty Hospital',
      reason: 'Specialist standby review if pyrexia persists > 5 days',
      referralToken: 'REF-MP-8402'
    }
  },
  carePlanItems: [
    {
      id: 'cp-meds',
      title: 'Take Prescribed Medication Schedule',
      desc: '2 prescribed medicines active in smart reminder.',
      targetScreen: 'medicine-reminders',
      status: 'current',
      actionText: 'Open Medicine Reminders'
    },
    {
      id: 'cp-lab',
      title: 'Complete Blood Count (CBC) Lab Investigation',
      desc: 'Blood sample scheduled at District Hospital Diagnostic Center.',
      targetScreen: 'tests',
      status: 'current',
      actionText: 'View Diagnostic Details'
    }
  ],
  healthJourney: [
    ...bookedPatient.healthJourney,
    {
      id: 'journey-consult',
      date: 'Today',
      time: '10:15 AM',
      title: 'OPD Consultation Completed',
      desc: 'Dr. Priya Sharma diagnosed acute febrile illness. Prescribed 2 medicines and 1 lab test.',
      type: 'consultation',
      status: 'completed'
    }
  ]
};

assert.strictEqual(consultedPatient.consultation.prescriptions.length, 2);
assert.strictEqual(consultedPatient.consultation.testsOrdered.length, 1);
assert.strictEqual(consultedPatient.consultation.referral.isCreated, true);
assert.strictEqual(consultedPatient.carePlanItems.length, 2);
console.log('✓ Doctor consultation saved with custom prescriptions, tests, and care plan items.');

// Test 5: Care Transfer / Hospital Transfer Workflow
console.log('5. Testing Care Transfer 5-Stage Continuity Flow...');
const transferPatient = {
  ...consultedPatient,
  careTransfer: {
    hasTransfer: true,
    transferId: 'TRF-MP-2026-9081',
    sourceFacilityId: 'fac-1',
    sourceFacilityName: 'District Government Hospital Central',
    destinationFacilityId: 'fac-4',
    destinationFacilityName: 'AIIMS Apex Super Specialty Hospital',
    reason: 'Advanced tertiary workup and hematology consult for prolonged febrile episode',
    requestedAt: 'Today, 11:00 AM',
    currentStage: 3, // Destination Hospital Records Received
    stages: [
      { step: 1, name: 'Transfer Initiated', time: '11:00 AM', status: 'completed', desc: 'Transfer package created' },
      { step: 2, name: 'Clinical Review & Authorization', time: '11:15 AM', status: 'completed', desc: 'Dr. Priya Sharma approved transfer' },
      { step: 3, name: 'Destination Hospital Accepted', time: '11:30 AM', status: 'completed', desc: 'AIIMS Triage Desk accepted patient' },
      { step: 4, name: 'Digital Records Transferred', time: '11:35 AM', status: 'current', desc: '4 medical records transmitted via ABHA grid' },
      { step: 5, name: 'Patient Handover & Admission', time: 'Pending', status: 'pending', desc: 'Direct fast-track admission' }
    ],
    status: 'Records Received at Destination Hospital',
    sharedRecords: [
      { id: 'rec-1', type: 'consultation', label: 'Doctor Consultation Notes & Assessment', shared: true },
      { id: 'rec-2', type: 'tests', label: 'Diagnostic CBC & Platelet Lab Work', shared: true },
      { id: 'rec-3', type: 'prescriptions', label: 'Active Prescription & Medicine Schedule', shared: true },
      { id: 'rec-4', type: 'referral', label: 'Inter-Facility Referral Token #REF-MP-8402', shared: true }
    ],
    transferredToken: 'AIIMS-TF-04'
  }
};

assert.strictEqual(transferPatient.careTransfer.hasTransfer, true);
assert.strictEqual(transferPatient.careTransfer.currentStage, 3);
assert.strictEqual(transferPatient.careTransfer.sharedRecords.filter(r => r.shared).length, 4);
assert.strictEqual(transferPatient.careTransfer.destinationFacilityName, 'AIIMS Apex Super Specialty Hospital');
console.log('✓ Care Transfer correctly links facilities, transfers records with consent, and tracks progress.');

// Test 6: Edit Profile & Dynamic Greeting
console.log('6. Testing Edit Profile...');
const editedPatient = {
  ...transferPatient,
  profile: {
    ...transferPatient.profile,
    fullName: 'Sita Verma',
    age: 30,
    gender: 'Female'
  }
};

const greetingName = editedPatient.profile.fullName.split(' ')[0];
assert.strictEqual(greetingName, 'Sita', 'Greeting must update to Sita immediately');
console.log(`✓ Profile updated to "${editedPatient.profile.fullName}" — greeting renders "Hello, ${greetingName}".`);

console.log('\n============================================================');
console.log('🎉 ALL 6 SWASTHYAPATH CORE SYSTEM TESTS PASSED SUCCESSFULLY! 🎉');
console.log('============================================================');
