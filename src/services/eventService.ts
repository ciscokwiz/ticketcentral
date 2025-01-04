import { ref, get, child, push } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { toast } from '@/components/ui/use-toast';

export interface TicketTier {
  name: string;
  description: string;
  price: number;
  availableTickets: number;
  benefits: string[];
  isHighlighted: boolean;
}

export interface EventData {
  id?: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  images: string[];
  videos?: string[];
  organizerId: string;
  organizerRemarks: string;
  additionalInfo?: string;
  createdAt: string;
  ticketTiers: TicketTier[];
}

export const createEvent = async (eventData: Omit<EventData, 'id'>) => {
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

export const getAllEvents = async (): Promise<EventData[]> => {
  try {
    const dbRef = ref(rtdb);
    const snapshot = await get(child(dbRef, 'events'));
    
    if (snapshot.exists()) {
      const events = snapshot.val();
      return Object.entries(events).map(([id, data]) => ({
        id,
        ...(data as Omit<EventData, 'id'>)
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch events. Please try again.",
    });
    return [];
  }
};