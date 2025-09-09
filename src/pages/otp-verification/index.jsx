import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, signup_id, business_id, fromLogin } = location?.state || {};
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  
  const inputRefs = useRef([]);

  useEffect(() => {
    // Redirect if no email provided
    if (!email) {
      navigate(fromLogin ? '/login' : '/signup');
      return;
    }

    // For login flow, we need business_id, for signup flow we need signup_id
    if (fromLogin && !business_id) {
      navigate('/login');
      return;
    }
    
    if (!fromLogin && !signup_id) {
      navigate('/signup');
      return;
    }

    console.log('OTP Verification - Email:', email, fromLogin ? 'Business ID:' : 'Signup ID:', fromLogin ? business_id : signup_id);

    // Start countdown timer
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [email, signup_id, business_id, fromLogin, navigate]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/?.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value?.slice(-1); // Take only last character
    setOtp(newOtp);

    // Clear error when user starts typing
    if (error) setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs?.current?.[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.replace(/\D/g, '')?.slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData?.[i] || '';
    }
    
    setOtp(newOtp);
    
    // Focus the next empty field or last field
    const nextEmptyIndex = newOtp?.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs?.current?.[focusIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const otpCode = otp?.join('');
    if (otpCode?.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      let payload, apiUrl;
      
      if (fromLogin) {
        // Login OTP verification - you may need to implement this endpoint
        payload = {
          business_id: business_id,
          otp: otpCode
        };
        apiUrl = 'https://api.arvexpay.com/api/v1/auth/verify-email';
      } else {
        // Signup OTP verification
        payload = {
          signup_id: signup_id,
          otp: otpCode
        };
        apiUrl = 'https://api.arvexpay.com/api/v1/auth/merchant/signup/verify-email';
      }

      console.log('Verifying OTP:', payload);

      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('OTP verification response:', response.data);
      
      if (response.data.status === 'success') {
        if (fromLogin) {
          // For login flow, show success and redirect to login to complete the login process
          toast.success('Email successfully verified! Please login again.', {
            duration: 3000
          });
          
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        } else {
          // For signup flow, show success and redirect to login
          toast.success('Email successfully verified! Redirecting to login page...', {
            duration: 3000
          });
          
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      } else {
        setError(response.data.user_message || 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        if (serverErrors.otp) {
          setError(serverErrors.otp[0]);
        } else if (serverErrors.signup_id || serverErrors.business_id) {
          setError(serverErrors.signup_id?.[0] || serverErrors.business_id?.[0]);
        } else {
          setError('Invalid verification code. Please try again.');
        }
      } else {
        setError(error.response?.data?.user_message || 'Verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

    const handleResendCode = async () => {
    setIsResending(true);
    
    try {
      // For now, simulate API call - you may need to implement resend endpoint for both flows
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Resending OTP to:', email, fromLogin ? '(from login)' : '(from signup)');
      
      // Reset timer
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setError('');
      
      // Focus first input
      inputRefs?.current?.[0]?.focus();
      
      toast.success('Verification code sent successfully!');
    } catch (error) {
      console.error('Resend error:', error);
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Verify Your Email</h2>
          <p className="text-muted-foreground mt-2">
            We've sent a verification code to
          </p>
          <p className="text-foreground font-medium">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-4 text-center">
              Enter the 6-digit verification code
            </label>
            <div className="flex justify-center space-x-3">
              {otp?.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e?.target?.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-12 text-center text-lg font-medium border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    error ? 'border-destructive' : 'border-border'
                  }`}
                />
              ))}
            </div>
            {error && (
              <p className="text-destructive text-sm mt-3 text-center">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || otp?.join('')?.length !== 6}
            fullWidth
            iconName={isLoading ? "Loader" : "CheckCircle"}
            iconPosition="left"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Didn't receive the code?
            </p>
            
            {canResend ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleResendCode}
                disabled={isResending}
                iconName={isResending ? "Loader" : "RefreshCw"}
                iconPosition="left"
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend code in {formatTime(timer)}
              </p>
            )}
          </div>

          <div className="text-center pt-4">
            <Link 
              to={fromLogin ? "/login" : "/signup"} 
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              ← Back to {fromLogin ? "Login" : "Sign Up"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;