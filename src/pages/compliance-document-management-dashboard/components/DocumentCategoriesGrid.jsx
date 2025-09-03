import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCategoriesGrid = ({ categories, onCategorySelect, onFileUpload }) => {
  const getStatusIcon = (status, uploaded, total) => {
    switch (status) {
      case 'approved':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'pending':
        return <Icon name="Clock" size={20} className="text-warning" />;
      case 'under-review':
        return <Icon name="Eye" size={20} className="text-primary" />;
      case 'rejected':
        return <Icon name="XCircle" size={20} className="text-error" />;
      case 'incomplete':
        return <Icon name="AlertCircle" size={20} className="text-warning" />;
      default:
        return <Icon name="FileText" size={20} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status, uploaded, total) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending Review';
      case 'under-review':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      case 'incomplete':
        return `${uploaded}/${total} Uploaded`;
      default:
        return 'Not Started';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'under-review':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'rejected':
        return 'bg-error/10 text-error border-error/20';
      case 'incomplete':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleFileInputChange = (event, categoryId) => {
    const files = event.target.files;
    if (files?.length > 0) {
      onFileUpload(files, categoryId);
    }
    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Document Categories</h2>
        <p className="text-muted-foreground text-sm">
          Click on a category to upload documents or view details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-card rounded-lg border border-border shadow-elevation hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onCategorySelect(category)}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {category.description}
                  </p>
                </div>
                <div className="ml-4">
                  {getStatusIcon(category.status, category.uploaded, category.total)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Progress: {category.uploaded}/{category.total}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((category.uploaded / category.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(category.uploaded / category.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(category.status)}`}>
                  {getStatusText(category.status, category.uploaded, category.total)}
                </span>
                <span className="text-xs text-muted-foreground">
                  Updated {category.lastUpdated.toLocaleDateString()}
                </span>
              </div>

              {/* Required Documents */}
              <div className="mb-4">
                <h4 className="font-medium text-sm text-foreground mb-2">Required Documents:</h4>
                <div className="space-y-1">
                  {category.required.slice(0, 3).map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon 
                        name={index < category.uploaded ? "CheckCircle" : "Circle"} 
                        size={14} 
                        className={index < category.uploaded ? "text-success" : "text-muted-foreground"} 
                      />
                      <span className="text-xs text-muted-foreground">{doc}</span>
                    </div>
                  ))}
                  {category.required.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{category.required.length - 3} more...
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategorySelect(category);
                  }}
                  className="flex-1"
                >
                  <Icon name="Eye" size={14} className="mr-2" />
                  View Details
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => handleFileInputChange(e, category.id)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Button
                    variant="default"
                    size="sm"
                    className="pointer-events-none"
                  >
                    <Icon name="Upload" size={14} className="mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentCategoriesGrid;