import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordRequirements = [
    { text: 'At least 8 characters', check: (pwd) => pwd?.length >= 8 },
    { text: 'At least one uppercase letter', check: (pwd) => /[A-Z]/?.test(pwd) },
    { text: 'At least one lowercase letter', check: (pwd) => /[a-z]/?.test(pwd) },
    { text: 'At least one number', check: (pwd) => /\d/?.test(pwd) },
    { text: 'At least one special character', check: (pwd) => /[!@#$%^&*(),.?":{}|<>]/?.test(pwd) }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    if (success) setSuccess(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev?.[field] }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      const failedRequirements = passwordRequirements?.filter(req => !req?.check(formData?.newPassword));
      if (failedRequirements?.length > 0) {
        newErrors.newPassword = 'Password does not meet requirements';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData?.currentPassword && formData?.newPassword && formData?.currentPassword === formData?.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Password change request:', {
        currentPassword: formData?.currentPassword,
        newPassword: formData?.newPassword
      });

      // Simulate successful password change
      setSuccess(true);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswords({ current: false, new: false, confirm: false });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (error) {
      console.error('Password change error:', error);
      setErrors({ general: 'Failed to change password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    const passedRequirements = passwordRequirements?.filter(req => req?.check(password))?.length;
    if (passedRequirements < 2) return { strength: 'weak', color: 'bg-destructive', width: '25%' };
    if (passedRequirements < 4) return { strength: 'medium', color: 'bg-warning', width: '50%' };
    if (passedRequirements < 5) return { strength: 'good', color: 'bg-blue-500', width: '75%' };
    return { strength: 'strong', color: 'bg-success', width: '100%' };
  };

  const passwordStrength = formData?.newPassword ? getPasswordStrength(formData?.newPassword) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground">Change Password</h3>
          <p className="text-muted-foreground">Update your password to keep your account secure</p>
        </div>
      </div>
      {success && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div>
              <p className="font-medium text-success">Password Changed Successfully</p>
              <p className="text-sm text-success/80">Your password has been updated. Please use your new password for future logins.</p>
            </div>
          </div>
        </div>
      )}
      {errors?.general && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <p className="text-destructive">{errors?.general}</p>
          </div>
        </div>
      )}
      <div className="bg-card border border-border rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current Password *
            </label>
            <div className="relative">
              <Input
                type={showPasswords?.current ? "text" : "password"}
                placeholder="Enter your current password"
                value={formData?.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e?.target?.value)}
                error={errors?.currentPassword}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPasswords?.current ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              New Password *
            </label>
            <div className="relative">
              <Input
                type={showPasswords?.new ? "text" : "password"}
                placeholder="Enter your new password"
                value={formData?.newPassword}
                onChange={(e) => handleInputChange('newPassword', e?.target?.value)}
                error={errors?.newPassword}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPasswords?.new ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData?.newPassword && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Password strength:</span>
                  <span className={`text-sm font-medium ${
                    passwordStrength?.strength === 'weak' ? 'text-destructive' :
                    passwordStrength?.strength === 'medium' ? 'text-warning' :
                    passwordStrength?.strength === 'good' ? 'text-blue-500' : 'text-success'
                  }`}>
                    {passwordStrength?.strength}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
                    style={{ width: passwordStrength?.width }}
                  ></div>
                </div>
              </div>
            )}

            {/* Password Requirements */}
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground mb-2">Password requirements:</p>
              <div className="space-y-1">
                {passwordRequirements?.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon
                      name={formData?.newPassword && requirement?.check(formData?.newPassword) ? "CheckCircle" : "Circle"}
                      size={14}
                      className={
                        formData?.newPassword && requirement?.check(formData?.newPassword)
                          ? 'text-success' :'text-muted-foreground'
                      }
                    />
                    <span className={`text-xs ${
                      formData?.newPassword && requirement?.check(formData?.newPassword)
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}>
                      {requirement?.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <Input
                type={showPasswords?.confirm ? "text" : "password"}
                placeholder="Confirm your new password"
                value={formData?.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                error={errors?.confirmPassword}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPasswords?.confirm ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              type="submit"
              disabled={isLoading}
              iconName={isLoading ? "Loader" : "Save"}
              iconPosition="left"
            >
              {isLoading ? 'Changing Password...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </div>
      {/* Security Tips */}
      <div className="bg-muted/30 border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Shield" size={16} />
          <span>Password Security Tips</span>
        </h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span>Use a unique password that you don't use on other websites</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span>Consider using a password manager to generate and store strong passwords</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span>Enable two-factor authentication for additional security</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span>Never share your password with anyone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;