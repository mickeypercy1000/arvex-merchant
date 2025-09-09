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
    <div className={`p-3 sm:p-4 lg:p-6 rounded-lg border transition-micro ${getStatusColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1.5 sm:mb-2">
            <Icon name={icon} size={16} className={`sm:size-5 ${getIconColor()}`} />
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</h3>
          </div>
          
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-muted rounded w-16 sm:w-24 mb-1 sm:mb-2"></div>
              <div className="h-3 sm:h-4 bg-muted rounded w-12 sm:w-16"></div>
            </div>
          ) : (
            <>
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-0.5 sm:mb-1 truncate">
                {value}
              </div>
              {subtitle && (
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 truncate">{subtitle}</p>
              )}
              {change && (
                <div className="flex items-center space-x-1 min-w-0">
                  <Icon 
                    name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                    className={`sm:size-4 ${getChangeColor()}`} 
                  />
                  <span className={`text-xs sm:text-sm font-medium ${getChangeColor()} truncate`}>
                    {change}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">vs last hour</span>
                </div>
              )}
            </>
          )}
        </div>
        
        {status !== 'normal' && (
          <div className="flex items-center justify-center w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-pulse flex-shrink-0 ml-2">
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