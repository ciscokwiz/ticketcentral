import { useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

const PaymentSteps = {
  METHOD: 'method',
  TYPE: 'type',
  DETAILS: 'details'
} as const;

type PaymentStep = typeof PaymentSteps[keyof typeof PaymentSteps];

const Payment = () => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>(PaymentSteps.METHOD);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'bank_card'>('bank_card');
  const [paymentType, setPaymentType] = useState<'full' | 'installment'>('full');
  const [installmentMonths, setInstallmentMonths] = useState(3);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (currentStep === PaymentSteps.METHOD) {
      setCurrentStep(PaymentSteps.TYPE);
    } else if (currentStep === PaymentSteps.TYPE) {
      setCurrentStep(PaymentSteps.DETAILS);
    } else {
      // Process payment
      navigate('/confirmation');
    }
  };

  const renderPaymentMethod = () => (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Select Payment Method</h3>
      <RadioGroup value={paymentMethod} onValueChange={(value: 'bank_transfer' | 'bank_card') => setPaymentMethod(value)}>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
          <Label htmlFor="bank_transfer">Bank Transfer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bank_card" id="bank_card" />
          <Label htmlFor="bank_card">Bank Card</Label>
        </div>
      </RadioGroup>
    </Card>
  );

  const renderPaymentType = () => (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Select Payment Type</h3>
      <RadioGroup value={paymentType} onValueChange={(value: 'full' | 'installment') => setPaymentType(value)}>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="full" id="full" />
          <Label htmlFor="full">Full Payment</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="installment" id="installment" />
          <Label htmlFor="installment">Installment Payment</Label>
        </div>
      </RadioGroup>

      {paymentType === 'installment' && (
        <div className="mt-4">
          <Label>Installment Period: {installmentMonths} months</Label>
          <Slider
            value={[installmentMonths]}
            onValueChange={(value) => setInstallmentMonths(value[0])}
            min={3}
            max={12}
            step={3}
            className="mt-2"
          />
        </div>
      )}
    </Card>
  );

  const renderPaymentDetails = () => (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Payment Details</h3>
      {paymentMethod === 'bank_card' ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-neutral-600 mb-2">
            Please transfer the payment to:
          </p>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="font-mono text-sm">Bank: Example Bank</p>
            <p className="font-mono text-sm">Account: 1234567890</p>
            <p className="font-mono text-sm">Reference: ORDER-123</p>
          </div>
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>
          
          <div className="space-y-6">
            {currentStep === PaymentSteps.METHOD && renderPaymentMethod()}
            {currentStep === PaymentSteps.TYPE && renderPaymentType()}
            {currentStep === PaymentSteps.DETAILS && renderPaymentDetails()}
            
            <Button className="w-full" onClick={handleContinue}>
              {currentStep === PaymentSteps.DETAILS ? 'Complete Payment' : 'Continue'}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;