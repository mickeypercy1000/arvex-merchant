import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const customerAnalytics = {
    totalCustomers: 12345,
    newCustomersThisMonth: 234,
    avgLifetimeValue: 1580,
    retentionRate: 85.6,
    topSpendingCustomers: 45,
    churnRate: 14.4
  };

  const customers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      totalSpent: 2450.50,
      lastPurchase: '2025-09-03',
      status: 'Active',
      joinDate: '2024-03-15',
      transactions: 24,
      avgOrderValue: 102.10
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      phone: '+1 (555) 234-5678',
      totalSpent: 4320.75,
      lastPurchase: '2025-09-02',
      status: 'VIP',
      joinDate: '2023-11-08',
      transactions: 42,
      avgOrderValue: 102.88
    },
    {
      id: 3,
      name: 'Michael Davis',
      email: 'mdavis@startup.io',
      phone: '+1 (555) 345-6789',
      totalSpent: 890.25,
      lastPurchase: '2025-08-28',
      status: 'Active',
      joinDate: '2024-07-22',
      transactions: 8,
      avgOrderValue: 111.28
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.wilson@tech.com',
      phone: '+1 (555) 456-7890',
      totalSpent: 156.00,
      lastPurchase: '2025-07-15',
      status: 'Inactive',
      joinDate: '2025-01-10',
      transactions: 2,
      avgOrderValue: 78.00
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@enterprise.com',
      phone: '+1 (555) 567-8901',
      totalSpent: 7850.00,
      lastPurchase: '2025-09-04',
      status: 'VIP',
      joinDate: '2023-05-20',
      transactions: 68,
      avgOrderValue: 115.44
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'vip', label: 'VIP' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'vip':
        return 'bg-primary/10 text-primary';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Management - Arvexpay</title>
        <meta name="description" content="Monitor customer activity, insights, and manage customer relationships with comprehensive analytics and data." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="pt-16 pl-0 lg:pl-64">
          <div className="px-4 sm:px-6 py-4 sm:py-8">
            <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor customer activity, insights, and manage customer relationships
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="Download">
            Export Data
          </Button>
          <Button iconName="Plus">
            Add Customer
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold text-foreground">{customerAnalytics.totalCustomers.toLocaleString()}</p>
            </div>
            <Icon name="Users" size={24} className="text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold text-success">+{customerAnalytics.newCustomersThisMonth}</p>
            </div>
            <Icon name="UserPlus" size={24} className="text-success" />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Lifetime Value</p>
              <p className="text-2xl font-bold text-foreground">${customerAnalytics.avgLifetimeValue}</p>
            </div>
            <Icon name="DollarSign" size={24} className="text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Retention Rate</p>
              <p className="text-2xl font-bold text-success">{customerAnalytics.retentionRate}%</p>
            </div>
            <Icon name="TrendingUp" size={24} className="text-success" />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Top Spenders</p>
              <p className="text-2xl font-bold text-primary">{customerAnalytics.topSpendingCustomers}</p>
            </div>
            <Icon name="Crown" size={24} className="text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Churn Rate</p>
              <p className="text-2xl font-bold text-error">{customerAnalytics.churnRate}%</p>
            </div>
            <Icon name="TrendingDown" size={24} className="text-error" />
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-card rounded-lg border border-border shadow-elevation">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Customer Directory</h2>
            <Button
              variant="outline"
              iconName="Filter"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className={`space-y-4 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  iconName="Search"
                />
              </div>
              <div>
                <Select
                  options={statusOptions}
                  value={filterStatus}
                  onChange={setFilterStatus}
                  placeholder="Filter by status"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-6 font-medium text-foreground">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Contact</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Total Spent</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Transactions</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Avg Order</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Last Purchase</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-6 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-foreground">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">Joined {customer.joinDate}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm text-foreground">{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-foreground">
                      ${customer.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-foreground">{customer.transactions}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-foreground">${customer.avgOrderValue.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-muted-foreground">{customer.lastPurchase}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon-sm" iconName="Eye" title="View Details" />
                      <Button variant="ghost" size="icon-sm" iconName="MessageSquare" title="Contact" />
                      <Button variant="ghost" size="icon-sm" iconName="MoreHorizontal" title="More" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No customers found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Start by adding your first customer.'}
            </p>
          </div>
        )}
      </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CustomersPage;
