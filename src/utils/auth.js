import axios from 'axios';
import toast from 'react-hot-toast';

/**
 * Check if user is authenticated by verifying token with API
 * @returns {Promise<boolean>} - Returns true if authenticated, false otherwise
 */
export const checkAuthStatus = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return false;
    }

    const response = await axios.get('https://api.arvexpay.com/api/v1/auth/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.data.status === 'success') {
      // Update user data in localStorage
      localStorage.setItem('userData', JSON.stringify(response.data.data));
      return true;
    } else {
      clearAuthData();
      return false;
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      clearAuthData();
    }
    
    return false;
  }
};

/**
 * Quick authentication check (only checks token existence)
 * @returns {boolean} - Returns true if token exists, false otherwise
 */
export const quickAuthCheck = () => {
  return !!getAuthToken();
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} - Returns token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Get user data from localStorage
 * @returns {object|null} - Returns user data or null if not found
 */
export const getUserData = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get business ID from localStorage
 * @returns {string|null} - Returns business ID or null if not found
 */
export const getBusinessId = () => {
  return localStorage.getItem('businessId');
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('businessId');
};

/**
 * Logout user and redirect to login page
 * @param {function} navigate - React Router navigate function
 * @param {string} redirectPath - Path to redirect to after logout (default: '/login')
 */
export const logout = (navigate, redirectPath = '/login') => {
  clearAuthData();
  toast.success('You have been logged out successfully.');
  navigate(redirectPath, { replace: true });
};

/**
 * Check if user is authenticated (simple token existence check)
 * @returns {boolean} - Returns true if token exists, false otherwise
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};
