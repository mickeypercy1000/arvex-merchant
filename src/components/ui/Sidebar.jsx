import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useSidebar } from '../../contexts/SidebarContext';
import { logout, getUserData } from '../../utils/auth';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const userData = getUserData();

  const navigationItems = [
    {
      group: 'Core Operations',
      items: [
        {
          label: 'Dashboard',
          path: '/',
          icon: 'Home',
          description: 'Main dashboard overview'
        },
        // {
        //   label: 'Company Overview',
        //   path: '/company-okr-dashboard',
        //   icon: 'LayoutDashboard',
        //   description: 'Company-wide OKR overview'
        // },
        // {
        //   label: 'Objectives',
        //   path: '/objective-creation-and-management',
        //   icon: 'Target',
        //   description: 'Create and manage objectives'
        // },
        // {
        //   label: 'Progress',
        //   path: '/progress-tracking-and-updates',
        //   icon: 'TrendingUp',
        //   description: 'Track progress and updates'
        // }
      ]
    },
    // {
    //   group: 'Collaboration',
    //   items: [
    //     {
    //       label: 'Check-ins',
    //       path: '/team-check-ins-and-collaboration',
    //       icon: 'Users',
    //       description: 'Team collaboration and check-ins'
    //     },
    //     {
    //       label: 'Timeline',
    //       path: '/timeline-and-milestone-management',
    //       icon: 'Calendar',
    //       description: 'Milestone and timeline management'
    //     }
    //   ]
    // },
    {
      group: 'Payments',
      items: [
        {
          label: 'Transactions',
          path: '/transactions',
          icon: 'CreditCard',
          description: 'Transaction history and analytics'
        },
        {
          label: 'Payment Links',
          path: '/payment-links',
          icon: 'Link',
          description: 'Create and manage payment links'
        },
        {
          label: 'Chargebacks',
          path: '/chargebacks-management-dashboard',
          icon: 'CreditCard',
          description: 'Manage chargebacks and disputes'
        }
      ]
    },
    // {
    //   group: 'Intelligence',
    //   items: [
    //     {
    //       label: 'Analytics',
    //       path: '/analytics-and-reporting-dashboard',
    //       icon: 'BarChart3',
    //       description: 'Reports and analytics'
    //     }
    //   ]
    // },
    {
      group: 'Administration',
      items: [
        {
          label: 'Compliance',
          path: '/compliance',
          icon: 'FileCheck',
          description: 'Document compliance management'
        },
        {
          label: 'Users',
          path: '/user-and-permission-management',
          icon: 'Shield',
          description: 'User and permission management'
        },
        {
          label: 'Settings',
          path: '/system-configuration-and-settings',
          icon: 'Settings',
          description: 'System configuration'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      } hidden md:flex md:flex-col`}>
        
        {/* Collapse Toggle */}
        <div className="flex items-center justify-end p-4 border-b border-border flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Scrollable Navigation Container */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-6">
            {navigationItems?.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-2">
                {!isCollapsed && (
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">
                    {group?.group}
                  </h3>
                )}
                <div className="space-y-1">
                  {group?.items?.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActiveRoute(item?.path)
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground hover:bg-muted hover:text-foreground'
                      }`}
                      title={isCollapsed ? item?.label : item?.description}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={18} 
                        className={`flex-shrink-0 ${
                          isActiveRoute(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{item?.label}</span>
                      )}
                    </button>
                  ))}
                </div>
                {!isCollapsed && groupIndex < navigationItems?.length - 1 && (
                  <div className="border-t border-border mt-4"></div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Collapsed Sidebar Footer */}
        {isCollapsed && (
          <div className="flex-shrink-0 p-2 border-t border-border">
            <button
              onClick={() => logout(navigate)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <Icon name="LogOut" size={18} />
            </button>
          </div>
        )}

        {/* Quick Actions - Fixed Bottom */}
        {!isCollapsed && (
          <div className="flex-shrink-0 p-4 border-t border-border space-y-4">
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userData?.first_name || userData?.business_name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userData?.email || ''}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start h-9 text-red-600 hover:text-red-700 hover:bg-red-50" 
              iconName="LogOut" 
              iconPosition="left"
              onClick={() => logout(navigate)}
            >
              Sign Out
            </Button>

            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Zap" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Quick Actions</span>
              </div>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start h-8" iconName="Plus" iconPosition="left">
                  New OKR
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start h-8" iconName="MessageSquare" iconPosition="left">
                  Check-in
                </Button>
              </div>
            </div>
          </div>
        )}
      </aside>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
        <nav className="flex items-center justify-around py-2">
          {[
            { label: 'Dashboard', path: '/', icon: 'Home' },
            { label: 'Company Overview', path: '/company-okr-dashboard', icon: 'LayoutDashboard' },
            { label: 'Payments', path: '/payment-links', icon: 'CreditCard' },
            { label: 'Check-ins', path: '/team-check-ins-and-collaboration', icon: 'Users' },
            { label: 'Analytics', path: '/analytics-and-reporting-dashboard', icon: 'BarChart3' },
            { label: 'More', path: '/more', icon: 'MoreHorizontal' }
          ]?.map((item, index) => (
            <button
              key={index}
              onClick={() => item?.path === '/more' ? console.log('Show more menu') : handleNavigation(item?.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActiveRoute(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;