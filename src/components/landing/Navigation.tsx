import { useState } from "react";
import { Menu, Ticket, ShoppingCart, LogIn, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="glass-panel rounded-full px-6 py-4 flex items-center justify-between shadow-lg backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
          <span className="text-xl font-semibold">TixCentral</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/events" className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            Events
          </Link>
          <Link to="/directory" className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-2">
            <Search className="w-4 h-4" />
            Directory
          </Link>
          <Link to="/cart" className="text-neutral-600 hover:text-primary transition-colors font-medium flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Cart
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="button-secondary flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden glass-panel mt-2 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-4">
            <Link to="/events" className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Events
            </Link>
            <Link to="/directory" className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg flex items-center gap-2">
              <Search className="w-4 h-4" />
              Directory
            </Link>
            <Link to="/cart" className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Cart
            </Link>
            <hr className="border-neutral-200" />
            <Link to="/login" className="button-secondary w-full flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;