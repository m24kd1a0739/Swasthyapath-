import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { EmergencyModal } from './components/EmergencyModal';
import { ToastContainer } from './components/ToastContainer';
import { DemoBar } from './components/DemoBar';

// Screens
import { LandingPage } from './pages/LandingPage';
import { AuthModal } from './pages/AuthModal';
import { OtpScreen } from './pages/OtpScreen';
import { ProfileSetup } from './pages/ProfileSetup';
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

const AppContent = () => {
  const { currentScreen, userRole } = useApp();

  const renderActiveScreen = () => {
    // Role-specific screens
    if (userRole === 'health-worker' && currentScreen === 'health-worker') {
      return <HealthWorkerDashboard />;
    }
    if (userRole === 'facility-staff' && currentScreen === 'facility-staff') {
      return <FacilityStaffDashboard />;
    }
    if (userRole === 'admin' && currentScreen === 'admin') {
      return <DistrictAdminDashboard />;
    }

    switch (currentScreen) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardHome />;
      case 'symptoms':
        return <SymptomInput />;
      case 'triage':
        return <AiTriageResult />;
      case 'facilities':
        return <FacilityFinder />;
      case 'facility-details':
        return <FacilityDetailsModal />;
      case 'appointment':
        return <AppointmentBooking />;
      case 'live-queue':
        return <LiveQueueTracker />;
      case 'consultation':
        return <DoctorConsultation />;
      case 'tests':
        return <TestsAndReports />;
      case 'referrals':
        return <ReferralTracking />;
      case 'medicines':
        return <MedicineAvailability />;
      case 'medicine-reminders':
        return <MedicineReminder />;
      case 'care-plan':
        return <CarePlan />;
      case 'journey':
        return <HealthJourneyTimeline />;
      case 'follow-up':
        return <FollowUpManager />;
      case 'alerts':
        return <SmartAlertsCenter />;
      case 'account':
        return <AccountPage />;
      case 'health-worker':
        return <HealthWorkerDashboard />;
      case 'facility-staff':
        return <FacilityStaffDashboard />;
      case 'admin':
        return <DistrictAdminDashboard />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="app-layout">
      {/* SIH Presentation Tour Bar (Sticky at Top) */}
      <DemoBar />

      {/* Desktop Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="main-content-wrapper">
        <Header />

        <main className="content-container">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Persistent Dialogs & Modals */}
      <EmergencyModal />
      <AuthModal />
      <OtpScreen />
      <ProfileSetup />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
