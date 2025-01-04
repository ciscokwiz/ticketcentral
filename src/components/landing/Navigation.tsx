import { useState } from "react";
import { Menu, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { NavigationLinks } from "../navigation/NavigationLinks";
import { AuthButtons } from "../navigation/AuthButtons";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = cartItems.length;

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: "Please try again.",
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 pt-4">
          <div className="glass-panel rounded-full px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between shadow-lg backdrop-blur-md">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="relative w-8 h-8 bg-accent-purple rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Ticket className="w-5 h-5 text-white absolute transform -rotate-12" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent hidden sm:inline">
                TixCentral
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <NavigationLinks currentUser={currentUser} cartCount={cartCount} />
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <AuthButtons currentUser={currentUser} onLogout={handleLogout} />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden glass-panel mt-2 rounded-xl p-4 shadow-lg mx-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-4">
                <NavigationLinks 
                  currentUser={currentUser} 
                  cartCount={cartCount} 
                  onClose={() => setIsMenuOpen(false)} 
                />
                <hr className="border-neutral-200" />
                <AuthButtons 
                  currentUser={currentUser} 
                  onLogout={handleLogout} 
                  onClose={() => setIsMenuOpen(false)} 
                />
              </div>
            </motion.div>
          )}
        </div>
      </nav>
      <div className="h-20 sm:h-24" /> {/* Spacer for fixed navbar */}
    </>
  );
};

export default Navigation;