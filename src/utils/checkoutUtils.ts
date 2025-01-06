import { ref, get, update } from 'firebase/database';
import { rtdb } from '@/lib/firebase';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  date: string;
  tierName?: string;
}

export const processCheckout = async (cartItems: CartItem[], userId: string) => {
  const errors: string[] = [];
  const updates: { [key: string]: any } = {};

  for (const item of cartItems) {
    try {
      const eventRef = ref(rtdb, `events/${item.id}`);
      const eventSnapshot = await get(eventRef);
      const eventData = eventSnapshot.val();

      if (!eventData) {
        throw new Error(`Event ${item.id} not found`);
      }

      // For free tickets without a specific tier, use the first tier or default tier
      let ticketTier;
      let tierIndex;

      if (!item.tierName && eventData.ticketTiers?.length > 0) {
        tierIndex = 0;
        ticketTier = eventData.ticketTiers[0];
      } else if (item.tierName) {
        tierIndex = eventData.ticketTiers?.findIndex((tier: any) => tier.name === item.tierName);
        ticketTier = eventData.ticketTiers?.[tierIndex];
      }

      if (!ticketTier) {
        throw new Error(`No valid ticket tier found for event ${eventData.title}`);
      }

      const currentAvailableTickets = parseInt(String(ticketTier.availableTickets)) || 0;
      const requestedQuantity = parseInt(String(item.quantity)) || 0;

      if (currentAvailableTickets < requestedQuantity) {
        throw new Error(`Not enough tickets available for ${eventData.title}`);
      }

      const newAvailableTickets = currentAvailableTickets - requestedQuantity;
      updates[`events/${item.id}/ticketTiers/${tierIndex}/availableTickets`] = newAvailableTickets;

      const userTicketsRef = `users/${userId}/purchasedTickets/${item.id}`;
      const existingTicketsSnapshot = await get(ref(rtdb, userTicketsRef));
      const existingTickets = parseInt(existingTicketsSnapshot.val()) || 0;
      updates[userTicketsRef] = existingTickets + requestedQuantity;

    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Unknown error during checkout');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Checkout failed: ${errors.join(', ')}`);
  }

  await update(ref(rtdb), updates);
};