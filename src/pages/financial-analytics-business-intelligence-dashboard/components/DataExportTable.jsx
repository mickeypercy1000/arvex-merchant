import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DataExportTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isExporting, setIsExporting] = useState(false);

  const transactionData = [
    {
      id: 'TXN-2024-001',
      date: '2024-07-20',
      time: '14:32:15',
      customer: 'John Smith',
      customerId: 'CUST-12345',
      amount: 1250.00,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      status: 'Completed',
      region: 'North America',
      fees: 37.50,
      netAmount: 1212.50,
      merchantCategory: 'E-commerce',
      riskScore: 0.12
    },
    {
      id: 'TXN-2024-002',
      date: '2024-07-20',
      time: '14:28:42',
      customer: 'Sarah Johnson',
      customerId: 'CUST-12346',
      amount: 89.99,
      currency: 'USD',
      paymentMethod: 'Digital Wallet',
      status: 'Completed',
      region: 'North America',
      fees: 2.70,
      netAmount: 87.29,
      merchantCategory: 'Retail',
      riskScore: 0.05
    },
    {
      id: 'TXN-2024-003',
      date: '2024-07-20',
      time: '14:25:18',
      customer: 'Michael Brown',
      customerId: 'CUST-12347',
      amount: 2500.00,
      currency: 'EUR',
      paymentMethod: 'Bank Transfer',
      status: 'Processing',
      region: 'Europe',
      fees: 25.00,
      netAmount: 2475.00,
      merchantCategory: 'B2B Services',
      riskScore: 0.08
    },
    {
      id: 'TXN-2024-004',
      date: '2024-07-20',
      time: '14:22:55',
      customer: 'Emma Wilson',
      customerId: 'CUST-12348',
      amount: 450.75,
      currency: 'GBP',
      paymentMethod: 'Debit Card',
      status: 'Failed',
      region: 'Europe',
      fees: 0.00,
      netAmount: 0.00,
      merchantCategory: 'Subscription',
      riskScore: 0.25
    },
    {
      id: 'TXN-2024-005',
      date: '2024-07-20',
      time: '14:19:33',
      customer: 'David Lee',
      customerId: 'CUST-12349',
      amount: 125.00,
      currency: 'SGD',
      paymentMethod: 'Cryptocurrency',
      status: 'Completed',
      region: 'Asia Pacific',
      fees: 6.25,
      netAmount: 118.75,
      merchantCategory: 'Digital Services',
      riskScore: 0.15
    },
    {
      id: 'TXN-2024-006',
      date: '2024-07-20',
      time: '14:15:21',
      customer: 'Lisa Chen',
      customerId: 'CUST-12350',
      amount: 3200.00,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      status: 'Completed',
      region: 'Asia Pacific',
      fees: 96.00,
      netAmount: 3104.00,
      merchantCategory: 'Enterprise',
      riskScore: 0.03
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Failed', label: 'Failed' },
    { value: 'Pending', label: 'Pending' }
  ];

  const pageSizeOptions = [
    { value: 10, label: '10 per page' },
    { value: 25, label: '25 per page' },
    { value: 50, label: '50 per page' },
    { value: 100, label: '100 per page' }
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV', icon: 'FileText' },
    { value: 'excel', label: 'Excel', icon: 'FileSpreadsheet' },
    { value: 'pdf', label: 'PDF', icon: 'FileText' },
    { value: 'json', label: 'JSON', icon: 'Code' }
  ];

  const filteredData = useMemo(() => {
    return transactionData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(item => item.id)));
    }
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const dataToExport = selectedRows.size > 0 
      ? sortedData.filter(item => selectedRows.has(item.id))
      : sortedData;
    
    console.log(`Exporting ${dataToExport.length} records as ${format.toUpperCase()}`);
    
    setIsExporting(false);
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-success bg-success/10';
      case 'Processing': return 'text-warning bg-warning/10';
      case 'Failed': return 'text-error bg-error/10';
      case 'Pending': return 'text-muted-foreground bg-muted/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const getRiskColor = (score) => {
    if (score <= 0.1) return 'text-success';
    if (score <= 0.2) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Transaction Data Export</h3>
          <p className="text-sm text-muted-foreground">
            Advanced filtering and export capabilities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {exportFormats.map((format) => (
            <Button
              key={format.value}
              variant="outline"
              size="sm"
              onClick={() => handleExport(format.value)}
              disabled={isExporting}
              iconName={format.icon}
              iconPosition="left"
            >
              {format.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-40"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {selectedRows.size > 0 && `${selectedRows.size} selected • `}
            {sortedData.length} total records
          </span>
          
          <Select
            options={pageSizeOptions}
            value={pageSize}
            onChange={(value) => {
              setPageSize(value);
              setCurrentPage(1);
            }}
            className="w-32"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              
              {[
                { key: 'id', label: 'Transaction ID' },
                { key: 'date', label: 'Date/Time' },
                { key: 'customer', label: 'Customer' },
                { key: 'amount', label: 'Amount' },
                { key: 'paymentMethod', label: 'Payment Method' },
                { key: 'status', label: 'Status' },
                { key: 'region', label: 'Region' },
                { key: 'riskScore', label: 'Risk Score' }
              ].map((column) => (
                <th key={column.key} className="text-left p-3">
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-micro"
                  >
                    <span>{column.label}</span>
                    {sortConfig.key === column.key && (
                      <Icon 
                        name={sortConfig.direction === 'asc' ? "ChevronUp" : "ChevronDown"} 
                        size={14} 
                      />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {paginatedData.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(transaction.id)}
                    onChange={() => handleSelectRow(transaction.id)}
                    className="rounded border-border"
                  />
                </td>
                
                <td className="p-3">
                  <div className="font-mono text-sm text-foreground">{transaction.id}</div>
                </td>
                
                <td className="p-3">
                  <div className="text-sm text-foreground">{transaction.date}</div>
                  <div className="text-xs text-muted-foreground font-mono">{transaction.time}</div>
                </td>
                
                <td className="p-3">
                  <div className="text-sm font-medium text-foreground">{transaction.customer}</div>
                  <div className="text-xs text-muted-foreground font-mono">{transaction.customerId}</div>
                </td>
                
                <td className="p-3">
                  <div className="text-sm font-medium text-foreground">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Net: {formatCurrency(transaction.netAmount, transaction.currency)}
                  </div>
                </td>
                
                <td className="p-3">
                  <div className="text-sm text-foreground">{transaction.paymentMethod}</div>
                  <div className="text-xs text-muted-foreground">{transaction.merchantCategory}</div>
                </td>
                
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                
                <td className="p-3">
                  <div className="text-sm text-foreground">{transaction.region}</div>
                </td>
                
                <td className="p-3">
                  <div className={`text-sm font-medium ${getRiskColor(transaction.riskScore)}`}>
                    {(transaction.riskScore * 100).toFixed(1)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Export Status */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">Exporting Data</div>
                <div className="text-sm text-muted-foreground">
                  Preparing {selectedRows.size > 0 ? selectedRows.size : sortedData.length} records...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataExportTable;