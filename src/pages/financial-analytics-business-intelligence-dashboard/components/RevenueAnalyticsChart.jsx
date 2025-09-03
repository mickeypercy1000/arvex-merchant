import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueAnalyticsChart = () => {
  const [selectedMetrics, setSelectedMetrics] = useState({
    revenue: true,
    profit: true,
    clv: true
  });
  const [timeRange, setTimeRange] = useState('12M');
  const [isZoomed, setIsZoomed] = useState(false);

  const revenueData = useMemo(() => [
    {
      month: 'Jan 2024',
      revenue: 2840000,
      profit: 568000,
      clv: 1250,
      customers: 12400
    },
    {
      month: 'Feb 2024',
      revenue: 3120000,
      profit: 624000,
      clv: 1280,
      customers: 13200
    },
    {
      month: 'Mar 2024',
      revenue: 2980000,
      profit: 596000,
      clv: 1310,
      customers: 13800
    },
    {
      month: 'Apr 2024',
      revenue: 3450000,
      profit: 690000,
      clv: 1340,
      customers: 14500
    },
    {
      month: 'May 2024',
      revenue: 3680000,
      profit: 736000,
      clv: 1375,
      customers: 15200
    },
    {
      month: 'Jun 2024',
      revenue: 3920000,
      profit: 784000,
      clv: 1410,
      customers: 15900
    },
    {
      month: 'Jul 2024',
      revenue: 4150000,
      profit: 830000,
      clv: 1445,
      customers: 16600
    }
  ], []);

  const timeRanges = [
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '12M', label: '12 Months' },
    { value: 'YTD', label: 'Year to Date' }
  ];

  const metrics = [
    { key: 'revenue', label: 'Revenue', color: '#1E40AF', format: 'currency' },
    { key: 'profit', label: 'Profit Margin', color: '#059669', format: 'currency' },
    { key: 'clv', label: 'Customer LTV', color: '#EA580C', format: 'currency' }
  ];

  const formatValue = (value, format) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 mb-1">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground">{entry.name}:</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {formatValue(entry.value, entry.payload.format || 'currency')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const toggleMetric = (metricKey) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metricKey]: !prev[metricKey]
    }));
  };

  const getGrowthRate = (data, metric) => {
    if (data.length < 2) return 0;
    const current = data[data.length - 1][metric];
    const previous = data[data.length - 2][metric];
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue Trend Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Multi-dimensional financial performance tracking
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
            >
              {range.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? "Zoom Out" : "Zoom In"}
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} />
          </Button>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => {
          const currentValue = revenueData[revenueData.length - 1][metric.key];
          const growthRate = getGrowthRate(revenueData, metric.key);
          
          return (
            <div key={metric.key} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </span>
                <div className={`flex items-center space-x-1 text-xs ${
                  parseFloat(growthRate) >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={parseFloat(growthRate) >= 0 ? "TrendingUp" : "TrendingDown"} 
                    size={12} 
                  />
                  <span>{Math.abs(growthRate)}%</span>
                </div>
              </div>
              <div className="text-xl font-semibold text-foreground">
                {formatValue(currentValue, metric.format)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => formatValue(value, 'currency')}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedMetrics.revenue && (
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1E40AF"
                strokeWidth={2}
                dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                name="Revenue"
              />
            )}
            
            {selectedMetrics.profit && (
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#059669"
                strokeWidth={2}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                name="Profit Margin"
              />
            )}
            
            {selectedMetrics.clv && (
              <Line
                type="monotone"
                dataKey="clv"
                stroke="#EA580C"
                strokeWidth={2}
                dot={{ fill: '#EA580C', strokeWidth: 2, r: 4 }}
                name="Customer LTV"
                yAxisId="right"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => toggleMetric(metric.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-micro ${
              selectedMetrics[metric.key] 
                ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <div 
              className={`w-3 h-3 rounded-full ${
                selectedMetrics[metric.key] ? 'opacity-100' : 'opacity-40'
              }`}
              style={{ backgroundColor: metric.color }}
            />
            <span className="text-sm font-medium">{metric.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RevenueAnalyticsChart;