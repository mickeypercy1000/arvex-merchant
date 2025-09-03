import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskKPICard = ({ title, value, change, changeType, icon, threshold, status, description }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case 'critical': return 'bg-error/10';
      case 'high': return 'bg-warning/10';
      case 'medium': return 'bg-accent/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getStatusBgColor()}`}>
          <Icon name={icon} size={24} className={getStatusColor()} />
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor()} ${getStatusColor()}`}>
          {status.toUpperCase()}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {change && (
            <span className={`text-sm font-medium ${getChangeColor()}`}>
              {changeType === 'positive' ? '+' : ''}{change}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {threshold && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Threshold</span>
              <span>{threshold.current}/{threshold.max}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  (threshold.current / threshold.max) > 0.8 ? 'bg-error' :
                  (threshold.current / threshold.max) > 0.6 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${Math.min((threshold.current / threshold.max) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskKPICard;