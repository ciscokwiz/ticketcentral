import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ref, get } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

const TicketsList = () => {
  const { currentUser } = useAuth();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["userTickets", currentUser?.uid],
    queryFn: async () => {
      if (!currentUser) return [];
      
      const userTicketsRef = ref(rtdb, `users/${currentUser.uid}/purchasedTickets`);
      const ticketsSnapshot = await get(userTicketsRef);
      const ticketsData = ticketsSnapshot.val() || {};

      // Fetch event details for each ticket
      const eventPromises = Object.entries(ticketsData).map(async ([eventId, quantity]) => {
        const eventRef = ref(rtdb, `events/${eventId}`);
        const eventSnapshot = await get(eventRef);
        const eventData = eventSnapshot.val();
        return {
          id: eventId,
          ...eventData,
          quantity
        };
      });

      return Promise.all(eventPromises);
    },
    enabled: !!currentUser
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        {tickets && tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{ticket.title}</h3>
                <p className="text-sm text-neutral-600">Date: {new Date(ticket.date).toLocaleDateString()}</p>
                <p className="text-sm text-neutral-600">Location: {ticket.location}</p>
                <p className="text-sm font-medium mt-2">Quantity: {ticket.quantity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-600">No tickets purchased yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketsList;