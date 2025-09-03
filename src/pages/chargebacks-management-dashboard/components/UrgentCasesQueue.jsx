import React from 'react';
        import { motion } from 'framer-motion';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';

        const UrgentCasesQueue = ({ onViewCase }) => {
          const urgentCases = [
            {
              id: 'CB-004',
              caseId: 'CASE-2025-004',
              merchant: 'E-commerce Plus',
              amount: 899.99,
              reasonCode: 'fraud',
              deadline: '2025-01-29T09:00:00Z',
              timeRemaining: '1h 45m',
              priority: 'high',
              status: 'new'
            },
            {
              id: 'CB-005',
              caseId: 'CASE-2025-005',
              merchant: 'Digital Store',
              amount: 299.50,
              reasonCode: 'service',
              deadline: '2025-01-29T14:30:00Z',
              timeRemaining: '7h 15m',
              priority: 'high',
              status: 'under_review'
            },
            {
              id: 'CB-006',
              caseId: 'CASE-2025-006',
              merchant: 'Tech Gadgets',
              amount: 1299.99,
              reasonCode: 'duplicate',
              deadline: '2025-01-30T10:00:00Z',
              timeRemaining: '1d 2h',
              priority: 'medium',
              status: 'new'
            },
            {
              id: 'CB-007',
              caseId: 'CASE-2025-007',
              merchant: 'Fashion Outlet',
              amount: 149.99,
              reasonCode: 'authorization',
              deadline: '2025-01-30T16:00:00Z',
              timeRemaining: '1d 8h',
              priority: 'medium',
              status: 'responded'
            }
          ];

          const getPriorityColor = (priority) => {
            switch (priority) {
              case 'high':
                return 'text-destructive bg-destructive/10 border-destructive/20';
              case 'medium':
                return 'text-warning bg-warning/10 border-warning/20';
              case 'low':
                return 'text-muted-foreground bg-muted/10 border-muted/20';
              default:
                return 'text-muted-foreground bg-muted/10 border-muted/20';
            }
          };

          const getStatusIcon = (status) => {
            switch (status) {
              case 'new':
                return 'AlertCircle';
              case 'under_review':
                return 'Eye';
              case 'responded':
                return 'MessageSquare';
              default:
                return 'Clock';
            }
          };

          const getUrgencyIcon = (timeRemaining) => {
            if (timeRemaining.includes('h') && !timeRemaining.includes('d')) {
              const hours = parseInt(timeRemaining);
              if (hours < 4) return 'AlertTriangle';
            }
            return 'Clock';
          };

          return (
            <div className="bg-card border border-border rounded-lg shadow-elevation h-fit">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">Urgent Cases</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Cases requiring immediate attention</p>
              </div>

              <div className="p-4 space-y-4">
                {urgentCases.map((case_, index) => (
                  <motion.div
                    key={case_.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${getPriorityColor(case_.priority)}`}
                    onClick={() => onViewCase?.(case_)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={getStatusIcon(case_.status)} size={16} className="text-current" />
                        <span className="text-sm font-medium text-foreground">{case_.caseId}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-current">
                        <Icon name={getUrgencyIcon(case_.timeRemaining)} size={14} />
                        <span className="text-xs font-medium">{case_.priority.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-foreground mb-1">{case_.merchant}</p>
                      <p className="text-lg font-bold text-primary">${case_.amount.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="Shield" size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground capitalize">
                          {case_.reasonCode}
                        </span>
                      </div>
                      <span className="text-xs text-current capitalize">{case_.status.replace('_', ' ')}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Timer" size={14} className="text-destructive" />
                        <span className="text-xs font-medium text-destructive">
                          {case_.timeRemaining} left
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(case_.deadline).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="flex-1 text-xs">
                        <Icon name="MessageSquare" size={12} className="mr-1" />
                        Respond
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground">
                        <Icon name="ArrowUp" size={12} />
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
                  <Icon name="Eye" size={16} className="mr-2" />
                  View All Cases ({urgentCases.length + 12})
                </Button>
              </div>
            </div>
          );
        };

        export default UrgentCasesQueue;