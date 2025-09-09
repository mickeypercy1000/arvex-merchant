import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import EmailVerification from './components/EmailVerification';

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1 = signup form, 2 = email verification
  const [signupData, setSignupData] = useState(null); // Store signup response data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    businessType: 'Sole Proprietorship',
    phoneCode: '+1',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const businessTypeOptions = [
    { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
    { value: 'Partnership', label: 'Partnership' },
    { value: 'Corporation', label: 'Corporation' },
    { value: 'LLC', label: 'LLC' },
    { value: 'Incorporated', label: 'Incorporated' },
    { value: 'Professional LLC', label: 'Professional LLC' },
    { value: 'Professional LLC with owner', label: 'Professional LLC with owner' },
    { value: 'Professional llc with management', label: 'Professional llc with management' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, feedback: [] };
    
    let score = 0;
    const feedback = [];
    
    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letters');
    
    if (/\d/.test(password)) score += 1;
    else feedback.push('Include numbers');
    
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
    else feedback.push('Include special characters');
    
    return { score, feedback };
  };

  const getPasswordStrengthLabel = (score) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = (score) => {
    if (score <= 2) return 'red';
    if (score <= 3) return 'orange';
    if (score <= 4) return 'blue';
    return 'green';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName) newErrors.firstName = 'First name is required';
    if (!formData?.lastName) newErrors.lastName = 'Last name is required';
    if (!formData?.email) newErrors.email = 'Business email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Email is invalid';
    
    if (!formData?.businessName) newErrors.businessName = 'Business name is required';
    if (!formData?.businessType) newErrors.businessType = 'Business type is required';
    if (!formData?.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    
    if (!formData?.password) newErrors.password = 'Password is required';
    else if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!formData?.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData?.password !== formData?.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        business_name: formData.businessName,
        business_type: formData.businessType,
        country_code: formData.phoneCode,
        phone: formData.phoneNumber,
        email: formData.email,
        password: formData.password
      };

      console.log('Sending signup request:', payload);

      const response = await axios.post('https://api.arvexpay.com/api/v1/auth/merchant/signup', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Signup response:', response.data);
      
      if (response.data.status === 'success') {
        // Console.log the OTP for testing since email service is not working
        console.log('🔐 OTP for verification:', response.data.data.otp);
        
        // Store signup data and move to email verification step
        setSignupData(response.data.data);
        setCurrentStep(2);
      } else {
        setErrors({ general: response.data.user_message || 'Signup failed. Please try again.' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle API validation errors
      if (error.response?.data?.errors) {
        const apiErrors = {};
        const serverErrors = error.response.data.errors;
        
        // Map server error fields to form fields
        if (serverErrors.firstname) apiErrors.firstName = serverErrors.firstname[0];
        if (serverErrors.lastname) apiErrors.lastName = serverErrors.lastname[0];
        if (serverErrors.business_name) apiErrors.businessName = serverErrors.business_name[0];
        if (serverErrors.business_type) apiErrors.businessType = serverErrors.business_type[0];
        if (serverErrors.email) apiErrors.email = serverErrors.email[0];
        if (serverErrors.phone) apiErrors.phoneNumber = serverErrors.phone[0];
        if (serverErrors.country_code) apiErrors.phoneCode = serverErrors.country_code[0];
        if (serverErrors.password) apiErrors.password = serverErrors.password[0];
        
        setErrors(apiErrors);
      } else {
        setErrors({ general: error.response?.data?.user_message || 'Signup failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Render email verification step
  if (currentStep === 2) {
    return (
      <EmailVerification 
        email={formData.email}
        signupId={signupData?.signup_id}
        onSuccess={() => navigate('/login')}
        onBack={() => setCurrentStep(1)}
      />
    );
  }

  // Render signup form (step 1)
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
              <Icon name="Building" size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-4">Join Our Platform</h2>
            <p className="text-xl mb-8 text-white/90">
              Start managing your business payments and transactions with our comprehensive platform.
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>Multiple payment methods support</span>
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
                <span>Advanced analytics and reporting</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>Secure and reliable platform</span>
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
              <Icon name="Building" size={24} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
            <p className="text-muted-foreground mt-2">
              Sign up to get started with our platform
            </p>
          </div>

          {/* Display general errors */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name *
                </label>
                <Input
                  placeholder="John"
                  value={formData?.firstName}
                  onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                  error={errors?.firstName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name *
                </label>
                <Input
                  placeholder="Doe"
                  value={formData?.lastName}
                  onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                  error={errors?.lastName}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Business Email *
              </label>
              <Input
                type="email"
                placeholder="business@example.com"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                iconName="Mail"
                iconPosition="left"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Business Name *
              </label>
              <Input
                placeholder="Your Business Name"
                value={formData?.businessName}
                onChange={(e) => handleInputChange('businessName', e?.target?.value)}
                error={errors?.businessName}
                iconName="Building"
                iconPosition="left"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Business Type *
              </label>
              <select
                value={formData?.businessType}
                onChange={(e) => handleInputChange('businessType', e?.target?.value)}
                className={`w-full px-3 py-4 border-2 rounded-lg bg-background text-foreground focus:outline-none transition-colors ${
                  errors?.businessType 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-border focus:border-primary'
                }`}
              >
                {businessTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors?.businessType && (
                <p className="text-destructive text-sm mt-1">{errors?.businessType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <div className="flex space-x-2">
                <select
                  value={formData?.phoneCode}
                  onChange={(e) => handleInputChange('phoneCode', e?.target?.value)}
                  className="w-24 px-3 py-3 pr-8 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary transition-colors appearance-none bg-no-repeat bg-right"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                  <option value="+34">+34</option>
                  <option value="+39">+39</option>
                  <option value="+31">+31</option>
                  <option value="+46">+46</option>
                  <option value="+47">+47</option>
                  <option value="+45">+45</option>
                  <option value="+233">+233</option>
                </select>
                <div className="flex-1">
                  <input
                    type="tel"
                    placeholder="123 456 7890"
                    value={formData?.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
                    className={`w-full px-3 py-3 rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none transition-colors ${
                      errors?.phoneNumber 
                        ? 'border-2 border-red-500 focus:border-red-500' 
                        : 'border-2 border-border focus:border-primary'
                    }`}
                  />
                </div>
              </div>
              {errors?.phoneNumber && (
                <p className="text-destructive text-sm mt-1">{errors?.phoneNumber}</p>
              )}
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
              {/* Password Strength Indicator */}
              {formData?.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${getPasswordStrengthColor(getPasswordStrength(formData.password).score)}-500 transition-all duration-300`}
                        style={{ width: `${(getPasswordStrength(formData.password).score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium text-${getPasswordStrengthColor(getPasswordStrength(formData.password).score)}-600`}>
                      {getPasswordStrengthLabel(getPasswordStrength(formData.password).score)}
                    </span>
                  </div>
                  {getPasswordStrength(formData.password).feedback.length > 0 && (
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {getPasswordStrength(formData.password).feedback.map((item, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData?.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                  error={errors?.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData?.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
                className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-foreground">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors?.agreeToTerms && (
              <p className="text-destructive text-sm">{errors?.agreeToTerms}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              iconName={isLoading ? "Loader" : "UserPlus"}
              iconPosition="left"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
