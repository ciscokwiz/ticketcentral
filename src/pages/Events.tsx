import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import { useEvents } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";
import { ref, update } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { EventData } from "@/services/eventService";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: events = [], isLoading, error } = useEvents();
  
  const categories = [
    "Music",
    "Sports",
    "Theater",
    "Comedy",
    "Arts",
    "Food & Drink",
    "Business",
    "Technology"
  ];

  const handleAddToCart = async (eventId: string, quantity: number) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    if (quantity > event.availableTickets) {
      toast({
        title: "Not enough tickets",
        description: `Only ${event.availableTickets} tickets available`,
        className: "bg-red-50 border-red-100",
      });
      return;
    }

    try {
      // Update available tickets in Firebase
      const eventRef = ref(rtdb, `events/${eventId}`);
      await update(eventRef, {
        availableTickets: event.availableTickets - quantity
      });

      // Add to cart in localStorage
      const cartItem = {
        ...event,
        quantity,
        totalPrice: event.price * quantity
      };
      
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === eventId);
      
      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += quantity;
        existingCart[existingItemIndex].totalPrice = event.price * existingCart[existingItemIndex].quantity;
      } else {
        existingCart.push(cartItem);
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      toast({
        title: "Added to cart",
        description: `${quantity} ticket${quantity > 1 ? 's' : ''} for ${event.title}`,
        className: "bg-green-50 border-green-100",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add to cart. Please try again.",
      });
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="container-padding pt-32 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Loading events...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="container-padding pt-32 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-red-600">Error loading events. Please try again later.</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container-padding pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="heading-lg mb-8">Discover Events</h1>
          
          <EventFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categories={categories}
          />

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No events found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;