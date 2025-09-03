import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';



import APIKeysSection from './components/APIKeysSection';
import TeamManagementSection from './components/TeamManagementSection';
import WebhooksSection from './components/WebhooksSection';
import CompanyProfileSection from './components/CompanyProfileSection';
import NotificationsSection from './components/NotificationsSection';
import PreferencesSection from './components/PreferencesSection';
import PasswordResetSection from './components/PasswordResetSection';

const SettingsManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('api-keys');

  const settingsTabs = [
    {
      id: 'api-keys',
      label: 'API Keys',
      icon: 'Key',
      description: 'Manage API keys and permissions'
    },
    {
      id: 'team-management',
      label: 'Team Management',
      icon: 'Users',
      description: 'User roles and permissions'
    },
    {
      id: 'webhooks',
      label: 'Webhooks',
      icon: 'Webhook',
      description: 'Configure webhook endpoints'
    },
    {
      id: 'company-profile',
      label: 'Company Profile',
      icon: 'Building',
      description: 'Organization details and branding'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Alert preferences and channels'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Sliders',
      description: 'User preferences and personalization'
    },
    {
      id: 'password-reset',
      label: 'Password Reset',
      icon: 'Lock',
      description: 'Security and credential management'
    }
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'api-keys':
        return <APIKeysSection />;
      case 'team-management':
        return <TeamManagementSection />;
      case 'webhooks':
        return <WebhooksSection />;
      case 'company-profile':
        return <CompanyProfileSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'preferences':
        return <PreferencesSection />;
      case 'password-reset':
        return <PasswordResetSection />;
      default:
        return <APIKeysSection />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings Management Dashboard - FinTech Analytics</title>
        <meta name="description" content="Comprehensive system configuration and organizational management dashboard for administrators and team leads." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="pt-16 pl-64">
          {/* Dashboard Header */}
          <div className="bg-card border-b border-border shadow-elevation">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Settings" size={32} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Settings Management</h1>
                  <p className="text-muted-foreground">
                    System configuration and organizational management
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Navigation Panel */}
              <div className="lg:col-span-3">
                <div className="bg-card rounded-lg border border-border shadow-elevation p-4">
                  <h3 className="font-semibold text-foreground mb-4">Settings Categories</h3>
                  <nav className="space-y-2">
                    {settingsTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-micro ${
                          activeTab === tab.id
                            ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon
                          name={tab.icon}
                          size={20}
                          className={activeTab === tab.id ? 'text-primary' : 'text-current'}
                        />
                        <div>
                          <div className="font-medium text-sm">{tab.label}</div>
                          <div className="text-xs text-muted-foreground">{tab.description}</div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-9">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SettingsManagementDashboard;