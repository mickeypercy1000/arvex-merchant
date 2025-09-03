import React, { useState } from 'react';
        import { motion } from 'framer-motion';
        import Icon from '../../../components/AppIcon';

        const SettlementTimeline = () => {
          const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

          const timelineData = [
            { date: '2025-01-22', amount: 145750, status: 'completed', count: 23 },
            { date: '2025-01-23', amount: 189650, status: 'completed', count: 31 },
            { date: '2025-01-24', amount: 156780, status: 'completed', count: 28 },
            { date: '2025-01-25', amount: 198450, status: 'completed', count: 35 },
            { date: '2025-01-26', amount: 167890, status: 'completed', count: 29 },
            { date: '2025-01-27', amount: 178920, status: 'processing', count: 32 },
            { date: '2025-01-28', amount: 145600, status: 'pending', count: 25 }
          ];

          const maxAmount = Math.max(...timelineData.map(d => d.amount));

          const getStatusColor = (status) => {
            switch (status) {
              case 'completed':
                return 'bg-success';
              case 'processing':
                return 'bg-warning';
              case 'pending':
                return 'bg-muted';
              default:
                return 'bg-muted';
            }
          };

          return (
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Settlement Timeline</h3>
                  <p className="text-sm text-muted-foreground">Daily settlement volumes and status</p>
                </div>
                <div className="flex items-center space-x-2">
                  {['7d', '30d', '90d'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedTimeframe(period)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        selectedTimeframe === period
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
                {timelineData.map((item, index) => (
                  <motion.div
                    key={item.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">{item.count} batches</span>
                          <span className="text-sm font-medium text-foreground">
                            ${item.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatusColor(item.status)}`}
                          style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-muted-foreground">Completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      <span className="text-muted-foreground">Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-muted" />
                      <span className="text-muted-foreground">Pending</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors">
                    <span>View Details</span>
                    <Icon name="ExternalLink" size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        };

        export default SettlementTimeline;