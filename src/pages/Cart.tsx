import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  
  // Placeholder cart data
  const cartItems = [
    {
      id: 1,
      eventName: "Summer Music Festival",
      quantity: 2,
      price: 99.99,
      date: "2024-07-15",
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.eventName}</h3>
                        <p className="text-sm text-neutral-600">Date: {item.date}</p>
                        <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div>
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
                  <Button 
                    className="w-full mt-6"
                    onClick={() => navigate('/payment')}
                  >
                    Proceed to Payment
                  </Button>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-neutral-600 mb-4">Your cart is empty</p>
              <Button onClick={() => navigate('/events')}>
                Browse Events
              </Button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;