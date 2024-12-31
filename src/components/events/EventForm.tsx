import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createEvent, EventData } from '@/services/eventService';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
    price: '',
    image: '',
    availableTickets: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventData: Omit<EventData, 'id'> = {
        ...formData,
        price: parseFloat(formData.price),
        availableTickets: parseInt(formData.availableTickets),
        organizerId: currentUser?.uid || '',
        createdAt: new Date().toISOString(),
      };

      await createEvent(eventData);
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">Event Title</label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
        <Input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-2">Price ($)</label>
        <Input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="availableTickets" className="block text-sm font-medium mb-2">Available Tickets</label>
        <Input
          type="number"
          id="availableTickets"
          name="availableTickets"
          min="1"
          value={formData.availableTickets}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-2">Image URL</label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Event..." : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;