import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ref, get } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import EventForm from "@/components/events/EventForm";
import { EventData } from "@/services/eventService";

const EditEvent = () => {
  const { id } = useParams();
  
  const { data: event, isLoading } = useQuery<EventData>({
    queryKey: ['event', id],
    queryFn: async () => {
      const eventRef = ref(rtdb, `events/${id}`);
      const snapshot = await get(eventRef);
      if (!snapshot.exists()) throw new Error('Event not found');
      return { id, ...snapshot.val() };
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="container-padding pt-32 pb-16">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container-padding pt-12 lg:pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="heading-lg mb-8">Edit Event</h1>
          <div className="glass-panel p-6 rounded-lg">
            {event && <EventForm initialData={event} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditEvent;