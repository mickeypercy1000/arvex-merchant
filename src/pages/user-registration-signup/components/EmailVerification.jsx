import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EmailVerification = ({ email, onComplete, onResend }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Simulate sending initial verification email
    setEmailSent(true);
    
    // Start countdown for resend button
    const timer = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Mock verification API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate invalid code scenario (10% chance)
      if (Math.random() < 0.1) {
        setError('Invalid verification code. Please check and try again.');
        setIsVerifying(false);
        return;
      }

      onComplete({ emailVerified: true, verificationCode });
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    setResendDisabled(true);
    setResendCountdown(60);
    setError('');
    
    try {
      // Mock resend API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onResend();
      
      // Restart countdown
      const timer = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimeout(() => clearInterval(timer), 60000);
    } catch (error) {
      setError('Failed to resend email. Please try again.');
      setResendDisabled(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
    if (error) setError('');
  };

  return (
    <div className="space-y-6">
      {/* Email Sent Confirmation */}
      {emailSent && (
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-success text-sm font-medium">
              Verification email sent!
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          We've sent a 6-digit verification code to:
        </p>
        <p className="font-medium text-foreground">{email}</p>
        <p className="text-sm text-muted-foreground">
          Please check your inbox (and spam folder) and enter the code below.
        </p>
      </div>

      {/* Verification Form */}
      <form onSubmit={handleVerificationSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input
            label="Verification Code"
            type="text"
            value={verificationCode}
            onChange={handleCodeChange}
            error={error}
            required
            placeholder="Enter 6-digit code"
            className="w-full text-center text-lg tracking-widest"
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          
          {/* Code Format Helper */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Enter the 6-digit code from your email
            </p>
          </div>
        </div>

        {/* Verify Button */}
        <Button
          type="submit"
          loading={isVerifying}
          disabled={isVerifying || verificationCode.length !== 6}
          className="w-full"
          size="lg"
        >
          {isVerifying ? 'Verifying...' : 'Verify Email Address'}
        </Button>
      </form>

      {/* Resend Section */}
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Didn't receive the email?
        </p>
        
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={handleResendEmail}
            disabled={resendDisabled}
            iconName="RefreshCw"
            size="sm"
          >
            {resendDisabled 
              ? `Resend in ${resendCountdown}s` 
              : 'Resend verification email'
            }
          </Button>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Check your spam or junk folder</p>
            <p>• Make sure {email} is correct</p>
            <p>• The code expires in 10 minutes</p>
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="pt-4 border-t border-border">
        <p className="text-center text-xs text-muted-foreground">
          Still having trouble?{' '}
          <button className="text-primary hover:underline">
            Contact our support team
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;