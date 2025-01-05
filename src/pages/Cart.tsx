import { useEffect, useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ref, update, get } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { useAuth } from "@/contexts/AuthContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

interface CartItem {
  id: number;
  title: string;
  price: number; // Changed from string to number
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
    // Convert price strings to numbers when loading from localStorage
    const parsedItems = items.map((item: any) => ({
      ...item,
      price: parseFloat(item.price) || 0,
      totalPrice: parseFloat(item.totalPrice) || 0
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
      for (const item of cartItems) {
        if (item.price === 0) {
          const eventRef = ref(rtdb, `events/${item.id}`);
          const eventSnapshot = await get(eventRef);
          const eventData = eventSnapshot.val();

          if (!eventData) {
            throw new Error(`Event ${item.id} not found`);
          }

          if (eventData.availableTickets < item.quantity) {
            throw new Error(`Not enough tickets available for ${eventData.title}`);
          }

          const updates: { [key: string]: any } = {};
          
          // Update available tickets with exact quantity
          updates[`events/${item.id}/availableTickets`] = eventData.availableTickets - item.quantity;
          
          // Update user's purchased tickets
          const userTicketsRef = `users/${currentUser.uid}/purchasedTickets/${item.id}`;
          const existingTicketsSnapshot = await get(ref(rtdb, userTicketsRef));
          const existingTickets = existingTicketsSnapshot.val() || 0;
          updates[userTicketsRef] = existingTickets + item.quantity;

          await update(ref(rtdb), updates);
        }
      }

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
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process free tickets",
      });
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
      
      <main className="container mx-auto px-4 pt-12 lg:pt-32 pb-16">
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
