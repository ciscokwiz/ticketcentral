import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ref, get } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import EventForm from "@/components/events/EventForm";
import { EventData, updateEvent } from "@/services/eventService";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      if (!id) throw new Error('Event ID is required');
      const eventRef = ref(rtdb, `events/${id}`);
      const snapshot = await get(eventRef);
      if (!snapshot.exists()) throw new Error('Event not found');
      return { id, ...snapshot.val() } as EventData;
    }
  });

  const handleSubmit = async (eventData: Omit<EventData, "id">) => {
    if (!id) return;
    await updateEvent(id, eventData);
    navigate('/manage-events');
  };

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
      
      <main className="container-padding pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="heading-lg mb-8">Edit Event</h1>
          <div className="glass-panel p-6 rounded-lg">
            {event && <EventForm initialData={event} onSubmit={handleSubmit} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditEvent;