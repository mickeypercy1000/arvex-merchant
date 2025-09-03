import React from 'react';
import { cn } from '../../../utils/cn';

const PasswordStrengthIndicator = ({ password, strength }) => {
  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Fair';
      case 4:
        return 'Good';
      case 5:
        return 'Strong';
      default:
        return 'Very Weak';
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-error';
      case 2:
        return 'bg-warning';
      case 3:
        return 'bg-warning';
      case 4:
        return 'bg-success';
      case 5:
        return 'bg-accent';
      default:
        return 'bg-error';
    }
  };

  const getStrengthTextColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'text-error';
      case 2:
        return 'text-warning';
      case 3:
        return 'text-warning';
      case 4:
        return 'text-success';
      case 5:
        return 'text-accent';
      default:
        return 'text-error';
    }
  };

  const requirements = [
    { label: 'At least 8 characters', met: password?.length >= 8 },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password || '') },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password || '') },
    { label: 'Contains number', met: /\d/.test(password || '') },
    { label: 'Contains special character', met: /[^a-zA-Z\d]/.test(password || '') }
  ];

  if (!password) return null;

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Password Strength</span>
          <span className={cn("text-xs font-medium", getStrengthTextColor(strength))}>
            {getStrengthLabel(strength)}
          </span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={cn(
                "h-2 flex-1 rounded-full",
                level <= strength 
                  ? getStrengthColor(strength)
                  : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center",
              req.met 
                ? "bg-success text-white" :"bg-muted text-muted-foreground"
            )}>
              {req.met ? (
                <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className={cn(
              "text-xs",
              req.met ? "text-success" : "text-muted-foreground"
            )}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;