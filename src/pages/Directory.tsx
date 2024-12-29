import { useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar, Ticket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  const categories = [
    "Music",
    "Sports",
    "Theater",
    "Comedy",
    "Arts",
    "Food & Drink",
    "Business",
    "Technology"
  ];
  
  // Sample events data - in a real app, this would come from your backend

const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    category: "Music",
    date: "2024-07-15",
    price: 99.99,
    location: "Central Park",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    category: "Technology",
    date: "2024-08-20",
    price: 299.99,
    location: "Convention Center",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Stand-up Comedy Night",
    category: "Comedy",
    date: "2024-06-10",
    price: 49.99,
    location: "Comedy Club",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Broadway Musical Show",
    category: "Theater",
    date: "2024-09-05",
    price: 149.99,
    location: "Theater District",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "Food & Wine Festival",
    category: "Food & Drink",
    date: "2024-06-25",
    price: 79.99,
    location: "Waterfront Park",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "Art Gallery Opening",
    category: "Arts",
    date: "2024-07-01",
    price: 25.00,
    location: "Modern Art Museum",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    title: "Business Leadership Summit",
    category: "Business",
    date: "2024-08-15",
    price: 399.99,
    location: "Grand Hotel Conference Center",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    title: "Championship Soccer Match",
    category: "Sports",
    date: "2024-07-30",
    price: 89.99,
    location: "National Stadium",
    image: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&q=80"
  }
];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={event.image} 
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
                          <span className="text-sm">${event.price}</span>
                        </div>
                      </div>
                      <Badge className="mt-3" variant="secondary">{event.category}</Badge>
                    </div>
                  </Card>
                ))}
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