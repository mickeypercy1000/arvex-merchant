import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { motion, AnimatePresence } from 'framer-motion';

const Compliance = () => {
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [showKycAlert, setShowKycAlert] = useState(true);

  // Mock compliance documents data
  const complianceDocuments = [
    {
      id: 1,
      name: 'Business License',
      status: 'approved',
      uploadDate: '2025-01-10',
      fileName: 'business-license-2025.pdf',
      size: '2.1 MB',
      type: 'Business Registration'
    },
    {
      id: 2,
      name: 'Tax Certificate',
      status: 'approved',
      uploadDate: '2025-01-08',
      fileName: 'tax-certificate.pdf',
      size: '1.8 MB',
      type: 'Tax Documentation'
    },
    {
      id: 3,
      name: 'Bank Statement',
      status: 'pending',
      uploadDate: '2025-01-15',
      fileName: 'bank-statement-jan.pdf',
      size: '3.4 MB',
      type: 'Financial Documentation'
    },
    {
      id: 4,
      name: 'Identity Document',
      status: 'rejected',
      uploadDate: '2025-01-12',
      fileName: 'id-document.jpg',
      size: '1.2 MB',
      type: 'Identity Verification',
      rejectionReason: 'Document image is not clear enough'
    }
  ];

  const handleFileUpload = (files) => {
    Array.from(files)?.forEach((file) => {
      const fileId = Date.now() + Math.random();
      const newFile = {
        id: fileId,
        name: file?.name,
        size: (file?.size / (1024 * 1024))?.toFixed(2) + ' MB',
        progress: 0,
        status: 'uploading'
      };

      setUploadingFiles(prev => [...prev, newFile]);

      // Simulate file upload progress
      const interval = setInterval(() => {
        setUploadingFiles(prev => prev?.map(f => {
          if (f?.id === fileId) {
            const newProgress = f?.progress + Math.random() * 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'completed' };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 300);

      // Remove from uploading list after completion
      setTimeout(() => {
        setUploadingFiles(prev => prev?.filter(f => f?.id !== fileId));
      }, 3000);
    });
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    const files = e?.dataTransfer?.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'rejected':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return 'CheckCircle2';
      case 'pending':
        return 'Clock';
      case 'rejected':
        return 'XCircle';
      default:
        return 'FileText';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className={`transition-all duration-300 pt-16 pb-20 md:pb-4 ${
        isCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-60'
      }`}>
        {/* KYC Alert Sticky Banner */}
        {showKycAlert && (
          <div className="sticky top-16 z-40 mx-6 mt-4 mb-4">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/20 rounded-full">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-warning mb-1">KYC Documentation Required</h3>
                  <p className="text-sm text-yellow-600">
                    Please upload your KYC documents to continue using all platform features. This is required for compliance and security.
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowKycAlert(false)}
                className="text-warning"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bold text-foreground mb-2 text-2xl">Compliance</h1>
              <p className="text-muted-foreground">
                Manage your business compliance documents and verification status
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Download Template
              </Button>
              <Button 
                variant="default"
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh Status
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold text-foreground">4</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-success">2</p>
                </div>
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle2" size={20} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">1</p>
                </div>
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-destructive">1</p>
                </div>
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Icon name="XCircle" size={20} className="text-destructive" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'upload' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Upload" size={16} className="inline mr-2" />
                  Upload Documents
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'documents'
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="FileText" size={16} className="inline mr-2" />
                  My Documents
                </button>
              </nav>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="p-6">
                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragOver
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Drop your documents here or click to browse
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('fileInput')?.click()}
                    iconName="FolderOpen"
                    iconPosition="left"
                  >
                    Choose Files
                  </Button>
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e?.target?.files)}
                  />
                </div>

                {/* Document Type Selection */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Document Type
                    </label>
                    <Select>
                      <option value="">Select document type</option>
                      <option value="business-registration">Business Registration</option>
                      <option value="tax-documentation">Tax Documentation</option>
                      <option value="financial-documentation">Financial Documentation</option>
                      <option value="identity-verification">Identity Verification</option>
                      <option value="insurance">Insurance Certificate</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Document Name
                    </label>
                    <Input placeholder="Enter document name" />
                  </div>
                </div>

                {/* Upload Progress */}
                <AnimatePresence>
                  {uploadingFiles?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 bg-muted/20 rounded-lg p-4"
                    >
                      <h4 className="font-medium text-foreground mb-3">Uploading Files</h4>
                      <div className="space-y-3">
                        {uploadingFiles?.map((file) => (
                          <motion.div
                            key={file?.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-foreground">
                                  {file?.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {file?.size}
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <motion.div
                                  className="bg-primary h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${file?.progress}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${file?.progress}%` }}
                                />
                              </div>
                            </div>
                            <div className="flex items-center">
                              {file?.status === 'completed' ? (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <Icon name="CheckCircle2" size={20} className="text-success" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <Icon name="Loader" size={20} className="text-primary" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="p-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search documents..."
                      iconName="Search"
                      iconPosition="left"
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Select>
                      <option value="all">All Status</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </Select>
                  </div>
                </div>

                {/* Documents List */}
                <div className="space-y-4">
                  {complianceDocuments?.map((doc) => (
                    <motion.div
                      key={doc?.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name="FileText" size={24} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">
                              {doc?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {doc?.type} • {doc?.fileName} • {doc?.size}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded on {new Date(doc.uploadDate)?.toLocaleDateString()}
                            </p>
                            {doc?.rejectionReason && (
                              <p className="text-sm text-destructive mt-2">
                                Rejection reason: {doc?.rejectionReason}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(doc?.status)}`}>
                            <Icon name={getStatusIcon(doc?.status)} size={12} className="inline mr-1" />
                            {doc?.status?.charAt(0)?.toUpperCase() + doc?.status?.slice(1)}
                          </span>
                          <Button variant="ghost" size="sm" iconName="Eye" iconPosition="left">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
                            Download
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Compliance;