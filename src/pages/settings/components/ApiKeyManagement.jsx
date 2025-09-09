import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { getAuthToken } from '../../../utils/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const APIKeysSection = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState('TEST');
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createdKey, setCreatedKey] = useState(null);
  const [keyToDelete, setKeyToDelete] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState(new Set());

  const environmentOptions = [
    { value: 'TEST', label: 'Test Environment' },
    { value: 'LIVE', label: 'Live Environment' },
  ];

  // Fetch API keys on component mount
  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await axios.get('https://api.arvexpay.com/api/v1/auth/api-keys', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.status === 'success') {
        setApiKeys(response.data.data.items || []);
      }
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
      toast.error('Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!keyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await axios.post('https://api.arvexpay.com/api/v1/auth/api-keys', {
        name: keyName,
        environment: selectedEnvironment
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.status === 'success') {
        const createdApiKey = {
          key: response.data.data.api_key,
          name: keyName,
          environment: selectedEnvironment
        };
        setCreatedKey(createdApiKey);
        setShowCreateModal(false);
        setShowKeyModal(true);
        setKeyName('');
        setSelectedEnvironment('TEST');
        toast.success('API key created successfully');
        fetchApiKeys(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to create API key:', error);
      if (error.response?.data?.key === 'apikey_already_exists') {
        toast.error('An API key with this name already exists');
      } else {
        toast.error('Failed to create API key');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKey = async (keyId) => {
    try {
      setLoading(true);
      const token = getAuthToken();
      await axios.delete(`https://api.arvexpay.com/api/v1/auth/api-keys/${keyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      toast.success('API key deleted successfully');
      fetchApiKeys(); // Refresh the list
      setKeyToDelete(null);
    } catch (error) {
      console.error('Failed to delete API key:', error);
      toast.error('Failed to delete API key');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const subBusinessOptions = [
    { value: 'main', label: 'Main Business' },
    { value: 'ecommerce', label: 'E-commerce Division' },
    { value: 'marketplace', label: 'Marketplace Platform' },
    { value: 'subscription', label: 'Subscription Services' },
    { value: 'mobile', label: 'Mobile App Division' }
  ];

  return (
    <div className="w-full">
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 mb-6">
        <Button onClick={() => setShowCreateModal(true)} iconName="Plus" iconPosition="left" size="sm" className="sm:size-default">
          <span className="hidden sm:inline">Create New Key</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </div>

      {/* API Keys Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Key</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 px-4 text-center text-muted-foreground">
                      No API keys found. Create your first API key to get started.
                    </td>
                  </tr>
                ) : (
                  apiKeys.map((apiKey) => (
                    <tr key={apiKey.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-foreground">{apiKey.name}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {visibleKeys.has(apiKey.id) ? apiKey.shortened_key : '••••••••••••••••••••'}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            iconName={visibleKeys.has(apiKey.id) ? "EyeOff" : "Eye"}
                            title={visibleKeys.has(apiKey.id) ? "Hide API key" : "Show API key"}
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            iconName="Copy" 
                            title="Copy to clipboard"
                            onClick={() => copyToClipboard(apiKey.shortened_key)}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          apiKey.type === 'Test' ? 'bg-blue/10 text-blue' : 'bg-green/10 text-green'
                        }`}>
                          {apiKey.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {formatDate(apiKey.created_at)}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          apiKey.status === 'ACTIVE' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                        }`}>
                          {apiKey.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            iconName="Trash2" 
                            title="Delete"
                            onClick={() => setKeyToDelete(apiKey.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {apiKeys.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No API keys found. Create your first API key to get started.
              </div>
            ) : (
              apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{apiKey.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          apiKey.type === 'Test' ? 'bg-blue/10 text-blue' : 'bg-green/10 text-green'
                        }`}>
                          {apiKey.type}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          apiKey.status === 'ACTIVE' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                        }`}>
                          {apiKey.status}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      iconName="Trash2" 
                      title="Delete"
                      onClick={() => setKeyToDelete(apiKey.id)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">API Key</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 text-xs bg-muted px-2 py-1.5 rounded font-mono break-all">
                          {visibleKeys.has(apiKey.id) ? apiKey.shortened_key : '••••••••••••••••••••'}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          iconName={visibleKeys.has(apiKey.id) ? "EyeOff" : "Eye"}
                          title={visibleKeys.has(apiKey.id) ? "Hide API key" : "Show API key"}
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          iconName="Copy" 
                          title="Copy to clipboard"
                          onClick={() => copyToClipboard(apiKey.shortened_key)}
                        />
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Created: {formatDate(apiKey.created_at)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="bg-card rounded-lg border border-border shadow-elevation w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Create New API Key</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateModal(false)}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Key Name
                </label>
                <Input
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  placeholder="Enter API key name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Environment
                </label>
                <Select
                  options={environmentOptions}
                  value={selectedEnvironment}
                  onChange={setSelectedEnvironment}
                  placeholder="Select environment"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-border flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={() => setShowCreateModal(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleCreateKey} disabled={loading} className="w-full sm:w-auto">
                {loading ? 'Creating...' : 'Create Key'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Show Created Key Modal */}
      {showKeyModal && createdKey && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowKeyModal(false)}
        >
          <div 
            className="bg-card rounded-lg border border-border shadow-elevation w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">API Key Created Successfully</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowKeyModal(false)}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Important</span>
                </div>
                <p className="text-xs sm:text-sm text-warning/80">
                  This API key will only be shown once. Please copy and store it securely.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  API Key
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <code className="flex-1 text-xs sm:text-sm bg-muted px-3 py-2 rounded border font-mono break-all">
                    {createdKey.key}
                  </code>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    iconName="Copy" 
                    onClick={() => copyToClipboard(createdKey.key)}
                    className="self-end sm:self-auto"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <div className="font-medium break-words">{createdKey.name}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Environment:</span>
                  <div className={`font-medium ${
                    createdKey.environment === 'LIVE' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {createdKey.environment}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-border flex justify-end">
              <Button onClick={() => setShowKeyModal(false)} className="w-full sm:w-auto">
                I've Saved the Key
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {keyToDelete && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setKeyToDelete(null)}
        >
          <div 
            className="bg-card rounded-lg border border-border shadow-elevation w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Delete API Key</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setKeyToDelete(null)}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-muted-foreground text-sm">
                Are you sure you want to delete this API key? This action cannot be undone and will immediately revoke access for any applications using this key.
              </p>
            </div>
            <div className="p-4 sm:p-6 border-t border-border flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={() => setKeyToDelete(null)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDeleteKey(keyToDelete)}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? 'Deleting...' : 'Delete Key'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIKeysSection;