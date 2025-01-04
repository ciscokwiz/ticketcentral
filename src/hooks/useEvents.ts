import { useQuery } from '@tanstack/react-query';
import { ref, get } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { EventData } from '@/services/eventService';

export const useEvents = () => {
  return useQuery<EventData[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const eventsRef = ref(rtdb, 'events');
      const snapshot = await get(eventsRef);
      
      if (snapshot.exists()) {
        const events = snapshot.val();
        return Object.entries(events).map(([id, data]) => ({
          id,
          ...(data as Omit<EventData, 'id'>)
        }));
      }
      
      return [];
    }
  });
};