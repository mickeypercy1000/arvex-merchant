import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CompanyProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddSubBusinessModal, setShowAddSubBusinessModal] = useState(false);
  const [subBusinessData, setSubBusinessData] = useState({
    name: '',
    description: '',
    website: '',
    email: '',
    phone: ''
  });
  const [companyData, setCompanyData] = useState({
    companyName: 'FinTech Analytics Corp',
    website: 'https://fintechanalytics.com',
    industry: 'financial-services',
    size: '51-200',
    phone: '+1 (555) 123-4567',
    email: 'info@fintechanalytics.com',
    address: '123 Tech Boulevard',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'US',
    taxId: '12-3456789',
    billingEmail: 'billing@fintechanalytics.com'
  });

  const industryOptions = [
    { value: 'financial-services', label: 'Financial Services' },
    { value: 'banking', label: 'Banking' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'investment', label: 'Investment Management' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'other', label: 'Other' }
  ];

  const sizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' }
  ];

  const handleInputChange = (field, value) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubBusinessInputChange = (field, value) => {
    setSubBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic
    console.log('Saving company data:', companyData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset data to original values
    setIsEditing(false);
  };

  const handleAddSubBusiness = () => {
    // Handle sub-business creation logic
    console.log('Adding sub-business:', subBusinessData);
    setShowAddSubBusinessModal(false);
    setSubBusinessData({
      name: '',
      description: '',
      website: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Building" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Company Profile</h2>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)} iconName="Edit" iconPosition="left">
                  Edit Profile
                </Button>
                <Button variant="outline" iconName="Plus" iconPosition="left" onClick={() => setShowAddSubBusinessModal(true)}>
                  Add Sub-Business
                </Button>
              </>
            )}
          </div>
        </div>
        <p className="text-muted-foreground mt-2">
          Manage your organization details and branding assets
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Company Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={companyData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Enter company name"
                    />
                  ) : (
                    <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Website
                  </label>
                  {isEditing ? (
                    <Input
                      type="url"
                      value={companyData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://your-website.com"
                    />
                  ) : (
                    <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.website}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Industry
                    </label>
                    {isEditing ? (
                      <Select
                        options={industryOptions}
                        value={companyData.industry}
                        onChange={(value) => handleInputChange('industry', value)}
                        placeholder="Select industry"
                      />
                    ) : (
                      <p className="text-foreground bg-muted p-3 rounded-lg break-words">
                        {industryOptions.find(opt => opt.value === companyData.industry)?.label}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Size
                    </label>
                    {isEditing ? (
                      <Select
                        options={sizeOptions}
                        value={companyData.size}
                        onChange={(value) => handleInputChange('size', value)}
                        placeholder="Select company size"
                      />
                    ) : (
                      <p className="text-foreground bg-muted p-3 rounded-lg break-words">
                        {sizeOptions.find(opt => opt.value === companyData.size)?.label}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={companyData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={companyData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                      />
                    ) : (
                      <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Address Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Street Address
                  </label>
                  {isEditing ? (
                    <Input
                      value={companyData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter street address"
                    />
                  ) : (
                    <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      City
                    </label>
                    {isEditing ? (
                      <Input
                        value={companyData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                      />
                    ) : (
                      <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      State/Province
                    </label>
                    {isEditing ? (
                      <Input
                        value={companyData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter state/province"
                      />
                    ) : (
                      <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      ZIP/Postal Code
                    </label>
                    {isEditing ? (
                      <Input
                        value={companyData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="Enter ZIP code"
                      />
                    ) : (
                      <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.zipCode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Country
                    </label>
                    {isEditing ? (
                      <Select
                        options={countryOptions}
                        value={companyData.country}
                        onChange={(value) => handleInputChange('country', value)}
                        placeholder="Select country"
                      />
                    ) : (
                      <p className="text-foreground bg-muted p-3 rounded-lg break-words">
                        {countryOptions.find(opt => opt.value === companyData.country)?.label}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Billing Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tax ID / EIN
                  </label>
                  {isEditing ? (
                    <Input
                      value={companyData.taxId}
                      onChange={(e) => handleInputChange('taxId', e.target.value)}
                      placeholder="Enter tax ID"
                    />
                  ) : (
                    <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.taxId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Billing Email
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={companyData.billingEmail}
                      onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                      placeholder="Enter billing email"
                    />
                  ) : (
                    <p className="text-foreground bg-muted p-3 rounded-lg break-words">{companyData.billingEmail}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-foreground mb-4">Company Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Logo
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Upload your company logo</p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Brand Colors
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded border border-border"></div>
                  <span className="text-sm text-foreground">Primary Color</span>
                  <code className="text-xs text-muted-foreground">#3B82F6</code>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success rounded border border-border"></div>
                  <span className="text-sm text-foreground">Success Color</span>
                  <code className="text-xs text-muted-foreground">#10B981</code>
                </div>
                <Button variant="outline" size="sm">
                  Customize Colors
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sub-Business Modal */}
      {showAddSubBusinessModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowAddSubBusinessModal(false)}
        >
          <div 
            className="bg-card rounded-lg border border-border shadow-elevation max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Add New Sub-Business</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddSubBusinessModal(false)}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-md font-medium text-foreground mb-4">Basic Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business Name *
                    </label>
                    <Input
                      value={subBusinessData.name}
                      onChange={(e) => handleSubBusinessInputChange('name', e.target.value)}
                      placeholder="Enter sub-business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <Input
                      value={subBusinessData.description}
                      onChange={(e) => handleSubBusinessInputChange('description', e.target.value)}
                      placeholder="Brief description of the sub-business"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Website
                      </label>
                      <Input
                        type="url"
                        value={subBusinessData.website}
                        onChange={(e) => handleSubBusinessInputChange('website', e.target.value)}
                        placeholder="https://sub-business.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={subBusinessData.email}
                        onChange={(e) => handleSubBusinessInputChange('email', e.target.value)}
                        placeholder="contact@sub-business.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={subBusinessData.phone}
                      onChange={(e) => handleSubBusinessInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddSubBusinessModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubBusiness}>
                Add Sub-Business
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfileSection;