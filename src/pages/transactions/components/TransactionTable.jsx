import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionTable = ({ transactions, onTransactionClick, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const itemsPerPage = 10;

  const statusOptions = [
    { key: 'all', label: 'All Status', count: transactions.length },
    { key: 'completed', label: 'Completed', count: transactions.filter(t => t.status === 'completed').length },
    { key: 'pending', label: 'Pending', count: transactions.filter(t => t.status === 'pending').length },
    { key: 'failed', label: 'Failed', count: transactions.filter(t => t.status === 'failed').length }
  ];

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [transactions, searchTerm, statusFilter, sortConfig]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTransactions, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleSelectTransaction = (transactionId) => {
    setSelectedTransactions(prev =>
      prev.includes(transactionId)
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === paginatedTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(paginatedTransactions.map(t => t.id));
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'text-success', bgColor: 'bg-success/10', label: 'Completed', icon: 'CheckCircle' };
      case 'pending':
        return { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Pending', icon: 'Clock' };
      case 'failed':
        return { color: 'text-error', bgColor: 'bg-error/10', label: 'Failed', icon: 'XCircle' };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted', label: status, icon: 'Circle' };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
          <div className="div flex gap-2 mb-3 justify-end">
            <Button onClick={() => setShowFilterModal(true)} iconName="Funnel" iconPosition="left">
              Filter
            </Button>
            <Button className="bg-white text-primary border border-primary" onClick={() => setShowExportModal(true)} iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="List" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Transactions</h3>
            <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
              {filteredAndSortedTransactions.length} total
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="search"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 rounded-xl"
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>

            {/* Status Filter */}
            <div className="flex bg-muted rounded-lg p-1">
              {statusOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setStatusFilter(option.key)}
                  className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded transition-micro ${
                    statusFilter === option.key
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{option.label}</span>
                  {option.count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      statusFilter === option.key
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-foreground/10 text-foreground'
                    }`}>
                      {option.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTransactions.length > 0 && (
          <div className="flex items-center justify-between mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <span className="text-sm text-primary font-medium">
              {selectedTransactions.length} transaction{selectedTransactions.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction?.(selectedTransactions, 'export')}
              >
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction?.(selectedTransactions, 'flag')}
              >
                Flag for Review
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTransactions([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedTransactions.length === paginatedTransactions.length && paginatedTransactions.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'id', label: 'Transaction ID' },
                { key: 'timestamp', label: 'Time' },
                { key: 'customer', label: 'Customer' },
                { key: 'merchant', label: 'Merchant' },
                { key: 'amount', label: 'Amount' },
                { key: 'paymentMethod', label: 'Method' },
                { key: 'status', label: 'Status' }
              ].map((column) => (
                <th
                  key={column.key}
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-micro"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    <Icon
                      name={
                        sortConfig.key === column.key
                          ? sortConfig.direction === 'asc' ?'ChevronUp' :'ChevronDown' :'ChevronsUpDown'
                      }
                      size={14}
                      className="text-muted-foreground"
                    />
                  </div>
                </th>
              ))}
              <th className="w-20 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => {
              const statusConfig = getStatusConfig(transaction.status);
              const isSelected = selectedTransactions.includes(transaction.id);
              
              return (
                <tr
                  key={transaction.id}
                  className={`border-b border-border hover:bg-muted/30 transition-micro ${
                    isSelected ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectTransaction(transaction.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-mono text-sm text-primary">
                      {transaction.id}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {formatTime(transaction.timestamp)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {transaction.customer}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {transaction.merchant}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-foreground">
                      {formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {transaction.paymentMethod}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                      <Icon name={statusConfig.icon} size={12} />
                      <span>{statusConfig.label}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onTransactionClick?.(transaction)}
                      className="h-8 w-8"
                    >
                      <Icon name="ExternalLink" size={14} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedTransactions.length)} of {filteredAndSortedTransactions.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-sm font-medium rounded transition-micro ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowFilterModal(false)}
        >
          <div 
            className="bg-card rounded-lg border border-border p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Filter Transactions</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilterModal(false)}
                className="h-8 w-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <form className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                  <option value="">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
                <Input
                  type="date"
                  className="w-full cursor-pointer"
                  style={{ colorScheme: 'light' }}
                />
              </div>
              
              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
                <Input
                  type="date"
                  className="w-full cursor-pointer"
                  style={{ colorScheme: 'light' }}
                />
              </div>
              
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transaction Type</label>
                <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                  <option value="">All Types</option>
                  <option value="collections">Collections</option>
                  <option value="payout">Payout</option>
                </select>
              </div>
              
              {/* Transaction Channel */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transaction Channel</label>
                <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                  <option value="">All Channels</option>
                  <option value="card">Card</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilterModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Apply filter logic here
                    console.log('Filter applied');
                    setShowFilterModal(false);
                  }}
                >
                  Apply Filter
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowExportModal(false)}
        >
          <div 
            className="bg-card rounded-lg border border-border p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Export Transactions</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowExportModal(false)}
                className="h-8 w-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <form className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                  <option value="">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
                <Input
                  type="date"
                  className="w-full cursor-pointer"
                  style={{ colorScheme: 'light' }}
                />
              </div>
              
              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
                <Input
                  type="date"
                  className="w-full cursor-pointer"
                  style={{ colorScheme: 'light' }}
                />
              </div>
              
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transaction Type</label>
                <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                  <option value="">All Types</option>
                  <option value="collections">Collections</option>
                  <option value="payout">Payout</option>
                </select>
              </div>
              
              {/* Transaction Channel */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transaction Channel</label>
                <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                  <option value="">All Channels</option>
                  <option value="card">Card</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowExportModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Export logic here
                    console.log('Export started');
                    setShowExportModal(false);
                  }}
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;