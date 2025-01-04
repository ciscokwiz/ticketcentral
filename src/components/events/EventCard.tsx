import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { EventData } from "@/services/eventService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventCardProps {
  event: EventData;
  onAddToCart: (eventId: string, quantity: number, ticketTier: any) => void;
}

const EventCard = ({ event, onAddToCart }: EventCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const { toast } = useToast();

  // Ensure ticketTiers exists and is an array
  const ticketTiers = Array.isArray(event.ticketTiers) ? event.ticketTiers : [];

  // Get available tickets for selected tier
  const availableTickets = selectedTier ? selectedTier.availableTickets : 0;

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newQuantity = Math.max(1, prev + (increment ? 1 : -1));
      if (newQuantity > availableTickets) {
        toast({
          title: "Not enough tickets available",
          description: `Only ${availableTickets} tickets remaining for this tier`,
          variant: "destructive",
        });
        return prev;
      }
      return newQuantity;
    });
  };

  const handleTierChange = (value: string) => {
    if (!value) return; // Guard against empty string values
    const tier = ticketTiers.find(t => t.name === value);
    if (tier) {
      setSelectedTier(tier);
      setQuantity(1); // Reset quantity when tier changes
    }
  };

  const handleAddToCart = () => {
    if (!selectedTier) {
      toast({
        title: "Please select a ticket tier",
        description: "You must select a ticket tier before adding to cart",
        variant: "destructive",
      });
      return;
    }
    onAddToCart(event.id!, quantity, selectedTier);
  };

  // Default image if none is provided
  const defaultImage = "/placeholder.svg";
  const displayImage = event?.images?.length ? event.images[0] : defaultImage;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/events/${event.id}`}>
        <img 
          src={displayImage}
          alt={event.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
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
        </div>
        
        {ticketTiers.length > 0 ? (
          <div className="space-y-4">
            <Select onValueChange={handleTierChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select ticket tier" />
              </SelectTrigger>
              <SelectContent>
                {ticketTiers.map((tier) => (
                  <SelectItem key={tier.name} value={tier.name || `tier-${Math.random()}`}>
                    {tier.name} - ${tier.price} ({tier.availableTickets} left)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedTier && (
              <>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">${selectedTier.price}</span>
                  <span className="text-sm text-neutral-600">
                    {selectedTier.availableTickets} tickets left
                  </span>
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
                  <Button 
                    onClick={handleAddToCart}
                    disabled={selectedTier.availableTickets === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-neutral-600">No tickets available</p>
        )}
      </div>
    </Card>
  );
};

export default EventCard;