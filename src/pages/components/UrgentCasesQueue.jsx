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

          const getPriorityConfig = (priority) => {
            switch (priority) {
              case 'high':
                return { color: 'text-destructive', bgColor: 'bg-destructive/10', label: 'High' };
              case 'medium':
                return { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Medium' };
              case 'low':
                return { color: 'text-muted-foreground', bgColor: 'bg-muted/10', label: 'Low' };
              default:
                return { color: 'text-muted-foreground', bgColor: 'bg-muted/10', label: 'Unknown' };
            }
          };

          const getStatusConfig = (status) => {
            switch (status) {
              case 'new':
                return { color: 'text-primary', bgColor: 'bg-primary/10', label: 'New', icon: 'AlertCircle' };
              case 'under_review':
                return { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Under Review', icon: 'Eye' };
              case 'responded':
                return { color: 'text-success', bgColor: 'bg-success/10', label: 'Responded', icon: 'MessageSquare' };
              default:
                return { color: 'text-muted-foreground', bgColor: 'bg-muted/10', label: status, icon: 'Clock' };
            }
          };

          const formatAmount = (amount) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(amount);
          };

          const formatDeadline = (deadline) => {
            return new Date(deadline).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          };

          return (
            <div className="bg-card border border-border rounded-lg shadow-elevation">
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

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Case ID</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Merchant</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Reason</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Priority</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time Left</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Deadline</th>
                      <th className="w-20 p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {urgentCases.map((case_) => {
                      const priorityConfig = getPriorityConfig(case_.priority);
                      const statusConfig = getStatusConfig(case_.status);
                      
                      return (
                        <tr
                          key={case_.id}
                          className="border-b border-border hover:bg-muted/30 transition-micro cursor-pointer"
                          onClick={() => onViewCase?.(case_)}
                        >
                          <td className="p-4">
                            <div className="font-mono text-sm text-primary font-medium">
                              {case_.caseId}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-foreground font-medium">
                              {case_.merchant}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm font-semibold text-foreground">
                              {formatAmount(case_.amount)}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Icon name="Shield" size={14} className="text-muted-foreground" />
                              <span className="text-sm text-muted-foreground capitalize">
                                {case_.reasonCode}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.color}`}>
                              {priorityConfig.label}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                              <Icon name={statusConfig.icon} size={12} />
                              <span>{statusConfig.label}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <Icon name="Timer" size={14} className="text-destructive" />
                              <span className="text-sm font-medium text-destructive">
                                {case_.timeRemaining}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-muted-foreground">
                              {formatDeadline(case_.deadline)}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Icon name="MessageSquare" size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Icon name="MoreHorizontal" size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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