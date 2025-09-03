import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import EmailVerification from './EmailVerification';

const RegistrationForm = ({ formData, errors, onComplete, onErrors }) => {
  const [localData, setLocalData] = useState(formData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const countryOptions = [
    { value: '+1', label: 'United States (+1)' },
    { value: '+44', label: 'United Kingdom (+44)' },
    { value: '+49', label: 'Germany (+49)' },
    { value: '+33', label: 'France (+33)' },
    { value: '+39', label: 'Italy (+39)' },
    { value: '+34', label: 'Spain (+34)' },
    { value: '+31', label: 'Netherlands (+31)' },
    { value: '+46', label: 'Sweden (+46)' },
    { value: '+47', label: 'Norway (+47)' },
    { value: '+45', label: 'Denmark (+45)' }
  ];  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!localData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (localData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!localData.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(localData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Company name validation
    if (!localData.companyName?.trim()) {
      newErrors.companyName = 'Company name is required';
    } else if (localData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }

    // Phone number validation
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!localData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(localData.phoneNumber) || localData.phoneNumber.replace(/\D/g, '').length < 10) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Password validation
    if (!localData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordStrength = calculatePasswordStrength(localData.password);
      if (passwordStrength < 3) {
        newErrors.password = 'Password must be stronger (at least 8 characters with uppercase, lowercase, numbers, and special characters)';
      }
    }

    // Confirm password validation
    if (!localData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (localData.password !== localData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return strength;
  };

  const handleInputChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      onErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      onErrors(validationErrors);
      setIsValidating(false);
      return;
    }

    try {
      // Mock email availability check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate email already exists scenario (5% chance)
      if (Math.random() < 0.05) {
        onErrors({ email: 'An account with this email already exists' });
        setIsValidating(false);
        return;
      }

      onComplete(localData);
    } catch (error) {
      onErrors({ general: 'Validation failed. Please try again.' });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <Input
        label="Full Name"
        type="text"
        value={localData.fullName || ''}
        onChange={(e) => handleInputChange('fullName', e.target.value)}
        error={errors.fullName}
        required
        placeholder="Enter your full name"
        className="w-full"
      />

      {/* Business Email */}
      <Input
        label="Business Email"
        type="email"
        value={localData.email || ''}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={errors.email}
        required
        placeholder="Enter your business email"
        className="w-full"
      />

      {/* Company Name */}
      <Input
        label="Company Name"
        type="text"
        value={localData.companyName || ''}
        onChange={(e) => handleInputChange('companyName', e.target.value)}
        error={errors.companyName}
        required
        placeholder="Enter your company name"
        className="w-full"
      />

      {/* Phone Number with Country Code */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Phone Number <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          <Select
            options={countryOptions}
            value={localData.countryCode || '+1'}
            onChange={(value) => handleInputChange('countryCode', value)}
            className="col-span-1"
          />         
          <Input
            type="tel"
            value={localData.phoneNumber || ''}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            error={errors.phoneNumber}
            placeholder="Phone number"
            className="col-span-2"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-sm text-destructive">{errors.phoneNumber}</p>
        )}
      </div>

      {/* Password */}
      <div className="">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={localData.password || ''}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          required
          placeholder="Create a strong password"
          className="w-full"
        />
        
          
        {localData.password && (
          <PasswordStrengthIndicator 
            password={localData.password}
            strength={calculatePasswordStrength(localData.password)}
          />
        )}
      </div>

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        value={localData.confirmPassword || ''}
        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        required
        placeholder="Confirm your password"
        className="w-full"
      />

      <Button
        type="submit"
        loading={isValidating}
        disabled={isValidating}
        className="w-full"
        size="lg"
      >
        {isValidating ? 'Validating...' : 'Continue to Email Verification'}
      </Button>

      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By creating an account, you agree that your information will be processed according to our Privacy Policy and Terms of Service
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;