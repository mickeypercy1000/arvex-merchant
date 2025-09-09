import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Payment = () => {
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    customerEmail: '',
    customerName: '',
    // Card fields
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    // PayPal fields
    paypalEmail: '',
    // Mobile money fields
    phoneNumber: '',
    network: 'mtn'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, and other major cards'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: 'Smartphone',
      description: 'MTN, Orange, Vodafone mobile money'
    }
  ];

  const mobileNetworks = [
    { id: 'mtn', name: 'MTN Mobile Money', icon: 'Smartphone' },
    { id: 'orange', name: 'Orange Money', icon: 'Smartphone' },
    { id: 'vodafone', name: 'Vodafone Cash', icon: 'Smartphone' },
    { id: 'airtel', name: 'Airtel Money', icon: 'Smartphone' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.amount) newErrors.amount = 'Amount is required';
    if (!formData?.customerEmail) newErrors.customerEmail = 'Customer email is required';
    if (!formData?.customerName) newErrors.customerName = 'Customer name is required';

    if (selectedMethod === 'card') {
      if (!formData?.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData?.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData?.cvv) newErrors.cvv = 'CVV is required';
      if (!formData?.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    } else if (selectedMethod === 'paypal') {
      if (!formData?.paypalEmail) newErrors.paypalEmail = 'PayPal email is required';
    } else if (selectedMethod === 'mobile') {
      if (!formData?.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Processing payment:', {
        method: selectedMethod,
        ...formData
      });

      // Navigate to success page or show success message
      alert('Payment processed successfully!');
      navigate('/transactions');
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value?.replace(/\D/g, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className={`transition-all duration-300 pt-16 pb-20 md:pb-4 ${
        isCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-60'
      }`}>
        <div className="p-6 max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bold text-foreground mb-2 text-2xl">Payment</h1>
              <p className="text-muted-foreground">
                Process payments with multiple payment methods
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/transactions')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Transactions
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Method Selection */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-medium text-foreground mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods?.map((method) => (
                  <button
                    key={method?.id}
                    onClick={() => setSelectedMethod(method?.id)}
                    className={`w-full p-4 border rounded-lg text-left transition-colors ${
                      selectedMethod === method?.id
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={method?.icon} size={20} />
                      <div>
                        <p className="font-medium">{method?.name}</p>
                        <p className="text-xs text-muted-foreground">{method?.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-foreground mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="text-foreground">${formData?.amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="text-foreground">$2.50</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-border pt-2">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      ${(parseFloat(formData?.amount || 0) + 2.5)?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
              <h2 className="font-medium text-foreground mb-6">Payment Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Amount (USD) *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      value={formData?.amount}
                      onChange={(e) => handleInputChange('amount', e?.target?.value)}
                      error={errors?.amount}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <Input
                      placeholder="Payment description"
                      value={formData?.description}
                      onChange={(e) => handleInputChange('description', e?.target?.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Customer Name *
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={formData?.customerName}
                      onChange={(e) => handleInputChange('customerName', e?.target?.value)}
                      error={errors?.customerName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Customer Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData?.customerEmail}
                      onChange={(e) => handleInputChange('customerEmail', e?.target?.value)}
                      error={errors?.customerEmail}
                    />
                  </div>
                </div>

                {/* Payment Method Specific Forms */}
                {selectedMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="border-t border-border pt-6">
                      <h3 className="font-medium text-foreground mb-4">Card Information</h3>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Card Number *
                      </label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={formData?.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e?.target?.value))}
                        error={errors?.cardNumber}
                        maxLength="19"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Expiry Date *
                        </label>
                        <Input
                          placeholder="MM/YY"
                          value={formData?.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e?.target?.value))}
                          error={errors?.expiryDate}
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          CVV *
                        </label>
                        <Input
                          placeholder="123"
                          value={formData?.cvv}
                          onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                          error={errors?.cvv}
                          maxLength="4"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Cardholder Name *
                      </label>
                      <Input
                        placeholder="John Doe"
                        value={formData?.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
                        error={errors?.cardholderName}
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === 'paypal' && (
                  <div className="space-y-4">
                    <div className="border-t border-border pt-6">
                      <h3 className="font-medium text-foreground mb-4">PayPal Information</h3>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        PayPal Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="paypal@example.com"
                        value={formData?.paypalEmail}
                        onChange={(e) => handleInputChange('paypalEmail', e?.target?.value)}
                        error={errors?.paypalEmail}
                      />
                    </div>

                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Info" size={16} className="text-primary" />
                        <div className="text-sm">
                          <p className="text-foreground font-medium">PayPal Integration</p>
                          <p className="text-muted-foreground">
                            You will be redirected to PayPal to complete the payment securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === 'mobile' && (
                  <div className="space-y-4">
                    <div className="border-t border-border pt-6">
                      <h3 className="font-medium text-foreground mb-4">Mobile Money Information</h3>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Mobile Network *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {mobileNetworks?.map((network) => (
                          <button
                            key={network?.id}
                            type="button"
                            onClick={() => handleInputChange('network', network?.id)}
                            className={`p-3 border rounded-lg text-left transition-colors ${
                              formData?.network === network?.id
                                ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon name={network?.icon} size={16} />
                              <span className="text-sm font-medium">{network?.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        placeholder="+1 234 567 8900"
                        value={formData?.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
                        error={errors?.phoneNumber}
                      />
                    </div>

                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Info" size={16} className="text-primary" />
                        <div className="text-sm">
                          <p className="text-foreground font-medium">Mobile Money Payment</p>
                          <p className="text-muted-foreground">
                            You will receive a prompt on your phone to complete the payment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6 border-t border-border">
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full"
                    iconName={isProcessing ? "Loader" : "CreditCard"}
                    iconPosition="left"
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay $${(parseFloat(formData?.amount || 0) + 2.5)?.toFixed(2)}`}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;