import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [alertCount, setAlertCount] = useState(3);

  const navigationItems = [
    {
      label: 'Live Monitoring',
      path: '/real-time-transaction-monitoring-dashboard',
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

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

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
              FinTech Analytics
            </h1>
            <span className="text-xs text-muted-foreground leading-none">
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
          {/* Data Freshness Indicator */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${getConnectionStatusColor()}`}>
              <div className={`w-full h-full rounded-full ${connectionStatus === 'connected' ? 'bg-success animate-pulse' : connectionStatus === 'connecting' ? 'bg-warning animate-pulse' : 'bg-error'}`} />
            </div>
            <span className="font-mono text-xs">
              {formatLastUpdate(lastUpdate)}
            </span>
          </div>

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
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${getConnectionStatusColor()}`}>
                  <div className={`w-full h-full rounded-full ${connectionStatus === 'connected' ? 'bg-success animate-pulse' : connectionStatus === 'connecting' ? 'bg-warning animate-pulse' : 'bg-error'}`} />
                </div>
                <span>Connection Status</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {formatLastUpdate(lastUpdate)}
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;