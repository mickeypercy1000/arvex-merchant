import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import DocumentUploadInterface from './components/DocumentUploadInterface';
import DocumentCategoriesGrid from './components/DocumentCategoriesGrid';
import ComplianceOverview from './components/ComplianceOverview';
import DocumentViewer from './components/DocumentViewer';

const ComplianceDocumentManagementDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadQueue, setUploadQueue] = useState([]);

  // Mock compliance data
  const complianceData = {
    overallScore: 85,
    totalDocuments: 24,
    pendingReview: 3,
    approved: 18,
    rejected: 2,
    expired: 1
  };

  const documentCategories = [
    {
      id: 'company-registration',
      title: 'Company Registration',
      description: 'Articles of incorporation, business licenses',
      required: ['Certificate of Incorporation', 'Business License', 'Tax Registration'],
      uploaded: 3,
      total: 3,
      status: 'approved',
      lastUpdated: new Date('2024-01-15')
    },
    {
      id: 'tax-documents',
      title: 'Tax Documents',
      description: 'Tax returns, certificates, compliance records',
      required: ['Tax Return 2023', 'Tax Clearance Certificate', 'VAT Registration'],
      uploaded: 2,
      total: 3,
      status: 'pending',
      lastUpdated: new Date('2024-01-20')
    },
    {
      id: 'banking-information',
      title: 'Banking Information',
      description: 'Bank statements, account verification',
      required: ['Bank Statement', 'Account Verification Letter', 'Direct Debit Mandate'],
      uploaded: 3,
      total: 3,
      status: 'approved',
      lastUpdated: new Date('2024-01-18')
    },
    {
      id: 'identity-verification',
      title: 'Identity Verification',
      description: 'ID cards, passports, proof of address',
      required: ['ID Card Front', 'ID Card Back', 'Passport', 'Proof of Address'],
      uploaded: 1,
      total: 4,
      status: 'incomplete',
      lastUpdated: new Date('2024-01-10')
    },
    {
      id: 'regulatory-licenses',
      title: 'Regulatory Licenses',
      description: 'Industry-specific permits and certifications',
      required: ['Financial Services License', 'Data Protection Certificate'],
      uploaded: 2,
      total: 2,
      status: 'under-review',
      lastUpdated: new Date('2024-01-22')
    }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
  };

  const handleFileUpload = (files, categoryId) => {
    const newUploads = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      categoryId,
      progress: 0,
      status: 'uploading'
    }));
    
    setUploadQueue(prev => [...prev, ...newUploads]);
    
    // Simulate upload progress
    newUploads.forEach(upload => {
      simulateUploadProgress(upload.id);
    });
  };

  const simulateUploadProgress = (uploadId) => {
    const interval = setInterval(() => {
      setUploadQueue(prev => 
        prev.map(upload => {
          if (upload.id === uploadId) {
            const newProgress = upload.progress + Math.random() * 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...upload, progress: 100, status: 'completed' };
            }
            return { ...upload, progress: newProgress };
          }
          return upload;
        })
      );
    }, 500);
  };

  const removeFromQueue = (uploadId) => {
    setUploadQueue(prev => prev.filter(upload => upload.id !== uploadId));
  };

  return (
    <>
      <Helmet>
        <title>Compliance Document Management Dashboard - FinTech Analytics</title>
        <meta name="description" content="Secure document upload, tracking, and management dashboard for regulatory compliance with comprehensive approval workflows." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="pt-16 pl-64">
          {/* Dashboard Header */}
          <div className="bg-card border-b border-border shadow-elevation">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="FileCheck" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Compliance Document Management</h1>
                    <p className="text-muted-foreground">
                      Secure upload, tracking, and approval of regulatory documents
                    </p>
                  </div>
                </div>
                <ComplianceOverview data={complianceData} />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-8">
                <div className="space-y-8">
                  {/* Document Categories Grid */}
                  <DocumentCategoriesGrid
                    categories={documentCategories}
                    onCategorySelect={handleCategorySelect}
                    onFileUpload={handleFileUpload}
                  />

                  {/* Document Upload Interface */}
                  {selectedCategory && (
                    <DocumentUploadInterface
                      category={selectedCategory}
                      onFileUpload={handleFileUpload}
                      onClose={() => setSelectedCategory(null)}
                    />
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-4">
                <div className="space-y-6">
                  {/* Upload Queue */}
                  <div className="bg-card rounded-lg border border-border shadow-elevation">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center space-x-2">
                        <Icon name="Upload" size={20} className="text-primary" />
                        <h3 className="font-semibold text-foreground">Upload Queue</h3>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {uploadQueue.length}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      {uploadQueue.length === 0 ? (
                        <div className="text-center py-8">
                          <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground text-sm">No uploads in progress</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {uploadQueue.map(upload => (
                            <div key={upload.id} className="border border-border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm text-foreground truncate">
                                  {upload.file.name}
                                </span>
                                <button
                                  onClick={() => removeFromQueue(upload.id)}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  <Icon name="X" size={16} />
                                </button>
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="flex-1 bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${Math.min(upload.progress, 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {Math.round(upload.progress)}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{Math.round(upload.file.size / 1024)} KB</span>
                                <span className={`px-2 py-1 rounded-full ${
                                  upload.status === 'completed' ? 'bg-success/10 text-success' :
                                  upload.status === 'uploading'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                                }`}>
                                  {upload.status === 'completed' ? 'Complete' :
                                   upload.status === 'uploading' ? 'Uploading' : 'Failed'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Requirements */}
                  <div className="bg-card rounded-lg border border-border shadow-elevation">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center space-x-2">
                        <Icon name="Info" size={20} className="text-primary" />
                        <h3 className="font-semibold text-foreground">File Requirements</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-foreground mb-2">Supported Formats</h4>
                        <div className="flex flex-wrap gap-2">
                          {['PDF', 'JPG', 'PNG', 'DOC', 'DOCX'].map(format => (
                            <span key={format} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                              {format}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-foreground mb-2">File Size Limit</h4>
                        <p className="text-muted-foreground text-sm">Maximum 10MB per file</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-foreground mb-2">Security</h4>
                        <p className="text-muted-foreground text-sm">All files are encrypted and stored securely</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Viewer Modal */}
          {selectedDocument && (
            <DocumentViewer
              document={selectedDocument}
              onClose={() => setSelectedDocument(null)}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default ComplianceDocumentManagementDashboard;