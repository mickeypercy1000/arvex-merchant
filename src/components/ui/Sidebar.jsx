import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const location = useLocation();
  const [selectedSubBusiness, setSelectedSubBusiness] = useState('main');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const subBusinesses = [
    { value: 'main', label: 'Main Business' },
    { value: 'ecommerce', label: 'E-commerce Division' },
    { value: 'marketplace', label: 'Marketplace Platform' },
    { value: 'subscription', label: 'Subscription Services' },
    { value: 'mobile', label: 'Mobile App Division' }
  ];

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: 'BarChart3'
    },
    {
      label: 'Transactions', 
      path: '/transactions',
      icon: 'CreditCard'
    },
    {
      label: 'Risk Management',
      path: '/risk-management-fraud-detection-dashboard',
      icon: 'Shield'
    },
    {
      label: 'Payment Link',
      path: '/payment-links',
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
        {/* Sidebar Header - Sub-Business Selector */}
        <div className="p-6 border-b border-border">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Building" size={20} className="text-primary" />
                <div className="text-left">
                  <h2 className="text-sm font-semibold text-foreground">
                    {subBusinesses.find(sb => sb.value === selectedSubBusiness)?.label}
                  </h2>
                </div>
              </div>
              <Icon 
                name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground" 
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevation z-50">
                {subBusinesses.map((business) => (
                  <button
                    key={business.value}
                    onClick={() => {
                      setSelectedSubBusiness(business.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedSubBusiness === business.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                    }`}
                  >
                    <Icon 
                      name="Building" 
                      size={16} 
                      className={selectedSubBusiness === business.value ? 'text-primary' : 'text-muted-foreground'} 
                    />
                    <div className="text-left">
                      <div className="text-sm font-medium">{business.label}</div>
                    </div>
                    {selectedSubBusiness === business.value && (
                      <Icon name="Check" size={16} className="text-primary ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
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