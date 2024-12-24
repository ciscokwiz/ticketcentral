import { Check, Calendar, CreditCard, QrCode, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "Event Management",
      description: "Create and manage events with ease. Set ticket types, prices, and availability all in one place.",
      points: ["Multiple ticket tiers", "Real-time availability", "Event analytics"],
      icon: Calendar
    },
    {
      title: "Secure Payments",
      description: "Process payments securely with our integrated payment system. Support for all major payment methods.",
      points: ["Secure transactions", "Multiple payment options", "Instant confirmation"],
      icon: CreditCard
    },
    {
      title: "Digital Tickets",
      description: "Issue and validate digital tickets with QR codes. No more paper tickets or long queues.",
      points: ["QR code tickets", "Mobile wallet integration", "Easy validation"],
      icon: QrCode
    },
    {
      title: "Event Discovery",
      description: "Help attendees discover your events with our smart recommendation system and search features.",
      points: ["Advanced search", "Personalized recommendations", "Social sharing"],
      icon: Users
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-padding">
        <div className="text-center mb-16">
          <span className="bg-accent-purple/10 text-accent-purple px-4 py-1.5 rounded-full text-sm font-medium">
            FEATURES
          </span>
          <h2 className="heading-lg mt-6">Everything You Need for Event Ticketing</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            A complete solution for event organizers and attendees
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-accent-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent-purple" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;