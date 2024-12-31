import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    category: string;
    date: string;
    price: number;
    location: string;
    image: string;
    availableTickets: number;
    description: string;
  };
  onAddToCart: (eventId: string, quantity: number) => void;
}

const EventCard = ({ event, onAddToCart }: EventCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newQuantity = Math.max(1, prev + (increment ? 1 : -1));
      if (newQuantity > event.availableTickets) {
        toast({
          title: "Not enough tickets available",
          description: `Only ${event.availableTickets} tickets remaining`,
          className: "bg-green-50 border-green-100",
        });
        return prev;
      }
      return newQuantity;
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/events/${event.id}`}>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </Link>
      <div className="p-4">
        <Link to={`/events/${event.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-accent-purple transition-colors">
            {event.title}
          </h3>
        </Link>
        <p className="text-neutral-600 mb-2">{event.location}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm bg-accent-purple/10 text-accent-purple px-2 py-1 rounded-full">
            {event.category}
          </span>
          <span className="font-semibold">${event.price}</span>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(false)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => onAddToCart(event.id, quantity)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;