import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  hasOnlyFreeEvents: boolean;
  processing: boolean;
  onCheckout: () => void;
  onPayment: () => void;
}

const CartSummary = ({
  subtotal,
  tax,
  total,
  hasOnlyFreeEvents,
  processing,
  onCheckout,
  onPayment
}: CartSummaryProps) => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      {hasOnlyFreeEvents ? (
        <Button 
          className="w-full mt-6"
          onClick={onCheckout}
          disabled={processing}
        >
          {processing ? "Processing..." : "Get Free Tickets"}
        </Button>
      ) : (
        <Button 
          className="w-full mt-6"
          onClick={onPayment}
        >
          Proceed to Payment
        </Button>
      )}
    </Card>
  );
};

export default CartSummary;