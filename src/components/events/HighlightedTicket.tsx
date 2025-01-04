import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HighlightedTicketProps {
  tier: {
    name: string;
    description: string;
    price: number;
    benefits: string[];
  };
  className?: string;
}

const HighlightedTicket = ({ tier, className }: HighlightedTicketProps) => {
  return (
    <div className={cn(
      "relative p-6 bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 rounded-lg border-2 border-accent-purple",
      className
    )}>
      <div className="absolute -top-3 -right-3">
        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
      <p className="text-2xl font-bold mb-4">
        ${tier.price.toFixed(2)}
      </p>
      
      <p className="text-neutral-600 mb-4">{tier.description}</p>
      
      {tier.benefits.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold">What's Included:</h4>
          <ul className="space-y-2">
            {tier.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-sm">
                <span className="w-1.5 h-1.5 bg-accent-purple rounded-full mr-2" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HighlightedTicket;