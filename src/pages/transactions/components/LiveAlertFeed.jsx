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
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <Icon name="Bell" size={18} className="sm:size-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Live Alerts</h3>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-success font-medium">Live</span>
          </div>
        </div>

        {/* Alert Type Filters */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
          {alertTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setFilter(type.key)}
              className={`flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-micro ${
                filter === type.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <span className="truncate">{type.label}</span>
              {type.count > 0 && (
                <span className={`px-1 sm:px-1.5 py-0.5 rounded-full text-xs ${
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
          <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 text-center">
            <Icon name="CheckCircle" size={40} className="sm:size-12 text-success mb-3 sm:mb-4" />
            <h4 className="text-base sm:text-lg font-medium text-foreground mb-1 sm:mb-2">All Clear!</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              No {filter !== 'all' ? filter : ''} alerts at the moment
            </p>
          </div>
        ) : (
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            {filteredAlerts.map((alert) => {
              const config = getSeverityConfig(alert.severity);
              const isExpanded = expandedAlert === alert.id;
              
              return (
                <div
                  key={alert.id}
                  className={`border rounded-lg transition-micro ${config.borderColor} ${config.bgColor}`}
                >
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Icon 
                        name={config.icon} 
                        size={16} 
                        className={`sm:size-5 ${config.color} mt-0.5 flex-shrink-0`} 
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-medium text-foreground mb-1 line-clamp-2">
                              {alert.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                              {alert.message}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs text-muted-foreground">
                              <span>{formatTimeAgo(alert.timestamp)}</span>
                              {alert.source && <span className="truncate">Source: {alert.source}</span>}
                              {alert.transactionId && (
                                <span className="truncate">TX: {alert.transactionId}</span>
                              )}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                            className="ml-2 p-1 hover:bg-foreground/5 rounded transition-micro flex-shrink-0"
                          >
                            <Icon 
                              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                              size={14} 
                              className="sm:size-4 text-muted-foreground" 
                            />
                          </button>
                        </div>

                        {/* Quick Actions */}
                        {!isExpanded && (
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-3">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                              className="text-xs"
                            >
                              Acknowledge
                            </Button>
                            {alert.severity === 'critical' && (
                              <Button
                                variant="destructive"
                                size="xs"
                                onClick={() => handleAlertAction(alert.id, 'escalate')}
                                className="text-xs"
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
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                        <div className="space-y-2 sm:space-y-3">
                          {alert.details && (
                            <div>
                              <h5 className="text-xs sm:text-sm font-medium text-foreground mb-1">Details</h5>
                              <p className="text-xs sm:text-sm text-muted-foreground">{alert.details}</p>
                            </div>
                          )}
                          
                          {alert.affectedSystems && (
                            <div>
                              <h5 className="text-xs sm:text-sm font-medium text-foreground mb-1">Affected Systems</h5>
                              <div className="flex flex-wrap gap-1">
                                {alert.affectedSystems.map((system, index) => (
                                  <span 
                                    key={index}
                                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted text-xs text-muted-foreground rounded"
                                  >
                                    {system}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                              className="text-xs sm:text-sm"
                            >
                              Acknowledge
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAlertAction(alert.id, 'view_details')}
                              className="text-xs sm:text-sm"
                            >
                              View Details
                            </Button>
                            {alert.severity === 'critical' && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleAlertAction(alert.id, 'escalate')}
                                className="text-xs sm:text-sm"
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