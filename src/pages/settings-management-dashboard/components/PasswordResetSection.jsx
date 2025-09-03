import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PasswordResetSection = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const passwordPolicy = {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    preventReuse: 5,
    expiryDays: 90
  };

  const recentActivity = [
    {
      action: 'Password Changed',
      timestamp: '2025-06-15 14:30',
      ipAddress: '192.168.1.100',
      location: 'San Francisco, CA',
      device: 'Chrome on Windows'
    },
    {
      action: 'Login Successful',
      timestamp: '2025-07-20 10:15',
      ipAddress: '192.168.1.100',
      location: 'San Francisco, CA',
      device: 'Chrome on Windows'
    },
    {
      action: '2FA Enabled',
      timestamp: '2025-05-20 09:45',
      ipAddress: '192.168.1.100',
      location: 'San Francisco, CA',
      device: 'Safari on macOS'
    },
    {
      action: 'Failed Login Attempt',
      timestamp: '2025-07-19 16:22',
      ipAddress: '45.123.45.67',
      location: 'Unknown',
      device: 'Firefox on Linux'
    }
  ];

  const sessionTimeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '240', label: '4 hours' },
    { value: '480', label: '8 hours' }
  ];

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= passwordPolicy.minLength,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(check => check).length;

    if (strength === 5) return 'strong';
    if (strength >= 3) return 'medium';
    if (strength >= 1) return 'weak';
    return 'very-weak';
  };

  const handlePasswordChange = (value) => {
    setNewPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const handleSubmitPasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (passwordStrength === 'weak' || passwordStrength === 'very-weak') {
      alert('Password does not meet security requirements');
      return;
    }

    // Handle password change logic
    console.log('Changing password');
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'strong': return 'text-success';
      case 'medium': return 'text-warning';
      case 'weak': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case 'Password Changed': return 'Lock';
      case 'Login Successful': return 'CheckCircle';
      case '2FA Enabled': return 'Shield';
      case 'Failed Login Attempt': return 'XCircle';
      default: return 'Activity';
    }
  };

  const getActivityColor = (action) => {
    switch (action) {
      case 'Login Successful': return 'text-success';
      case '2FA Enabled': return 'text-primary';
      case 'Failed Login Attempt': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Lock" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Password & Security</h2>
            <p className="text-muted-foreground">
              Manage your password and security settings
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Password Change */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Strength:</span>
                        <span className={`text-xs font-medium ${getStrengthColor(passwordStrength)}`}>
                          {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showPasswords}
                    onChange={(e) => setShowPasswords(e.target.checked)}
                    className="rounded border-border"
                  />
                  <label className="text-sm text-foreground">Show passwords</label>
                </div>

                <Button 
                  onClick={handleSubmitPasswordChange}
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                  className="w-full"
                >
                  Change Password
                </Button>
              </div>
            </div>

            {/* Password Policy */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Password Requirements</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>At least {passwordPolicy.minLength} characters long</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>Contains uppercase and lowercase letters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>Contains numbers and special characters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>Cannot reuse last {passwordPolicy.preventReuse} passwords</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span>Expires every {passwordPolicy.expiryDays} days</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                      {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    >
                      {twoFactorEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Timer" size={20} className="text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Session Timeout</p>
                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                    </div>
                  </div>
                  <Select
                    options={sessionTimeoutOptions}
                    value="60"
                    onChange={() => {}}
                    placeholder="Select timeout duration"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Login Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <Button variant="destructive" className="w-full">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Sign Out All Devices
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Recent Security Activity</h3>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Icon 
                      name={getActivityIcon(activity.action)} 
                      size={16} 
                      className={getActivityColor(activity.action)} 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>{activity.timestamp}</p>
                        <p>{activity.device}</p>
                        <p>{activity.location} • {activity.ipAddress}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full mt-3">
                View Full Activity Log
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSection;