import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const SocialRegistration = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(null);

  const handleSocialSignup = async (provider) => {
    setIsLoading(provider);
    
    try {
      // Mock OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful OAuth response
      const mockUserData = {
        fullName: provider === 'google' ? 'John Doe' : 'Jane Smith',
        email: provider === 'google' ? 'john@example.com' : 'jane@linkedin.com',
        companyName: provider === 'linkedin' ? 'Tech Corp' : '',
        socialProvider: provider,
        socialId: `${provider}_${Math.random().toString(36).substr(2, 9)}`,
        emailVerified: true // Social logins typically come pre-verified
      };

      onSuccess(mockUserData);
    } catch (error) {
      console.error(`${provider} signup failed:`, error);
      // You might want to show an error message here
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Google */}
        <Button
          variant="outline"
          onClick={() => handleSocialSignup('google')}
          loading={isLoading === 'google'}
          disabled={isLoading !== null}
          className="w-full"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Google</span>
          </div>
        </Button>

        {/* LinkedIn */}
        <Button
          variant="outline"
          onClick={() => handleSocialSignup('linkedin')}
          loading={isLoading === 'linkedin'}
          disabled={isLoading !== null}
          className="w-full"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </div>
        </Button>
      </div>

      {/* Benefits of Social Registration */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          Benefits of social registration:
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
            <span>Faster signup</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
            <span>Pre-verified email</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
            <span>Secure OAuth</span>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          We'll never post to your social accounts without permission
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;