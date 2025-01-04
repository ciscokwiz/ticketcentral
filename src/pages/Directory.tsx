import { useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Ticket, Loader2 } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { data: events = [], isLoading, error } = useEvents();
  
  const categories = [
    "Music", "Sports", "Theater", "Comedy", "Arts", 
    "Food & Drink", "Business", "Technology"
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    
    // Ensure ticketTiers exists with a default empty array
    const ticketTiers = event.ticketTiers || [];
    
    // Get the lowest price from ticket tiers, default to 0 if no tiers exist
    const lowestPrice = ticketTiers.length > 0
      ? Math.min(...ticketTiers.map(tier => tier.price))
      : 0;
    
    const matchesPrice = lowestPrice >= priceRange[0] && lowestPrice <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="container-padding pt-32 pb-16">
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="container-padding pt-32 pb-16">
          <div className="text-center py-12">
            <p className="text-lg text-red-600">Error loading events. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container-padding pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="heading-lg mb-8">Event Directory</h1>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-64 space-y-4">
              <div className="glass-panel p-4 rounded-lg space-y-4">
                <h3 className="font-semibold">Filters</h3>
                
                <div>
                  <label className="text-sm text-neutral-600 mb-2 block">Price Range</label>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm text-neutral-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-neutral-600 mb-2 block">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, category]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== category));
                            }
                          }}
                          className="rounded border-neutral-300"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  type="text"
                  placeholder="Search events by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => {
                  const ticketTiers = event.ticketTiers || [];
                  const lowestPrice = ticketTiers.length > 0
                    ? Math.min(...ticketTiers.map(tier => tier.price))
                    : 0;
                    
                  return (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={event.images?.[0]} 
                        alt={event.title} 
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-neutral-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Ticket className="w-4 h-4" />
                            <span className="text-sm">
                              {ticketTiers.length > 0 ? `From $${lowestPrice}` : 'No tickets available'}
                            </span>
                          </div>
                        </div>
                        <Badge className="mt-3" variant="secondary">{event.category}</Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Directory;