import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Password reset requested for:', email);
      setEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Check Your Email</h2>
            <p className="text-muted-foreground mt-2">
              We've sent a password reset link to
            </p>
            <p className="text-foreground font-medium">{email}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <Icon name="Clock" size={12} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Check your inbox</p>
                  <p>The reset link will arrive within a few minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-warning/10 rounded-full flex items-center justify-center mt-0.5">
                  <Icon name="AlertTriangle" size={12} className="text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Check spam folder</p>
                  <p>Sometimes emails end up in spam or junk folders</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-info/10 rounded-full flex items-center justify-center mt-0.5">
                  <Icon name="Info" size={12} className="text-info" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Link expires in 1 hour</p>
                  <p>For security, the reset link will expire after 60 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              fullWidth
              onClick={handleBackToLogin}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Login
            </Button>
            
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Didn't receive the email?{' '}
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail('');
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Key" size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Forgot Password?</h2>
          <p className="text-muted-foreground mt-2">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e?.target?.value);
                if (error) setError('');
              }}
              error={error}
              iconName="Mail"
              iconPosition="left"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
            iconName={isLoading ? "Loader" : "Send"}
            iconPosition="left"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center space-x-2"
            >
              <Icon name="ArrowLeft" size={14} />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;