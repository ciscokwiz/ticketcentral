import { Link } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  currentUser: any;
  onLogout: () => Promise<void>;
  onClose?: () => void;
}

export const AuthButtons = ({ currentUser, onLogout, onClose }: AuthButtonsProps) => {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return currentUser ? (
    <div className="flex items-center gap-3">
      <Link 
        to="/dashboard" 
        className="px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-all duration-200 text-sm font-medium"
        onClick={handleClick}
      >
        Dashboard
      </Link>
      <Button 
        variant="outline" 
        onClick={() => {
          onLogout();
          if (onClose) onClose();
        }}
        className="flex items-center gap-1.5 text-sm"
        size="sm"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </div>
  ) : (
    <Link 
      to="/login" 
      className="px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 transition-all duration-200 text-sm font-medium flex items-center gap-1.5"
      onClick={handleClick}
    >
      <LogIn className="w-4 h-4" />
      Sign In
    </Link>
  );
};