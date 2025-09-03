import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import PaymentLinksTable from './components/PaymentLinksTable';
import PaymentAnalytics from './components/PaymentAnalytics';
import CreateLinkModal from './components/CreateLinkModal';
import QuickStatsWidget from './components/QuickStatsWidget';

const PaymentLinkManagementDashboard = () => {
  const [viewMode, setViewMode] = useState('table'); // table or card
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  const statusFilterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
    { value: 'paid', label: 'Paid' },
    { value: 'disabled', label: 'Disabled' }
  ];

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const quickStats = {
    totalLinks: 142,
    totalRevenue: '$47,892.50',
    avgConversionRate: '18.3%',
    topPerformingLink: 'Premium Package Link'
  };

  return (
    <>
      <Helmet>
        <title>Payment Link Management Dashboard - FinTech Analytics</title>
        <meta name="description" content="Comprehensive payment link management with creation, monitoring, and analytics capabilities for business users and sales teams." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="pt-16 pl-64">
          {/* Dashboard Header */}
          <div className="bg-card border-b border-border shadow-elevation">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="Link" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Payment Link Management</h1>
                    <p className="text-muted-foreground">
                      Create, monitor, and analyze payment link performance
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={() => setShowCreateModal(true)}
                    iconName="Plus" 
                    iconPosition="left"
                  >
                    Create Payment Link
                  </Button>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Input
                      placeholder="Search payment links..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                  
                  <Select
                    options={statusFilterOptions}
                    value={statusFilter}
                    onChange={setStatusFilter}
                    placeholder="Filter by status"
                    className="w-full sm:w-48"
                  />
                  
                  <Select
                    options={dateRangeOptions}
                    value={dateRange}
                    onChange={setDateRange}
                    placeholder="Select date range"
                    className="w-full sm:w-48"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-micro ${
                        viewMode === 'table' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name="Table" size={16} className="mr-2" />
                      Table
                    </button>
                    <button
                      onClick={() => setViewMode('card')}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-micro ${
                        viewMode === 'card' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name="Grid3X3" size={16} className="mr-2" />
                      Cards
                    </button>
                  </div>
                  
                  <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                    Export
                  </Button>
                  
                  <Button variant="outline" size="sm" iconName="MoreVertical">
                    Bulk Actions
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 xl:grid-cols-16 gap-8">
              {/* Main Content Area */}
              <div className="xl:col-span-12">
                {/* Payment Links Display */}
                {viewMode === 'table' ? (
                  <PaymentLinksTable 
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    dateRange={dateRange}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card view would be implemented here */}
                    <div className="bg-card rounded-lg border border-border p-6 text-center">
                      <Icon name="Grid3X3" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Card view implementation coming soon</p>
                    </div>
                  </div>
                )}

                {/* Analytics Section */}
                <div className="mt-8">
                  <PaymentAnalytics dateRange={dateRange} />
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="xl:col-span-4">
                <QuickStatsWidget stats={quickStats} />
              </div>
            </div>
          </div>
        </main>

        {/* Create Link Modal */}
        {showCreateModal && (
          <CreateLinkModal 
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default PaymentLinkManagementDashboard;