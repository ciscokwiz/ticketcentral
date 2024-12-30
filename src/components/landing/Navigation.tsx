import { useState } from "react";
import { Menu, Ticket, ShoppingCart, LogIn, Search, Plus, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
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
          <div className="glass-panel rounded-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-lg backdrop-blur-md">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full"></div>
              <span className="text-lg sm:text-xl font-semibold">TixCentral</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link to="/events" className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                Events
              </Link>
              <Link to="/directory" className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-2">
                <Search className="w-4 h-4" />
                Directory
              </Link>
              {currentUser && (
                <Link to="/create-event" className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Event
                </Link>
              )}
              <Link to="/cart" className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Cart
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="button-secondary">
                    Dashboard
                  </Link>
                  <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="button-secondary flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden glass-panel mt-2 rounded-xl p-4 shadow-lg mx-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-3">
                <Link 
                  to="/events" 
                  className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Ticket className="w-4 h-4" />
                  Events
                </Link>
                <Link 
                  to="/directory" 
                  className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search className="w-4 h-4" />
                  Directory
                </Link>
                {currentUser && (
                  <Link 
                    to="/create-event" 
                    className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="w-4 h-4" />
                    Create Event
                  </Link>
                )}
                <Link 
                  to="/cart" 
                  className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                </Link>
                <hr className="border-neutral-200" />
                {currentUser ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="button-secondary w-full flex items-center justify-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="button-secondary w-full flex items-center justify-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </nav>
      {/* Spacer to prevent content from being hidden under the fixed navbar */}
      <div className="h-24 sm:h-28" />
    </>
  );
};

export default Navigation;