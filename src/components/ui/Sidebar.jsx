import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: 'BarChart3'
    },
    {
      label: 'Transactions', 
      path: '/real-time-transaction-monitoring-dashboard',
      icon: 'CreditCard'
    },
    {
      label: 'Risk Management',
      path: '/risk-management-fraud-detection-dashboard',
      icon: 'Shield'
    },
    {
      label: 'Payment Link',
      path: '/payment-link-management-dashboard',
      icon: 'Link'
    },
    {
      label: 'Settlements',
      path: '/settlements-management-dashboard',
      icon: 'DollarSign'
    },
    {
      label: 'Chargebacks',
      path: '/chargebacks-management-dashboard',
      icon: 'AlertTriangle'
    },
    {
      label: 'Compliance',
      path: '/compliance-document-management-dashboard',
      icon: 'FileCheck'
    },
    {
      label: 'Settings',
      path: '/settings-management-dashboard',
      icon: 'Settings'
    }
  ];

  const isActivePath = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border shadow-elevation z-50">
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
          <p className="text-sm text-muted-foreground mt-1">FinTech Analytics Platform</p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-micro hover:bg-muted group ${
                    isActivePath(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    className={isActivePath(item.path) ? 'text-primary' : 'text-current'}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Version 1.0.0</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;