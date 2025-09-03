import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CohortAnalysisWidget = () => {
  const [selectedCohort, setSelectedCohort] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('retention');

  const cohortData = {
    monthly: [
      {
        cohort: 'Jan 2024',
        size: 1250,
        month0: 100,
        month1: 78.4,
        month2: 65.2,
        month3: 58.7,
        month4: 54.1,
        month5: 51.2,
        month6: 49.8,
        revenue: [125000, 98000, 81500, 73375, 67625, 64000, 62250]
      },
      {
        cohort: 'Feb 2024',
        size: 1420,
        month0: 100,
        month1: 82.1,
        month2: 68.9,
        month3: 61.2,
        month4: 56.8,
        month5: 53.4,
        month6: null,
        revenue: [142000, 116582, 97838, 86904, 80656, 75828, null]
      },
      {
        cohort: 'Mar 2024',
        size: 1680,
        month0: 100,
        month1: 85.7,
        month2: 72.3,
        month3: 64.8,
        month4: 59.1,
        month5: null,
        month6: null,
        revenue: [168000, 143976, 121464, 108864, 99288, null, null]
      },
      {
        cohort: 'Apr 2024',
        size: 1890,
        month0: 100,
        month1: 88.2,
        month2: 75.6,
        month3: 67.9,
        month4: null,
        month5: null,
        month6: null,
        revenue: [189000, 166698, 142884, 128331, null, null, null]
      },
      {
        cohort: 'May 2024',
        size: 2100,
        month0: 100,
        month1: 91.4,
        month2: 78.8,
        month3: null,
        month4: null,
        month5: null,
        month6: null,
        revenue: [210000, 191940, 165480, null, null, null, null]
      },
      {
        cohort: 'Jun 2024',
        size: 2350,
        month0: 100,
        month1: 93.2,
        month2: null,
        month3: null,
        month4: null,
        month5: null,
        month6: null,
        revenue: [235000, 219020, null, null, null, null, null]
      },
      {
        cohort: 'Jul 2024',
        size: 2580,
        month0: 100,
        month1: null,
        month2: null,
        month3: null,
        month4: null,
        month5: null,
        month6: null,
        revenue: [258000, null, null, null, null, null, null]
      }
    ]
  };

  const cohortTypes = [
    { value: 'monthly', label: 'Monthly Cohorts' },
    { value: 'quarterly', label: 'Quarterly Cohorts' }
  ];

  const metricTypes = [
    { value: 'retention', label: 'Retention Rate' },
    { value: 'revenue', label: 'Revenue per Cohort' }
  ];

  const getRetentionColor = (value) => {
    if (value === null || value === undefined) return 'bg-gray-100';
    if (value >= 80) return 'bg-success/80';
    if (value >= 60) return 'bg-success/60';
    if (value >= 40) return 'bg-warning/60';
    if (value >= 20) return 'bg-warning/40';
    return 'bg-error/40';
  };

  const getRevenueColor = (value, maxValue) => {
    if (value === null || value === undefined) return 'bg-gray-100';
    const intensity = (value / maxValue) * 100;
    if (intensity >= 80) return 'bg-primary/80';
    if (intensity >= 60) return 'bg-primary/60';
    if (intensity >= 40) return 'bg-primary/40';
    if (intensity >= 20) return 'bg-primary/20';
    return 'bg-primary/10';
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    if (value === null || value === undefined) return '-';
    return `${value.toFixed(1)}%`;
  };

  const currentData = cohortData[selectedCohort];
  const maxRevenue = Math.max(...currentData.flatMap(cohort => 
    cohort.revenue.filter(r => r !== null)
  ));

  const averageRetention = {
    month1: currentData.filter(c => c.month1 !== null).reduce((sum, c) => sum + c.month1, 0) / currentData.filter(c => c.month1 !== null).length,
    month3: currentData.filter(c => c.month3 !== null).reduce((sum, c) => sum + c.month3, 0) / currentData.filter(c => c.month3 !== null).length,
    month6: currentData.filter(c => c.month6 !== null).reduce((sum, c) => sum + c.month6, 0) / currentData.filter(c => c.month6 !== null).length
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Customer Cohort Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Behavioral patterns and lifetime value tracking
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {cohortTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedCohort === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCohort(type.value)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Avg 1-Month Retention</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {formatPercentage(averageRetention.month1)}
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Avg 3-Month Retention</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {formatPercentage(averageRetention.month3)}
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Avg 6-Month Retention</span>
          </div>
          <div className="text-xl font-semibold text-foreground">
            {formatPercentage(averageRetention.month6)}
          </div>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1 mb-6">
        {metricTypes.map((metric) => (
          <Button
            key={metric.value}
            variant={selectedMetric === metric.value ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedMetric(metric.value)}
          >
            {metric.label}
          </Button>
        ))}
      </div>

      {/* Cohort Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                Cohort
              </th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                Size
              </th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                Month 0
              </th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                Month 1
              </th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                Month 2
              </th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                Month 3
              </th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                Month 4
              </th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                Month 5
              </th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                Month 6
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((cohort, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                <td className="p-3">
                  <div className="font-medium text-foreground">{cohort.cohort}</div>
                </td>
                <td className="p-3 text-center">
                  <div className="text-sm font-medium text-foreground">
                    {cohort.size.toLocaleString()}
                  </div>
                </td>
                
                {/* Month 0 */}
                <td className="p-3 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-8 rounded text-xs font-medium text-white ${
                    selectedMetric === 'retention' ? 'bg-primary' : 'bg-primary'
                  }`}>
                    {selectedMetric === 'retention' 
                      ? formatPercentage(cohort.month0)
                      : formatCurrency(cohort.revenue[0])
                    }
                  </div>
                </td>
                
                {/* Months 1-6 */}
                {[1, 2, 3, 4, 5, 6].map((monthIndex) => {
                  const retentionValue = cohort[`month${monthIndex}`];
                  const revenueValue = cohort.revenue[monthIndex];
                  const displayValue = selectedMetric === 'retention' ? retentionValue : revenueValue;
                  
                  return (
                    <td key={monthIndex} className="p-3 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-8 rounded text-xs font-medium ${
                        displayValue === null || displayValue === undefined
                          ? 'bg-gray-100 text-gray-400'
                          : selectedMetric === 'retention'
                            ? `${getRetentionColor(retentionValue)} text-white`
                            : `${getRevenueColor(revenueValue, maxRevenue)} text-white`
                      }`}>
                        {selectedMetric === 'retention' 
                          ? formatPercentage(retentionValue)
                          : formatCurrency(revenueValue)
                        }
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedMetric === 'retention' ? 'Retention Rate Scale' : 'Revenue Intensity Scale'}
          </div>
          <div className="flex items-center space-x-2">
            {selectedMetric === 'retention' ? (
              <>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-error/40 rounded"></div>
                  <span className="text-xs text-muted-foreground">&lt;20%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-warning/40 rounded"></div>
                  <span className="text-xs text-muted-foreground">20-40%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-warning/60 rounded"></div>
                  <span className="text-xs text-muted-foreground">40-60%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-success/60 rounded"></div>
                  <span className="text-xs text-muted-foreground">60-80%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-success/80 rounded"></div>
                  <span className="text-xs text-muted-foreground">&gt;80%</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-primary/10 rounded"></div>
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-primary/40 rounded"></div>
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-primary/80 rounded"></div>
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortAnalysisWidget;