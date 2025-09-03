import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskAssessmentTable = () => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const transactions = [
    {
      id: 'TXN-789456123',
      userId: 'USR-45621',
      amount: '$15,420.00',
      riskScore: 95,
      status: 'flagged',
      paymentMethod: 'Credit Card',
      location: 'New York, US',
      timestamp: new Date(Date.now() - 300000),
      investigationStatus: 'pending',
      mlConfidence: 92,
      deviceFingerprint: 'DEV-ABC123',
      ipAddress: '192.168.1.100',
      merchantCategory: 'Electronics'
    },
    {
      id: 'TXN-456789012',
      userId: 'USR-78945',
      amount: '$8,750.00',
      riskScore: 87,
      status: 'reviewing',
      paymentMethod: 'Digital Wallet',
      location: 'London, UK',
      timestamp: new Date(Date.now() - 600000),
      investigationStatus: 'investigating',
      mlConfidence: 89,
      deviceFingerprint: 'DEV-XYZ789',
      ipAddress: '10.0.0.45',
      merchantCategory: 'Travel'
    },
    {
      id: 'TXN-123456789',
      userId: 'USR-12389',
      amount: '$3,200.00',
      riskScore: 92,
      status: 'flagged',
      paymentMethod: 'Bank Transfer',
      location: 'Lagos, Nigeria',
      timestamp: new Date(Date.now() - 900000),
      investigationStatus: 'escalated',
      mlConfidence: 94,
      deviceFingerprint: 'DEV-PQR456',
      ipAddress: '172.16.0.23',
      merchantCategory: 'Financial Services'
    },
    {
      id: 'TXN-987654321',
      userId: 'USR-98765',
      amount: '$2,100.00',
      riskScore: 73,
      status: 'monitoring',
      paymentMethod: 'Credit Card',
      location: 'Toronto, CA',
      timestamp: new Date(Date.now() - 1200000),
      investigationStatus: 'reviewing',
      mlConfidence: 76,
      deviceFingerprint: 'DEV-LMN321',
      ipAddress: '203.0.113.15',
      merchantCategory: 'Retail'
    },
    {
      id: 'TXN-654321098',
      userId: 'USR-55432',
      amount: '$6,890.00',
      riskScore: 89,
      status: 'flagged',
      paymentMethod: 'Cryptocurrency',
      location: 'Sydney, AU',
      timestamp: new Date(Date.now() - 1800000),
      investigationStatus: 'pending',
      mlConfidence: 91,
      deviceFingerprint: 'DEV-STU654',
      ipAddress: '198.51.100.42',
      merchantCategory: 'Gaming'
    },
    {
      id: 'TXN-321098765',
      userId: 'USR-33221',
      amount: '$1,450.00',
      riskScore: 68,
      status: 'cleared',
      paymentMethod: 'Mobile Payment',
      location: 'Berlin, DE',
      timestamp: new Date(Date.now() - 2400000),
      investigationStatus: 'resolved',
      mlConfidence: 72,
      deviceFingerprint: 'DEV-VWX987',
      ipAddress: '192.0.2.78',
      merchantCategory: 'Food & Beverage'
    },
    {
      id: 'TXN-098765432',
      userId: 'USR-77889',
      amount: '$12,300.00',
      riskScore: 85,
      status: 'reviewing',
      paymentMethod: 'Wire Transfer',
      location: 'Tokyo, JP',
      timestamp: new Date(Date.now() - 3000000),
      investigationStatus: 'investigating',
      mlConfidence: 88,
      deviceFingerprint: 'DEV-YZA123',
      ipAddress: '203.0.113.89',
      merchantCategory: 'Luxury Goods'
    },
    {
      id: 'TXN-765432109',
      userId: 'USR-66554',
      amount: '$4,567.00',
      riskScore: 79,
      status: 'monitoring',
      paymentMethod: 'Digital Wallet',
      location: 'Mumbai, IN',
      timestamp: new Date(Date.now() - 3600000),
      investigationStatus: 'reviewing',
      mlConfidence: 82,
      deviceFingerprint: 'DEV-BCD456',
      ipAddress: '198.51.100.123',
      merchantCategory: 'Healthcare'
    }
  ];

  const getRiskScoreColor = (score) => {
    if (score >= 90) return 'text-error';
    if (score >= 70) return 'text-warning';
    if (score >= 50) return 'text-accent';
    return 'text-success';
  };

  const getRiskScoreBg = (score) => {
    if (score >= 90) return 'bg-error/10';
    if (score >= 70) return 'bg-warning/10';
    if (score >= 50) return 'bg-accent/10';
    return 'bg-success/10';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'flagged': return 'text-error';
      case 'reviewing': return 'text-warning';
      case 'monitoring': return 'text-accent';
      case 'cleared': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getInvestigationStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-accent';
      case 'investigating': return 'text-warning';
      case 'escalated': return 'text-error';
      case 'reviewing': return 'text-primary';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSelectTransaction = (transactionId) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId)
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredTransactions.map(t => t.id));
    }
  };

  const filteredTransactions = transactions.filter(transaction => 
    filterStatus === 'all' || transaction.status === filterStatus
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'amount') {
      aValue = parseFloat(aValue.replace(/[$,]/g, ''));
      bValue = parseFloat(bValue.replace(/[$,]/g, ''));
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for transactions:`, selectedTransactions);
    setSelectedTransactions([]);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={24} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Risk Assessment</h3>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="flagged">Flagged</option>
              <option value="reviewing">Reviewing</option>
              <option value="monitoring">Monitoring</option>
              <option value="cleared">Cleared</option>
            </select>
          </div>
        </div>

        {selectedTransactions.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg mb-4">
            <span className="text-sm font-medium text-primary">
              {selectedTransactions.length} transaction(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkAction('investigate')}
                iconName="Search"
                iconPosition="left"
              >
                Investigate
              </Button>
              <Button
                size="sm"
                variant="warning"
                onClick={() => handleBulkAction('escalate')}
                iconName="AlertTriangle"
                iconPosition="left"
              >
                Escalate
              </Button>
              <Button
                size="sm"
                variant="success"
                onClick={() => handleBulkAction('approve')}
                iconName="Check"
                iconPosition="left"
              >
                Approve
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="p-4 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Transaction ID</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="p-4 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="p-4 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('riskScore')}
              >
                <div className="flex items-center space-x-1">
                  <span>Risk Score</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Payment Method</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Location</th>
              <th 
                className="p-4 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Time</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border hover:bg-muted/50 transition-micro">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedTransactions.includes(transaction.id)}
                    onChange={() => handleSelectTransaction(transaction.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="font-mono text-sm text-foreground">{transaction.id}</div>
                  <div className="text-xs text-muted-foreground">User: {transaction.userId}</div>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-foreground">{transaction.amount}</div>
                  <div className="text-xs text-muted-foreground">{transaction.merchantCategory}</div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRiskScoreBg(transaction.riskScore)} ${getRiskScoreColor(transaction.riskScore)}`}>
                    {transaction.riskScore}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ML: {transaction.mlConfidence}%
                  </div>
                </td>
                <td className="p-4">
                  <div className={`font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </div>
                  <div className={`text-xs ${getInvestigationStatusColor(transaction.investigationStatus)}`}>
                    {transaction.investigationStatus.charAt(0).toUpperCase() + transaction.investigationStatus.slice(1)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{transaction.paymentMethod}</div>
                  <div className="text-xs text-muted-foreground font-mono">{transaction.deviceFingerprint}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{transaction.location}</div>
                  <div className="text-xs text-muted-foreground font-mono">{transaction.ipAddress}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{formatTimestamp(transaction.timestamp)}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      iconName="Eye"
                      title="View Details"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      iconName="Search"
                      title="Investigate"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      iconName="MoreHorizontal"
                      title="More Actions"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginatedTransactions.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No transactions match the current filter</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              iconName="ChevronLeft"
            />
            <span className="text-sm text-foreground px-3 py-1">
              {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              iconName="ChevronRight"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentTable;