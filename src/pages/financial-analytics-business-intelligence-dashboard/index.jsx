import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import RevenueAnalyticsChart from './components/RevenueAnalyticsChart';
import GeographicRevenueMap from './components/GeographicRevenueMap';
import PaymentMethodAnalytics from './components/PaymentMethodAnalytics';
import CustomerInsightsPanel from './components/CustomerInsightsPanel';
import CohortAnalysisWidget from './components/CohortAnalysisWidget';
import DataExportTable from './components/DataExportTable';
import AdvancedFilterPanel from './components/AdvancedFilterPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const FinancialAnalyticsBusinessIntelligenceDashboard = () => {
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(15); // minutes
  const [bookmarkedStates, setBookmarkedStates] = useState([]);

  // Key Performance Indicators
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$11.47M',
      change: '+18.2%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'text-success',
      description: 'vs last period'
    },
    {
      title: 'Customer LTV',
      value: '$1,445',
      change: '+12.8%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'text-success',
      description: 'average lifetime value'
    },
    {
      title: 'Profit Margin',
      value: '20.1%',
      change: '+2.3%',
      trend: 'up',
      icon: 'Target',
      color: 'text-success',
      description: 'gross profit margin'
    },
    {
      title: 'Churn Rate',
      value: '9.2%',
      change: '-1.4%',
      trend: 'down',
      icon: 'UserMinus',
      color: 'text-success',
      description: 'monthly churn rate'
    }
  ];

  // Auto-refresh functionality
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAutoRefresh, refreshInterval]);

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
    setLastUpdated(new Date());
  };

  const handleBookmarkState = () => {
    const stateName = prompt('Enter a name for this analysis state:');
    if (stateName) {
      const newBookmark = {
        id: Date.now(),
        name: stateName,
        filters: activeFilters,
        timestamp: new Date()
      };
      setBookmarkedStates([...bookmarkedStates, newBookmark]);
    }
  };

  const handleLoadBookmark = (bookmark) => {
    setActiveFilters(bookmark.filters);
    setLastUpdated(new Date());
  };

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <>
      <Helmet>
        <title>Financial Analytics & Business Intelligence Dashboard - FinTech Analytics</title>
        <meta name="description" content="Comprehensive business intelligence platform with advanced analytics, revenue insights, customer behavior analysis, and data visualization tools." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="pt-16 pl-64">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground">
                  Financial Analytics & Business Intelligence
                </h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive revenue analysis and predictive insights for data-driven decisions
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Bookmarked States */}
                {bookmarkedStates.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Bookmark" size={16} className="text-muted-foreground" />
                    <select 
                      onChange={(e) => {
                        const bookmark = bookmarkedStates.find(b => b.id === parseInt(e.target.value));
                        if (bookmark) handleLoadBookmark(bookmark);
                      }}
                      className="text-sm bg-card border border-border rounded px-2 py-1"
                    >
                      <option value="">Load Saved State</option>
                      {bookmarkedStates.map((bookmark) => (
                        <option key={bookmark.id} value={bookmark.id}>
                          {bookmark.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Auto Refresh Toggle */}
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={isAutoRefresh ? "Play" : "Pause"} 
                    size={16} 
                    className={isAutoRefresh ? "text-success" : "text-muted-foreground"} 
                  />
                  <span className="text-sm text-muted-foreground">
                    Auto-refresh: {isAutoRefresh ? 'On' : 'Off'}
                  </span>
                  <button
                    onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                    className="text-sm text-primary hover:text-primary/80 transition-micro"
                  >
                    Toggle
                  </button>
                </div>
                
                {/* Last Updated */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Updated {formatLastUpdate(lastUpdated)}</span>
                </div>
                
                {/* Bookmark Current State */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmarkState}
                  iconName="Bookmark"
                  iconPosition="left"
                >
                  Save State
                </Button>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={kpi.icon} size={20} className="text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
                    </div>
                    <div className={`flex items-center space-x-1 text-xs ${kpi.color}`}>
                      <Icon 
                        name={kpi.trend === 'up' ? "TrendingUp" : "TrendingDown"} 
                        size={12} 
                      />
                      <span>{kpi.change}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-foreground mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {kpi.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Advanced Filter Panel */}
            <div className="mb-8">
              <AdvancedFilterPanel
                onFiltersChange={handleFiltersChange}
                isCollapsed={isFilterCollapsed}
                onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
              />
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-24 gap-6 mb-8">
              {/* Revenue Analytics Chart - 16 columns */}
              <div className="col-span-24 lg:col-span-16">
                <RevenueAnalyticsChart />
              </div>
              
              {/* Customer Insights Panel - 8 columns */}
              <div className="col-span-24 lg:col-span-8">
                <CustomerInsightsPanel />
              </div>
            </div>

            {/* Middle Section - Three Equal Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <PaymentMethodAnalytics />
              <GeographicRevenueMap />
              <CohortAnalysisWidget />
            </div>

            {/* Data Export Table */}
            <div className="mb-8">
              <DataExportTable />
            </div>

            {/* Predictive Analytics Section */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Predictive Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered forecasting and trend analysis
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Brain" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">ML Model Confidence: 94.2%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground">Revenue Forecast</span>
                  </div>
                  <div className="text-xl font-semibold text-foreground mb-2">$13.8M</div>
                  <div className="text-sm text-muted-foreground">
                    Projected next month (+20.3% growth)
                  </div>
                </div>
                
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Customer Growth</span>
                  </div>
                  <div className="text-xl font-semibold text-foreground mb-2">+2,400</div>
                  <div className="text-sm text-muted-foreground">
                    Expected new customers next month
                  </div>
                </div>
                
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-foreground">Risk Alert</span>
                  </div>
                  <div className="text-xl font-semibold text-foreground mb-2">Medium</div>
                  <div className="text-sm text-muted-foreground">
                    Churn risk in high-value segment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FinancialAnalyticsBusinessIntelligenceDashboard;