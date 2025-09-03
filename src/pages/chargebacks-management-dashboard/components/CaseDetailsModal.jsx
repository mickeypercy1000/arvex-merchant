import React, { useState } from 'react';
        import { motion, AnimatePresence } from 'framer-motion';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';
        

        const CaseDetailsModal = ({ caseData, onClose, onAction }) => {
          const [activeTab, setActiveTab] = useState('details');
          const [responseText, setResponseText] = useState('');

          const tabs = [
            { id: 'details', label: 'Case Details', icon: 'FileText' },
            { id: 'timeline', label: 'Timeline', icon: 'Clock' },
            { id: 'evidence', label: 'Evidence', icon: 'Upload' },
            { id: 'response', label: 'Response', icon: 'MessageSquare' }
          ];

          const timelineEvents = [
            {
              time: '2025-01-25T14:30:00Z',
              event: 'Chargeback Initiated',
              description: 'Customer disputed transaction via their bank',
              type: 'alert'
            },
            {
              time: '2025-01-25T14:45:00Z',
              event: 'Case Assigned',
              description: 'Automatically assigned to Risk Team',
              type: 'info'
            },
            {
              time: '2025-01-26T09:15:00Z',
              event: 'Initial Review',
              description: 'Case flagged for immediate attention',
              type: 'warning'
            }
          ];

          const evidenceItems = [
            { name: 'Transaction Receipt', type: 'PDF', size: '2.4 MB', uploaded: true },
            { name: 'Customer Communication', type: 'Email', size: '15 KB', uploaded: true },
            { name: 'Shipping Confirmation', type: 'PDF', size: '1.8 MB', uploaded: false },
            { name: 'Product Images', type: 'ZIP', size: '8.2 MB', uploaded: false }
          ];

          const responseTemplates = [
            'Fraudulent Transaction Response',
            'Service Not Rendered Response',
            'Duplicate Processing Response',
            'Authorization Issue Response'
          ];

          const getStatusBadge = (status) => {
            const statusConfig = {
              new: { color: 'text-warning bg-warning/10', label: 'New' },
              under_review: { color: 'text-primary bg-primary/10', label: 'Under Review' },
              responded: { color: 'text-success bg-success/10', label: 'Responded' }
            };

            const config = statusConfig[status] || statusConfig.new;
            return (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.label}
              </span>
            );
          };

          const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          };

          const getTimeRemaining = (deadline) => {
            const now = new Date();
            const deadlineDate = new Date(deadline);
            const diff = deadlineDate - now;
            
            if (diff < 0) return 'Overdue';
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(hours / 24);
            
            if (days > 0) return `${days}d ${hours % 24}h`;
            return `${hours}h`;
          };

          const renderTabContent = () => {
            switch (activeTab) {
              case 'details':
                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Transaction Information</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Transaction ID</label>
                            <p className="text-sm font-medium text-foreground">{caseData?.transactionId}</p>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Amount</label>
                            <p className="text-lg font-bold text-primary">${caseData?.amount?.toLocaleString()}</p>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Payment Method</label>
                            <p className="text-sm font-medium text-foreground">
                              {caseData?.cardBrand} ****{caseData?.cardLast4}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Case Information</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Reason Code</label>
                            <p className="text-sm font-medium text-foreground capitalize">
                              {caseData?.reasonCode} - {caseData?.reasonDescription}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Deadline</label>
                            <p className="text-sm font-medium text-destructive">
                              {formatDate(caseData?.deadline)} ({getTimeRemaining(caseData?.deadline)} remaining)
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Priority</label>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              caseData?.priority === 'high' ?'text-destructive bg-destructive/10' :'text-warning bg-warning/10'
                            }`}>
                              {caseData?.priority?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Customer Information</h4>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-xs text-muted-foreground">Email</label>
                          <p className="text-sm font-medium text-foreground">{caseData?.customerEmail}</p>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Merchant</label>
                          <p className="text-sm font-medium text-foreground">{caseData?.merchantName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );

              case 'timeline':
                return (
                  <div className="space-y-4">
                    {timelineEvents.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          event.type === 'alert' ? 'bg-destructive' :
                          event.type === 'warning' ? 'bg-warning' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-foreground">{event.event}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(event.time)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );

              case 'evidence':
                return (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop files here or click to browse
                      </p>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Evidence Checklist</h4>
                      {evidenceItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon 
                              name={item.uploaded ? "CheckCircle" : "Circle"} 
                              size={16} 
                              className={item.uploaded ? "text-success" : "text-muted-foreground"} 
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.type} • {item.size}</p>
                            </div>
                          </div>
                          {!item.uploaded && (
                            <Button variant="ghost" size="sm">
                              <Icon name="Upload" size={14} className="mr-1" />
                              Upload
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case 'response':
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Response Templates
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {responseTemplates.map((template, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs justify-start"
                            onClick={() => setResponseText(`Template: ${template}`)}
                          >
                            {template}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Response Message
                      </label>
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Enter your response to the chargeback..."
                      />
                    </div>
                  </div>
                );

              default:
                return null;
            }
          };

          return (
            <AnimatePresence>
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card border border-border rounded-lg shadow-elevation-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">{caseData?.caseId}</h2>
                        <p className="text-sm text-muted-foreground">{caseData?.merchantName}</p>
                      </div>
                      {getStatusBadge(caseData?.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAction?.('respond', caseData?.id)}
                      >
                        <Icon name="MessageSquare" size={16} className="mr-1" />
                        Respond
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAction?.('escalate', caseData?.id)}
                      >
                        <Icon name="ArrowUp" size={16} className="mr-1" />
                        Escalate
                      </Button>
                      <Button variant="ghost" size="sm" onClick={onClose}>
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-border">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {renderTabContent()}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Case created: {formatDate(caseData?.createdAt)}</span>
                      <span>•</span>
                      <span className="text-destructive font-medium">
                        Deadline: {getTimeRemaining(caseData?.deadline)} remaining
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          onAction?.('respond', caseData?.id);
                          onClose();
                        }}
                      >
                        Submit Response
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>
          );
        };

        export default CaseDetailsModal;