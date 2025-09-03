import React, { useState, useEffect } from 'react';
        
        import Header from '../../components/ui/Header';
        import Sidebar from '../../components/ui/Sidebar';
        import Button from '../../components/ui/Button';
        
        
        import Icon from '../../components/AppIcon';
        import SettlementKPICard from './components/SettlementKPICard';
        import SettlementTimeline from './components/SettlementTimeline';
        import SettlementQueue from './components/SettlementQueue';
        import SettlementTable from './components/SettlementTable';
        import SettlementFilters from './components/SettlementFilters';

        const SettlementsManagementDashboard = () => {
          const [settlements, setSettlements] = useState([]);
          const [filters, setFilters] = useState({
            status: 'all',
            dateRange: '7d',
            merchant: '',
            amount: { min: '', max: '' }
          });
          const [loading, setLoading] = useState(true);
          const [autoSettlement, setAutoSettlement] = useState(false);

          // Mock data for settlements
          useEffect(() => {
            const mockSettlements = [
              {
                id: 'STL-001',
                batchId: 'BATCH-2025-001',
                merchant: 'TechStore Inc.',
                amount: 25450.75,
                processingTime: '2h 15m',
                status: 'processing',
                method: 'Bank Transfer',
                bank: 'Chase Bank',
                createdAt: '2025-01-28T10:30:00Z'
              },
              {
                id: 'STL-002',
                batchId: 'BATCH-2025-002',
                merchant: 'Fashion Hub',
                amount: 18750.50,
                processingTime: '1h 45m',
                status: 'completed',
                method: 'ACH',
                bank: 'Wells Fargo',
                createdAt: '2025-01-28T09:15:00Z'
              },
              {
                id: 'STL-003',
                batchId: 'BATCH-2025-003',
                merchant: 'Food Delivery Co.',
                amount: 42100.25,
                processingTime: '3h 20m',
                status: 'pending',
                method: 'Wire Transfer',
                bank: 'Bank of America',
                createdAt: '2025-01-28T08:00:00Z'
              }
            ];
            setTimeout(() => {
              setSettlements(mockSettlements);
              setLoading(false);
            }, 1000);
          }, []);

          const kpiData = [
            {
              title: 'Total Settlement Amount',
              value: '$2,458,750.25',
              change: '+12.5%',
              trend: 'up',
              icon: 'DollarSign'
            },
            {
              title: 'Pending Settlements',
              value: '47',
              change: '-8.2%',
              trend: 'down',
              icon: 'Clock'
            },
            {
              title: 'Average Settlement Time',
              value: '2h 18m',
              change: '-15.3%',
              trend: 'down',
              icon: 'Timer'
            },
            {
              title: 'Success Rate',
              value: '98.7%',
              change: '+0.8%',
              trend: 'up',
              icon: 'CheckCircle'
            },
            {
              title: 'Failed Settlements',
              value: '3',
              change: '-50.0%',
              trend: 'down',
              icon: 'XCircle'
            },
            {
              title: 'Next Payout',
              value: 'Tomorrow 9AM',
              change: 'On Schedule',
              trend: 'neutral',
              icon: 'Calendar'
            }
          ];

          const handleBulkAction = (action, selectedIds) => {
            console.log(`Performing ${action} on settlements:`, selectedIds);
            // Implement bulk actions logic here
          };

          const handleRetry = (settlementId) => {
            console.log(`Retrying settlement: ${settlementId}`);
            // Implement retry logic here
          };

          const handleHold = (settlementId) => {
            console.log(`Holding settlement: ${settlementId}`);
            // Implement hold logic here
          };

          const handleExpedite = (settlementId) => {
            console.log(`Expediting settlement: ${settlementId}`);
            // Implement expedite logic here
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
                        <h1 className="text-3xl font-bold text-foreground">Settlements Management</h1>
                        <p className="text-muted-foreground mt-1">
                          Monitor payment settlements, batch reconciliation, and payout scheduling
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Auto Settlement</span>
                          <button
                            onClick={() => setAutoSettlement(!autoSettlement)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              autoSettlement ? 'bg-primary' : 'bg-muted'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                autoSettlement ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        <Button variant="primary" className="flex items-center space-x-2">
                          <Icon name="Download" size={16} />
                          <span>Export Report</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Control Bar */}
                  <SettlementFilters filters={filters} onFiltersChange={setFilters} />

                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                    {kpiData.map((kpi, index) => (
                      <SettlementKPICard key={index} {...kpi} />
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-16 gap-6 mb-8">
                    {/* Settlement Timeline */}
                    <div className="col-span-12">
                      <SettlementTimeline />
                    </div>

                    {/* Settlement Queue */}
                    <div className="col-span-4">
                      <SettlementQueue />
                    </div>
                  </div>

                  {/* Settlement Table */}
                  <SettlementTable
                    settlements={settlements}
                    loading={loading}
                    onRetry={handleRetry}
                    onHold={handleHold}
                    onExpedite={handleExpedite}
                    onBulkAction={handleBulkAction}
                  />
                </div>
              </main>
            </div>
          );
        };

        export default SettlementsManagementDashboard;