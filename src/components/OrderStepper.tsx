import React from 'react';

interface OrderStepperProps {
  steps: string[];
  currentStep: number;
}

export const OrderStepper: React.FC<OrderStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <span
            key={step}
            className={`text-sm ${
              index <= currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
      <div className="step-indicator">
        <div
          className="step-indicator-progress"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};