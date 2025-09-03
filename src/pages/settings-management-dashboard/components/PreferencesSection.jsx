import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    autoLogout: '30',
    emailDigest: 'daily',
    dashboardLayout: 'default'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Preferences saved:', preferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPreferences = () => {
    setPreferences({
      theme: 'system',
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
      autoLogout: '30',
      emailDigest: 'daily',
      dashboardLayout: 'default'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Sliders" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">User Preferences</h2>
            <p className="text-muted-foreground">Customize your application experience and settings</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Appearance Settings */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Theme
                </label>
                <Select
                  value={preferences.theme}
                  onChange={(value) => handlePreferenceChange('theme', value)}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'system', label: 'System' }
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Dashboard Layout
                </label>
                <Select
                  value={preferences.dashboardLayout}
                  onChange={(value) => handlePreferenceChange('dashboardLayout', value)}
                  options={[
                    { value: 'default', label: 'Default' },
                    { value: 'compact', label: 'Compact' },
                    { value: 'expanded', label: 'Expanded' }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Localization Settings */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Localization</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Language
                </label>
                <Select
                  value={preferences.language}
                  onChange={(value) => handlePreferenceChange('language', value)}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' }
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Timezone
                </label>
                <Select
                  value={preferences.timezone}
                  onChange={(value) => handlePreferenceChange('timezone', value)}
                  options={[
                    { value: 'UTC', label: 'UTC' },
                    { value: 'EST', label: 'Eastern Time' },
                    { value: 'PST', label: 'Pacific Time' },
                    { value: 'GMT', label: 'Greenwich Mean Time' }
                  ]}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date Format
                </label>
                <Select
                  value={preferences.dateFormat}
                  onChange={(value) => handlePreferenceChange('dateFormat', value)}
                  options={[
                    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Currency
                </label>
                <Select
                  value={preferences.currency}
                  onChange={(value) => handlePreferenceChange('currency', value)}
                  options={[
                    { value: 'USD', label: 'USD ($)' },
                    { value: 'EUR', label: 'EUR (€)' },
                    { value: 'GBP', label: 'GBP (£)' },
                    { value: 'JPY', label: 'JPY (¥)' }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Security</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Auto Logout (minutes)
                </label>
                <Select
                  value={preferences.autoLogout}
                  onChange={(value) => handlePreferenceChange('autoLogout', value)}
                  options={[
                    { value: '15', label: '15 minutes' },
                    { value: '30', label: '30 minutes' },
                    { value: '60', label: '1 hour' },
                    { value: '120', label: '2 hours' },
                    { value: 'never', label: 'Never' }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Digest Frequency
                </label>
                <Select
                  value={preferences.emailDigest}
                  onChange={(value) => handlePreferenceChange('emailDigest', value)}
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleResetPreferences}
            className="flex items-center space-x-2"
          >
            <Icon name="RotateCcw" size={16} />
            <span>Reset to Defaults</span>
          </Button>
          
          <Button
            onClick={handleSavePreferences}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            {isLoading ? (
              <Icon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <Icon name="Save" size={16} />
            )}
            <span>{isLoading ? 'Saving...' : 'Save Preferences'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;