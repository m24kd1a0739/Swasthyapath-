import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { EmergencyModal } from './components/EmergencyModal';
import { ToastContainer } from './components/ToastContainer';
import { DemoBar } from './components/DemoBar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OtpPage } from './pages/OtpPage';
import { ProfileSetupPage } from './pages/ProfileSetupPage';
import { DashboardHome } from './pages/DashboardHome';
import { SymptomInput } from './pages/SymptomInput';
import { AiTriageResult } from './pages/AiTriageResult';
import { FacilityFinder } from './pages/FacilityFinder';
import { FacilityDetailsModal } from './pages/FacilityDetailsModal';
import { AppointmentBooking } from './pages/AppointmentBooking';
import { LiveQueueTracker } from './pages/LiveQueueTracker';
import { DoctorConsultation } from './pages/DoctorConsultation';
import { TestsAndReports } from './pages/TestsAndReports';
import { ReferralTracking } from './pages/ReferralTracking';
import { MedicineAvailability } from './pages/MedicineAvailability';
import { MedicineReminder } from './pages/MedicineReminder';
import { SmartAlertsCenter } from './pages/SmartAlertsCenter';
import { CarePlan } from './pages/CarePlan';
import { HealthJourneyTimeline } from './pages/HealthJourneyTimeline';
import { FollowUpManager } from './pages/FollowUpManager';
import { HealthWorkerDashboard } from './pages/HealthWorkerDashboard';
import { FacilityStaffDashboard } from './pages/FacilityStaffDashboard';
import { DistrictAdminDashboard } from './pages/DistrictAdminDashboard';
import { AccountPage } from './pages/AccountPage';

export function App() {
  const location = useLocation();
  const { isAuthenticated, userRole } = useApp();

  const isAuthOrLandingRoute = ['/', '/login', '/register', '/otp', '/profile-setup'].includes(location.pathname);

  return (
    <div className="app-layout">
      {/* SIH Presentation Tour Bar (Sticky at Top) */}
      <DemoBar />

      {/* Desktop Sidebar Navigation (Displayed on in-app pages) */}
      {!isAuthOrLandingRoute && <Sidebar />}

      {/* Main Workspace Wrapper */}
      <div 
        className="main-content-wrapper"
        style={{
          marginLeft: isAuthOrLandingRoute ? '0px' : undefined
        }}
      >
        <Header />

        <main className="content-container">
          <Routes>
            {/* 1. Root & Welcome / Landing Route */}
            <Route path="/" element={<LandingPage />} />

            {/* 2. Dedicated Auth & Onboarding Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/profile-setup" element={<ProfileSetupPage />} />

            {/* 3. Patient Home Dashboard Routes */}
            <Route path="/home" element={<DashboardHome />} />
            <Route path="/dashboard" element={<DashboardHome />} />

            {/* 4. AI Symptom & Care Navigation Routes */}
            <Route path="/health-problem" element={<SymptomInput />} />
            <Route path="/symptoms" element={<SymptomInput />} />
            <Route path="/care-navigation" element={<AiTriageResult />} />
            <Route path="/triage" element={<AiTriageResult />} />

            {/* 5. Facility Finder & Comparison Routes */}
            <Route path="/facilities" element={<FacilityFinder />} />
            <Route path="/facility-details" element={<FacilityDetailsModal />} />

            {/* 6. Appointments & Queue Routes */}
            <Route path="/appointments" element={<AppointmentBooking />} />
            <Route path="/appointment" element={<AppointmentBooking />} />
            <Route path="/queue" element={<LiveQueueTracker />} />
            <Route path="/live-queue" element={<LiveQueueTracker />} />
            <Route path="/check-in" element={<LiveQueueTracker />} />

            {/* 7. Doctor Consultation Route */}
            <Route path="/consultation" element={<DoctorConsultation />} />

            {/* 8. Diagnostic Tests & Reports Routes */}
            <Route path="/tests-reports" element={<TestsAndReports />} />
            <Route path="/tests" element={<TestsAndReports />} />

            {/* 9. Referral Tracking Route */}
            <Route path="/referrals" element={<ReferralTracking />} />

            {/* 10. Medicine Availability & Reminders Routes */}
            <Route path="/medicines" element={<MedicineAvailability />} />
            <Route path="/medicine-reminder" element={<MedicineReminder />} />
            <Route path="/medicine-reminders" element={<MedicineReminder />} />

            {/* 11. My Care Plan Route */}
            <Route path="/care-plan" element={<CarePlan />} />

            {/* 12. Health Journey Timeline Route */}
            <Route path="/health-journey" element={<HealthJourneyTimeline />} />
            <Route path="/journey" element={<HealthJourneyTimeline />} />

            {/* 13. Follow-up Management Route */}
            <Route path="/follow-up" element={<FollowUpManager />} />

            {/* 14. Smart Health Alerts Route */}
            <Route path="/notifications" element={<SmartAlertsCenter />} />
            <Route path="/alerts" element={<SmartAlertsCenter />} />

            {/* 15. Account & Caregiver Settings Route */}
            <Route path="/account" element={<AccountPage />} />

            {/* 16. Role-Based Dashboards */}
            <Route path="/health-worker" element={<HealthWorkerDashboard />} />
            <Route path="/facility-staff" element={<FacilityStaffDashboard />} />
            <Route path="/admin" element={<DistrictAdminDashboard />} />

            {/* 17. Safe Catch-All Fallback Route (NEVER 404!) */}
            <Route 
              path="*" 
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
              } 
            />
          </Routes>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Displayed on in-app pages) */}
      {!isAuthOrLandingRoute && <BottomNav />}

      {/* Persistent Modals & Toasts */}
      <EmergencyModal />
      <ToastContainer />
    </div>
  );
}

export default App;
