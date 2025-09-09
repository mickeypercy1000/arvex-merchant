import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TransactionDetails = () => {
  const { isCollapsed } = useSidebar();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get transaction data from location state or fetch based on ID
  const transaction = location?.state?.transaction || {
    id: id,
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    amount: 299.99,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'Credit Card (**** 4242)',
    transactionDate: '2025-01-15 14:30:22',
    paymentLinkTitle: 'Premium Subscription Q1',
    processingFee: 9.15,
    netAmount: 290.84
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'failed':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle2';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'CreditCard';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className={`transition-all duration-300 pt-16 pb-20 md:pb-4 ${
        isCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-60'
      }`}>
        <div className="p-6 max-w-4xl mx-auto">
          {/* Breadcrumb and Navigation */}
          <div className="flex items-center space-x-2 mb-6 text-sm text-muted-foreground">
            <button 
              onClick={() => navigate('/transactions')}
              className="hover:text-foreground transition-colors"
            >
              Transactions
            </button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground font-medium">{transaction?.id}</span>
          </div>

          {/* Page Header */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Receipt" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{transaction?.id}</h1>
                  <p className="text-muted-foreground">
                    {transaction?.paymentLinkTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-2 text-sm font-medium rounded-full border ${getStatusColor(transaction?.status)}`}>
                  <Icon name={getStatusIcon(transaction?.status)} size={16} className="inline mr-2" />
                  {transaction?.status?.charAt(0)?.toUpperCase() + transaction?.status?.slice(1)}
                </span>
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Download Receipt
                </Button>
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Payment Amount</h2>
                <Icon name="DollarSign" size={20} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">
                {transaction?.currency} ${transaction?.amount?.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Processing fee: ${transaction?.processingFee?.toFixed(2)}
              </p>
              <p className="text-sm font-medium text-success mt-2">
                Net amount: ${transaction?.netAmount?.toFixed(2)}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Payment Method</h2>
                <Icon name="CreditCard" size={20} className="text-primary" />
              </div>
              <p className="text-lg font-medium text-foreground">
                {transaction?.paymentMethod}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Processed securely
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Transaction Date</h2>
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <p className="text-lg font-medium text-foreground">
                {new Date(transaction?.transactionDate)?.toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(transaction?.transactionDate)?.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Customer Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Icon name="User" size={20} className="mr-2" />
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-foreground font-medium">{transaction?.customerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="text-foreground">{transaction?.customerEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Customer ID</label>
                  <p className="text-foreground font-mono">CUST-{transaction?.id?.slice(-3)}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Payment Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Link</label>
                  <p className="text-foreground font-medium">{transaction?.paymentLinkTitle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
                  <p className="text-foreground">{transaction?.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Currency</label>
                  <p className="text-foreground">{transaction?.currency}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Timeline */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Clock" size={20} className="mr-2" />
              Transaction Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 pb-4 border-b border-border">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle2" size={16} className="text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Payment Completed</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction?.transactionDate)?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pb-4 border-b border-border">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="CreditCard" size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Payment Processed</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(new Date(transaction?.transactionDate).getTime() - 30000)?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-muted/10 rounded-full flex items-center justify-center">
                  <Icon name="Play" size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Payment Initiated</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(new Date(transaction?.transactionDate).getTime() - 60000)?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Breakdown */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Calculator" size={20} className="mr-2" />
              Payment Breakdown
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2">
                <span className="text-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  ${transaction?.amount?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="text-muted-foreground">
                  -${transaction?.processingFee?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-foreground">Net Amount</span>
                <span className="text-success">
                  ${transaction?.netAmount?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/transactions')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Transactions
            </Button>
            <Button 
              variant="outline"
              iconName="Share"
              iconPosition="left"
            >
              Share Receipt
            </Button>
            <Button 
              variant="default"
              iconName="Download"
              iconPosition="left"
            >
              Download PDF
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionDetails;