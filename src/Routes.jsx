import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import RealTimeTransactionMonitoringDashboard from "pages/real-time-transaction-monitoring-dashboard";
import RiskManagementFraudDetectionDashboard from "pages/risk-management-fraud-detection-dashboard";
import FinancialAnalyticsBusinessIntelligenceDashboard from "pages/financial-analytics-business-intelligence-dashboard";
import SettingsManagementDashboard from "pages/settings-management-dashboard";
import PaymentLinkManagementDashboard from "pages/payment-link-management-dashboard";
import ComplianceDocumentManagementDashboard from "pages/compliance-document-management-dashboard";
import SettlementsManagementDashboard from "pages/settlements-management-dashboard";
import ChargebacksManagementDashboard from "pages/chargebacks-management-dashboard";
import UserRegistrationSignup from "pages/user-registration-signup";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<RealTimeTransactionMonitoringDashboard />} />
        <Route path="/real-time-transaction-monitoring-dashboard" element={<RealTimeTransactionMonitoringDashboard />} />
        <Route path="/risk-management-fraud-detection-dashboard" element={<RiskManagementFraudDetectionDashboard />} />
        <Route path="/financial-analytics-business-intelligence-dashboard" element={<FinancialAnalyticsBusinessIntelligenceDashboard />} />
        <Route path="/settings-management-dashboard" element={<SettingsManagementDashboard />} />
        <Route path="/payment-link-management-dashboard" element={<PaymentLinkManagementDashboard />} />
        <Route path="/compliance-document-management-dashboard" element={<ComplianceDocumentManagementDashboard />} />
        <Route path="/settlements-management-dashboard" element={<SettlementsManagementDashboard />} />
        <Route path="/chargebacks-management-dashboard" element={<ChargebacksManagementDashboard />} />
        <Route path="/signup" element={<UserRegistrationSignup />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;