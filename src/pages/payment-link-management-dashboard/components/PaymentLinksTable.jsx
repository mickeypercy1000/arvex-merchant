import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentLinksTable = ({ searchQuery, statusFilter, dateRange }) => {
  const [selectedLinks, setSelectedLinks] = useState([]);

  const paymentLinks = [
    {
      id: '1',
      name: 'Premium Package Payment',
      amount: '$299.00',
      status: 'active',
      created: '2025-07-15',
      expires: '2025-08-15',
      clicks: 127,
      conversions: 23,
      conversionRate: '18.1%',
      revenue: '$6,877.00',
      creator: 'John Doe',
      url: 'https://pay.company.com/premium-package'
    },
    {
      id: '2',
      name: 'Monthly Subscription',
      amount: '$49.99',
      status: 'active',
      created: '2025-07-10',
      expires: '2025-12-31',
      clicks: 89,
      conversions: 34,
      conversionRate: '38.2%',
      revenue: '$1,699.66',
      creator: 'Jane Smith',
      url: 'https://pay.company.com/monthly-sub'
    },
    {
      id: '3',
      name: 'One-time Consultation Fee',
      amount: '$150.00',
      status: 'paid',
      created: '2025-07-08',
      expires: '2025-07-22',
      clicks: 45,
      conversions: 12,
      conversionRate: '26.7%',
      revenue: '$1,800.00',
      creator: 'Mike Johnson',
      url: 'https://pay.company.com/consultation'
    },
    {
      id: '4',
      name: 'Enterprise License',
      amount: '$1,999.00',
      status: 'active',
      created: '2025-07-05',
      expires: '2025-09-05',
      clicks: 67,
      conversions: 3,
      conversionRate: '4.5%',
      revenue: '$5,997.00',
      creator: 'Sarah Wilson',
      url: 'https://pay.company.com/enterprise'
    },
    {
      id: '5',
      name: 'Basic Plan Upgrade',
      amount: '$19.99',
      status: 'expired',
      created: '2025-06-20',
      expires: '2025-07-20',
      clicks: 156,
      conversions: 67,
      conversionRate: '42.9%',
      revenue: '$1,339.33',
      creator: 'Alex Brown',
      url: 'https://pay.company.com/basic-upgrade'
    },
    {
      id: '6',
      name: 'Training Course Fee',
      amount: '$79.99',
      status: 'disabled',
      created: '2025-07-12',
      expires: '2025-08-12',
      clicks: 23,
      conversions: 8,
      conversionRate: '34.8%',
      revenue: '$639.92',
      creator: 'Lisa Davis',
      url: 'https://pay.company.com/training'
    }
  ];

  const filteredLinks = paymentLinks.filter(link => {
    const matchesSearch = link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || link.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'paid': return 'bg-primary/10 text-primary';
      case 'expired': return 'bg-warning/10 text-warning';
      case 'disabled': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show success message
  };

  const handleSelectLink = (linkId) => {
    setSelectedLinks(prev => 
      prev.includes(linkId) 
        ? prev.filter(id => id !== linkId)
        : [...prev, linkId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLinks(
      selectedLinks.length === filteredLinks.length 
        ? [] 
        : filteredLinks.map(link => link.id)
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Payment Links</h2>
          </div>
          <div className="flex items-center space-x-2">
            {selectedLinks.length > 0 && (
              <div className="flex items-center space-x-2 mr-4">
                <span className="text-sm text-muted-foreground">
                  {selectedLinks.length} selected
                </span>
                <Button variant="outline" size="sm" iconName="Copy">
                  Copy URLs
                </Button>
                <Button variant="outline" size="sm" iconName="Edit">
                  Bulk Edit
                </Button>
                <Button variant="destructive" size="sm" iconName="Trash2">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <p className="text-muted-foreground mt-2">
          Manage your payment links and monitor their performance
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="text-left py-4 px-6">
                <input
                  type="checkbox"
                  checked={selectedLinks.length === filteredLinks.length && filteredLinks.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Link Name</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Amount</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Status</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Created</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Expires</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Clicks</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Conversion</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Revenue</th>
              <th className="text-left py-4 px-6 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLinks.map((link) => (
              <tr key={link.id} className="border-b border-border hover:bg-muted/50 transition-micro">
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedLinks.includes(link.id)}
                    onChange={() => handleSelectLink(link.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium text-foreground">{link.name}</div>
                    <div className="text-sm text-muted-foreground">by {link.creator}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-medium text-foreground">{link.amount}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(link.status)}`}>
                    {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-muted-foreground">{link.created}</td>
                <td className="py-4 px-6 text-muted-foreground">{link.expires}</td>
                <td className="py-4 px-6">
                  <div className="text-foreground font-medium">{link.clicks}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-foreground font-medium">{link.conversions}</div>
                  <div className="text-sm text-success">{link.conversionRate}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-medium text-foreground">{link.revenue}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => copyToClipboard(link.url)}
                      iconName="Copy"
                      title="Copy Link"
                    />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      iconName="QrCode"
                      title="QR Code"
                    />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      iconName="BarChart3"
                      title="Analytics"
                    />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      iconName="Edit"
                      title="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      iconName="MoreVertical"
                      title="More Options"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLinks.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No payment links found</h3>
          <p className="text-muted-foreground mb-4">
            No payment links match your current filters. Try adjusting your search criteria.
          </p>
          <Button onClick={() => {}}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentLinksTable;