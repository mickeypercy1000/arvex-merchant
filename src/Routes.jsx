import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import { SidebarProvider } from "./contexts/SidebarContext";
import NotFound from "pages/NotFound";
import UserAndPermissionManagement from './pages/user-and-permission-management';
import AnalyticsAndReportingDashboard from './pages/analytics-and-reporting-dashboard';
import ProgressTrackingAndUpdates from './pages/progress-tracking-and-updates';
import SystemConfigurationAndSettings from './pages/system-configuration-and-settings';
import TimelineAndMilestoneManagement from './pages/timeline-and-milestone-management';
import TeamCheckinsAndCollaboration from './pages/team-check-ins-and-collaboration';
import ObjectiveCreationAndManagement from './pages/objective-creation-and-management';
import CompanyOKRDashboard from './pages/company-okr-dashboard';
import PaymentLinks from './pages/payment-links';
import Transactions from './pages/transactions';
import Compliance from './pages/compliance';
import TransactionDetails from './pages/transaction-details';
import Payment from './pages/payment';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgot-password';
import Login from './pages/login';
import OTPVerification from './pages/otp-verification';
import ChargebacksManagementDashboard from "pages/chargebacks-management-dashboard";


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <SidebarProvider>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes - no authentication required */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected routes - authentication required */}
        <Route path="/" element={
          <ProtectedRoute>
            <AnalyticsAndReportingDashboard />
          </ProtectedRoute>
        } />
        <Route path="/user-and-permission-management" element={
          <ProtectedRoute>
            <UserAndPermissionManagement />
          </ProtectedRoute>
        } />
        <Route path="/progress-tracking-and-updates" element={
          <ProtectedRoute>
            <ProgressTrackingAndUpdates />
          </ProtectedRoute>
        } />
        <Route path="/system-configuration-and-settings" element={
          <ProtectedRoute>
            <SystemConfigurationAndSettings />
          </ProtectedRoute>
        } />
        <Route path="/timeline-and-milestone-management" element={
          <ProtectedRoute>
            <TimelineAndMilestoneManagement />
          </ProtectedRoute>
        } />
        <Route path="/team-check-ins-and-collaboration" element={
          <ProtectedRoute>
            <TeamCheckinsAndCollaboration />
          </ProtectedRoute>
        } />
        <Route path="/objective-creation-and-management" element={
          <ProtectedRoute>
            <ObjectiveCreationAndManagement />
          </ProtectedRoute>
        } />
        <Route path="/company-okr-dashboard" element={
          <ProtectedRoute>
            <CompanyOKRDashboard />
          </ProtectedRoute>
        } />
        <Route path="/payment-links" element={
          <ProtectedRoute>
            <PaymentLinks />
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } />
        <Route path="/compliance" element={
          <ProtectedRoute>
            <Compliance />
          </ProtectedRoute>
        } />
        <Route path="/transaction-details/:id" element={
          <ProtectedRoute>
            <TransactionDetails />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
        <Route path="/chargebacks-management-dashboard" element={
          <ProtectedRoute>
            <ChargebacksManagementDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </SidebarProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;