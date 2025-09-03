import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import RiskKPICard from './components/RiskKPICard';
import RiskHeatMap from './components/RiskHeatMap';
import FraudAlertQueue from './components/FraudAlertQueue';
import RiskAssessmentTable from './components/RiskAssessmentTable';
import FraudPatternAnalysis from './components/FraudPatternAnalysis';
import Icon from '../../components/AppIcon';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';




const RiskManagementFraudDetectionDashboard = () => {
  const [riskLevel, setRiskLevel] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [alertConfig, setAlertConfig] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const riskLevelOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'critical', label: 'Critical Risk' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const kpiData = [
    {
      title: 'Active Fraud Alerts',
      value: '23',
      change: '+5',
      changeType: 'negative',
      icon: 'AlertTriangle',
      status: 'critical',
      description: 'Requiring immediate attention',
      threshold: { current: 23, max: 30 }
    },
    {
      title: 'Risk Score Distribution',
      value: '78.5',
      change: '+2.3',
      changeType: 'negative',
      icon: 'TrendingUp',
      status: 'high',
      description: 'Average risk score across all transactions',
      threshold: { current: 78, max: 100 }
    },
    {
      title: 'False Positive Rate',
      value: '12.4%',
      change: '-1.2%',
      changeType: 'positive',
      icon: 'Target',
      status: 'medium',
      description: 'Model accuracy improvement',
      threshold: { current: 12, max: 20 }
    },
    {
      title: 'Compliance Status',
      value: '94.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: 'Shield',
      status: 'low',
      description: 'Regulatory compliance score',
      threshold: { current: 94, max: 100 }
    }
  ];

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just updated';
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
    return `Updated ${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <>
      <Helmet>
        <title>Risk Management & Fraud Detection Dashboard - FinTech Analytics</title>
        <meta name="description" content="Advanced risk assessment, fraud detection, and compliance monitoring with machine learning-powered analytics and real-time threat intelligence." />
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
                  <div className="p-3 bg-error/10 rounded-lg">
                    <Icon name="Shield" size={32} className="text-error" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Risk Management & Fraud Detection</h1>
                    <p className="text-muted-foreground">
                      Comprehensive fraud monitoring and risk assessment dashboard
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-muted-foreground">
                    {formatLastUpdate(lastUpdate)}
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Control Panel */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Select
                    options={riskLevelOptions}
                    value={riskLevel}
                    onChange={setRiskLevel}
                    placeholder="Select risk level"
                    className="w-full sm:w-48"
                  />
                  
                  <Select
                    options={timeRangeOptions}
                    value={timeRange}
                    onChange={setTimeRange}
                    placeholder="Select time range"
                    className="w-full sm:w-48"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={alertConfig ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAlertConfig(!alertConfig)}
                    iconName="Settings"
                    iconPosition="left"
                  >
                    Alert Config
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export Report
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <RiskKPICard key={index} {...kpi} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
              {/* Risk Heat Map */}
              <div className="xl:col-span-8">
                <RiskHeatMap />
              </div>

              {/* Fraud Alert Queue */}
              <div className="xl:col-span-4">
                <FraudAlertQueue />
              </div>
            </div>

            {/* Fraud Pattern Analysis */}
            <div className="mb-8">
              <FraudPatternAnalysis />
            </div>

            {/* Risk Assessment Table */}
            <div className="mb-8">
              <RiskAssessmentTable />
            </div>

            {/* Alert Configuration Panel */}
            {alertConfig && (
              <div className="bg-card rounded-lg border border-border p-6 shadow-elevation">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Icon name="Settings" size={24} className="text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Alert Configuration</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAlertConfig(false)}
                    iconName="X"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Risk Score Thresholds</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Critical Alert</span>
                        <input 
                          type="number" 
                          defaultValue="90" 
                          className="w-16 px-2 py-1 text-sm border border-border rounded bg-input text-foreground"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">High Alert</span>
                        <input 
                          type="number" 
                          defaultValue="70" 
                          className="w-16 px-2 py-1 text-sm border border-border rounded bg-input text-foreground"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Medium Alert</span>
                        <input 
                          type="number" 
                          defaultValue="50" 
                          className="w-16 px-2 py-1 text-sm border border-border rounded bg-input text-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Notification Settings</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-border" />
                        <span className="text-sm text-foreground">Email Notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-border" />
                        <span className="text-sm text-foreground">SMS Alerts</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-foreground">Slack Integration</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Auto-Actions</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-foreground">Auto-block suspicious IPs</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-foreground">Auto-escalate critical alerts</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-border" />
                        <span className="text-sm text-foreground">Generate investigation reports</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setAlertConfig(false)}>
                    Cancel
                  </Button>
                  <Button variant="default">
                    Save Configuration
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default RiskManagementFraudDetectionDashboard;