import React, { useState } from 'react';
        import { motion } from 'framer-motion';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';
        import { Checkbox } from '../../../components/ui/Checkbox';

        const SettlementTable = ({ settlements, loading, onRetry, onHold, onExpedite, onBulkAction }) => {
          const [selectedSettlements, setSelectedSettlements] = useState([]);
          const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

          const handleSelectAll = (checked) => {
            if (checked) {
              setSelectedSettlements(settlements?.map(s => s.id) || []);
            } else {
              setSelectedSettlements([]);
            }
          };

          const handleSelectSettlement = (settlementId, checked) => {
            if (checked) {
              setSelectedSettlements([...selectedSettlements, settlementId]);
            } else {
              setSelectedSettlements(selectedSettlements.filter(id => id !== settlementId));
            }
          };

          const handleSort = (key) => {
            let direction = 'asc';
            if (sortConfig.key === key && sortConfig.direction === 'asc') {
              direction = 'desc';
            }
            setSortConfig({ key, direction });
          };

          const getStatusBadge = (status) => {
            const statusConfig = {
              completed: { color: 'text-success bg-success/10', label: 'Completed' },
              processing: { color: 'text-warning bg-warning/10', label: 'Processing' },
              pending: { color: 'text-muted-foreground bg-muted/10', label: 'Pending' },
              failed: { color: 'text-destructive bg-destructive/10', label: 'Failed' }
            };

            const config = statusConfig[status] || statusConfig.pending;
            return (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.label}
              </span>
            );
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
                  <span className="ml-2 text-muted-foreground">Loading settlements...</span>
                </div>
              </div>
            );
          }

          return (
            <div className="bg-card border border-border rounded-lg shadow-elevation">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Settlement Records</h3>
                    <p className="text-sm text-muted-foreground">
                      {settlements?.length || 0} settlements found
                    </p>
                  </div>
                  {selectedSettlements.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedSettlements.length} selected
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction?.('retry', selectedSettlements)}
                      >
                        <Icon name="RotateCcw" size={14} className="mr-1" />
                        Retry
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction?.('hold', selectedSettlements)}
                      >
                        <Icon name="Pause" size={14} className="mr-1" />
                        Hold
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction?.('expedite', selectedSettlements)}
                      >
                        <Icon name="Zap" size={14} className="mr-1" />
                        Expedite
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
                          checked={selectedSettlements.length === settlements?.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        <button
                          onClick={() => handleSort('batchId')}
                          className="flex items-center space-x-1 hover:text-foreground transition-colors"
                        >
                          <span>Batch ID</span>
                          <Icon name="ArrowUpDown" size={14} />
                        </button>
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Merchant Details
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        <button
                          onClick={() => handleSort('amount')}
                          className="flex items-center space-x-1 hover:text-foreground transition-colors"
                        >
                          <span>Settlement Amount</span>
                          <Icon name="ArrowUpDown" size={14} />
                        </button>
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Processing Time
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {settlements?.map((settlement, index) => (
                      <motion.tr
                        key={settlement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <Checkbox
                            checked={selectedSettlements.includes(settlement.id)}
                            onCheckedChange={(checked) => handleSelectSettlement(settlement.id, checked)}
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{settlement.batchId}</p>
                            <p className="text-sm text-muted-foreground">{settlement.id}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{settlement.merchant}</p>
                            <p className="text-sm text-muted-foreground">
                              {settlement.method} • {settlement.bank}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-primary text-lg">
                            ${settlement.amount?.toLocaleString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Icon name="Clock" size={14} />
                            <span className="text-sm">{settlement.processingTime}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(settlement.status)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRetry?.(settlement.id)}
                              className="p-2"
                            >
                              <Icon name="RotateCcw" size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onHold?.(settlement.id)}
                              className="p-2"
                            >
                              <Icon name="Pause" size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onExpedite?.(settlement.id)}
                              className="p-2"
                            >
                              <Icon name="Zap" size={14} />
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

              {(!settlements || settlements.length === 0) && !loading && (
                <div className="p-8 text-center">
                  <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No settlements found</p>
                </div>
              )}
            </div>
          );
        };

        export default SettlementTable;