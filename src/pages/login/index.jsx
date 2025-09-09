import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { checkAuthStatus, quickAuthCheck } from '../../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingAuth = async () => {
      setIsCheckingAuth(true);
      try {
        // Quick check first - if no token, skip API call
        if (!quickAuthCheck()) {
          setIsCheckingAuth(false);
          return;
        }

        // If token exists, verify with API
        const isAuth = await checkAuthStatus();
        if (isAuth) {
          // User is already authenticated, redirect to dashboard
          navigate(from, { replace: true });
          return;
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkExistingAuth();
  }, [navigate, from]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Email is invalid';
    
    if (!formData?.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password
      };

      console.log('Sending login request:', payload);

      const response = await axios.post('https://api.arvexpay.com/api/v1/auth/login', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Login response:', response.data);
      
      if (response.data.status === 'success') {
        const { access_token, email_verified, business_id } = response.data.data;
        
        // Check if email is verified
        if (!email_verified) {
          console.log('Email not verified, redirecting to OTP verification');
          toast.error('Please verify your email address to continue.');
          // Redirect to OTP verification with email and business_id
          navigate('/otp-verification', { 
            state: { 
              email: formData.email,
              business_id: business_id,
              fromLogin: true
            } 
          });
          return;
        }
        
        // Store authentication token
        if (access_token) {
          localStorage.setItem('authToken', access_token);
          localStorage.setItem('businessId', business_id);
          
          // Fetch user details
          try {
            const userResponse = await axios.get('https://api.arvexpay.com/api/v1/auth/users/me', {
              headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
              }
            });
            
            console.log('User data response:', userResponse.data);
            
            if (userResponse.data.status === 'success') {
              // Store user data
              localStorage.setItem('userData', JSON.stringify(userResponse.data.data));
              
              // Show success message
              toast.success('Login successful! Welcome back.');
              
              // Navigate to the intended destination or dashboard
              navigate(from, { replace: true });
            } else {
              setErrors({ general: 'Failed to fetch user details. Please try again.' });
            }
          } catch (userError) {
            console.error('Failed to fetch user details:', userError);
            setErrors({ general: 'Failed to fetch user details. Please try again.' });
          }
        } else {
          setErrors({ general: 'Login successful but no access token received.' });
        }
      } else {
        setErrors({ general: response.data.user_message || 'Login failed. Please try again.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle API validation errors
      if (error.response?.data?.errors) {
        const apiErrors = {};
        const serverErrors = error.response.data.errors;
        
        // Map server error fields to form fields
        if (serverErrors.email) apiErrors.email = serverErrors.email[0];
        if (serverErrors.password) apiErrors.password = serverErrors.password[0];
        
        setErrors(apiErrors);
      } else {
        setErrors({ general: error.response?.data?.user_message || 'Login failed. Please check your credentials and try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="LogIn" size={24} className="text-primary" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Checking Authentication</h2>
          <p className="text-muted-foreground">Please wait while we verify your login status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Company Name */}
          <div>
            <h1 className="text-2xl font-bold">Arvexpay</h1>
          </div>
          
          {/* Main Content */}
          <div className="max-w-md">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8">
              <Icon name="LogIn" size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-xl mb-8 text-white/90">
              Sign in to access your merchant dashboard and manage your business transactions.
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>Real-time transaction monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>Advanced analytics dashboard</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
          
          {/* Bottom spacer */}
          <div></div>
        </div>
      </div>
      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="LogIn" size={24} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Sign In</h2>
            <p className="text-muted-foreground mt-2">
              Welcome back! Please sign in to your account
            </p>
          </div>

          {/* Display general errors */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                iconName="Mail"
                iconPosition="left"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password *
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData?.password}
                  onChange={(e) => handleInputChange('password', e?.target?.value)}
                  error={errors?.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData?.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-foreground">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              iconName={isLoading ? "Loader" : "LogIn"}
              iconPosition="left"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <div className="text-center">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
