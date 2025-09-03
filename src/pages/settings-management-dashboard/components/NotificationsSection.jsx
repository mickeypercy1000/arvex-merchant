import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationsSection = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    transactionAlerts: true,
    riskAlerts: true,
    systemUpdates: false,
    weeklyReports: true,
    monthlyReports: true,
    securityAlerts: true
  });

  const [smsNotifications, setSmsNotifications] = useState({
    criticalAlerts: true,
    fraudAlerts: true,
    systemDowntime: true,
    paymentFailures: false
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    realTimeAlerts: true,
    taskReminders: true,
    teamUpdates: false,
    productUpdates: true
  });

  const [emailFrequency, setEmailFrequency] = useState('immediate');
  const [smsFrequency, setSmsFrequency] = useState('critical');

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Digest' }
  ];

  const smsFrequencyOptions = [
    { value: 'critical', label: 'Critical Only' },
    { value: 'important', label: 'Important & Critical' },
    { value: 'all', label: 'All Notifications' },
    { value: 'none', label: 'None' }
  ];

  const handleEmailToggle = (key) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSmsToggle = (key) => {
    setSmsNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInAppToggle = (key) => {
    setInAppNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveSettings = () => {
    // Handle save logic
    console.log('Saving notification settings:', {
      emailNotifications,
      smsNotifications,
      inAppNotifications,
      emailFrequency,
      smsFrequency
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Bell" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
          </div>
          <Button onClick={handleSaveSettings} iconName="Save" iconPosition="left">
            Save Settings
          </Button>
        </div>
        <p className="text-muted-foreground mt-2">
          Configure your notification preferences and delivery channels
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email Notifications */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Frequency
                </label>
                <Select
                  options={frequencyOptions}
                  value={emailFrequency}
                  onChange={setEmailFrequency}
                  placeholder="Select frequency"
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Email Types</h4>
                {Object.entries(emailNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onChange={() => handleEmailToggle(key)}
                    />
                    <label className="text-sm text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Icon name="MessageSquare" size={20} className="text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">SMS Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  SMS Level
                </label>
                <Select
                  options={smsFrequencyOptions}
                  value={smsFrequency}
                  onChange={setSmsFrequency}
                  placeholder="Select SMS level"
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">SMS Types</h4>
                {Object.entries(smsNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onChange={() => handleSmsToggle(key)}
                    />
                    <label className="text-sm text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-warning">SMS Charges Apply</p>
                    <p className="text-xs text-warning/80">Standard messaging rates may apply</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* In-App Notifications */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Icon name="Monitor" size={20} className="text-info" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">In-App Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive alerts within the application</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Notification Types</h4>
                {Object.entries(inAppNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onChange={() => handleInAppToggle(key)}
                    />
                    <label className="text-sm text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-info/10 border border-info/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-info mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-info">Browser Permissions</p>
                    <p className="text-xs text-info/80">Enable browser notifications for the best experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification History */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground">Recent Notifications</h3>
            <Button variant="outline" size="sm" iconName="Archive">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                type: 'Risk Alert',
                message: 'High-risk transaction detected on account #12345',
                time: '2025-07-20 10:30',
                channel: 'Email, SMS',
                status: 'delivered'
              },
              {
                type: 'System Update',
                message: 'Scheduled maintenance completed successfully',
                time: '2025-07-20 09:15',
                channel: 'In-App',
                status: 'delivered'
              },
              {
                type: 'Payment Alert',
                message: 'Payment failure for transaction #67890',
                time: '2025-07-20 08:45',
                channel: 'Email',
                status: 'failed'
              }
            ].map((notification, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={notification.status === 'delivered' ? 'CheckCircle' : 'XCircle'} 
                    size={16} 
                    className={notification.status === 'delivered' ? 'text-success' : 'text-error'} 
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{notification.type}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                  <p className="text-xs text-muted-foreground">{notification.channel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;