import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceOverview = ({ data }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 70) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 min-w-[300px]">
      <div className="flex items-center space-x-4">
        {/* Compliance Score */}
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBgColor(data.overallScore)}`}>
            <span className={`text-xl font-bold ${getScoreColor(data.overallScore)}`}>
              {data.overallScore}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Compliance Score</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Icon name="FileText" size={16} className="text-primary" />
              <span className="font-semibold text-lg text-foreground">{data.totalDocuments}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Documents</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="font-semibold text-lg text-foreground">{data.pendingReview}</span>
            </div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="font-semibold text-lg text-foreground">{data.approved}</span>
            </div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Icon name="XCircle" size={16} className="text-error" />
              <span className="font-semibold text-lg text-foreground">{data.rejected}</span>
            </div>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceOverview;