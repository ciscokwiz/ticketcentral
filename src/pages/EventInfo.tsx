import { useParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ref, get } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const EventInfo = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) throw new Error("Event ID is required");
      const eventRef = ref(rtdb, `events/${id}`);
      const snapshot = await get(eventRef);
      if (!snapshot.exists()) {
        throw new Error("Event not found");
      }
      return {
        id,
        ...snapshot.val()
      };
    }
  });

  const handleAddToCart = () => {
    if (!event) return;

    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === event.id);

    if (existingItemIndex >= 0) {
      toast({
        title: "Already in cart",
        description: "This event is already in your cart",
      });
      return;
    }

    const newItem = {
      id: event.id,
      title: event.title,
      price: event.price,
      quantity: 1,
      totalPrice: event.price,
      date: event.date
    };

    cartItems.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    toast({
      title: "Added to cart",
      description: "Event has been added to your cart",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container-padding py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="heading-lg mb-4">{event.title}</h1>
            <p className="text-neutral-600 text-lg mb-8">{event.description}</p>
            
            {event.images && event.images.length > 0 && (
              <Carousel className="w-full max-w-4xl mx-auto mb-12">
                <CarouselContent>
                  {event.images.map((image: string, index: number) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        alt={`${event.title} - Image ${index + 1}`}
                        className="w-full h-[400px] object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
                <div className="space-y-4 text-neutral-600">
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Category:</strong> {event.category}</p>
                  <p><strong>Price:</strong> ${event.price}</p>
                  <p><strong>Available Tickets:</strong> {event.availableTickets}</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Organizer's Remarks</h2>
                <p className="text-neutral-600 mb-6">{event.organizerRemarks}</p>
                {event.additionalInfo && (
                  <>
                    <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                    <p className="text-neutral-600">{event.additionalInfo}</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="px-8" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventInfo;