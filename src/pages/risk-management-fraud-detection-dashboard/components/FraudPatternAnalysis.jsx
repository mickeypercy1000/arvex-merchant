import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const FraudPatternAnalysis = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [analysisType, setAnalysisType] = useState('velocity');

  const velocityData = [
    { time: '00:00', transactions: 45, velocity: 12, anomalies: 8, confidence: 92 },
    { time: '02:00', transactions: 23, velocity: 8, anomalies: 15, confidence: 89 },
    { time: '04:00', transactions: 12, velocity: 4, anomalies: 3, confidence: 76 },
    { time: '06:00', transactions: 67, velocity: 18, anomalies: 5, confidence: 82 },
    { time: '08:00', transactions: 156, velocity: 42, anomalies: 12, confidence: 85 },
    { time: '10:00', transactions: 234, velocity: 65, anomalies: 18, confidence: 88 },
    { time: '12:00', transactions: 298, velocity: 82, anomalies: 22, confidence: 91 },
    { time: '14:00', transactions: 312, velocity: 89, anomalies: 25, confidence: 93 },
    { time: '16:00', transactions: 287, velocity: 78, anomalies: 19, confidence: 87 },
    { time: '18:00', transactions: 245, velocity: 67, anomalies: 16, confidence: 84 },
    { time: '20:00', transactions: 198, velocity: 54, anomalies: 13, confidence: 86 },
    { time: '22:00', transactions: 123, velocity: 34, anomalies: 9, confidence: 83 }
  ];

  const amountData = [
    { range: '$0-100', transactions: 1250, fraudulent: 12, rate: 0.96 },
    { range: '$100-500', transactions: 890, fraudulent: 18, rate: 2.02 },
    { range: '$500-1K', transactions: 456, fraudulent: 25, rate: 5.48 },
    { range: '$1K-5K', transactions: 234, fraudulent: 32, rate: 13.68 },
    { range: '$5K-10K', transactions: 89, fraudulent: 28, rate: 31.46 },
    { range: '$10K+', transactions: 45, fraudulent: 22, rate: 48.89 }
  ];

  const behavioralData = [
    { pattern: 'Normal Hours', score: 25, incidents: 45, confidence: 78 },
    { pattern: 'Off Hours', score: 85, incidents: 123, confidence: 92 },
    { pattern: 'Weekend', score: 72, incidents: 89, confidence: 87 },
    { pattern: 'Holiday', score: 91, incidents: 156, confidence: 95 },
    { pattern: 'Multiple Locations', score: 88, incidents: 67, confidence: 89 },
    { pattern: 'New Device', score: 76, incidents: 234, confidence: 84 },
    { pattern: 'High Velocity', score: 94, incidents: 178, confidence: 96 },
    { pattern: 'Amount Spike', score: 82, incidents: 145, confidence: 91 }
  ];

  const getCurrentData = () => {
    switch (analysisType) {
      case 'velocity': return velocityData;
      case 'amount': return amountData;
      case 'behavioral': return behavioralData;
      default: return velocityData;
    }
  };

  const getChartComponent = () => {
    if (analysisType === 'velocity') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={velocityData}>
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
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-foreground)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="transactions" 
              fill="var(--color-primary)" 
              name="Transactions"
              opacity={0.7}
            />
            <Line 
              type="monotone" 
              dataKey="anomalies" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              name="Anomalies"
            />
            <Line 
              type="monotone" 
              dataKey="confidence" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              name="ML Confidence"
            />
          </ComposedChart>
        </ResponsiveContainer>
      );
    }

    if (analysisType === 'amount') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={amountData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="range" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-foreground)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="transactions" 
              fill="var(--color-accent)" 
              name="Total Transactions"
              opacity={0.7}
            />
            <Bar 
              dataKey="fraudulent" 
              fill="var(--color-error)" 
              name="Fraudulent"
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              name="Fraud Rate %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4 h-72 overflow-y-auto">
        {behavioralData.map((item, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">{item.pattern}</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.score > 80 ? 'bg-error/10 text-error' :
                item.score > 60 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
              }`}>
                {item.score}
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Incidents:</span>
                <span className="font-medium text-foreground">{item.incidents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="font-medium text-foreground">{item.confidence}%</span>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    item.score > 80 ? 'bg-error' :
                    item.score > 60 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Fraud Pattern Analysis</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="velocity">Transaction Velocity</option>
            <option value="amount">Amount Distribution</option>
            <option value="behavioral">Behavioral Patterns</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">
              {analysisType === 'velocity' ? 'Transactions' : 
               analysisType === 'amount' ? 'Total Volume' : 'Pattern Score'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span className="text-muted-foreground">
              {analysisType === 'velocity' ? 'Anomalies' : 
               analysisType === 'amount' ? 'Fraudulent' : 'High Risk'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-muted-foreground">
              {analysisType === 'velocity' ? 'ML Confidence' : 
               analysisType === 'amount' ? 'Fraud Rate' : 'Detection Rate'}
            </span>
          </div>
        </div>
      </div>

      {getChartComponent()}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {analysisType === 'velocity' ? '2,341' : 
             analysisType === 'amount' ? '$2.4M' : '89%'}
          </p>
          <p className="text-muted-foreground">
            {analysisType === 'velocity' ? 'Total Transactions' : 
             analysisType === 'amount' ? 'Total Volume' : 'Detection Rate'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-error">
            {analysisType === 'velocity' ? '187' : 
             analysisType === 'amount' ? '137' : '24'}
          </p>
          <p className="text-muted-foreground">
            {analysisType === 'velocity' ? 'Anomalies' : 
             analysisType === 'amount' ? 'Fraudulent' : 'False Positives'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-warning">
            {analysisType === 'velocity' ? '7.99%' : 
             analysisType === 'amount' ? '5.85%' : '12.3%'}
          </p>
          <p className="text-muted-foreground">
            {analysisType === 'velocity' ? 'Anomaly Rate' : 
             analysisType === 'amount' ? 'Fraud Rate' : 'Alert Rate'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            {analysisType === 'velocity' ? '87%' : 
             analysisType === 'amount' ? '94%' : '91%'}
          </p>
          <p className="text-muted-foreground">
            {analysisType === 'velocity' ? 'Confidence' : 
             analysisType === 'amount' ? 'Accuracy' : 'Precision'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FraudPatternAnalysis;