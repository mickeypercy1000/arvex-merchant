import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeographicRevenueMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewMode, setViewMode] = useState('revenue');

  const regionData = [
    {
      region: 'North America',
      country: 'United States',
      revenue: 4850000,
      transactions: 28400,
      customers: 12500,
      growth: 15.2,
      marketShare: 42.3,
      avgTransaction: 170.77,
      coordinates: { lat: 39.8283, lng: -98.5795 }
    },
    {
      region: 'Europe',
      country: 'United Kingdom',
      revenue: 2340000,
      transactions: 15600,
      customers: 8900,
      growth: 23.8,
      marketShare: 20.4,
      avgTransaction: 150.00,
      coordinates: { lat: 55.3781, lng: -3.4360 }
    },
    {
      region: 'Asia Pacific',
      country: 'Singapore',
      revenue: 1890000,
      transactions: 21200,
      customers: 9800,
      growth: 31.5,
      marketShare: 16.5,
      avgTransaction: 89.15,
      coordinates: { lat: 1.3521, lng: 103.8198 }
    },
    {
      region: 'Europe',
      country: 'Germany',
      revenue: 1560000,
      transactions: 12800,
      customers: 7200,
      growth: 18.7,
      marketShare: 13.6,
      avgTransaction: 121.88,
      coordinates: { lat: 51.1657, lng: 10.4515 }
    },
    {
      region: 'North America',
      country: 'Canada',
      revenue: 890000,
      transactions: 6400,
      customers: 3800,
      growth: 12.4,
      marketShare: 7.8,
      avgTransaction: 139.06,
      coordinates: { lat: 56.1304, lng: -106.3468 }
    }
  ];

  const topCities = [
    { city: 'New York', revenue: 1240000, growth: 18.5 },
    { city: 'London', revenue: 980000, growth: 22.1 },
    { city: 'Singapore', revenue: 890000, growth: 28.9 },
    { city: 'San Francisco', revenue: 760000, growth: 15.8 },
    { city: 'Toronto', revenue: 520000, growth: 14.2 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getRegionColor = (revenue) => {
    if (revenue >= 4000000) return '#059669';
    if (revenue >= 2000000) return '#1E40AF';
    if (revenue >= 1000000) return '#EA580C';
    return '#64748B';
  };

  const getGrowthColor = (growth) => {
    if (growth >= 25) return 'text-success';
    if (growth >= 15) return 'text-primary';
    if (growth >= 10) return 'text-warning';
    return 'text-error';
  };

  const totalRevenue = regionData.reduce((sum, region) => sum + region.revenue, 0);
  const totalTransactions = regionData.reduce((sum, region) => sum + region.transactions, 0);
  const totalCustomers = regionData.reduce((sum, region) => sum + region.customers, 0);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Geographic Revenue Distribution</h3>
          <p className="text-sm text-muted-foreground">
            Regional performance and market insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'revenue' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('revenue')}
          >
            Revenue
          </Button>
          <Button
            variant={viewMode === 'transactions' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('transactions')}
          >
            Volume
          </Button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Globe" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Global Revenue</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {formatCurrency(totalRevenue)}
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Total Transactions</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {totalTransactions.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Active Customers</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {totalCustomers.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <div className="relative bg-muted/20 rounded-lg p-6 mb-6 h-64 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Global Revenue Distribution"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=2&output=embed"
            className="rounded-lg"
          />
        </div>
        
        {/* Map Overlay with Region Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {regionData.map((region, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index % 2 * 20)}%`
              }}
            >
              <button
                onClick={() => setSelectedRegion(selectedRegion === index ? null : index)}
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all hover:scale-125"
                style={{ backgroundColor: getRegionColor(region.revenue) }}
                title={`${region.country}: ${formatCurrency(region.revenue)}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Regional Performance Table */}
      <div className="space-y-3">
        <h4 className="text-md font-semibold text-foreground">Regional Performance</h4>
        {regionData.map((region, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              selectedRegion === index 
                ? 'border-primary bg-primary/5' :'border-border bg-muted/20 hover:bg-muted/30'
            }`}
            onClick={() => setSelectedRegion(selectedRegion === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: getRegionColor(region.revenue) }}
                />
                <div>
                  <div className="font-medium text-foreground">{region.country}</div>
                  <div className="text-sm text-muted-foreground">{region.region}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {formatCurrency(region.revenue)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {region.marketShare}% share
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {region.transactions.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">transactions</div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {region.customers.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">customers</div>
                </div>
                
                <div className={`flex items-center space-x-1 ${getGrowthColor(region.growth)}`}>
                  <Icon 
                    name={region.growth >= 0 ? "TrendingUp" : "TrendingDown"} 
                    size={14} 
                  />
                  <span className="font-medium">{region.growth}%</span>
                </div>
              </div>
            </div>
            
            {selectedRegion === index && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Avg Transaction:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {formatCurrency(region.avgTransaction)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Revenue per Customer:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {formatCurrency(region.revenue / region.customers)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Top Cities */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-md font-semibold text-foreground mb-4">Top Performing Cities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
          {topCities.map((city, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full text-xs font-medium text-primary">
                  {index + 1}
                </div>
                <span className="font-medium text-foreground">{city.city}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-foreground">
                  {formatCurrency(city.revenue)}
                </span>
                <div className={`flex items-center space-x-1 ${getGrowthColor(city.growth)}`}>
                  <Icon name="TrendingUp" size={12} />
                  <span className="text-sm font-medium">{city.growth}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographicRevenueMap;