export const mockFacilities = [
  {
    id: "fac-1",
    name: "District Government Hospital, Central",
    type: "District Hospital",
    badge: "BEST MATCH",
    isRecommended: true,
    address: "Civil Lines, Near Collectorate, Bhopal, MP",
    distanceKm: 7.2,
    rating: 4.6,
    openStatus: "Open 24/7 (OPD 08:00 AM - 02:00 PM)",
    isOpenNow: true,
    queueCount: 8,
    estimatedWaitMins: 25,
    matchReason: "Specialty doctor available, required diagnostic CBC test available today, and full medicine stock ready.",
    specialties: ["General Medicine", "Pediatrics", "Cardiology", "Orthopedics", "Pathology / Lab", "Emergency 24x7"],
    doctors: [
      { id: "doc-1", name: "Dr. Priya Sharma", role: "Sr. General Physician (MD)", room: "OPD Room 4", availableToday: true, timing: "09:00 AM - 01:30 PM", currentToken: "A-07" },
      { id: "doc-2", name: "Dr. Rajesh Varma", role: "Physician & Intensivist", room: "OPD Room 2", availableToday: true, timing: "10:00 AM - 02:00 PM", currentToken: "A-05" }
    ],
    testsAvailable: [
      { id: "test-1", name: "Complete Blood Count (CBC)", status: "Available", waitTimeMins: 15, cost: "Free (Govt Scheme)" },
      { id: "test-2", name: "Dengue NS1 Antigen", status: "Available", waitTimeMins: 30, cost: "Free" },
      { id: "test-3", name: "Typhoid Widal Test", status: "Available", waitTimeMins: 25, cost: "Free" },
      { id: "test-4", name: "Chest X-Ray Digital", status: "Available", waitTimeMins: 20, cost: "Free" }
    ],
    medicinesInStock: [
      { name: "Paracetamol 650mg", status: "In Stock (3,400 tabs)", available: true },
      { name: "ORS Hydration Sachet", status: "In Stock (1,200 pkts)", available: true },
      { name: "Amoxicillin 500mg", status: "In Stock", available: true },
      { name: "Azithromycin 500mg", status: "In Stock", available: true },
      { name: "Pantoprazole 40mg", status: "In Stock", available: true }
    ],
    facilitiesAvailable: ["Central Diagnostics", "Emergency Trauma Unit", "Free Jan Aushadhi Pharmacy", "Blood Bank", "Ambulance Base"],
    contactPhone: "0755-2540108",
    lat: 23.2599,
    lng: 77.4126
  },
  {
    id: "fac-2",
    name: "Primary Health Centre (PHC) Kolar",
    type: "Primary Health Centre",
    badge: "Not ideal for this problem",
    isRecommended: false,
    address: "Kolar Main Road, Near Ward Office, Bhopal",
    distanceKm: 2.8,
    rating: 3.9,
    openStatus: "Open (09:00 AM - 04:00 PM)",
    isOpenNow: true,
    queueCount: 3,
    estimatedWaitMins: 10,
    matchReason: "Closer, but the required laboratory diagnostic test (CBC blood work) is currently unavailable.",
    specialties: ["General OPD", "Immunization", "Basic Maternal Care"],
    doctors: [
      { id: "doc-3", name: "Dr. Manoj Saxena", role: "Medical Officer (MBBS)", room: "OPD 1", availableToday: true, timing: "09:00 AM - 02:00 PM", currentToken: "K-02" }
    ],
    testsAvailable: [
      { id: "test-basic", name: "Basic Blood Sugar (Glucometer)", status: "Available", waitTimeMins: 5, cost: "Free" },
      { id: "test-cbc-no", name: "Complete Blood Count (CBC)", status: "Out of Stock / Machine Calibrating", waitTimeMins: 0, cost: "Unavailable" }
    ],
    medicinesInStock: [
      { name: "Paracetamol 500mg", status: "Low Stock (45 tabs)", available: true },
      { name: "ORS Hydration Sachet", status: "In Stock", available: true },
      { name: "Cetirizine 10mg", status: "In Stock", available: true }
    ],
    facilitiesAvailable: ["Basic OPD", "Vaccination Room", "Pharmacy Counter"],
    contactPhone: "0755-2741920",
    lat: 23.2045,
    lng: 77.4289
  },
  {
    id: "fac-3",
    name: "Community Health Centre (CHC) Gandhi Nagar",
    type: "Community Health Centre",
    badge: "GOOD ALTERNATIVE",
    isRecommended: false,
    address: "Airport Road, Gandhi Nagar, Bhopal",
    distanceKm: 5.4,
    rating: 4.2,
    openStatus: "Open (08:00 AM - 06:00 PM)",
    isOpenNow: true,
    queueCount: 14,
    estimatedWaitMins: 40,
    matchReason: "General Physician and basic lab available, but higher current queue wait time than District Hospital.",
    specialties: ["General Medicine", "Obstetrics", "Basic Dental", "Clinical Lab"],
    doctors: [
      { id: "doc-4", name: "Dr. Sunita Patel", role: "Physician (MBBS, DNB)", room: "OPD 3", availableToday: true, timing: "08:30 AM - 02:00 PM", currentToken: "G-11" }
    ],
    testsAvailable: [
      { id: "test-cbc-chc", name: "Complete Blood Count (CBC)", status: "Available", waitTimeMins: 35, cost: "Free" },
      { id: "test-urine", name: "Routine Urine Analysis", status: "Available", waitTimeMins: 20, cost: "Free" }
    ],
    medicinesInStock: [
      { name: "Paracetamol 650mg", status: "In Stock", available: true },
      { name: "ORS Hydration Sachet", status: "In Stock", available: true },
      { name: "Paracetamol Drops", status: "In Stock", available: true }
    ],
    facilitiesAvailable: ["Mini Lab", "Emergency Stabilization", "Generic Drug Store"],
    contactPhone: "0755-2661002",
    lat: 23.2989,
    lng: 77.3712
  },
  {
    id: "fac-4",
    name: "AIIMS Apex Government Medical College & Hospital",
    type: "Super Specialty Hospital",
    badge: "TERTIARY / REFERRAL",
    isRecommended: false,
    address: "Saket Nagar, AIIMS Campus, Bhopal",
    distanceKm: 11.5,
    rating: 4.8,
    openStatus: "24/7 Emergency & Specialty OPD",
    isOpenNow: true,
    queueCount: 42,
    estimatedWaitMins: 90,
    matchReason: "Tertiary medical center with advanced multi-specialties. Best reserved for complex referrals or severe conditions.",
    specialties: ["Super Specialty Medicine", "Infectious Diseases", "Cardiology", "Neurology", "Advanced Pathology", "Level 1 Trauma"],
    doctors: [
      { id: "doc-5", name: "Prof. Dr. Arvind Mehta", role: "Head of Medicine (MD, DM)", room: "Block C-102", availableToday: true, timing: "09:00 AM - 01:00 PM", currentToken: "AI-24" }
    ],
    testsAvailable: [
      { id: "test-adv", name: "Automated CBC + ESR + Peripheral Smear", status: "Available", waitTimeMins: 45, cost: "Free" },
      { id: "test-viral", name: "Viral Panel / RT-PCR", status: "Available", waitTimeMins: 60, cost: "Free" }
    ],
    medicinesInStock: [
      { name: "Paracetamol 650mg", status: "In Stock", available: true },
      { name: "All Essential Drugs", status: "Fully Stocked", available: true }
    ],
    facilitiesAvailable: ["Advanced ICU", "Multi-slice CT/MRI", "Central Automated Lab", "24/7 Pharmacy"],
    contactPhone: "0755-2850000",
    lat: 23.2089,
    lng: 77.4589
  }
];
