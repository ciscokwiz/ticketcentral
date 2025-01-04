import { Link } from "react-router-dom";
import { Ticket, Search, Plus, ShoppingCart } from "lucide-react";

interface NavigationLinksProps {
  currentUser: any;
  cartCount: number;
  onClose?: () => void;
}

export const NavigationLinks = ({ currentUser, cartCount, onClose }: NavigationLinksProps) => {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <Link 
        to="/events" 
        className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-1.5"
        onClick={handleClick}
      >
        <Ticket className="w-4 h-4" />
        Events
      </Link>
      <Link 
        to="/directory" 
        className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-1.5"
        onClick={handleClick}
      >
        <Search className="w-4 h-4" />
        Directory
      </Link>
      {currentUser && (
        <Link 
          to="/create-event" 
          className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-1.5"
          onClick={handleClick}
        >
          <Plus className="w-4 h-4" />
          Create
        </Link>
      )}
      <Link 
        to="/cart" 
        className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-1.5"
        onClick={handleClick}
      >
        <div className="relative">
          <ShoppingCart className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        Cart
      </Link>
    </>
  );
};