import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GlobalControlsBar = ({ 
  onFiltersChange, 
  onRefreshIntervalChange, 
  connectionStatus = 'connected' 
}) => {
  const [filters, setFilters] = useState({
    paymentMethod: 'all',
    timeRange: '1h'
  });

  const paymentMethodOptions = [
    { value: 'all', label: 'All Methods', icon: 'CreditCard' },
    { value: 'credit_card', label: 'Credit Card', icon: 'CreditCard' },
    { value: 'debit_card', label: 'Debit Card', icon: 'CreditCard' },
    { value: 'digital_wallet', label: 'Digital Wallet', icon: 'Wallet' },
    { value: 'bank_transfer', label: 'Bank Transfer', icon: 'Building2' }
  ];

  const timeRangeOptions = [
    { value: '15m', label: '15 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '6h', label: '6 hours' },
    { value: '24h', label: '24 hours' }
  ];

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="bg-card border-b border-border sticky top-16 z-50">
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Section - Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Payment Method Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Method:</span>
              <select
                value={filters.paymentMethod}
                onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                className="px-3 py-1.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {paymentMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Range Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Range:</span>
              <select
                value={filters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                className="px-3 py-1.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {timeRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {filters.paymentMethod !== 'all' && (
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <div className="flex items-center space-x-2">
              {filters.paymentMethod !== 'all' && (
                <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                  <span>Method: {paymentMethodOptions.find(o => o.value === filters.paymentMethod)?.label}</span>
                  <button
                    onClick={() => handleFilterChange('paymentMethod', 'all')}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={() => setFilters({ paymentMethod: 'all', timeRange: '1h' })}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalControlsBar;