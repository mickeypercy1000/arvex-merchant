import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AdvancedFilterPanel = ({ onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    customStartDate: '',
    customEndDate: '',
    customerSegment: 'all',
    geographicRegion: 'all',
    transactionAmountMin: '',
    transactionAmountMax: '',
    comparisonMode: 'period-over-period',
    paymentMethod: 'all',
    currency: 'USD'
  });

  const [savedFilters, setSavedFilters] = useState([
    { id: 1, name: 'Q2 High Value Analysis', filters: { dateRange: 'custom', customerSegment: 'high-value' } },
    { id: 2, name: 'Monthly Cohort Review', filters: { dateRange: 'last30days', comparisonMode: 'cohort' } },
    { id: 3, name: 'Regional Performance', filters: { geographicRegion: 'north-america', comparisonMode: 'period-over-period' } }
  ]);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'thismonth', label: 'This Month' },
    { value: 'lastmonth', label: 'Last Month' },
    { value: 'thisquarter', label: 'This Quarter' },
    { value: 'lastquarter', label: 'Last Quarter' },
    { value: 'thisyear', label: 'This Year' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const customerSegmentOptions = [
    { value: 'all', label: 'All Customers' },
    { value: 'high-value', label: 'High Value (>$1000)' },
    { value: 'growing', label: 'Growing Segment' },
    { value: 'new-users', label: 'New Users (<30 days)' },
    { value: 'at-risk', label: 'At Risk Customers' },
    { value: 'enterprise', label: 'Enterprise Clients' },
    { value: 'sme', label: 'SME Clients' },
    { value: 'individual', label: 'Individual Users' }
  ];

  const geographicRegionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east-africa', label: 'Middle East & Africa' },
    { value: 'united-states', label: 'United States' },
    { value: 'united-kingdom', label: 'United Kingdom' },
    { value: 'germany', label: 'Germany' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'canada', label: 'Canada' }
  ];

  const comparisonModeOptions = [
    { value: 'period-over-period', label: 'Period over Period' },
    { value: 'year-over-year', label: 'Year over Year' },
    { value: 'cohort-analysis', label: 'Cohort Analysis' },
    { value: 'benchmark', label: 'Industry Benchmark' },
    { value: 'forecast', label: 'Predictive Analysis' }
  ];

  const paymentMethodOptions = [
    { value: 'all', label: 'All Payment Methods' },
    { value: 'credit-card', label: 'Credit Cards' },
    { value: 'debit-card', label: 'Debit Cards' },
    { value: 'bank-transfer', label: 'Bank Transfers' },
    { value: 'digital-wallet', label: 'Digital Wallets' },
    { value: 'cryptocurrency', label: 'Cryptocurrency' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'SGD', label: 'Singapore Dollar (SGD)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange?.(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateRange: 'last30days',
      customStartDate: '',
      customEndDate: '',
      customerSegment: 'all',
      geographicRegion: 'all',
      transactionAmountMin: '',
      transactionAmountMax: '',
      comparisonMode: 'period-over-period',
      paymentMethod: 'all',
      currency: 'USD'
    };
    setFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  const handleSaveFilter = () => {
    const filterName = prompt('Enter a name for this filter configuration:');
    if (filterName) {
      const newSavedFilter = {
        id: Date.now(),
        name: filterName,
        filters: { ...filters }
      };
      setSavedFilters([...savedFilters, newSavedFilter]);
    }
  };

  const handleLoadSavedFilter = (savedFilter) => {
    setFilters(savedFilter.filters);
    onFiltersChange?.(savedFilter.filters);
  };

  const handleDeleteSavedFilter = (filterId) => {
    setSavedFilters(savedFilters.filter(f => f.id !== filterId));
  };

  if (isCollapsed) {
    return (
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Filters Active</span>
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {Object.values(filters).filter(v => v && v !== 'all' && v !== 'last30days' && v !== 'period-over-period' && v !== 'USD').length}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
          >
            <Icon name="ChevronDown" size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveFilter}
            iconName="Bookmark"
            iconPosition="left"
          >
            Save
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
          >
            <Icon name="ChevronUp" size={16} />
          </Button>
        </div>
      </div>

      {/* Saved Filters */}
      {savedFilters.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Saved Filter Sets</h4>
          <div className="flex flex-wrap gap-2">
            {savedFilters.map((savedFilter) => (
              <div key={savedFilter.id} className="flex items-center space-x-1 bg-muted/30 rounded-lg p-2">
                <button
                  onClick={() => handleLoadSavedFilter(savedFilter)}
                  className="text-sm text-foreground hover:text-primary transition-micro"
                >
                  {savedFilter.name}
                </button>
                <button
                  onClick={() => handleDeleteSavedFilter(savedFilter.id)}
                  className="text-muted-foreground hover:text-error transition-micro"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Date Range */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Date Range</h4>
          <Select
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            placeholder="Select date range"
          />
          
          {filters.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                label="Start Date"
                value={filters.customStartDate}
                onChange={(e) => handleFilterChange('customStartDate', e.target.value)}
              />
              <Input
                type="date"
                label="End Date"
                value={filters.customEndDate}
                onChange={(e) => handleFilterChange('customEndDate', e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Customer Segment */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Customer Segment</h4>
          <Select
            options={customerSegmentOptions}
            value={filters.customerSegment}
            onChange={(value) => handleFilterChange('customerSegment', value)}
            placeholder="Select customer segment"
          />
        </div>

        {/* Geographic Region */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Geographic Region</h4>
          <Select
            options={geographicRegionOptions}
            value={filters.geographicRegion}
            onChange={(value) => handleFilterChange('geographicRegion', value)}
            placeholder="Select region"
            searchable
          />
        </div>

        {/* Transaction Amount Range */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Transaction Amount</h4>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              label="Min Amount"
              placeholder="0"
              value={filters.transactionAmountMin}
              onChange={(e) => handleFilterChange('transactionAmountMin', e.target.value)}
            />
            <Input
              type="number"
              label="Max Amount"
              placeholder="No limit"
              value={filters.transactionAmountMax}
              onChange={(e) => handleFilterChange('transactionAmountMax', e.target.value)}
            />
          </div>
        </div>

        {/* Comparison Mode */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Analysis Mode</h4>
          <Select
            options={comparisonModeOptions}
            value={filters.comparisonMode}
            onChange={(value) => handleFilterChange('comparisonMode', value)}
            placeholder="Select comparison mode"
          />
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Payment Method</h4>
          <Select
            options={paymentMethodOptions}
            value={filters.paymentMethod}
            onChange={(value) => handleFilterChange('paymentMethod', value)}
            placeholder="Select payment method"
          />
        </div>
      </div>

      {/* Currency & Actions */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Currency:</span>
          </div>
          <Select
            options={currencyOptions}
            value={filters.currency}
            onChange={(value) => handleFilterChange('currency', value)}
            className="w-48"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
          <Button
            variant="default"
            onClick={handleApplyFilters}
            iconName="Search"
            iconPosition="left"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterPanel;