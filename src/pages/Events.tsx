import { useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Filter, BaggageClaim } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Sample categories - in a real app, these would come from your database
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
  
  // Sample events data - this would come from your database
  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      category: "Music",
      date: "2024-07-15",
      price: "99.99",
      location: "Central Park",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      category: "Technology",
      date: "2024-08-20",
      price: "299.99",
      location: "Convention Center",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Stand-up Comedy Night",
      category: "Comedy",
      date: "2024-06-10",
      price: "49.99",
      location: "Comedy Club",
      image: "/placeholder.svg"
    },
  ];

  // Filter events based on search query and selected categories
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container-padding pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="heading-lg mb-8">Discover Events</h1>
          
          {/* Search and Filter Section */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                type="text"
                placeholder="Search events by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2 border border-neutral-300 rounded-lg flex items-center gap-2 hover:bg-neutral-200/50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(c => c !== category));
                        }
                      }}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-neutral-600 mb-2">{event.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-accent-purple/10 text-accent-purple px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                    <div className="flex justify-between items-center gap-5">
                      <span className="font-semibold">${event.price}</span>
                      <button className="h-9 w-20 rounded-md shadow-md flex justify-center items-center hover:bg-accent-purple/10 hover:rounded-full gap-2">< BaggageClaim className=" h-5 w-5 text-accent-purple"/><p className="text-accent-purple font-normal text-base">Buy</p></button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;