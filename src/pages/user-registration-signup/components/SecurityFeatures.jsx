import React from 'react';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Grade Security',
      description: '256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Data Storage',
      description: 'SOC 2 Type II certified'
    },
    {
      icon: 'Eye',
      title: 'Fraud Monitoring',
      description: 'Real-time detection'
    },
    {
      icon: 'CheckCircle',
      title: 'Compliance Ready',
      description: 'PCI DSS compliant'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>24/7 Monitoring</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;