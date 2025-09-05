import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import TransactionFlowChart from './components/TransactionFlowChart';
import LiveAlertFeed from './components/LiveAlertFeed';
import TransactionTable from './components/TransactionTable';
import GlobalControlsBar from './components/GlobalControlsBar';

const Transactions = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [filters, setFilters] = useState({
    status: 'all',
    paymentMethod: 'all',
    timeRange: '1h'
  });
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const metricsData = [
    {
      title: 'Live Transactions',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Activity',
      status: 'success',
      subtitle: 'per minute'
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      change: '+0.3%',
      changeType: 'positive',
      icon: 'CheckCircle',
      status: 'success',
      subtitle: 'last hour'
    },
    {
      title: 'Avg Processing Time',
      value: '1.2s',
      change: '-0.1s',
      changeType: 'positive',
      icon: 'Clock',
      status: 'normal',
      subtitle: 'response time'
    },
    {
      title: 'Failed Transactions',
      value: '37',
      change: '+5',
      changeType: 'negative',
      icon: 'XCircle',
      status: 'warning',
      subtitle: 'last hour'
    },
    {
      title: 'Fraud Alerts',
      value: '3',
      change: '+1',
      changeType: 'negative',
      icon: 'Shield',
      status: 'error',
      subtitle: 'active alerts'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '0%',
      changeType: 'neutral',
      icon: 'Server',
      status: 'success',
      subtitle: '30 days'
    }
  ];

  // Mock data for transaction flow chart
  const generateChartData = () => {
    const now = new Date();
    const data = [];
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 5 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        credit_card: Math.floor(Math.random() * 500) + 800,
        debit_card: Math.floor(Math.random() * 300) + 400,
        digital_wallet: Math.floor(Math.random() * 400) + 600,
        bank_transfer: Math.floor(Math.random() * 200) + 200
      });
    }
    
    return data;
  };

  const [chartData, setChartData] = useState(generateChartData());

  // Mock data for alerts
  const alertsData = [
    {
      id: 'alert-001',
      title: 'Unusual Transaction Pattern Detected',
      message: 'High volume of transactions from IP range 192.168.1.0/24 detected in the last 10 minutes',
      severity: 'critical',
      timestamp: new Date(Date.now() - 300000),
      source: 'Fraud Detection System',
      transactionId: 'TXN-789012',
      details: `Multiple high-value transactions ($10,000+) from the same IP range within a 10-minute window. This pattern is consistent with potential fraud activity.`,
      affectedSystems: ['Payment Gateway', 'Risk Engine', 'Transaction Processor']
    },
    {
      id: 'alert-002',
      title: 'Payment Gateway Latency Spike',
      message: 'Average response time increased to 3.2 seconds for Visa transactions',
      severity: 'warning',
      timestamp: new Date(Date.now() - 600000),
      source: 'Performance Monitor',
      details: `Payment gateway response times for Visa transactions have increased significantly. This may impact user experience and transaction success rates.`,
      affectedSystems: ['Visa Gateway', 'Transaction Router']
    },
    {
      id: 'alert-003',
      title: 'Daily Transaction Limit Approaching',
      message: 'Merchant ABC Corp is at 95% of their daily transaction limit',
      severity: 'info',
      timestamp: new Date(Date.now() - 900000),
      source: 'Limit Monitor',
      transactionId: 'MERCHANT-ABC-001',
      details: `Merchant has processed $475,000 of their $500,000 daily limit. Consider notifying the merchant or temporarily increasing their limit.`,
      affectedSystems: ['Merchant Portal', 'Limit Engine']
    },
    {
      id: 'alert-004',
      title: 'Failed Transaction Rate Increase',
      message: 'Failed transaction rate increased to 3.2% in the last 15 minutes',
      severity: 'warning',
      timestamp: new Date(Date.now() - 1200000),
      source: 'Transaction Monitor',
      details: `The failed transaction rate has exceeded the normal threshold of 2%. This could indicate issues with payment processors or network connectivity.`,
      affectedSystems: ['Payment Processors', 'Network Gateway']
    },
    {
      id: 'alert-005',
      title: 'New Merchant Onboarded',
      message: 'XYZ Electronics has been successfully onboarded and is now processing transactions',
      severity: 'info',
      timestamp: new Date(Date.now() - 1800000),
      source: 'Merchant Management',
      details: `New merchant XYZ Electronics has completed onboarding and processed their first successful transaction.`,
      affectedSystems: ['Merchant Portal', 'KYC System']
    }
  ];

  // Mock data for transactions
  const generateTransactionData = () => {
    const customers = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson', 'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez'];
    const merchants = ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Home Depot', 'Costco', 'Apple Store', 'Starbucks'];
    const paymentMethods = ['Credit Card', 'Debit Card', 'Digital Wallet', 'Bank Transfer'];
    const statuses = ['completed', 'pending', 'failed'];
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: `TXN-${String(i + 1).padStart(6, '0')}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      customer: customers[Math.floor(Math.random() * customers.length)],
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      amount: Math.floor(Math.random() * 1000) + 10,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    }));
  };

  const [transactionData, setTransactionData] = useState(generateTransactionData());

  // Simulate real-time updates
  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        setChartData(generateChartData());
        
        // Simulate connection status changes occasionally
        if (Math.random() < 0.05) {
          setConnectionStatus(prev => 
            prev === 'connected' ? 'connecting' : 'connected'
          );
        }
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, isAutoRefresh]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch with new filters
    console.log('Filters changed:', newFilters);
  };

  const handleRefreshIntervalChange = (interval, autoRefresh) => {
    setRefreshInterval(interval);
    setIsAutoRefresh(autoRefresh);
  };

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert ${alertId} action: ${action}`);
    // In a real app, this would handle alert actions
  };

  const handleTransactionClick = (transaction) => {
    console.log('Transaction clicked:', transaction);
    // In a real app, this would open transaction details modal
  };

  const handleBulkAction = (transactionIds, action) => {
    console.log(`Bulk action ${action} on transactions:`, transactionIds);
    // In a real app, this would handle bulk actions
  };

  return (
    <>
      <Helmet>
        <title>Real-Time Transaction Monitoring Dashboard - FinTech Analytics</title>
        <meta name="description" content="Monitor live transaction processing, detect anomalies, and track payment performance in real-time with comprehensive analytics and alerts." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="pt-16 pl-0 lg:pl-64">
          <GlobalControlsBar
            onFiltersChange={handleFiltersChange}
            onRefreshIntervalChange={handleRefreshIntervalChange}
            connectionStatus={connectionStatus}
          />

          <div className="px-4 sm:px-6 py-4 sm:py-8">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2 break-words">
                  Real-Time Transaction Monitoring
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Monitor live transaction processing, detect anomalies, and track system performance in real-time
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {metricsData.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  status={metric.status}
                  subtitle={metric.subtitle}
                />
              ))}
            </div>


            {/* Transaction Table */}
            <TransactionTable
              transactions={transactionData}
              onTransactionClick={handleTransactionClick}
              onBulkAction={handleBulkAction}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Transactions;