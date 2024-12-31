import { useQuery } from '@tanstack/react-query';
import { getAllEvents, EventData } from '@/services/eventService';

export const useEvents = () => {
  return useQuery<EventData[]>({
    queryKey: ['events'],
    queryFn: getAllEvents,
  });
};