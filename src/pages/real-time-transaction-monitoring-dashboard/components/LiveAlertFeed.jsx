import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveAlertFeed = ({ alerts, onAlertAction }) => {
  const [filter, setFilter] = useState('all');
  const [expandedAlert, setExpandedAlert] = useState(null);

  const alertTypes = [
    { key: 'all', label: 'All Alerts', count: alerts.length },
    { key: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length },
    { key: 'warning', label: 'Warning', count: alerts.filter(a => a.severity === 'warning').length },
    { key: 'info', label: 'Info', count: alerts.filter(a => a.severity === 'info').length }
  ];

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.severity === filter);

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error',
          icon: 'AlertTriangle'
        };
      case 'warning':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning',
          icon: 'AlertCircle'
        };
      case 'info':
        return {
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary',
          icon: 'Info'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          icon: 'Bell'
        };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - alertTime) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const handleAlertAction = (alertId, action) => {
    onAlertAction?.(alertId, action);
    if (action === 'acknowledge') {
      setExpandedAlert(null);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Live Alerts</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-success font-medium">Live</span>
          </div>
        </div>

        {/* Alert Type Filters */}
        <div className="flex flex-wrap gap-2">
          {alertTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setFilter(type.key)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-micro ${
                filter === type.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <span>{type.label}</span>
              {type.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  filter === type.key
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-foreground/10 text-foreground'
                }`}>
                  {type.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">All Clear!</h4>
            <p className="text-sm text-muted-foreground">
              No {filter !== 'all' ? filter : ''} alerts at the moment
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredAlerts.map((alert) => {
              const config = getSeverityConfig(alert.severity);
              const isExpanded = expandedAlert === alert.id;
              
              return (
                <div
                  key={alert.id}
                  className={`border rounded-lg transition-micro ${config.borderColor} ${config.bgColor}`}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <Icon 
                        name={config.icon} 
                        size={20} 
                        className={`${config.color} mt-0.5 flex-shrink-0`} 
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground mb-1">
                              {alert.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {alert.message}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{formatTimeAgo(alert.timestamp)}</span>
                              {alert.source && <span>Source: {alert.source}</span>}
                              {alert.transactionId && (
                                <span>TX: {alert.transactionId}</span>
                              )}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                            className="ml-2 p-1 hover:bg-foreground/5 rounded transition-micro"
                          >
                            <Icon 
                              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                              size={16} 
                              className="text-muted-foreground" 
                            />
                          </button>
                        </div>

                        {/* Quick Actions */}
                        {!isExpanded && (
                          <div className="flex items-center space-x-2 mt-3">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                            >
                              Acknowledge
                            </Button>
                            {alert.severity === 'critical' && (
                              <Button
                                variant="destructive"
                                size="xs"
                                onClick={() => handleAlertAction(alert.id, 'escalate')}
                              >
                                Escalate
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="space-y-3">
                          {alert.details && (
                            <div>
                              <h5 className="text-sm font-medium text-foreground mb-1">Details</h5>
                              <p className="text-sm text-muted-foreground">{alert.details}</p>
                            </div>
                          )}
                          
                          {alert.affectedSystems && (
                            <div>
                              <h5 className="text-sm font-medium text-foreground mb-1">Affected Systems</h5>
                              <div className="flex flex-wrap gap-1">
                                {alert.affectedSystems.map((system, index) => (
                                  <span 
                                    key={index}
                                    className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                                  >
                                    {system}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                            >
                              Acknowledge
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAlertAction(alert.id, 'view_details')}
                            >
                              View Details
                            </Button>
                            {alert.severity === 'critical' && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleAlertAction(alert.id, 'escalate')}
                              >
                                Escalate
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAlertFeed;