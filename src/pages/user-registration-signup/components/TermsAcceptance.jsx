import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const TermsAcceptance = ({ onComplete, isLoading }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!acceptedTerms || !acceptedPrivacy) {
      setError('Please accept both the Terms of Service and Privacy Policy to continue');
      return;
    }

    setError('');
    onComplete({ 
      termsAccepted: acceptedTerms, 
      privacyAccepted: acceptedPrivacy,
      acceptanceTimestamp: new Date().toISOString()
    });
  };

  const handleTermsChange = (checked) => {
    setAcceptedTerms(checked);
    if (error) setError('');
  };

  const handlePrivacyChange = (checked) => {
    setAcceptedPrivacy(checked);
    if (error) setError('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Before we complete your registration, please review and accept our terms.
        </p>
      </div>

      {/* Terms and Privacy Policy */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Terms of Service */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => handleTermsChange(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring"
            />
            <div className="flex-1">
              <label htmlFor="terms" className="text-sm text-foreground cursor-pointer">
                I agree to ArvexPay's{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(!showTerms)}
                  className="text-primary hover:underline font-medium"
                >
                  Terms of Service
                </button>
                <span className="text-destructive ml-1">*</span>
              </label>
              
              {showTerms && (
                <div className="mt-3 p-4 bg-muted/50 rounded-lg max-h-40 overflow-y-auto">
                  <div className="text-xs text-muted-foreground space-y-2">
                    <h4 className="font-medium text-foreground">Terms of Service</h4>
                    <p>
                      By using ArvexPay's services, you agree to comply with and be bound by the following terms and conditions:
                    </p>
                    <p>
                      <strong>1. Account Registration:</strong> You must provide accurate and complete information when creating your account. You are responsible for maintaining the confidentiality of your account credentials.
                    </p>
                    <p>
                      <strong>2. Service Usage:</strong> You agree to use our services only for lawful purposes and in accordance with applicable laws and regulations.
                    </p>
                    <p>
                      <strong>3. Financial Compliance:</strong> You understand that all transactions are subject to anti-money laundering (AML) and know-your-customer (KYC) requirements.
                    </p>
                    <p>
                      <strong>4. Data Security:</strong> We implement industry-standard security measures to protect your information, but you acknowledge the inherent risks of electronic transactions.
                    </p>
                    <p>
                      <strong>5. Service Availability:</strong> While we strive for continuous service availability, we do not guarantee uninterrupted access to our platform.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="privacy"
              checked={acceptedPrivacy}
              onChange={(e) => handlePrivacyChange(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring"
            />
            <div className="flex-1">
              <label htmlFor="privacy" className="text-sm text-foreground cursor-pointer">
                I acknowledge that I have read and understand ArvexPay's{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacy(!showPrivacy)}
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </button>
                <span className="text-destructive ml-1">*</span>
              </label>
              
              {showPrivacy && (
                <div className="mt-3 p-4 bg-muted/50 rounded-lg max-h-40 overflow-y-auto">
                  <div className="text-xs text-muted-foreground space-y-2">
                    <h4 className="font-medium text-foreground">Privacy Policy</h4>
                    <p>
                      ArvexPay is committed to protecting your privacy and ensuring the security of your personal information.
                    </p>
                    <p>
                      <strong>Information We Collect:</strong> We collect information you provide directly, usage data, and information from third parties as necessary for our services.
                    </p>
                    <p>
                      <strong>How We Use Information:</strong> Your information is used to provide services, prevent fraud, comply with legal requirements, and improve our platform.
                    </p>
                    <p>
                      <strong>Information Sharing:</strong> We may share information with service providers, regulatory authorities, and in cases required by law, but never sell your personal data.
                    </p>
                    <p>
                      <strong>Data Security:</strong> We use encryption, secure protocols, and regular security audits to protect your information.
                    </p>
                    <p>
                      <strong>Your Rights:</strong> You have the right to access, update, or delete your personal information, subject to legal and contractual restrictions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        {/* Compliance Notice */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Regulatory Compliance</p>
              <p>
                As a financial technology platform, ArvexPay operates under strict regulatory guidelines. 
                Your account may be subject to identity verification, transaction monitoring, and compliance 
                checks to ensure the security and legality of all transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Complete Registration Button */}
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading || !acceptedTerms || !acceptedPrivacy}
          className="w-full"
          size="lg"
          iconName="Check"
        >
          {isLoading ? 'Creating Your Account...' : 'Complete Registration'}
        </Button>
      </form>

      {/* Additional Information */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          By completing registration, you acknowledge that your account will be activated 
          and you'll receive a welcome email with next steps.
        </p>
        <p className="text-xs text-muted-foreground">
          Need help? Contact our{' '}
          <button className="text-primary hover:underline">
            customer support team
          </button>
        </p>
      </div>
    </div>
  );
};

export default TermsAcceptance;