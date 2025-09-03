import React, { useState, useEffect } from 'react';
        
        import Header from '../../components/ui/Header';
        import Sidebar from '../../components/ui/Sidebar';
        import Button from '../../components/ui/Button';
        
        
        import Icon from '../../components/AppIcon';
        import ChargebackKPICard from './components/ChargebackKPICard';
        import ChargebacksTable from './components/ChargebacksTable';
        import UrgentCasesQueue from './components/UrgentCasesQueue';
        import ChargebackFilters from './components/ChargebackFilters';
        import ChargebackAnalytics from './components/ChargebackAnalytics';
        import CaseDetailsModal from './components/CaseDetailsModal';

        const ChargebacksManagementDashboard = () => {
          const [chargebacks, setChargebacks] = useState([]);
          const [filters, setFilters] = useState({
            status: 'all',
            urgency: 'all',
            reasonCode: 'all',
            dateRange: '30d'
          });
          const [loading, setLoading] = useState(true);
          const [selectedCase, setSelectedCase] = useState(null);
          const [showCaseModal, setShowCaseModal] = useState(false);

          // Mock data for chargebacks
          useEffect(() => {
            const mockChargebacks = [
              {
                id: 'CB-001',
                caseId: 'CASE-2025-001',
                transactionId: 'TXN-98765432',
                merchantName: 'TechStore Inc.',
                customerEmail: 'customer@email.com',
                amount: 299.99,
                reasonCode: 'fraud',
                reasonDescription: 'Fraudulent Transaction',
                status: 'new',
                deadline: '2025-02-02T09:00:00Z',
                createdAt: '2025-01-25T14:30:00Z',
                priority: 'high',
                cardLast4: '4567',
                cardBrand: 'Visa'
              },
              {
                id: 'CB-002',
                caseId: 'CASE-2025-002',
                transactionId: 'TXN-87654321',
                merchantName: 'Fashion Hub',
                customerEmail: 'buyer@example.com',
                amount: 149.50,
                reasonCode: 'service',
                reasonDescription: 'Service Not Rendered',
                status: 'under_review',
                deadline: '2025-02-05T12:00:00Z',
                createdAt: '2025-01-22T10:15:00Z',
                priority: 'medium',
                cardLast4: '1234',
                cardBrand: 'Mastercard'
              },
              {
                id: 'CB-003',
                caseId: 'CASE-2025-003',
                transactionId: 'TXN-76543210',
                merchantName: 'Digital Services',
                customerEmail: 'user@domain.com',
                amount: 599.99,
                reasonCode: 'duplicate',
                reasonDescription: 'Duplicate Processing',
                status: 'responded',
                deadline: '2025-01-30T15:30:00Z',
                createdAt: '2025-01-20T16:45:00Z',
                priority: 'high',
                cardLast4: '9876',
                cardBrand: 'American Express'
              }
            ];
            setTimeout(() => {
              setChargebacks(mockChargebacks);
              setLoading(false);
            }, 1000);
          }, []);

          const kpiData = [
            {
              title: 'Active Chargebacks',
              value: '47',
              change: '+12.5%',
              trend: 'up',
              icon: 'AlertTriangle',
              color: 'warning'
            },
            {
              title: 'Win Rate',
              value: '68.5%',
              change: '+5.2%',
              trend: 'up',
              icon: 'Trophy',
              color: 'success'
            },
            {
              title: 'Average Response Time',
              value: '18h',
              change: '-8.7%',
              trend: 'down',
              icon: 'Clock',
              color: 'primary'
            },
            {
              title: 'Revenue at Risk',
              value: '$24,850',
              change: '+15.3%',
              trend: 'up',
              icon: 'DollarSign',
              color: 'destructive'
            },
            {
              title: 'Prevention Score',
              value: '82/100',
              change: '+3.1%',
              trend: 'up',
              icon: 'Shield',
              color: 'success'
            },
            {
              title: 'Upcoming Deadlines',
              value: '8',
              change: 'Next in 2h',
              trend: 'neutral',
              icon: 'Calendar',
              color: 'warning'
            }
          ];

          const handleCaseAction = (action, caseId) => {
            console.log(`Performing ${action} on case: ${caseId}`);
            // Implement case action logic here
          };

          const handleViewCase = (caseData) => {
            setSelectedCase(caseData);
            setShowCaseModal(true);
          };

          const handleBulkAction = (action, selectedIds) => {
            console.log(`Performing ${action} on cases:`, selectedIds);
            // Implement bulk actions logic here
          };

          return (
            <div className="min-h-screen bg-background">
              <Header />
              <Sidebar />
              
              <main className="ml-64 pt-16">
                <div className="p-6">
                  {/* Page Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground">Chargebacks Management</h1>
                        <p className="text-muted-foreground mt-1">
                          Comprehensive chargeback case management and dispute resolution
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-destructive" />
                            <span className="text-sm text-muted-foreground">High Priority</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-warning" />
                            <span className="text-sm text-muted-foreground">Medium Priority</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-muted" />
                            <span className="text-sm text-muted-foreground">Low Priority</span>
                          </div>
                        </div>
                        <Button variant="primary" className="flex items-center space-x-2">
                          <Icon name="Download" size={16} />
                          <span>Export Cases</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Filters */}
                  <ChargebackFilters filters={filters} onFiltersChange={setFilters} />

                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                    {kpiData.map((kpi, index) => (
                      <ChargebackKPICard key={index} {...kpi} />
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-16 gap-6 mb-8">
                    {/* Chargebacks Table */}
                    <div className="col-span-12">
                      <ChargebacksTable
                        chargebacks={chargebacks}
                        loading={loading}
                        onCaseAction={handleCaseAction}
                        onViewCase={handleViewCase}
                        onBulkAction={handleBulkAction}
                      />
                    </div>

                    {/* Urgent Cases Queue */}
                    <div className="col-span-4">
                      <UrgentCasesQueue onViewCase={handleViewCase} />
                    </div>
                  </div>

                  {/* Analytics Section */}
                  <ChargebackAnalytics />
                </div>
              </main>

              {/* Case Details Modal */}
              {showCaseModal && selectedCase && (
                <CaseDetailsModal
                  caseData={selectedCase}
                  onClose={() => setShowCaseModal(false)}
                  onAction={handleCaseAction}
                />
              )}
            </div>
          );
        };

        export default ChargebacksManagementDashboard;