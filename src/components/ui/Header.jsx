import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import UserAvatar from './UserAvatar';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(3);

  const navigationItems = [
    {
      label: 'Live Transaction Monitoring',
      path: '/transactions',
      icon: 'Activity',
      description: 'Real-time transaction monitoring and anomaly detection',
      alertCount: 2
    },
    {
      label: 'Risk Management',
      path: '/risk-management-fraud-detection-dashboard',
      icon: 'Shield',
      description: 'Fraud detection and compliance monitoring',
      alertCount: 1
    },
    {
      label: 'Compliance',
      path: '/compliance-document-management-dashboard',
      icon: 'FileCheck',
      description: 'Document management and regulatory compliance',
      alertCount: 0
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border shadow-elevation">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-none">
              Arvexpay
            </h1>
            <span className="text-xs text-muted-foreground leading-none mt-1">
              Financial Intelligence Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-micro hover:bg-muted group ${
                isActivePath(item.path) 
                  ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              title={item.description}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                className={isActivePath(item.path) ? 'text-primary' : 'text-current'} 
              />
              <span className="font-medium">{item.label}</span>
              {item.alertCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error rounded-full">
                  {item.alertCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Status Indicators & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          {/* <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">JD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">John Doe</span>
              <span className="text-xs text-muted-foreground">Administrator</span>
            </div>
          </div> */}
          <UserAvatar />

          {/* Global Alert Indicator */}
          {alertCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigation('/risk-management-fraud-detection-dashboard')}
              className="relative"
              title={`${alertCount} active alerts`}
            >
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error rounded-full">
                {alertCount}
              </span>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-elevation">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-micro ${
                  isActivePath(item.path)
                    ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActivePath(item.path) ? 'text-primary' : 'text-current'} 
                  />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </div>
                {item.alertCount > 0 && (
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-error rounded-full">
                    {item.alertCount}
                  </span>
                )}
              </button>
            ))}
            
            {/* Mobile Status Info */}
            <div className="flex items-center justify-center pt-4 mt-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                  <span className="text-sm font-medium text-primary">JD</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">John Doe</span>
                  <span className="text-xs text-muted-foreground">Administrator</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;