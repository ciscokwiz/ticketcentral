import { useState } from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export interface TicketTier {
  name: string;
  description: string;
  price: number;
  availableTickets: number;
  benefits: string[];
  isHighlighted: boolean;
}

interface TicketTierFormProps {
  ticketTiers: TicketTier[];
  setTicketTiers: (tiers: TicketTier[]) => void;
}

const TicketTierForm = ({ ticketTiers, setTicketTiers }: TicketTierFormProps) => {
  const [newBenefit, setNewBenefit] = useState('');

  const addTicketTier = () => {
    setTicketTiers([
      ...ticketTiers,
      {
        name: '',
        description: '',
        price: 0,
        availableTickets: 0,
        benefits: [],
        isHighlighted: false
      }
    ]);
  };

  const removeTicketTier = (index: number) => {
    setTicketTiers(ticketTiers.filter((_, i) => i !== index));
  };

  const updateTicketTier = (index: number, field: keyof TicketTier, value: any) => {
    const updatedTiers = [...ticketTiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    setTicketTiers(updatedTiers);
  };

  const addBenefit = (index: number) => {
    if (!newBenefit.trim()) return;
    const updatedTiers = [...ticketTiers];
    updatedTiers[index].benefits.push(newBenefit.trim());
    setTicketTiers(updatedTiers);
    setNewBenefit('');
  };

  const removeBenefit = (tierIndex: number, benefitIndex: number) => {
    const updatedTiers = [...ticketTiers];
    updatedTiers[tierIndex].benefits.splice(benefitIndex, 1);
    setTicketTiers(updatedTiers);
  };

  return (
    <div className="space-y-6">
      {ticketTiers.map((tier, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Ticket Tier {index + 1}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeTicketTier(index)}
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                value={tier.name}
                onChange={(e) => updateTicketTier(index, 'name', e.target.value)}
                placeholder="e.g., VIP, Early Bird, Regular"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={tier.description}
                onChange={(e) => updateTicketTier(index, 'description', e.target.value)}
                placeholder="Describe what's included in this ticket tier"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <Input
                  type="number"
                  value={tier.price}
                  onChange={(e) => updateTicketTier(index, 'price', parseFloat(e.target.value))}
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Available Tickets</label>
                <Input
                  type="number"
                  value={tier.availableTickets}
                  onChange={(e) => updateTicketTier(index, 'availableTickets', parseInt(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Benefits</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Add a benefit"
                  onKeyPress={(e) => e.key === 'Enter' && addBenefit(index)}
                />
                <Button type="button" onClick={() => addBenefit(index)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center justify-between bg-neutral-50 p-2 rounded">
                    <span>{benefit}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBenefit(index, benefitIndex)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={tier.isHighlighted}
                onCheckedChange={(checked) => updateTicketTier(index, 'isHighlighted', checked)}
              />
              <label className="text-sm font-medium">
                Highlight this tier <Star className="w-4 h-4 inline-block text-yellow-400" />
              </label>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addTicketTier}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Ticket Tier
      </Button>
    </div>
  );
};

export default TicketTierForm;