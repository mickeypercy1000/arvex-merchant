import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PhoneVerification = ({ phoneNumber, countryCode, onComplete, onResend }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [error, setError] = useState('');
  const [smsSent, setSmsSent] = useState(false);

  const fullPhoneNumber = `${countryCode} ${phoneNumber}`;

  useEffect(() => {
    // Simulate sending initial SMS
    setSmsSent(true);
    
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

      onComplete({ phoneVerified: true, smsVerificationCode: verificationCode });
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendSMS = async () => {
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
      setError('Failed to resend SMS. Please try again.');
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
      {/* SMS Sent Confirmation */}
      {smsSent && (
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-success text-sm font-medium">
              SMS verification code sent!
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          We've sent a 6-digit verification code via SMS to:
        </p>
        <p className="font-medium text-foreground">{fullPhoneNumber}</p>
        <p className="text-sm text-muted-foreground">
          Please enter the code you received to verify your phone number.
        </p>
      </div>

      {/* Verification Form */}
      <form onSubmit={handleVerificationSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input
            label="SMS Verification Code"
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
              Enter the 6-digit code from the SMS
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
          {isVerifying ? 'Verifying...' : 'Verify Phone Number'}
        </Button>
      </form>

      {/* Resend Section */}
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Didn't receive the SMS?
        </p>
        
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={handleResendSMS}
            disabled={resendDisabled}
            iconName="MessageSquare"
            size="sm"
          >
            {resendDisabled 
              ? `Resend in ${resendCountdown}s` 
              : 'Resend SMS code'
            }
          </Button>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Make sure {fullPhoneNumber} is correct</p>
            <p>• Check if you have SMS reception</p>
            <p>• The code expires in 5 minutes</p>
          </div>
        </div>
      </div>

      {/* Alternative Contact Method */}
      <div className="pt-4 border-t border-border">
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Having trouble receiving SMS?
          </p>
          <Button
            variant="ghost"
            size="sm"
            iconName="Phone"
            className="text-xs"
          >
            Try voice call verification instead
          </Button>
        </div>
      </div>

      {/* Support Contact */}
      <div className="pt-2">
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

export default PhoneVerification;