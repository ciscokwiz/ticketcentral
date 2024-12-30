import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '@/services/eventService';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: getAllEvents,
  });
};