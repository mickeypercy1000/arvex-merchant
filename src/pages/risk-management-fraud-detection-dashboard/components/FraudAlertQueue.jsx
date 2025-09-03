import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FraudAlertQueue = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const fraudAlerts = [
    {
      id: 'ALT-2024-001',
      severity: 'critical',
      type: 'Velocity Anomaly',
      description: 'Unusual transaction velocity detected from IP 192.168.1.100',
      amount: '$15,420.00',
      timestamp: new Date(Date.now() - 300000),
      status: 'investigating',
      confidence: 95,
      userId: 'USR-78945',
      location: 'New York, US',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ALT-2024-002',
      severity: 'high',
      type: 'Amount Threshold',
      description: 'Transaction amount exceeds user historical pattern',
      amount: '$8,750.00',
      timestamp: new Date(Date.now() - 600000),
      status: 'pending',
      confidence: 87,
      userId: 'USR-45621',
      location: 'London, UK',
      paymentMethod: 'Digital Wallet'
    },
    {
      id: 'ALT-2024-003',
      severity: 'critical',
      type: 'Geographic Anomaly',
      description: 'Transaction from unusual geographic location',
      amount: '$3,200.00',
      timestamp: new Date(Date.now() - 900000),
      status: 'escalated',
      confidence: 92,
      userId: 'USR-12389',
      location: 'Lagos, Nigeria',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'ALT-2024-004',
      severity: 'medium',
      type: 'Device Fingerprint',
      description: 'New device detected for high-value transaction',
      amount: '$2,100.00',
      timestamp: new Date(Date.now() - 1200000),
      status: 'reviewing',
      confidence: 73,
      userId: 'USR-98765',
      location: 'Toronto, CA',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ALT-2024-005',
      severity: 'high',
      type: 'Pattern Recognition',
      description: 'Suspicious transaction pattern matching known fraud vectors',
      amount: '$6,890.00',
      timestamp: new Date(Date.now() - 1800000),
      status: 'pending',
      confidence: 89,
      userId: 'USR-55432',
      location: 'Sydney, AU',
      paymentMethod: 'Cryptocurrency'
    },
    {
      id: 'ALT-2024-006',
      severity: 'medium',
      type: 'Time Anomaly',
      description: 'Transaction outside normal user activity hours',
      amount: '$1,450.00',
      timestamp: new Date(Date.now() - 2400000),
      status: 'resolved',
      confidence: 68,
      userId: 'USR-33221',
      location: 'Berlin, DE',
      paymentMethod: 'Mobile Payment'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'high': return 'bg-warning/10 border-warning/20';
      case 'medium': return 'bg-accent/10 border-accent/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating': return 'text-warning';
      case 'escalated': return 'text-error';
      case 'pending': return 'text-accent';
      case 'reviewing': return 'text-primary';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filteredAlerts = fraudAlerts.filter(alert => 
    filterSeverity === 'all' || alert.severity === filterSeverity
  );

  const handleInvestigate = (alertId) => {
    console.log(`Investigating alert: ${alertId}`);
    // Mock investigation action
  };

  const handleEscalate = (alertId) => {
    console.log(`Escalating alert: ${alertId}`);
    // Mock escalation action
  };

  const handleResolve = (alertId) => {
    console.log(`Resolving alert: ${alertId}`);
    // Mock resolution action
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={24} className="text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Fraud Alert Queue</h3>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Total: {filteredAlerts.length}</span>
          <span>•</span>
          <span className="text-error">Critical: {filteredAlerts.filter(a => a.severity === 'critical').length}</span>
          <span>•</span>
          <span className="text-warning">High: {filteredAlerts.filter(a => a.severity === 'high').length}</span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 border-b border-border hover:bg-muted/50 transition-micro cursor-pointer ${
              selectedAlert?.id === alert.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBg(alert.severity)} ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground">{alert.type}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{formatTimestamp(alert.timestamp)}</span>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(alert.status).replace('text-', 'bg-')}`}></div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs">
                <span className="font-medium text-foreground">{alert.amount}</span>
                <span className="text-muted-foreground">ID: {alert.id}</span>
                <span className="text-muted-foreground">Confidence: {alert.confidence}%</span>
              </div>
              <div className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
                {alert.status.toUpperCase()}
              </div>
            </div>

            {selectedAlert?.id === alert.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">User ID:</span>
                    <p className="font-medium text-foreground">{alert.userId}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium text-foreground">{alert.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment Method:</span>
                    <p className="font-medium text-foreground">{alert.paymentMethod}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ML Confidence:</span>
                    <p className="font-medium text-foreground">{alert.confidence}%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {alert.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleInvestigate(alert.id)}
                        iconName="Search"
                        iconPosition="left"
                      >
                        Investigate
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleEscalate(alert.id)}
                        iconName="AlertTriangle"
                        iconPosition="left"
                      >
                        Escalate
                      </Button>
                    </>
                  )}
                  {alert.status === 'investigating' && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleResolve(alert.id)}
                      iconName="Check"
                      iconPosition="left"
                    >
                      Resolve
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    iconName="ExternalLink"
                    iconPosition="left"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No fraud alerts match the current filter</p>
        </div>
      )}
    </div>
  );
};

export default FraudAlertQueue;