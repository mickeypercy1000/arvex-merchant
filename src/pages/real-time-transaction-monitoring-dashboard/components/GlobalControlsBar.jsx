import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GlobalControlsBar = ({ 
  onFiltersChange, 
  onRefreshIntervalChange, 
  connectionStatus = 'connected' 
}) => {
  const [filters, setFilters] = useState({
    status: 'all',
    paymentMethod: 'all',
    timeRange: '1h'
  });
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const statusOptions = [
    { value: 'all', label: 'All Status', icon: 'List' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { value: 'pending', label: 'Pending', icon: 'Clock' },
    { value: 'failed', label: 'Failed', icon: 'XCircle' }
  ];

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

  const refreshIntervalOptions = [
    { value: 1, label: '1 second' },
    { value: 5, label: '5 seconds' },
    { value: 10, label: '10 seconds' },
    { value: 30, label: '30 seconds' }
  ];

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useEffect(() => {
    onRefreshIntervalChange?.(refreshInterval, isAutoRefresh);
  }, [refreshInterval, isAutoRefresh, onRefreshIntervalChange]);

  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, isAutoRefresh]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getConnectionStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return { color: 'text-success', bgColor: 'bg-success', label: 'Connected' };
      case 'connecting':
        return { color: 'text-warning', bgColor: 'bg-warning', label: 'Connecting' };
      case 'disconnected':
        return { color: 'text-error', bgColor: 'bg-error', label: 'Disconnected' };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted', label: 'Unknown' };
    }
  };

  const formatLastRefresh = () => {
    const now = new Date();
    const diff = Math.floor((now - lastRefresh) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const statusConfig = getConnectionStatusConfig();

  return (
    <div className="bg-card border-b border-border sticky top-16 z-50">
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Section - Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Status:</span>
              <div className="flex bg-muted rounded-lg p-1">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('status', option.value)}
                    className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded transition-micro ${
                      filters.status === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={option.icon} size={14} />
                    <span className="hidden sm:inline">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

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

          {/* Right Section - Controls & Status */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Auto Refresh Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                  className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-lg border transition-micro ${
                    isAutoRefresh
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={isAutoRefresh ? "Pause" : "Play"} size={14} />
                  <span>Auto Refresh</span>
                </button>
                
                {isAutoRefresh && (
                  <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    className="px-2 py-1.5 text-sm border border-border rounded bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {refreshIntervalOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setLastRefresh(new Date())}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh Now
              </Button>
            </div>

            {/* Connection Status */}
            <div className="flex items-center space-x-3 px-3 py-2 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${statusConfig.bgColor} ${
                  connectionStatus === 'connected' ? 'animate-pulse' : ''
                }`} />
                <span className={`text-sm font-medium ${statusConfig.color}`}>
                  {statusConfig.label}
                </span>
              </div>
              
              <div className="h-4 w-px bg-border" />
              
              <div className="text-sm text-muted-foreground">
                <span className="font-mono">{formatLastRefresh()}</span>
              </div>
            </div>

            {/* Export Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => {
                // Export functionality would be implemented here
                console.log('Exporting data with filters:', filters);
              }}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.status !== 'all' || filters.paymentMethod !== 'all') && (
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <div className="flex items-center space-x-2">
              {filters.status !== 'all' && (
                <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                  <span>Status: {statusOptions.find(o => o.value === filters.status)?.label}</span>
                  <button
                    onClick={() => handleFilterChange('status', 'all')}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
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
                onClick={() => setFilters({ status: 'all', paymentMethod: 'all', timeRange: '1h' })}
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