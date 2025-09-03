import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserAvatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Mock user data - in a real app, this would come from context or props
  const user = {
    name: 'John Smith',
    email: 'john.smith@company.com',
    avatar: null,
    role: 'Administrator'
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log('Logout clicked');
    // Clear auth tokens, redirect to login, etc.
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 px-4 py-2 hover:bg-muted"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-white">
              {getInitials(user.name)}
            </span>
          )}
        </div>
        
        {/* User Info */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
        
        {/* Dropdown Arrow */}
        <Icon 
          name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </Button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-elevation z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-base font-medium text-white">
                    {getInitials(user.name)}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
                <div className="text-xs text-muted-foreground">{user.role}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                // Navigate to profile settings
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
            >
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Profile Settings</span>
            </button>

            <button
              onClick={() => {
                setIsDropdownOpen(false);
                // Navigate to account settings
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
            >
              <Icon name="Settings" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Account Settings</span>
            </button>

            <button
              onClick={() => {
                setIsDropdownOpen(false);
                // Navigate to security settings
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
            >
              <Icon name="Shield" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Security</span>
            </button>

            <hr className="my-2 border-border" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
            >
              <Icon name="LogOut" size={16} className="text-muted-foreground" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;