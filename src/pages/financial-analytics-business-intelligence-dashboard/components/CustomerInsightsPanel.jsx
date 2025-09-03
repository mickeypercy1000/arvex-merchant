import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, FunnelChart, Funnel, LabelList } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerInsightsPanel = () => {
  const [activeTab, setActiveTab] = useState('funnel');

  const acquisitionFunnelData = [
    { name: 'Website Visitors', value: 45000, fill: '#1E40AF' },
    { name: 'Sign-ups', value: 12500, fill: '#3B82F6' },
    { name: 'Email Verified', value: 9800, fill: '#60A5FA' },
    { name: 'First Transaction', value: 6200, fill: '#93C5FD' },
    { name: 'Active Users', value: 4800, fill: '#DBEAFE' }
  ];

  const churnAnalysisData = [
    { name: 'Active', value: 78.5, fill: '#059669', count: 15700 },
    { name: 'At Risk', value: 12.3, fill: '#EA580C', count: 2460 },
    { name: 'Churned', value: 9.2, fill: '#DC2626', count: 1840 }
  ];

  const customerSegments = [
    {
      segment: 'High Value',
      count: 2400,
      revenue: 1850000,
      avgTransaction: 771,
      growth: 15.2,
      color: '#059669'
    },
    {
      segment: 'Growing',
      count: 8900,
      revenue: 2340000,
      avgTransaction: 263,
      growth: 23.8,
      color: '#1E40AF'
    },
    {
      segment: 'New Users',
      count: 4200,
      revenue: 420000,
      avgTransaction: 100,
      growth: 45.6,
      color: '#EA580C'
    },
    {
      segment: 'At Risk',
      count: 1500,
      revenue: 180000,
      avgTransaction: 120,
      growth: -8.4,
      color: '#DC2626'
    }
  ];

  const conversionMetrics = [
    { metric: 'Visitor to Sign-up', rate: 27.8, trend: 'up', change: 3.2 },
    { metric: 'Sign-up to Verified', rate: 78.4, trend: 'up', change: 1.8 },
    { metric: 'Verified to First Transaction', rate: 63.3, trend: 'down', change: -2.1 },
    { metric: 'First to Active User', rate: 77.4, trend: 'up', change: 4.5 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value.toLocaleString()} users
          </p>
          {data.name !== 'Website Visitors' && (
            <p className="text-xs text-muted-foreground">
              Conversion: {((data.value / acquisitionFunnelData[0].value) * 100).toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const ChurnTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.count.toLocaleString()} customers ({data.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Customer Insights</h3>
          <p className="text-sm text-muted-foreground">
            Acquisition funnel and retention analytics
          </p>
        </div>
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'funnel' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab('funnel')}
          >
            Funnel
          </Button>
          <Button
            variant={activeTab === 'churn' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab('churn')}
          >
            Retention
          </Button>
        </div>
      </div>

      {/* Acquisition Funnel Tab */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          {/* Funnel Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip content={<CustomTooltip />} />
                <Funnel
                  dataKey="value"
                  data={acquisitionFunnelData}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {conversionMetrics.map((item, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.metric}
                  </span>
                  <div className={`flex items-center space-x-1 text-xs ${
                    item.trend === 'up' ? 'text-success' : 'text-error'
                  }`}>
                    <Icon 
                      name={item.trend === 'up' ? "TrendingUp" : "TrendingDown"} 
                      size={12} 
                    />
                    <span>{Math.abs(item.change)}%</span>
                  </div>
                </div>
                <div className="text-xl font-semibold text-foreground">
                  {item.rate}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Churn Analysis Tab */}
      {activeTab === 'churn' && (
        <div className="space-y-6">
          {/* Churn Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={churnAnalysisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {churnAnalysisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<ChurnTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Churn Legend */}
          <div className="flex items-center justify-center space-x-6">
            {churnAnalysisData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Segments */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-md font-semibold text-foreground mb-4">Customer Segments</h4>
        <div className="space-y-3">
          {customerSegments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: segment.color }}
                />
                <div>
                  <span className="font-medium text-foreground">{segment.segment}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {segment.count.toLocaleString()} customers
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {formatCurrency(segment.revenue)}
                  </div>
                  <div className="text-muted-foreground">
                    Avg: {formatCurrency(segment.avgTransaction)}
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${
                  segment.growth >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={segment.growth >= 0 ? "TrendingUp" : "TrendingDown"} 
                    size={14} 
                  />
                  <span className="font-medium">{Math.abs(segment.growth)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInsightsPanel;