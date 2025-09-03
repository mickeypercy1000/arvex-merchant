import React from 'react';
        import Select from '../../../components/ui/Select';
        import Input from '../../../components/ui/Input';
        import Button from '../../../components/ui/Button';
        import Icon from '../../../components/AppIcon';

        const SettlementFilters = ({ filters, onFiltersChange }) => {
          const statusOptions = [
            { value: 'all', label: 'All Status' },
            { value: 'pending', label: 'Pending' },
            { value: 'processing', label: 'Processing' },
            { value: 'completed', label: 'Completed' },
            { value: 'failed', label: 'Failed' }
          ];

          const dateRangeOptions = [
            { value: '1d', label: 'Last 24 Hours' },
            { value: '7d', label: 'Last 7 Days' },
            { value: '30d', label: 'Last 30 Days' },
            { value: '90d', label: 'Last 90 Days' },
            { value: 'custom', label: 'Custom Range' }
          ];

          const handleFilterChange = (key, value) => {
            onFiltersChange?.({
              ...filters,
              [key]: value
            });
          };

          const handleAmountChange = (type, value) => {
            onFiltersChange?.({
              ...filters,
              amount: {
                ...filters.amount,
                [type]: value
              }
            });
          };

          const clearFilters = () => {
            onFiltersChange?.({
              status: 'all',
              dateRange: '7d',
              merchant: '',
              amount: { min: '', max: '' }
            });
          };

          return (
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Settlement Status
                  </label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) => handleFilterChange('status', value)}
                    options={statusOptions}
                  />
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date Range
                  </label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => handleFilterChange('dateRange', value)}
                    options={dateRangeOptions}
                  />
                </div>

                {/* Merchant Search */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Merchant
                  </label>
                  <Input
                    type="text"
                    placeholder="Search merchant..."
                    value={filters.merchant}
                    onChange={(e) => handleFilterChange('merchant', e.target.value)}
                    icon="Search"
                  />
                </div>

                {/* Amount Range Min */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Min Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={filters.amount?.min || ''}
                    onChange={(e) => handleAmountChange('min', e.target.value)}
                    icon="DollarSign"
                  />
                </div>

                {/* Amount Range Max */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Max Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="999,999.99"
                    value={filters.amount?.max || ''}
                    onChange={(e) => handleAmountChange('max', e.target.value)}
                    icon="DollarSign"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={clearFilters} className="flex items-center space-x-2">
                    <Icon name="X" size={16} />
                    <span>Clear</span>
                  </Button>
                  <Button variant="primary" className="flex items-center space-x-2">
                    <Icon name="Filter" size={16} />
                    <span>Apply</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default SettlementFilters;