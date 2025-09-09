import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkAuthStatus, clearAuthData, quickAuthCheck } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking, true = authenticated, false = not authenticated
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Quick check first - if no token, skip API call
        if (!quickAuthCheck()) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // If token exists, verify with API
        const isAuth = await checkAuthStatus();
        setIsAuthenticated(isAuth);
        
        if (!isAuth) {
          toast.error('Please log in to access this page.');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        clearAuthData();
        setIsAuthenticated(false);
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

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
