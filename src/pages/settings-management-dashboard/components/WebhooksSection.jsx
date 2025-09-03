import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const WebhooksSection = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEvents, setWebhookEvents] = useState([]);

  const webhooks = [
    {
      id: '1',
      name: 'Payment Processing Webhook',
      url: 'https://api.company.com/webhooks/payments',
      events: ['payment.completed', 'payment.failed'],
      status: 'active',
      lastDelivery: '2025-07-20 10:30',
      deliveryRate: '99.2%',
      retryPolicy: 'Exponential backoff'
    },
    {
      id: '2',
      name: 'User Management Webhook',
      url: 'https://api.company.com/webhooks/users',
      events: ['user.created', 'user.updated'],
      status: 'active',
      lastDelivery: '2025-07-20 09:45',
      deliveryRate: '98.7%',
      retryPolicy: 'Linear backoff'
    },
    {
      id: '3',
      name: 'Risk Alert Webhook',
      url: 'https://api.company.com/webhooks/risk',
      events: ['risk.alert', 'fraud.detected'],
      status: 'inactive',
      lastDelivery: '2025-07-18 14:20',
      deliveryRate: '95.1%',
      retryPolicy: 'None'
    }
  ];

  const eventTypes = [
    { value: 'payment.completed', label: 'Payment Completed' },
    { value: 'payment.failed', label: 'Payment Failed' },
    { value: 'payment.refunded', label: 'Payment Refunded' },
    { value: 'user.created', label: 'User Created' },
    { value: 'user.updated', label: 'User Updated' },
    { value: 'user.deleted', label: 'User Deleted' },
    { value: 'risk.alert', label: 'Risk Alert' },
    { value: 'fraud.detected', label: 'Fraud Detected' },
    { value: 'transaction.processed', label: 'Transaction Processed' }
  ];

  const retryPolicyOptions = [
    { value: 'exponential', label: 'Exponential Backoff' },
    { value: 'linear', label: 'Linear Backoff' },
    { value: 'none', label: 'No Retry' }
  ];

  const handleCreateWebhook = () => {
    // Handle webhook creation logic
    console.log('Creating webhook:', { webhookUrl, webhookEvents });
    setShowCreateModal(false);
    setWebhookUrl('');
    setWebhookEvents([]);
  };

  const toggleEvent = (eventValue) => {
    setWebhookEvents(prev => 
      prev.includes(eventValue) 
        ? prev.filter(e => e !== eventValue)
        : [...prev, eventValue]
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Webhook" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Webhook Management</h2>
          </div>
          <Button onClick={() => setShowCreateModal(true)} iconName="Plus" iconPosition="left">
            Create Webhook
          </Button>
        </div>
        <p className="text-muted-foreground mt-2">
          Configure webhook endpoints and monitor delivery status
        </p>
      </div>

      <div className="p-6">
        {/* Webhook Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-sm text-muted-foreground">Active Webhooks</div>
          </div>
          <div className="bg-success/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-success">98.3%</div>
            <div className="text-sm text-muted-foreground">Avg Delivery Rate</div>
          </div>
          <div className="bg-primary/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Total Deliveries</div>
          </div>
          <div className="bg-error/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-error">3</div>
            <div className="text-sm text-muted-foreground">Failed Deliveries</div>
          </div>
        </div>

        {/* Webhooks Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">URL</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Events</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Last Delivery</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Success Rate</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((webhook) => (
                <tr key={webhook.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-foreground">{webhook.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-muted-foreground">
                      {webhook.url}
                    </code>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event, index) => (
                        <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                          {event}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      webhook.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                    }`}>
                      {webhook.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{webhook.lastDelivery}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      parseFloat(webhook.deliveryRate) > 95 
                        ? 'text-success' 
                        : parseFloat(webhook.deliveryRate) > 90 
                        ? 'text-warning' :'text-error'
                    }`}>
                      {webhook.deliveryRate}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon-sm" iconName="Play" title="Test Webhook" />
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

      {/* Create Webhook Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-elevation max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Create New Webhook</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateModal(false)}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Webhook URL
                </label>
                <Input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-app.com/webhooks/endpoint"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Event Types
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-border rounded-lg p-4">
                  {eventTypes.map((event) => (
                    <div key={event.value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={webhookEvents.includes(event.value)}
                        onChange={() => toggleEvent(event.value)}
                      />
                      <label className="text-sm text-foreground">{event.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Retry Policy
                </label>
                <Select
                  options={retryPolicyOptions}
                  value="exponential"
                  onChange={() => {}}
                  placeholder="Select retry policy"
                />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateWebhook} disabled={!webhookUrl || webhookEvents.length === 0}>
                Create Webhook
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhooksSection;