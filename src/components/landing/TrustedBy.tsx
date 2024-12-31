import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TrustedBy = () => {
  const companies = [
    { name: "Stripe", logo: "/company-logos/stripe.svg", className: "w-24" },
    { name: "HubSpot", logo: "/company-logos/hubspot.svg", className: "w-28" },
    { name: "Intercom", logo: "/company-logos/intercom.svg", className: "w-28" },
    { name: "Asana", logo: "/company-logos/asana.svg", className: "w-24" },
    { name: "Slack", logo: "/company-logos/slack.svg", className: "w-24" },
    { name: "Notion", logo: "/company-logos/notion.svg", className: "w-28" }
  ];

  return (
    <section className="py-24 bg-neutral-200/50">
      <div className="container-padding">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-neutral-600 mb-12"
        >
          Trusted by popular startups you know
        </motion.p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {companies.map((company, index) => (
              <CarouselItem key={company.name} className="md:basis-1/3 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${company.className} h-12 bg-neutral-400/20 rounded-lg hover:bg-neutral-400/30 transition-colors cursor-pointer flex items-center justify-center`}
                >
                  <span className="sr-only">{company.name}</span>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TrustedBy;