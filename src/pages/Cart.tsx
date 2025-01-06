import { useEffect, useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { processCheckout } from "@/utils/checkoutUtils";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  date: string;
  tierName?: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [processing, setProcessing] = useState(false);
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    const parsedItems = items.map((item: any) => ({
      ...item,
      price: parseFloat(item.price) || 0,
      totalPrice: parseFloat(item.totalPrice) || 0,
      quantity: parseInt(item.quantity) || 1
    }));
    setCartItems(parsedItems);
  }, []);

  const updateQuantity = (itemId: number, increment: boolean) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + (increment ? 1 : -1));
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.price * newQuantity
          };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeItem = (itemId: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleFreeEventCheckout = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please login to continue.",
      });
      navigate('/login');
      return;
    }

    setProcessing(true);
    try {
      await processCheckout(cartItems, currentUser.uid);
      
      localStorage.setItem('cart', '[]');
      setCartItems([]);
      
      toast({
        title: "Success!",
        description: "Your free tickets have been reserved.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to process checkout",
      });
      console.error("Checkout error:", error);
    } finally {
      setProcessing(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const hasOnlyFreeEvents = cartItems.length > 0 && cartItems.every(item => item.price === 0);

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
                  <CartItem
                    key={item.id}
                    {...item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              
              <div>
                <CartSummary
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  hasOnlyFreeEvents={hasOnlyFreeEvents}
                  processing={processing}
                  onCheckout={handleFreeEventCheckout}
                  onPayment={() => navigate('/payment')}
                />
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