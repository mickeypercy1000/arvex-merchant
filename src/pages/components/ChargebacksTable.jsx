import React, { useState } from 'react';
        import { motion } from 'framer-motion';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';
        import { Checkbox } from '../../../components/ui/Checkbox';

        const ChargebacksTable = ({ chargebacks, loading, onCaseAction, onViewCase, onBulkAction }) => {
          const [selectedCases, setSelectedCases] = useState([]);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

          const handleSelectAll = (checked) => {
            if (checked) {
              setSelectedCases(chargebacks?.map(c => c.id) || []);
            } else {
              setSelectedCases([]);
            }
          };

          const handleSelectCase = (caseId, checked) => {
            if (checked) {
              setSelectedCases([...selectedCases, caseId]);
            } else {
              setSelectedCases(selectedCases.filter(id => id !== caseId));
            }
          };

          const getStatusBadge = (status) => {
            const statusConfig = {
              new: { color: 'text-warning bg-warning/10', label: 'New' },
              under_review: { color: 'text-primary bg-primary/10', label: 'Under Review' },
              responded: { color: 'text-success bg-success/10', label: 'Responded' },
              won: { color: 'text-success bg-success/10', label: 'Won' },
              lost: { color: 'text-destructive bg-destructive/10', label: 'Lost' }
            };

            const config = statusConfig[status] || statusConfig.new;
            return (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.label}
              </span>
            );
          };

          const getPriorityBadge = (priority) => {
            const priorityConfig = {
              high: { color: 'text-destructive bg-destructive/10', label: 'High' },
              medium: { color: 'text-warning bg-warning/10', label: 'Medium' },
              low: { color: 'text-muted-foreground bg-muted/10', label: 'Low' }
            };

            const config = priorityConfig[priority] || priorityConfig.medium;
            return (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.label}
              </span>
            );
          };

          const getTimeRemaining = (deadline) => {
            const now = new Date();
            const deadlineDate = new Date(deadline);
            const diff = deadlineDate - now;
            
            if (diff < 0) return 'Overdue';
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(hours / 24);
            
            if (days > 0) return `${days}d ${hours % 24}h`;
            return `${hours}h`;
          };

          const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          };

          if (loading) {
            return (
              <div className="bg-card border border-border rounded-lg p-8 shadow-elevation">
                <div className="flex items-center justify-center">
                  <Icon name="Loader" size={24} className="animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading chargeback cases...</span>
                </div>
              </div>
            );
          }

          return (
            <div className="bg-card border border-border rounded-lg shadow-elevation">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Chargeback Cases</h3>
                    <p className="text-sm text-muted-foreground">
                      {chargebacks?.length || 0} active cases
                    </p>
                  </div>
                  {selectedCases.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedCases.length} selected
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction?.('respond', selectedCases)}
                      >
                        <Icon name="MessageSquare" size={14} className="mr-1" />
                        Respond
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction?.('escalate', selectedCases)}
                      >
                        <Icon name="ArrowUp" size={14} className="mr-1" />
                        Escalate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction?.('accept', selectedCases)}
                      >
                        <Icon name="Check" size={14} className="mr-1" />
                        Accept
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4">
                        <Checkbox
                          checked={selectedCases.length === chargebacks?.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Case ID
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Transaction Details
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Reason
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Deadline
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Priority
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chargebacks?.map((chargeback, index) => (
                      <motion.tr
                        key={chargeback.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <Checkbox
                            checked={selectedCases.includes(chargeback.id)}
                            onCheckedChange={(checked) => handleSelectCase(chargeback.id, checked)}
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{chargeback.caseId}</p>
                            <p className="text-sm text-muted-foreground">{chargeback.id}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{chargeback.merchantName}</p>
                            <p className="text-sm text-muted-foreground">
                              {chargeback.transactionId} • {chargeback.cardBrand} ****{chargeback.cardLast4}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-primary text-lg">
                            ${chargeback.amount?.toLocaleString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-foreground capitalize">
                              {chargeback.reasonCode}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {chargeback.reasonDescription}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {formatDate(chargeback.deadline)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {getTimeRemaining(chargeback.deadline)} left
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(chargeback.status)}
                        </td>
                        <td className="p-4">
                          {getPriorityBadge(chargeback.priority)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onViewCase?.(chargeback)}
                              className="p-2"
                            >
                              <Icon name="Eye" size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onCaseAction?.('respond', chargeback.id)}
                              className="p-2"
                            >
                              <Icon name="MessageSquare" size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onCaseAction?.('escalate', chargeback.id)}
                              className="p-2"
                            >
                              <Icon name="ArrowUp" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2">
                              <Icon name="MoreHorizontal" size={14} />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(!chargebacks || chargebacks.length === 0) && !loading && (
                <div className="p-8 text-center">
                  <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No chargeback cases found</p>
                </div>
              )}
            </div>
          );
        };

        export default ChargebacksTable;