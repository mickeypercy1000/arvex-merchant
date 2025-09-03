import React from 'react';
        import { motion } from 'framer-motion';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';

        const SettlementQueue = () => {
          const queueItems = [
            {
              id: 'STL-004',
              merchant: 'Tech Solutions Ltd.',
              amount: 34750.50,
              priority: 'high',
              timeRemaining: '2h 15m',
              status: 'pending'
            },
            {
              id: 'STL-005',
              merchant: 'Retail Express',
              amount: 18920.75,
              priority: 'medium',
              timeRemaining: '4h 30m',
              status: 'processing'
            },
            {
              id: 'STL-006',
              merchant: 'Global Commerce',
              amount: 67450.25,
              priority: 'high',
              timeRemaining: '1h 45m',
              status: 'pending'
            },
            {
              id: 'STL-007',
              merchant: 'Digital Marketplace',
              amount: 23680.00,
              priority: 'low',
              timeRemaining: '6h 20m',
              status: 'scheduled'
            }
          ];

          const getPriorityColor = (priority) => {
            switch (priority) {
              case 'high':
                return 'text-destructive bg-destructive/10';
              case 'medium':
                return 'text-warning bg-warning/10';
              case 'low':
                return 'text-muted-foreground bg-muted/10';
              default:
                return 'text-muted-foreground bg-muted/10';
            }
          };

          const getStatusIcon = (status) => {
            switch (status) {
              case 'pending':
                return 'Clock';
              case 'processing':
                return 'Loader';
              case 'scheduled':
                return 'Calendar';
              default:
                return 'Clock';
            }
          };

          return (
            <div className="bg-card border border-border rounded-lg shadow-elevation h-fit">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">Settlement Queue</h3>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Priority settlements awaiting processing</p>
              </div>

              <div className="p-4 space-y-4">
                {queueItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-border rounded-lg hover:border-primary/20 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={getStatusIcon(item.status)} size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{item.id}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-foreground mb-1">{item.merchant}</p>
                      <p className="text-lg font-bold text-primary">${item.amount.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Icon name="Timer" size={14} />
                        <span className="text-xs">{item.timeRemaining}</span>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">{item.status}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="flex-1 text-xs">
                        <Icon name="Play" size={12} className="mr-1" />
                        Process
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground">
                        <Icon name="Pause" size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground">
                        <Icon name="MoreHorizontal" size={12} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full text-sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Process All Pending
                </Button>
              </div>
            </div>
          );
        };

        export default SettlementQueue;