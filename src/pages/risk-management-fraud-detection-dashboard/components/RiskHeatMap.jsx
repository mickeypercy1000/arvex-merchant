import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RiskHeatMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewMode, setViewMode] = useState('geography'); // geography, payment_method, time

  const geographicData = [
    { region: 'North America', riskScore: 85, transactions: 12450, alerts: 23, color: 'bg-error' },
    { region: 'Europe', riskScore: 45, transactions: 8920, alerts: 8, color: 'bg-warning' },
    { region: 'Asia Pacific', riskScore: 62, transactions: 15670, alerts: 15, color: 'bg-warning' },
    { region: 'Latin America', riskScore: 78, transactions: 4320, alerts: 18, color: 'bg-error' },
    { region: 'Middle East', riskScore: 35, transactions: 2180, alerts: 4, color: 'bg-success' },
    { region: 'Africa', riskScore: 58, transactions: 1890, alerts: 7, color: 'bg-warning' }
  ];

  const paymentMethodData = [
    { method: 'Credit Cards', riskScore: 42, transactions: 18500, alerts: 12, color: 'bg-success' },
    { method: 'Digital Wallets', riskScore: 68, transactions: 14200, alerts: 19, color: 'bg-warning' },
    { method: 'Bank Transfers', riskScore: 35, transactions: 9800, alerts: 6, color: 'bg-success' },
    { method: 'Cryptocurrency', riskScore: 89, transactions: 3200, alerts: 28, color: 'bg-error' },
    { method: 'Buy Now Pay Later', riskScore: 72, transactions: 5600, alerts: 15, color: 'bg-warning' },
    { method: 'Mobile Payments', riskScore: 55, transactions: 7100, alerts: 9, color: 'bg-warning' }
  ];

  const timeBasedData = [
    { period: '00:00-04:00', riskScore: 92, transactions: 1200, alerts: 45, color: 'bg-error' },
    { period: '04:00-08:00', riskScore: 38, transactions: 2800, alerts: 8, color: 'bg-success' },
    { period: '08:00-12:00', riskScore: 45, transactions: 8900, alerts: 12, color: 'bg-success' },
    { period: '12:00-16:00', riskScore: 52, transactions: 12400, alerts: 18, color: 'bg-warning' },
    { period: '16:00-20:00', riskScore: 48, transactions: 15600, alerts: 15, color: 'bg-success' },
    { period: '20:00-24:00', riskScore: 67, transactions: 8500, alerts: 22, color: 'bg-warning' }
  ];

  const getCurrentData = () => {
    switch (viewMode) {
      case 'geography': return geographicData;
      case 'payment_method': return paymentMethodData;
      case 'time': return timeBasedData;
      default: return geographicData;
    }
  };

  const getViewModeLabel = () => {
    switch (viewMode) {
      case 'geography': return 'Geographic Distribution';
      case 'payment_method': return 'Payment Method Analysis';
      case 'time': return 'Time-based Patterns';
      default: return 'Geographic Distribution';
    }
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(selectedRegion?.region === region.region ? null : region);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Map" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Risk Heat Map</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="geography">Geography</option>
            <option value="payment_method">Payment Method</option>
            <option value="time">Time Patterns</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">{getViewModeLabel()}</h4>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span>Low Risk (0-50)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span>Medium Risk (51-70)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span>High Risk (71-100)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {getCurrentData().map((item, index) => (
          <div
            key={index}
            onClick={() => handleRegionClick(item)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-micro hover:shadow-md ${
              selectedRegion?.region === item.region || selectedRegion?.method === item.method || selectedRegion?.period === item.period
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {item.region || item.method || item.period}
              </span>
              <div className={`w-3 h-3 rounded-full ${item.color}/20 border-2 ${item.color.replace('bg-', 'border-')}`}>
                <div className={`w-full h-full rounded-full ${item.color}`}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Risk Score</span>
                <span className="font-medium text-foreground">{item.riskScore}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Transactions</span>
                <span className="font-medium text-foreground">{item.transactions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Alerts</span>
                <span className="font-medium text-error">{item.alerts}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRegion && (
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">
              {selectedRegion.region || selectedRegion.method || selectedRegion.period} - Detailed Analysis
            </h4>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-muted-foreground hover:text-foreground transition-micro"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Risk Level</span>
              <p className="font-medium text-foreground">
                {selectedRegion.riskScore > 70 ? 'High' : selectedRegion.riskScore > 50 ? 'Medium' : 'Low'}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Volume</span>
              <p className="font-medium text-foreground">${(selectedRegion.transactions * 145.67).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Alert Rate</span>
              <p className="font-medium text-foreground">
                {((selectedRegion.alerts / selectedRegion.transactions) * 100).toFixed(2)}%
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Investigation Status</span>
              <p className="font-medium text-warning">
                {Math.floor(selectedRegion.alerts * 0.6)} Pending
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskHeatMap;