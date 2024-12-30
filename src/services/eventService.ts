import { ref, push, get, child } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { toast } from '@/components/ui/use-toast';

export interface EventData {
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  price: number;
  image: string;
  availableTickets: number;
  organizerId: string;
  createdAt: string;
}

export const createEvent = async (eventData: EventData) => {
  try {
    const eventsRef = ref(rtdb, 'events');
    const newEventRef = await push(eventsRef, eventData);
    
    toast({
      title: "Success!",
      description: "Event created successfully",
    });
    
    return newEventRef.key;
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to create event. Please try again.",
    });
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const eventsRef = ref(rtdb);
    const snapshot = await get(child(eventsRef, 'events'));
    
    if (snapshot.exists()) {
      const events = snapshot.val();
      return Object.entries(events).map(([id, data]) => ({
        id,
        ...data as EventData
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};