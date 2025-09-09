import React, { useState } from 'react';
        import { motion } from 'framer-motion';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';

        const ChargebackAnalytics = () => {
          const [selectedPeriod, setSelectedPeriod] = useState('30d');

          const reasonCodeData = [
            { code: 'fraud', label: 'Fraudulent Transaction', count: 28, percentage: 35.4, trend: 'up' },
            { code: 'service', label: 'Service Not Rendered', count: 19, percentage: 24.1, trend: 'down' },
            { code: 'duplicate', label: 'Duplicate Processing', count: 14, percentage: 17.7, trend: 'up' },
            { code: 'authorization', label: 'Authorization Issue', count: 11, percentage: 13.9, trend: 'stable' },
            { code: 'product', label: 'Product Not Received', count: 7, percentage: 8.9, trend: 'down' }
          ];

          const preventionMetrics = [
            { label: 'Velocity Checks', effectiveness: 87, blocked: 156, color: 'success' },
            { label: 'Risk Scoring', effectiveness: 74, blocked: 89, color: 'primary' },
            { label: 'Device Fingerprinting', effectiveness: 68, blocked: 67, color: 'warning' },
            { label: '3D Secure', effectiveness: 92, blocked: 201, color: 'success' }
          ];

          const getTrendIcon = (trend) => {
            switch (trend) {
              case 'up':
                return { icon: 'TrendingUp', color: 'text-destructive' };
              case 'down':
                return { icon: 'TrendingDown', color: 'text-success' };
              default:
                return { icon: 'Minus', color: 'text-muted-foreground' };
            }
          };

          const getEffectivenessColor = (effectiveness) => {
            if (effectiveness >= 80) return 'text-success bg-success';
            if (effectiveness >= 60) return 'text-warning bg-warning';
            return 'text-destructive bg-destructive';
          };

          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chargeback Trends by Reason Code */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Chargeback by Reason Code</h3>
                    <p className="text-sm text-muted-foreground">Distribution and trends analysis</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {['7d', '30d', '90d'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          selectedPeriod === period
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {reasonCodeData.map((item, index) => {
                    const trendInfo = getTrendIcon(item.trend);
                    return (
                      <motion.div
                        key={item.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-primary opacity-80" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground capitalize">{item.code}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{item.count} cases</p>
                            <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                          </div>
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <div className={`flex items-center space-x-1 ${trendInfo.color}`}>
                            <Icon name={trendInfo.icon} size={14} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full text-sm">
                    <Icon name="BarChart3" size={16} className="mr-2" />
                    View Detailed Analytics
                  </Button>
                </div>
              </div>

              {/* Prevention Effectiveness */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Prevention Effectiveness</h3>
                    <p className="text-sm text-muted-foreground">Fraud prevention tool performance</p>
                  </div>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Icon name="Settings" size={16} />
                  </Button>
                </div>

                <div className="space-y-6">
                  {preventionMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{metric.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {metric.blocked} transactions blocked
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${getEffectivenessColor(metric.effectiveness).split(' ')[0]}`}>
                            {metric.effectiveness}%
                          </p>
                          <p className="text-xs text-muted-foreground">Effectiveness</p>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getEffectivenessColor(metric.effectiveness).split(' ')[1]}/20`}
                          style={{ width: `${metric.effectiveness}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <p className="text-2xl font-bold text-success">513</p>
                      <p className="text-xs text-muted-foreground">Total Prevented</p>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-primary">$2.1M</p>
                      <p className="text-xs text-muted-foreground">Amount Saved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default ChargebackAnalytics;