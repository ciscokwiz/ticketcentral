import { motion } from "framer-motion";
import { Ticket, CreditCard, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <header className="container-padding py-8 lg:py-12">
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-12 lg:pt-40 md:pb-32 pb-24">
        <motion.h1 
          className="heading-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Ultimate Event Ticketing Platform
        </motion.h1>
        <motion.p 
          className="text-xl text-neutral-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Purchase tickets securely with crypto or fiat payments. Discover events, manage bookings, and enjoy seamless transactions.
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/events" className="button-primary flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            Browse Events
          </Link>
          <div className="flex items-center gap-4 px-6 py-3 border border-neutral-300 rounded-lg">
            <CreditCard className="w-4 h-4 text-neutral-600" />
            <Wallet className="w-4 h-4 text-neutral-600" />
            <span className="text-neutral-600">Fiat & Crypto Payments</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;