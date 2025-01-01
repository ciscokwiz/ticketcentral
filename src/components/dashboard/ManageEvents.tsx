import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ref, get, update, child } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2, Edit, Trash } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  organizerId: string;
  // ... other event properties
}

const ManageEvents = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ['user-events', currentUser?.uid],
    queryFn: async () => {
      if (!currentUser?.uid) return [];
      const eventsRef = ref(rtdb, 'events');
      const snapshot = await get(eventsRef);
      if (!snapshot.exists()) return [];
      
      const allEvents = snapshot.val();
      return Object.entries(allEvents)
        .map(([id, data]) => ({ id, ...data as Omit<Event, 'id'> }))
        .filter(event => event.organizerId === currentUser.uid);
    },
    enabled: !!currentUser
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const eventRef = ref(rtdb, `events/${eventId}`);
      await update(eventRef, null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-events'] });
      toast({
        title: "Event deleted",
        description: "The event has been successfully deleted.",
      });
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Events</h2>
        <Button onClick={() => navigate('/create-event')}>Create New Event</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <Card key={event.id} className="p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/events/${event.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteEventMutation.mutate(event.id)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        ))}

        {events?.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            You haven't created any events yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
