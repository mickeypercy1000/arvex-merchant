import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentViewer = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{document?.name || 'Document Viewer'}</h3>
              <p className="text-muted-foreground text-sm">{document?.category || 'Unknown Category'}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 h-96">
          <div className="flex items-center justify-center h-full bg-muted/50 rounded-lg">
            <div className="text-center">
              <Icon name="FileText" size={64} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Document preview would appear here</p>
              <p className="text-muted-foreground text-sm mt-2">
                In a real implementation, this would show the document content
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Printer" size={16} className="mr-2" />
                Print
              </Button>
            </div>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;