import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const APIKeysSection = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [keyPermissions, setKeyPermissions] = useState('read');

  const apiKeys = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'pk_live_51J8X...',
      permissions: 'Full Access',
      created: '2025-01-15',
      lastUsed: '2025-07-20',
      usage: '1,247 requests',
      status: 'active'
    },
    {
      id: '2',
      name: 'Test Environment Key',
      key: 'pk_test_51J8X...',
      permissions: 'Read Only',
      created: '2025-02-10',
      lastUsed: '2025-07-19',
      usage: '342 requests',
      status: 'active'
    },
    {
      id: '3',
      name: 'Legacy Integration',
      key: 'pk_live_51H9Y...',
      permissions: 'Limited',
      created: '2024-11-22',
      lastUsed: '2025-06-15',
      usage: '89 requests',
      status: 'inactive'
    }
  ];

  const permissionOptions = [
    { value: 'read', label: 'Read Only' },
    { value: 'write', label: 'Read & Write' },
    { value: 'admin', label: 'Full Access' },
    { value: 'limited', label: 'Limited Access' }
  ];

  const handleCreateKey = () => {
    // Handle API key creation logic
    console.log('Creating API key:', { keyName, keyPermissions });
    setShowCreateModal(false);
    setKeyName('');
    setKeyPermissions('read');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show success message
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Key" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">API Keys Management</h2>
          </div>
          <Button onClick={() => setShowCreateModal(true)} iconName="Plus" iconPosition="left">
            Create New Key
          </Button>
        </div>
        <p className="text-muted-foreground mt-2">
          Manage your API keys, permissions, and monitor usage statistics
        </p>
      </div>

      <div className="p-6">
        {/* API Keys Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Key</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Permissions</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Created</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Last Used</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Usage</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-foreground">{apiKey.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                        {apiKey.key}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                        iconName="Copy"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apiKey.permissions === 'Full Access' ?'bg-error/10 text-error'
                        : apiKey.permissions === 'Read & Write' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                    }`}>
                      {apiKey.permissions}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{apiKey.created}</td>
                  <td className="py-4 px-4 text-muted-foreground">{apiKey.lastUsed}</td>
                  <td className="py-4 px-4 text-muted-foreground">{apiKey.usage}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apiKey.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                    }`}>
                      {apiKey.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon-sm" iconName="RotateCcw" title="Regenerate" />
                      <Button variant="ghost" size="icon-sm" iconName="Edit" title="Edit" />
                      <Button variant="ghost" size="icon-sm" iconName="Trash2" title="Delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-elevation max-w-md w-full mx-4">
            <div className="p-6 border-b border-border">
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
            <div className="p-6 space-y-4">
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
                  Permissions
                </label>
                <Select
                  options={permissionOptions}
                  value={keyPermissions}
                  onChange={setKeyPermissions}
                  placeholder="Select permissions"
                />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateKey}>
                Create Key
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIKeysSection;