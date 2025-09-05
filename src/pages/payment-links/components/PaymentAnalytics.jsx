import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentAnalytics = ({ dateRange }) => {
  const [activeChart, setActiveChart] = useState('revenue');

  const revenueData = [
    { date: '2025-07-14', revenue: 1200, clicks: 45, conversions: 8 },
    { date: '2025-07-15', revenue: 2100, clicks: 67, conversions: 12 },
    { date: '2025-07-16', revenue: 1800, clicks: 52, conversions: 9 },
    { date: '2025-07-17', revenue: 3200, clicks: 89, conversions: 18 },
    { date: '2025-07-18', revenue: 2800, clicks: 74, conversions: 15 },
    { date: '2025-07-19', revenue: 4100, clicks: 95, conversions: 22 },
    { date: '2025-07-20', revenue: 3600, clicks: 83, conversions: 19 }
  ];

  const conversionData = [
    { device: 'Desktop', conversions: 145, percentage: 45.2 },
    { device: 'Mobile', conversions: 112, percentage: 35.0 },
    { device: 'Tablet', conversions: 63, percentage: 19.8 }
  ];

  const geographicData = [
    { country: 'United States', revenue: 24500, color: '#3B82F6' },
    { country: 'Canada', revenue: 8200, color: '#10B981' },
    { country: 'United Kingdom', revenue: 6700, color: '#F59E0B' },
    { country: 'Germany', revenue: 4900, color: '#EF4444' },
    { country: 'France', revenue: 3600, color: '#8B5CF6' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const chartOptions = [
    { id: 'revenue', label: 'Revenue Trends', icon: 'TrendingUp' },
    { id: 'conversion', label: 'Conversion Analytics', icon: 'Target' },
    { id: 'geographic', label: 'Geographic Distribution', icon: 'Map' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Payment Analytics</h2>
          </div>
          <div className="flex items-center space-x-2">
            {chartOptions.map((option) => (
              <Button
                key={option.id}
                variant={activeChart === option.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveChart(option.id)}
                iconName={option.icon}
                iconPosition="left"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground mt-2">
          Comprehensive analytics and performance insights for your payment links
        </p>
      </div>

      <div className="p-6">
        {/* Revenue Trends Chart */}
        {activeChart === 'revenue' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary/10 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="DollarSign" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Total Revenue</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-foreground">$19,800</div>
                  <div className="text-sm text-success">+12.5% from last week</div>
                </div>
              </div>
              
              <div className="bg-success/10 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="MousePointer" size={20} className="text-success" />
                  <span className="text-sm font-medium text-success">Total Clicks</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-foreground">505</div>
                  <div className="text-sm text-success">+8.2% from last week</div>
                </div>
              </div>
              
              <div className="bg-warning/10 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={20} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Conversion Rate</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-foreground">20.4%</div>
                  <div className="text-sm text-success">+2.1% from last week</div>
                </div>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    className="text-muted-foreground"
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value) : value,
                      name === 'revenue' ? 'Revenue' : name === 'clicks' ? 'Clicks' : 'Conversions'
                    ]}
                    labelFormatter={(label) => formatDate(label)}
                    className="bg-card border border-border shadow-lg rounded-lg"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Conversion Analytics */}
        {activeChart === 'conversion' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Conversion by Device</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="device" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip className="bg-card border border-border shadow-lg rounded-lg" />
                    <Bar dataKey="conversions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Conversion Funnel</h3>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">Link Views</span>
                    <span className="text-foreground font-bold">2,847</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">100% of total traffic</div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">Link Clicks</span>
                    <span className="text-foreground font-bold">505</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '17.7%' }}></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">17.7% click-through rate</div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">Completed Payments</span>
                    <span className="text-foreground font-bold">103</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '20.4%' }}></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">20.4% conversion rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Geographic Distribution */}
        {activeChart === 'geographic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Revenue by Country</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={geographicData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Top Performing Countries</h3>
              <div className="space-y-4">
                {geographicData.map((country, index) => (
                  <div key={country.country} className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{country.country}</span>
                        <span className="font-bold text-foreground">{formatCurrency(country.revenue)}</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${(country.revenue / geographicData[0].revenue) * 100}%`,
                            backgroundColor: country.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentAnalytics;