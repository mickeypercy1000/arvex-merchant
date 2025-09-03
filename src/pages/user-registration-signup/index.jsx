import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

import RegistrationForm from './components/RegistrationForm';
import EmailVerification from './components/EmailVerification';
import ProgressIndicator from './components/ProgressIndicator';

const UserRegistrationSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    countryCode: '+1',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    newsletterOptIn: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Account Details', description: 'Basic information' },
    { id: 2, title: 'Email Verification', description: 'Verify your email' },
    { id: 3, title: 'Complete Setup', description: 'Finish registration' }
  ];

  const handleRegistrationComplete = async (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setErrors({});
    setCurrentStep(2); // Move to email verification step
  };

  const handleEmailVerificationComplete = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to complete registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Registration completed:', formData);
      setCurrentStep(3);
      // redirect or show success message here
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      // Simulate resend email API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Verification email resent to:', formData.email);
    } catch (error) {
      console.error('Failed to resend email:', error);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationForm
            formData={formData}
            errors={errors}
            onComplete={handleRegistrationComplete}
            onErrors={setErrors}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <EmailVerification
            email={formData.email}
            onComplete={handleEmailVerificationComplete}
            onResend={handleResendEmail}
          />
        );
      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Registration Complete!</h3>
            <p className="text-muted-foreground">Welcome to ArvexPay. You can now access your dashboard.</p>
            <Button onClick={() => window.location.href = '/dashboard'} className="mt-4">
              Go to Dashboard
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Your ArvexPay Account - User Registration</title>
        <meta name="description" content="Join ArvexPay today. Create your secure fintech account with our streamlined registration process." />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Left Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="text-center max-w-md">
              <h1 className="text-4xl font-bold mb-6 text-left">Welcome to ArvexPay</h1>
              <p className="text-xl text-primary-foreground/90 mb-8 text-left">
                Join thousands of businesses already transforming their payment processing with our secure, scalable platform.
              </p>
              <div className="space-y-4 text-left">
                {[
                  'Enterprise-grade security & compliance',
                  'Real-time transaction monitoring',
                  'Advanced fraud detection',
                  'Comprehensive analytics dashboard'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-semibold text-lg">ArvexPay</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Already have an account?
                <Link to="/login" className="ml-2 text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-md mx-auto">
              {/* Progress Indicator */}
              <div className="mb-8">
                <ProgressIndicator steps={steps} currentStep={currentStep} />
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {currentStep === 1 && 'Create Your Account'}
                  {currentStep === 2 && 'Verify Your Email'}
                  {currentStep === 3 && 'Welcome to ArvexPay'}
                </h2>
                <p className="text-muted-foreground">
                  {currentStep === 1 && 'Fill in your details below to get started'}
                  {currentStep === 2 && 'Check your email and enter the verification code'}
                  {currentStep === 3 && 'Your account has been successfully created'}
                </p>
              </div>

              {errors.general && (
                <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-error text-sm">{errors.general}</p>
                </div>
              )}

              {renderCurrentStep()}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserRegistrationSignup;
