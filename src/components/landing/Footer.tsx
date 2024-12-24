import { Calendar, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-padding py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-xl font-semibold">TixCentral</span>
            </div>
            <p className="text-neutral-600 text-sm">
              Your Trusted Event Ticketing Platform
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Events</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Create Event</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
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
            © 2024 tixcentral. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;