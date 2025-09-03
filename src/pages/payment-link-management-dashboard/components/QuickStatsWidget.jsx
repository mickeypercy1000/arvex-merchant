import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStatsWidget = ({ stats }) => {
  const quickStatsData = [
    {
      label: 'Total Links',
      value: stats?.totalLinks || '0',
      icon: 'Link',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12 this month',
      changeType: 'positive'
    },
    {
      label: 'Total Revenue',
      value: stats?.totalRevenue || '$0.00',
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+15.3% from last month',
      changeType: 'positive'
    },
    {
      label: 'Avg Conversion',
      value: stats?.avgConversionRate || '0%',
      icon: 'Target',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+2.1% from last month',
      changeType: 'positive'
    }
  ];

  const topPerformingLinks = [
    {
      name: 'Premium Package Link',
      conversions: 23,
      revenue: '$6,877.00',
      rate: '18.1%'
    },
    {
      name: 'Monthly Subscription',
      conversions: 34,
      revenue: '$1,699.66',
      rate: '38.2%'
    },
    {
      name: 'Enterprise License',
      conversions: 3,
      revenue: '$5,997.00',
      rate: '4.5%'
    },
    {
      name: 'Training Course Fee',
      conversions: 8,
      revenue: '$639.92',
      rate: '34.8%'
    }
  ];

  const recentActivity = [
    {
      action: 'New payment completed',
      link: 'Premium Package Link',
      amount: '$299.00',
      time: '2 minutes ago',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      action: 'Payment link created',
      link: 'Consultation Fee',
      amount: '$150.00',
      time: '1 hour ago',
      icon: 'Plus',
      color: 'text-primary'
    },
    {
      action: 'Payment failed',
      link: 'Basic Plan Upgrade',
      amount: '$19.99',
      time: '3 hours ago',
      icon: 'XCircle',
      color: 'text-error'
    },
    {
      action: 'Link expired',
      link: 'Limited Time Offer',
      amount: '$49.99',
      time: '1 day ago',
      icon: 'Clock',
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats Cards */}
      <div className="bg-card rounded-lg border border-border shadow-elevation">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Quick Stats</h3>
        </div>
        <div className="p-4 space-y-4">
          {quickStatsData.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
              <div className="flex items-center space-x-3">
                <Icon name={stat.icon} size={24} className={stat.color} />
                <div className="flex-1">
                  <div className={`text-xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className={`text-xs mt-1 ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-error'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Links */}
      <div className="bg-card rounded-lg border border-border shadow-elevation">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Top Performing Links</h3>
            <Button variant="ghost" size="sm" iconName="BarChart3">
              View All
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {topPerformingLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">
                    {link.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {link.conversions} conversions • {link.rate}
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground ml-2">
                  {link.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border shadow-elevation">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <Button variant="ghost" size="sm" iconName="Activity">
              View All
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-lg ${
                  activity.color === 'text-success' ? 'bg-success/10' :
                  activity.color === 'text-primary' ? 'bg-primary/10' :
                  activity.color === 'text-error'? 'bg-error/10' : 'bg-warning/10'
                }`}>
                  <Icon name={activity.icon} size={12} className={activity.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground">
                    {activity.action}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {activity.link} • {activity.amount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border shadow-elevation">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Quick Actions</h3>
        </div>
        <div className="p-4 space-y-3">
          <Button variant="outline" size="sm" className="w-full" iconName="Link" iconPosition="left">
            Create New Link
          </Button>
          <Button variant="outline" size="sm" className="w-full" iconName="BarChart3" iconPosition="left">
            View Analytics
          </Button>
          <Button variant="outline" size="sm" className="w-full" iconName="Download" iconPosition="left">
            Export Data
          </Button>
          <Button variant="outline" size="sm" className="w-full" iconName="Settings" iconPosition="left">
            Link Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsWidget;