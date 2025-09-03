import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodAnalytics = () => {
  const [viewMode, setViewMode] = useState('volume');
  const [timeframe, setTimeframe] = useState('7d');

  const paymentMethodData = [
    {
      method: 'Credit Card',
      volume: 15420,
      revenue: 3850000,
      avgTransaction: 249.68,
      successRate: 97.8,
      fees: 115500,
      icon: 'CreditCard'
    },
    {
      method: 'Debit Card',
      volume: 8930,
      revenue: 1340000,
      avgTransaction: 150.06,
      successRate: 98.5,
      fees: 26800,
      icon: 'CreditCard'
    },
    {
      method: 'Bank Transfer',
      volume: 4560,
      revenue: 2280000,
      avgTransaction: 500.00,
      successRate: 99.2,
      fees: 22800,
      icon: 'Building2'
    },
    {
      method: 'Digital Wallet',
      volume: 12800,
      revenue: 1920000,
      avgTransaction: 150.00,
      successRate: 96.4,
      fees: 57600,
      icon: 'Wallet'
    },
    {
      method: 'Cryptocurrency',
      volume: 890,
      revenue: 445000,
      avgTransaction: 500.00,
      successRate: 94.2,
      fees: 8900,
      icon: 'Coins'
    }
  ];

  const timeframes = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const viewModes = [
    { value: 'volume', label: 'Transaction Volume', key: 'volume' },
    { value: 'revenue', label: 'Revenue', key: 'revenue' },
    { value: 'avgTransaction', label: 'Avg Transaction', key: 'avgTransaction' }
  ];

  const formatValue = (value, mode) => {
    switch (mode) {
      case 'revenue': case'avgTransaction':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      case 'volume':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  const getBarColor = (method) => {
    const colors = {
      'Credit Card': '#1E40AF',
      'Debit Card': '#3B82F6',
      'Bank Transfer': '#059669',
      'Digital Wallet': '#EA580C',
      'Cryptocurrency': '#DC2626'
    };
    return colors[method] || '#64748B';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name={data.icon} size={16} className="text-primary" />
            <p className="font-medium text-foreground">{label}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Volume:</span>
              <span className="text-sm font-medium text-foreground">
                {data.volume.toLocaleString()} transactions
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Revenue:</span>
              <span className="text-sm font-medium text-foreground">
                {formatValue(data.revenue, 'revenue')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Success Rate:</span>
              <span className="text-sm font-medium text-success">
                {data.successRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Processing Fees:</span>
              <span className="text-sm font-medium text-foreground">
                {formatValue(data.fees, 'revenue')}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalVolume = paymentMethodData.reduce((sum, item) => sum + item.volume, 0);
  const totalRevenue = paymentMethodData.reduce((sum, item) => sum + item.revenue, 0);
  const avgSuccessRate = paymentMethodData.reduce((sum, item) => sum + item.successRate, 0) / paymentMethodData.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Payment Method Performance</h3>
          <p className="text-sm text-muted-foreground">
            Comparative analysis across payment channels
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={timeframe === tf.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf.value)}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Volume</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {totalVolume.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">transactions</div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {formatValue(totalRevenue, 'revenue')}
          </div>
          <div className="text-xs text-muted-foreground">processed</div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Avg Success Rate</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {avgSuccessRate.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">across all methods</div>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1 mb-6">
        {viewModes.map((mode) => (
          <Button
            key={mode.value}
            variant={viewMode === mode.value ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode(mode.value)}
          >
            {mode.label}
          </Button>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={paymentMethodData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="method" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => formatValue(value, viewMode)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={viewModes.find(m => m.value === viewMode)?.key}
              fill="#1E40AF"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Method Details */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
          {paymentMethodData.map((method, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-micro">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: getBarColor(method.method) }}
                />
                <Icon name={method.icon} size={16} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{method.method}</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {method.volume.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">transactions</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {formatValue(method.revenue, 'revenue')}
                  </div>
                  <div className="text-xs text-muted-foreground">revenue</div>
                </div>
                <div className={`text-right font-medium ${
                  method.successRate >= 98 ? 'text-success' : 
                  method.successRate >= 95 ? 'text-warning' : 'text-error'
                }`}>
                  {method.successRate}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodAnalytics;