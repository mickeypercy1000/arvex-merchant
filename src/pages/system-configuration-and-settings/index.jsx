import React, { useState, useEffect } from 'react';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GeneralSettings from './components/GeneralSettings';
import SecuritySettings from './components/SecuritySettings';
import NotificationSettings from './components/NotificationSettings';
import IntegrationSettings from './components/IntegrationSettings';
import DataManagement from './components/DataManagement';
import ApiKeyManagement from './components/ApiKeyManagement';
import TeamManagement from './components/TeamManagement';
import WebhookManagement from './components/WebhookManagement';
import CompanyProfile from './components/CompanyProfile';
import PasswordReset from './components/PasswordReset';

const SystemConfigurationAndSettings = () => {
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const tabs = [
    // {
    //   id: 'general',
    //   label: 'General Settings',
    //   icon: 'Settings',
    //   description: 'Company information and system preferences'
    // },
    {
      id: 'company-profile',
      label: 'Company Profile',
      icon: 'Building',
      description: 'Manage company information and branding'
    },
    {
      id: 'team-management',
      label: 'Team Management',
      icon: 'Users',
      description: 'Manage team members and their roles'
    },
    {
      id: 'api-keys',
      label: 'API Keys',
      icon: 'Key',
      description: 'Manage API keys and access tokens'
    },
    {
      id: 'webhooks',
      label: 'Webhooks',
      icon: 'Webhook',
      description: 'Configure webhook endpoints and events'
    },
    // {
    //   id: 'integrations',
    //   label: 'Integrations',
    //   icon: 'Zap',
    //   description: 'Third-party service connections and API settings'
    // },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email templates and notification rules'
    },
    // {
    //   id: 'security',
    //   label: 'Security',
    //   icon: 'Shield',
    //   description: 'Authentication, permissions, and audit settings'
    // },
    {
      id: 'password-change',
      label: 'Change Password',
      icon: 'Lock',
      description: 'Change your password here'
    },
    // {
    //   id: 'data',
    //   label: 'Data Management',
    //   icon: 'Database',
    //   description: 'Backup, retention, and export policies'
    // }
  ];

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave this tab?');
      if (!confirmLeave) return;
    }
    setActiveTab(tabId);
    setHasUnsavedChanges(false);
  };

  const handleSaveAll = () => {
    console.log('Saving all configuration changes');
    setHasUnsavedChanges(false);
  };

  const handleResetAll = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.');
    if (confirmReset) {
      console.log('Resetting all settings to defaults');
      setHasUnsavedChanges(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      // case 'general':
      //   return <GeneralSettings />;
      case 'company-profile':
        return <CompanyProfile />;
      case 'team-management':
        return <TeamManagement />;
      case 'api-keys':
        return <ApiKeyManagement />;
      case 'webhooks':
        return <WebhookManagement />;
      // case 'integrations':
      //   return <IntegrationSettings />;
      case 'notifications':
        return <NotificationSettings />;
      // case 'security':
      //   return <SecuritySettings />;
      case 'password-change':
        return <PasswordReset />;
      // case 'data':
      //   return <DataManagement />;
      // default:
      //   return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className={`transition-all duration-300 pt-16 pb-20 md:pb-4 ${
      isCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-60'}`
      }>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-bold text-foreground mb-2 text-2xl">System Configuration</h1>
                <p className="text-muted-foreground">
                  Manage system settings, integrations, and administrative configurations
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {hasUnsavedChanges &&
                <div className="flex items-center space-x-2 px-3 py-2 bg-warning/10 text-warning rounded-lg border border-warning/20">
                    <Icon name="AlertTriangle" size={16} />
                    <span className="text-sm font-medium">Unsaved changes</span>
                  </div>
                }
                
                <Button
                  variant="outline"
                  onClick={handleResetAll}
                  iconName="RotateCcw"
                  iconPosition="left">

                  Reset All
                </Button>
                
                <Button
                  variant="default"
                  onClick={handleSaveAll}
                  iconName="Save"
                  iconPosition="left">

                  Save All Changes
                </Button>
              </div>
            </div>
            
          </div>

          {/* Configuration Tabs */}
          <div className="bg-card border border-border rounded-lg">
            <div className="flex">
              {/* Vertical Tab Navigation */}
              <div className="w-80 flex-shrink-0 border-r border-border">
                <nav className="p-2">
                  {tabs?.map((tab) =>
                  <button
                    key={tab?.id}
                    onClick={() => handleTabChange(tab?.id)}
                    className={`w-full flex items-start space-x-3 px-4 py-4 text-left rounded-lg mb-2 transition-colors min-h-[72px] ${
                    activeTab === tab?.id ?
                    'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted hover:text-foreground'}`
                    }>

                      <Icon name={tab?.icon} size={20} className="mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm mb-1 truncate">{tab?.label}</div>
                        <div className={`text-xs leading-relaxed line-clamp-2 ${
                          activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {tab?.description}
                        </div>
                      </div>
                    </button>
                  )}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="flex-1 p-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {tabs?.find((tab) => tab?.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {tabs?.find((tab) => tab?.id === activeTab)?.description}
                </p>
                <hr className="border-border border-1 my-6 w-full" />
                {renderTabContent()}
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );

};

export default SystemConfigurationAndSettings;