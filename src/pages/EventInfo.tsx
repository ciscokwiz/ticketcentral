import { useParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const EventInfo = () => {
  const { id } = useParams();
  
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      // This would be replaced with your actual API call
      return {
        id: "1",
        title: "Summer Music Festival",
        description: "Join us for an unforgettable summer music festival featuring top artists from around the world. Experience amazing performances, great food, and incredible atmosphere.",
        category: "Music",
        date: "2024-07-15",
        price: 99.99,
        location: "Central Park",
        availableTickets: 500,
        images: [
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
          "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
          "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac"
        ],
        organizerRemarks: "This year's festival promises to be our biggest yet. We've curated an incredible lineup of artists and have enhanced the venue layout for an optimal experience.",
        additionalInfo: "Please bring valid ID. No outside food or drinks allowed. Free parking available."
      };
    }
  });

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
            
            <Carousel className="w-full max-w-4xl mx-auto mb-12">
              <CarouselContent>
                {event.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={`${image}?auto=format&fit=crop&w=1200&q=80`}
                      alt={`${event.title} - Image ${index + 1}`}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

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
                <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                <p className="text-neutral-600">{event.additionalInfo}</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="px-8">
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