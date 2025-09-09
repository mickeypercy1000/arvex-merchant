import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkAuthStatus, clearAuthData, quickAuthCheck, getAuthToken } from '../utils/auth';
import axios from 'axios';

// Global session state to avoid repeated API calls
let sessionVerified = false;
let sessionExpiry = null;

// Expose function to clear session state
window.clearSessionState = () => {
  sessionVerified = false;
  sessionExpiry = null;
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking, true = authenticated, false = not authenticated
  const [isLoading, setIsLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState(null);
  const location = useLocation();

  const checkKYCStatus = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('https://api.arvexpay.com/api/v1/auth/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.status === 'success') {
        return response.data.data.kyc_submitted;
      }
      return false;
    } catch (error) {
      console.error('KYC check failed:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Quick check first - if no token, skip API call
        if (!quickAuthCheck()) {
          setIsAuthenticated(false);
          setIsLoading(false);
          sessionVerified = false;
          return;
        }

        // Check if session is still valid (verified within last 5 minutes)
        const now = Date.now();
        if (sessionVerified && sessionExpiry && now < sessionExpiry) {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // If token exists but session not verified or expired, verify with API
        const isAuth = await checkAuthStatus();
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
          // Mark session as verified for next 5 minutes
          sessionVerified = true;
          sessionExpiry = now + (5 * 60 * 1000); // 5 minutes
          
          // Check KYC status for dashboard navigation
          if (location.pathname === '/' || location.pathname === '/dashboard') {
            const kycSubmitted = await checkKYCStatus();
            setKycStatus(kycSubmitted);
          }
        } else {
          sessionVerified = false;
          sessionExpiry = null;
          toast.error('Please log in to access this page.');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        clearAuthData();
        setIsAuthenticated(false);
        sessionVerified = false;
        sessionExpiry = null;
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Verifying Access</h2>
          <p className="text-muted-foreground">Checking your authentication status...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with the current location
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If accessing dashboard and KYC not submitted, redirect to compliance
  if (isAuthenticated && kycStatus === false && (location.pathname === '/' || location.pathname === '/dashboard')) {
    return <Navigate to="/compliance" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
