import { Calendar, Mail, Phone, Ticket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateEventClick = (e: React.MouseEvent) => {
    if (!currentUser) {
      e.preventDefault();
      toast({
        title: "Authentication Required",
        description: "Please sign in to create an event",
        variant: "default"
      });
      navigate("/login");
    }
  };

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-padding py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8 bg-accent-purple rounded-xl flex items-center justify-center transform rotate-12">
                <Ticket className="w-5 h-5 text-white absolute transform -rotate-12" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">
                TixCentral
              </span>
            </div>
            <p className="text-neutral-600 text-sm">
              Your Trusted Event Ticketing Platform
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Events</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link to="/events" className="hover:text-primary transition-colors">Browse Events</Link></li>
              <li>
                <Link 
                  to={currentUser ? "/create-event" : "#"} 
                  onClick={handleCreateEventClick}
                  className="hover:text-primary transition-colors"
                >
                  Create Event
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@tixcentral.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                1-800-TICKETS
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                24/7 Support
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">
            © 2024 TixCentral. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-neutral-600 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-neutral-600 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/security" className="text-neutral-600 hover:text-primary transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;