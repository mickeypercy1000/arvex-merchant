import React from 'react';
import { cn } from '../../../utils/cn';

const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step.id < currentStep
                    ? "bg-success text-white"
                    : step.id === currentStep
                    ? "bg-primary text-white" :"bg-muted text-muted-foreground"
                )}
              >
                {step.id < currentStep ? (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              
              {/* Step Label - Hidden on mobile */}
              <div className="hidden sm:block text-center mt-2">
                <p className={cn(
                  "text-xs font-medium",
                  step.id <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2">
                <div
                  className={cn(
                    "h-0.5 transition-colors",
                    step.id < currentStep
                      ? "bg-success" :"bg-muted"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Step Label */}
      <div className="sm:hidden text-center">
        <p className="text-sm font-medium text-foreground">
          {steps[currentStep - 1]?.title}
        </p>
        <p className="text-xs text-muted-foreground">
          Step {currentStep} of {steps.length}
        </p>
      </div>

      {/* Progress Percentage */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;