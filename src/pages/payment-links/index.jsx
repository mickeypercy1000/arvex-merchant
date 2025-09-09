import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const PaymentLinks = () => {
  const { isCollapsed } = useSidebar();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const paymentLinks = [
    {
      id: 1,
      title: 'Premium Subscription Q1',
      description: 'Quarterly premium subscription payment',
      amount: 299.99,
      currency: 'USD',
      status: 'active',
      createdDate: '2025-01-15',
      expiryDate: '2025-04-15',
      clickCount: 127,
      successfulPayments: 45,
      url: 'https://pay.example.com/link/abc123'
    },
    {
      id: 2,
      title: 'Workshop Registration',
      description: 'Advanced OKR Implementation Workshop',
      amount: 199.00,
      currency: 'USD',
      status: 'active',
      createdDate: '2025-01-10',
      expiryDate: '2025-03-10',
      clickCount: 89,
      successfulPayments: 23,
      url: 'https://pay.example.com/link/def456'
    },
    {
      id: 3,
      title: 'Enterprise Plan Upgrade',
      description: 'Annual enterprise plan payment link',
      amount: 2499.00,
      currency: 'USD',
      status: 'expired',
      createdDate: '2024-12-01',
      expiryDate: '2025-01-01',
      clickCount: 34,
      successfulPayments: 12,
      url: 'https://pay.example.com/link/ghi789'
    }
  ];

  const handleCreateLink = () => {
    console.log('Creating new payment link');
    setShowCreateModal(false);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard?.writeText(url);
    console.log('Link copied to clipboard');
  };

  const handleDeleteLink = (id) => {
    if (window.confirm('Are you sure you want to delete this payment link?')) {
      console.log('Deleting payment link:', id);
    }
  };

  const filteredLinks = paymentLinks?.filter(link => {
    const matchesSearch = link?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         link?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || link?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className={`transition-all duration-300 pt-16 pb-20 md:pb-4 ${
        isCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bold text-foreground mb-2 text-2xl">Payment Links</h1>
              <p className="text-muted-foreground">
                Create and manage payment links for easy customer transactions
              </p>
            </div>
            <Button 
              variant="default" 
              onClick={() => setShowCreateModal(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Create Payment Link
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Links</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Link" size={20} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Links</p>
                  <p className="text-2xl font-bold text-foreground">18</p>
                </div>
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="MousePointer" size={20} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-foreground">34.2%</p>
                </div>
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-warning" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search payment links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  iconName="Search"
                  iconPosition="left"
                />
              </div>
              <div className="w-full md:w-48">
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e?.target?.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="disabled">Disabled</option>
                </Select>
              </div>
              <Button variant="outline" iconName="Filter" iconPosition="left">
                More Filters
              </Button>
            </div>
          </div>

          {/* Payment Links Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-medium text-foreground">Payment Links ({filteredLinks?.length})</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">Title</th>
                    <th className="text-left p-4 font-medium text-foreground">Amount</th>
                    <th className="text-left p-4 font-medium text-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-foreground">Performance</th>
                    <th className="text-left p-4 font-medium text-foreground">Created</th>
                    <th className="text-left p-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLinks?.map((link) => (
                    <tr key={link?.id} className="border-b border-border hover:bg-muted/20">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{link?.title}</p>
                          <p className="text-sm text-muted-foreground">{link?.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-foreground">
                          {link?.currency} ${link?.amount?.toFixed(2)}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          link?.status === 'active' ?'bg-success/10 text-success border border-success/20' :'bg-destructive/10 text-destructive border border-destructive/20'
                        }`}>
                          {link?.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm text-foreground">{link?.clickCount} clicks</p>
                          <p className="text-sm text-muted-foreground">
                            {link?.successfulPayments} payments
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground">{link?.createdDate}</p>
                        <p className="text-sm text-muted-foreground">
                          Expires: {link?.expiryDate}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyLink(link?.url)}
                            title="Copy Link"
                          >
                            <Icon name="Copy" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit"
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteLink(link?.id)}
                            title="Delete"
                            className="text-destructive hover:text-destructive"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create Payment Link Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">Create Payment Link</h2>
                <p className="text-muted-foreground mt-1">
                  Create a new payment link for your customers
                </p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Title*
                    </label>
                    <Input placeholder="e.g., Premium Subscription" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Amount*
                    </label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <Input placeholder="Brief description of the payment" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Currency
                    </label>
                    <Select defaultValue="USD">
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Expiry Date
                    </label>
                    <Input type="date" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Success Redirect URL
                  </label>
                  <Input placeholder="https://yoursite.com/success" />
                </div>
              </div>

              <div className="p-6 border-t border-border flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  onClick={handleCreateLink}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create Link
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PaymentLinks;