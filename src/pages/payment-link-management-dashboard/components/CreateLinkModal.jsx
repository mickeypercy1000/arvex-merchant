import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateLinkModal = ({ onClose }) => {
  const [linkData, setLinkData] = useState({
    name: '',
    description: '',
    amount: '',
    currency: 'USD',
    expirationDate: '',
    maxUses: '',
    successUrl: '',
    cancelUrl: '',
    collectShipping: false,
    collectPhone: false,
    allowPromoCode: false,
    customBranding: false
  });
  
  const [previewMode, setPreviewMode] = useState(false);

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' }
  ];

  const handleInputChange = (field, value) => {
    setLinkData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!linkData.name || !linkData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    // Handle link creation logic
    console.log('Creating payment link:', linkData);
    onClose();
  };

  const generatePreviewUrl = () => {
    return `https://pay.company.com/${linkData.name.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Link" size={24} className="text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Create Payment Link</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={previewMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                iconName="Eye"
                iconPosition="left"
              >
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          {!previewMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Basic Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Link Name *
                      </label>
                      <Input
                        value={linkData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="e.g., Premium Package Payment"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        value={linkData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Optional description for internal use"
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Amount *
                        </label>
                        <Input
                          type="number"
                          value={linkData.amount}
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Currency
                        </label>
                        <Select
                          options={currencyOptions}
                          value={linkData.currency}
                          onChange={(value) => handleInputChange('currency', value)}
                          placeholder="Select currency"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expiration Settings */}
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Expiration Settings</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Expiration Date
                      </label>
                      <Input
                        type="date"
                        value={linkData.expirationDate}
                        onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave empty for no expiration
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Maximum Uses
                      </label>
                      <Input
                        type="number"
                        value={linkData.maxUses}
                        onChange={(e) => handleInputChange('maxUses', e.target.value)}
                        placeholder="Unlimited"
                        min="1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave empty for unlimited uses
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Advanced Settings</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Success Redirect URL
                      </label>
                      <Input
                        type="url"
                        value={linkData.successUrl}
                        onChange={(e) => handleInputChange('successUrl', e.target.value)}
                        placeholder="https://your-site.com/success"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Cancel Redirect URL
                      </label>
                      <Input
                        type="url"
                        value={linkData.cancelUrl}
                        onChange={(e) => handleInputChange('cancelUrl', e.target.value)}
                        placeholder="https://your-site.com/cancel"
                      />
                    </div>
                  </div>
                </div>

                {/* Collection Options */}
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Collection Options</h4>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={linkData.collectShipping}
                        onChange={(e) => handleInputChange('collectShipping', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">Collect shipping address</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={linkData.collectPhone}
                        onChange={(e) => handleInputChange('collectPhone', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">Collect phone number</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={linkData.allowPromoCode}
                        onChange={(e) => handleInputChange('allowPromoCode', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">Allow promotional codes</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={linkData.customBranding}
                        onChange={(e) => handleInputChange('customBranding', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">Enable custom branding</span>
                    </label>
                  </div>
                </div>

                {/* Preview URL */}
                {linkData.name && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Generated URL Preview</h4>
                    <div className="flex items-center space-x-2">
                      <code className="bg-background px-3 py-2 rounded border text-sm font-mono flex-1">
                        {generatePreviewUrl()}
                      </code>
                      <Button variant="outline" size="icon-sm" iconName="Copy" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Preview Mode */
            <div className="max-w-md mx-auto">
              <div className="bg-background border border-border rounded-lg p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {linkData.name || 'Payment Link Preview'}
                  </h3>
                  {linkData.description && (
                    <p className="text-muted-foreground text-sm">{linkData.description}</p>
                  )}
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground">
                    {linkData.amount ? `${linkData.currency} ${linkData.amount}` : '$0.00'}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <Input placeholder="Email address" type="email" />
                  {linkData.collectPhone && <Input placeholder="Phone number" type="tel" />}
                  {linkData.collectShipping && (
                    <>
                      <Input placeholder="Full name" />
                      <Input placeholder="Address line 1" />
                      <Input placeholder="City, State, ZIP" />
                    </>
                  )}
                </div>

                {linkData.allowPromoCode && (
                  <div className="mb-4">
                    <Input placeholder="Promo code (optional)" />
                  </div>
                )}

                <Button className="w-full mb-4">
                  Complete Payment
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  Secure payment powered by FinTech Analytics
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!linkData.name || !linkData.amount}
          >
            Create Payment Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkModal;