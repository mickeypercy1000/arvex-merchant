import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  status = 'normal',
  subtitle,
  isLoading = false 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'border-success bg-success/5';
      case 'warning': return 'border-warning bg-warning/5';
      case 'error': return 'border-error bg-error/5';
      default: return 'border-border bg-card';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getIconColor = () => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-primary';
    }
  };

  return (
    <div className={`p-6 rounded-lg border transition-micro ${getStatusColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className={getIconColor()} />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-24 mb-2"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
          ) : (
            <>
              <div className="text-3xl font-semibold text-foreground mb-1">
                {value}
              </div>
              {subtitle && (
                <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
              )}
              {change && (
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
                    size={16} 
                    className={getChangeColor()} 
                  />
                  <span className={`text-sm font-medium ${getChangeColor()}`}>
                    {change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs last hour</span>
                </div>
              )}
            </>
          )}
        </div>
        
        {status !== 'normal' && (
          <div className="flex items-center justify-center w-3 h-3 rounded-full animate-pulse">
            <div className={`w-full h-full rounded-full ${
              status === 'success' ? 'bg-success' : 
              status === 'warning' ? 'bg-warning' : 'bg-error'
            }`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;