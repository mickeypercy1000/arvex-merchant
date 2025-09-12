import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const AcceptInvitation = () => {
  const { id } = useParams(); // team_member.id from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    // Fetch invitation details when component mounts
    fetchInvitationDetails();
  }, [id]);

  const fetchInvitationDetails = async () => {
    try {
      setLoading(true);
      // For now, we'll simulate the invitation details since the backend might not have this endpoint yet
      // Replace with actual API call when available
      const mockInvitation = {
        email: "user@example.com",
        teamName: "Development Team",
        role: "Member"
      };
      setInvitation(mockInvitation);
    } catch (err) {
      setError(err.message || 'Failed to load invitation details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      setError('');
      
      const response = await fetch(`https://api.arvexpay.com/api/v1/teams/members/${id}/accept-invitation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to accept invitation');
      }
      
      const result = await response.json();
      
      if (result.status && result.password_set) {
        // Show success message and redirect to login
        alert('Password set successfully! You can now log in with your email and password.');
        navigate('/login');
      } else {
        throw new Error(result.message || 'Failed to set password');
      }
      
    } catch (err) {
      setError(err.message || 'Failed to accept invitation');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">Loading invitation details...</span>
        </div>
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-lg p-6 text-center">
          <div className="mb-4">
            <Icon name="AlertCircle" size={48} className="text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-foreground mb-2">Invalid Invitation</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-elevation">
        {/* Header */}
        <div className="p-6 border-b border-border text-center">
          <Icon name="Users" size={32} className="text-primary mx-auto mb-3" />
          <h1 className="text-xl font-semibold text-foreground mb-2">Join Team</h1>
          {invitation && (
            <p className="text-sm text-muted-foreground">
              You've been invited to join <span className="font-medium text-foreground">{invitation.teamName}</span> as a <span className="font-medium text-foreground">{invitation.role}</span>
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Invitation Details */}
          {invitation && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground font-medium">{invitation.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team:</span>
                  <span className="text-foreground font-medium">{invitation.teamName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="text-foreground font-medium">{invitation.role}</span>
                </div>
              </div>
            </div>
          )}

          {/* Name Fields - Removed since API doesn't require them */}

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password *
            </label>
            <div className="relative">
              <Input
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name={passwordVisible ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <Input
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name={confirmPasswordVisible ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-destructive" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full"
          >
            {submitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Setting Password...</span>
              </div>
            ) : (
              'Set Password & Join Team'
            )}
          </Button>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              By accepting this invitation, you agree to the terms of service and privacy policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcceptInvitation;
