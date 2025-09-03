import React from 'react';
        import Select from '../../../components/ui/Select';
        import Input from '../../../components/ui/Input';
        import Button from '../../../components/ui/Button';
        import Icon from '../../../components/AppIcon';

        const ChargebackFilters = ({ filters, onFiltersChange }) => {
          const statusOptions = [
            { value: 'all', label: 'All Status' },
            { value: 'new', label: 'New' },
            { value: 'under_review', label: 'Under Review' },
            { value: 'responded', label: 'Responded' },
            { value: 'won', label: 'Won' },
            { value: 'lost', label: 'Lost' }
          ];

          const urgencyOptions = [
            { value: 'all', label: 'All Urgency' },
            { value: 'high', label: 'High Priority' },
            { value: 'medium', label: 'Medium Priority' },
            { value: 'low', label: 'Low Priority' }
          ];

          const reasonCodeOptions = [
            { value: 'all', label: 'All Reason Codes' },
            { value: 'fraud', label: 'Fraudulent Transaction' },
            { value: 'service', label: 'Service Not Rendered' },
            { value: 'duplicate', label: 'Duplicate Processing' },
            { value: 'authorization', label: 'Authorization Issue' },
            { value: 'product', label: 'Product Not Received' },
            { value: 'credit', label: 'Credit Not Processed' }
          ];

          const dateRangeOptions = [
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

          const clearFilters = () => {
            onFiltersChange?.({
              status: 'all',
              urgency: 'all',
              reasonCode: 'all',
              dateRange: '30d'
            });
          };

          return (
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Case Status
                  </label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) => handleFilterChange('status', value)}
                    options={statusOptions}
                  />
                </div>

                {/* Urgency Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Priority Level
                  </label>
                  <Select
                    value={filters.urgency}
                    onValueChange={(value) => handleFilterChange('urgency', value)}
                    options={urgencyOptions}
                  />
                </div>

                {/* Reason Code Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Reason Code
                  </label>
                  <Select
                    value={filters.reasonCode}
                    onValueChange={(value) => handleFilterChange('reasonCode', value)}
                    options={reasonCodeOptions}
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

                {/* Search Input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Search Cases
                  </label>
                  <Input
                    type="text"
                    placeholder="Case ID, merchant..."
                    icon="Search"
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

              {/* Quick Filter Chips */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Quick Filters:</span>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Icon name="Clock" size={12} className="mr-1" />
                  Due Today
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Icon name="AlertTriangle" size={12} className="mr-1" />
                  High Priority
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Icon name="Shield" size={12} className="mr-1" />
                  Fraud Cases
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Icon name="Timer" size={12} className="mr-1" />
                  Overdue
                </Button>
              </div>
            </div>
          );
        };

        export default ChargebackFilters;