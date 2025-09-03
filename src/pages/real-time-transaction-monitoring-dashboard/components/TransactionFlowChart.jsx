import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const TransactionFlowChart = ({ data, isRealTime = true }) => {
  const [selectedMethods, setSelectedMethods] = useState(['credit_card', 'debit_card', 'digital_wallet', 'bank_transfer']);
  const [timeRange, setTimeRange] = useState('1h');
  const [isAnimating, setIsAnimating] = useState(isRealTime);

  const paymentMethods = [
    { key: 'credit_card', label: 'Credit Card', color: '#1E40AF', icon: 'CreditCard' },
    { key: 'debit_card', label: 'Debit Card', color: '#059669', icon: 'CreditCard' },
    { key: 'digital_wallet', label: 'Digital Wallet', color: '#EA580C', icon: 'Wallet' },
    { key: 'bank_transfer', label: 'Bank Transfer', color: '#7C3AED', icon: 'Building2' }
  ];

  const timeRanges = [
    { key: '15m', label: '15 min' },
    { key: '1h', label: '1 hour' },
    { key: '6h', label: '6 hours' },
    { key: '24h', label: '24 hours' }
  ];

  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  const togglePaymentMethod = (methodKey) => {
    setSelectedMethods(prev => 
      prev.includes(methodKey) 
        ? prev.filter(key => key !== methodKey)
        : [...prev, methodKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevation p-4">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">{entry.name}:</span>
              <span className="text-sm font-medium text-foreground">{entry.value} txns</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Transaction Flow</h3>
          </div>
          {isRealTime && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-success font-medium">Live</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Range:</span>
            <div className="flex bg-muted rounded-lg p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.key}
                  onClick={() => setTimeRange(range.key)}
                  className={`px-3 py-1 text-sm font-medium rounded transition-micro ${
                    timeRange === range.key
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.key}
            onClick={() => togglePaymentMethod(method.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-micro ${
              selectedMethods.includes(method.key)
                ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            <Icon name={method.icon} size={16} />
            <span className="text-sm font-medium">{method.label}</span>
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: method.color }}
            />
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className={`h-80 transition-layout ${isAnimating ? 'opacity-90' : 'opacity-100'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            {paymentMethods.map((method) => 
              selectedMethods.includes(method.key) && (
                <Line
                  key={method.key}
                  type="monotone"
                  dataKey={method.key}
                  stroke={method.color}
                  strokeWidth={2}
                  dot={{ fill: method.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: method.color, strokeWidth: 2 }}
                  name={method.label}
                />
              )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Summary */}
      <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing transaction volume for selected payment methods over {timeRanges.find(r => r.key === timeRange)?.label}
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-muted-foreground">Peak: 2,847 txns/min</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-muted-foreground">Avg: 1,234 txns/min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFlowChart;