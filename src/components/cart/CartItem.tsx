import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  date: string;
  tierName?: string;
  onUpdateQuantity: (id: number, increment: boolean) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ 
  id, 
  title, 
  price = 0,
  quantity, 
  totalPrice = 0,
  date,
  tierName,
  onUpdateQuantity, 
  onRemove 
}: CartItemProps) => {
  return (
    <Card className="p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-neutral-600">Date: {date}</p>
          {tierName && (
            <p className="text-sm text-neutral-600">Tier: {tierName}</p>
          )}
          <p className="text-sm text-neutral-600">Price per ticket: ${price.toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdateQuantity(id, false)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdateQuantity(id, true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemove(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="font-semibold">${(totalPrice || 0).toFixed(2)}</p>
      </div>
    </Card>
  );
};

export default CartItem;